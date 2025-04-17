export default {
    install: (app, options) => {
        // 添加简单的事件总线功能
        const eventBus = {
            events: {},
            emit(event, ...args) {
                if (this.events[event]) {
                    this.events[event].forEach(callback => callback(...args));
                }
            },
            on(event, callback) {
                if (!this.events[event]) {
                    this.events[event] = [];
                }
                this.events[event].push(callback);
            },
            off(event, callback) {
                if (this.events[event]) {
                    this.events[event] = this.events[event].filter(
                        cb => cb !== callback
                    );
                }
            }
        };
        
        // 将事件总线方法添加到全局属性中
        app.config.globalProperties.$emit = eventBus.emit.bind(eventBus);
        app.config.globalProperties.$on = eventBus.on.bind(eventBus);
        app.config.globalProperties.$off = eventBus.off.bind(eventBus);
        
        // 全局storage方法
        app.config.globalProperties.$storage = {
            storageKey: "QuickReply",
            userStorageKey: "QuickReplyUser",
            set(value){
                GM_setValue(this.storageKey, value);
            },
            get(){
                return GM_getValue(this.storageKey, []);
            },
            getAll(){
                let keyList = GM_listValues();
                let all = {};
                keyList.forEach(key => {
                    all[key] = GM_getValue(key, '');
                });
                return all;
            },
            setAll(data){
                for(let key in data){
                    GM_setValue(key, data[key]);
                }
            },
            setUserInfo(key, value){
                let fullKey = `${this.userStorageKey}.${key}`;
                GM_setValue(fullKey, value || '');
            },
            getUserInfo(key){
                let fullKey = `${this.userStorageKey}.${key}`;
                return GM_getValue(fullKey, '');
            },
            async uploadToWebDAV(data, filename) {
                const webdavConfig = this.getUserInfo('webdavConfig');
                if (!webdavConfig || !webdavConfig.enabled) return false;

                // 处理 URL
                let baseUrl = webdavConfig.url;
                // 移除末尾的斜杠
                baseUrl = baseUrl.replace(/\/+$/, '');
                
                // 添加 bbs_quickreply 目录
                baseUrl = `${baseUrl}/bbs_quickreply`;
                
                // 确保文件名不以斜杠开头
                const safeFilename = filename.startsWith('/') ? filename.substring(1) : filename;
                const fullUrl = `${baseUrl}/${safeFilename}`;
                
                console.log('准备上传文件到WebDAV:', fullUrl);
                
                // 先确保目录存在
                try {
                    await this.ensureWebDAVDirectory();
                    
                    // 上传文件
                    return new Promise((resolve, reject) => {
                        GM_xmlhttpRequest({
                            method: 'PUT',
                            url: fullUrl,
                            headers: {
                                'Authorization': 'Basic ' + btoa(webdavConfig.username + ':' + webdavConfig.password),
                                'Content-Type': 'application/json; charset=utf-8',
                                'Accept': '*/*'
                            },
                            data: JSON.stringify(data),
                            onload: function(response) {
                                console.log('WebDAV上传响应:', response.status, response.statusText);
                                if (response.status >= 200 && response.status < 300) {
                                    console.log('WebDAV上传成功:', fullUrl);
                                    resolve(true);
                                } else {
                                    console.error("WebDAV 上传失败:", response);
                                    let errorMsg = "上传失败";
                                    try {
                                        const parser = new DOMParser();
                                        const xmlDoc = parser.parseFromString(response.responseText, "text/xml");
                                        const message = xmlDoc.querySelector("s\\:message");
                                        if (message) {
                                            errorMsg += ": " + message.textContent;
                                        } else {
                                            switch (response.status) {
                                                case 401:
                                                    errorMsg += ": 认证失败,请检查用户名和密码";
                                                    break;
                                                case 403:
                                                    errorMsg += ": 没有权限,请检查 WebDAV 设置";
                                                    break;
                                                case 404:
                                                    errorMsg += ": 路径不存在,请检查 WebDAV 地址";
                                                    break;
                                                case 405:
                                                    errorMsg += ": 不允许此操作,请检查 WebDAV 权限";
                                                    break;
                                                default:
                                                    errorMsg += ": " + (response.statusText || "服务器返回状态码 " + response.status);
                                            }
                                        }
                                    } catch (e) {
                                        errorMsg += ": " + (response.statusText || "状态码: " + response.status);
                                    }
                                    reject(new Error(errorMsg));
                                }
                            },
                            onerror: function(error) {
                                console.error('WebDAV上传网络错误:', error);
                                reject(new Error("上传失败: " + (error.message || "网络错误")));
                            },
                            ontimeout: function() {
                                console.error('WebDAV上传请求超时');
                                reject(new Error("上传失败: 请求超时"));
                            }
                        });
                    });
                } catch (error) {
                    console.error('WebDAV上传过程中出错:', error);
                    throw error;
                }
            },
            async downloadFromWebDAV(filename) {
                const webdavConfig = this.getUserInfo('webdavConfig');
                if (!webdavConfig || !webdavConfig.enabled) return null;

                // 处理 URL
                let baseUrl = webdavConfig.url;
                // 移除末尾的斜杠
                baseUrl = baseUrl.replace(/\/+$/, '');
                // 确保路径包含 bbs_quickreply 目录
                baseUrl = `${baseUrl}/bbs_quickreply`;
                
                // 确保文件名不以斜杠开头
                const safeFilename = filename.startsWith('/') ? filename.substring(1) : filename;
                const fullUrl = `${baseUrl}/${safeFilename}`;
                
                console.log('正在从WebDAV下载文件:', fullUrl);

                return new Promise((resolve, reject) => {
                    GM_xmlhttpRequest({
                        method: 'GET',
                        url: fullUrl,
                        headers: {
                            'Authorization': 'Basic ' + btoa(webdavConfig.username + ':' + webdavConfig.password),
                            'Content-Type': 'application/json',
                            'Accept': 'application/json, text/plain, */*'
                        },
                        responseType: 'text',
                        onload: function(response) {
                            console.log('WebDAV下载响应:', response.status, response.statusText);
                            
                            if (response.status >= 200 && response.status < 300) {
                                try {
                                    // 检查是否为空响应
                                    if (!response.responseText || response.responseText.trim() === '') {
                                        console.error('WebDAV响应内容为空');
                                        reject(new Error('下载的文件内容为空'));
                                        return;
                                    }
                                    
                                    // 尝试解析JSON
                                    const parsedData = JSON.parse(response.responseText);
                                    console.log('WebDAV下载成功，数据已解析');
                                    resolve(parsedData);
                                } catch (e) {
                                    console.error('解析WebDAV响应失败:', e, '响应内容:', response.responseText.substring(0, 100) + '...');
                                    reject(new Error('解析响应失败: ' + e.message));
                                }
                            } else if (response.status === 404) {
                                console.warn('WebDAV文件不存在:', fullUrl);
                                resolve(null); // 文件不存在返回null而不是报错
                            } else {
                                console.error('WebDAV下载失败:', response.status, response.statusText);
                                reject(new Error('下载失败: 状态码 ' + response.status + ' ' + response.statusText));
                            }
                        },
                        onerror: function(error) {
                            console.error('WebDAV请求出错:', error);
                            reject(new Error('下载失败: 网络错误'));
                        },
                        ontimeout: function() {
                            console.error('WebDAV请求超时');
                            reject(new Error('下载失败: 请求超时'));
                        }
                    });
                }).catch(error => {
                    console.error('WebDAV 下载失败:', error);
                    throw error;  // 重新抛出错误，让上层函数处理
                });
            },
            async uploadList() {
                let proxy = app.config.globalProperties;
                let userId = proxy.$storage.getUserInfo('userId');
                let myList = proxy.$storage.get() || [];
                let webdavConfig = this.getUserInfo('webdavConfig');

                // 检查是否是WebDAV用户
                if (userId === 'webdav_user' && webdavConfig && webdavConfig.enabled) {
                    if (await this.uploadToWebDAV(myList, 'quickreply_list.json')) {
                        proxy.$message.success('WebDAV 上传成功');
                        return true;
                    }
                    proxy.$message.error('WebDAV 上传失败');
                    return false;
                }

                // 非WebDAV用户，使用云端同步
                if(!userId) {
                    proxy.$message.error('请先登录');
                    return false;
                }
                if(myList.length == 0){
                    proxy.$message.error('无可同步数据');
                    return false;
                }
                proxy.$api.upQuickReplyList({
                    userId: userId,
                    list: myList
                }).then(res=>{
                    proxy.$message.success('上传成功');
                }).catch(err=>{
                    proxy.$message.error(err.message);
                });
            },
            async downloadList() {
                let proxy = app.config.globalProperties;
                let userId = proxy.$storage.getUserInfo('userId');
                let webdavConfig = this.getUserInfo('webdavConfig');

                // 检查是否是WebDAV用户
                if (userId === 'webdav_user' && webdavConfig && webdavConfig.enabled) {
                    try {
                        // 确保 bbs_quickreply 目录存在
                        await this.ensureWebDAVDirectory();
                        
                        const data = await this.downloadFromWebDAV('quickreply_list.json');
                        if (data) {
                            proxy.$storage.set(data);
                            proxy.$message.success('WebDAV 下载成功');
                            return data;
                        } else {
                            // 文件可能不存在，先尝试上传一次当前数据
                            const currentList = proxy.$storage.get() || [];
                            if (currentList.length > 0) {
                                await this.uploadToWebDAV(currentList, 'quickreply_list.json');
                                proxy.$message.warning('WebDAV 中不存在数据，已上传当前数据');
                                return currentList;
                            } else {
                                proxy.$message.warning('WebDAV 中不存在数据，且本地无数据可上传');
                                return [];
                            }
                        }
                    } catch (error) {
                        console.error('WebDAV 下载列表失败:', error);
                        proxy.$message.error(`WebDAV 下载失败: ${error.message}`);
                        return false;
                    }
                }

                // 非WebDAV用户，使用云端同步
                if(!userId) {
                    proxy.$message.error('请先登录');
                    return false;
                }

                let res = await proxy.$api.downQuickReplyList({
                    userId: userId
                });
                if(res.code == 0){
                    if(res.data.length == 0){
                        proxy.$message.error('云端无数据');
                    } else {
                        proxy.$storage.set(res.data);
                        proxy.$message.success('下载成功');
                        return res.data;
                    }
                } else {
                    proxy.$message.error(res.message);
                }
            },
            async uploadAll() {
                let proxy = app.config.globalProperties;
                let userId = proxy.$storage.getUserInfo('userId');
                let webdavConfig = this.getUserInfo('webdavConfig');
                
                // 检查是否是WebDAV用户
                if (userId === 'webdav_user' && webdavConfig && webdavConfig.enabled) {
                    const allConfig = proxy.$storage.getAll() || {};
                    if(Object.keys(allConfig).length === 0) {
                        proxy.$message.error('无可备份数据');
                        return false;
                    }
                    
                    const encryptedData = {
                        options: proxy.$tools.encodeStr(JSON.stringify(allConfig))
                    };
                    
                    if (await this.uploadToWebDAV(encryptedData, 'quickreply_all.json')) {
                        proxy.$message.success('WebDAV 备份成功');
                        return true;
                    }
                    proxy.$message.error('WebDAV 备份失败');
                    return false;
                }
                
                // 非WebDAV用户，使用云端同步
                if(!userId) {
                    proxy.$message.error('请先登录');
                    return false;
                }
                
                let allData = proxy.$storage.getAll() || {};
                if(Object.keys(allData).length === 0) {
                    proxy.$message.error('无可备份数据');
                    return false;
                }
                
                let res = await proxy.$api.upUserAll({
                    userId: userId,
                    options: proxy.$tools.encodeStr(JSON.stringify(allData))
                });
                
                if(res.code == 0){
                    proxy.$message.success('备份成功');
                    return true;
                } else {
                    proxy.$message.error(res.message);
                    return false;
                }
            },
            async downloadAll() {
                let proxy = app.config.globalProperties;
                let userId = proxy.$storage.getUserInfo('userId');
                let webdavConfig = this.getUserInfo('webdavConfig');

                // 检查是否是WebDAV用户
                if (userId === 'webdav_user' && webdavConfig && webdavConfig.enabled) {
                    try {
                        // 确保 bbs_quickreply 目录存在
                        await this.ensureWebDAVDirectory();
                        
                        const data = await this.downloadFromWebDAV('quickreply_all.json');
                        if (data && data.options) {
                            try {
                                console.log('开始解析WebDAV全量数据...');
                                const decryptedOptions = JSON.parse(proxy.$tools.decodeStr(data.options));
                                
                                // 添加一个延迟，确保数据正确恢复
                                proxy.$storage.setAll(decryptedOptions);
                                console.log('WebDAV全量数据已恢复到本地存储');
                                
                                // 触发全局事件，通知所有组件更新数据
                                setTimeout(() => {
                                    proxy.$emit('dataRestored', decryptedOptions);
                                    console.log('已发送dataRestored事件，通知组件更新');
                                }, 100);
                                
                                proxy.$message.success('WebDAV 恢复成功');
                                return decryptedOptions;
                            } catch (e) {
                                console.error('解析WebDAV全量数据失败:', e);
                                proxy.$message.error(`解析数据失败: ${e.message}`);
                                return false;
                            }
                        } else {
                            // 文件可能不存在，自动上传当前配置
                            const allConfig = proxy.$storage.getAll() || {};
                            if (Object.keys(allConfig).length > 0) {
                                try {
                                    const encryptedData = {
                                        options: proxy.$tools.encodeStr(JSON.stringify(allConfig))
                                    };
                                    await this.uploadToWebDAV(encryptedData, 'quickreply_all.json');
                                    proxy.$message.success('WebDAV 首次备份成功，已上传当前配置');
                                    return allConfig;
                                } catch (e) {
                                    console.error('首次上传WebDAV数据失败:', e);
                                    proxy.$message.error(`首次备份失败: ${e.message}`);
                                    return false;
                                }
                            } else {
                                proxy.$message.warning('WebDAV 中不存在全量数据，且本地无配置可上传');
                                return false;
                            }
                        }
                    } catch (error) {
                        console.error('WebDAV 下载全量数据失败:', error);
                        proxy.$message.error(`WebDAV 恢复失败: ${error.message}`);
                        return false;
                    }
                }

                // 非WebDAV用户，使用云端同步
                if (!userId) {
                    proxy.$message.error('请先登录');
                    return false;
                }

                let res = await proxy.$api.downUserAll({
                    userId: userId
                });
                if (res.code == 0) {
                    proxy.$storage.setAll(res.data);
                    
                    // 触发全局事件，通知所有组件更新数据
                    setTimeout(() => {
                        proxy.$emit('dataRestored', res.data);
                        console.log('已发送dataRestored事件，通知组件更新');
                    }, 100);
                    
                    proxy.$message.success('恢复成功');
                    return res.data;
                } else {
                    proxy.$message.error(res.message);
                    return false;
                }
            },
            async ensureWebDAVDirectory() {
                const webdavConfig = this.getUserInfo('webdavConfig');
                if (!webdavConfig || !webdavConfig.enabled) return false;

                // 处理 URL
                let baseUrl = webdavConfig.url;
                // 移除末尾的斜杠
                baseUrl = baseUrl.replace(/\/+$/, '');
                
                // 添加 bbs_quickreply 目录
                const dirUrl = `${baseUrl}/bbs_quickreply`;
                
                console.log('准备确保WebDAV目录存在:', dirUrl);
                
                // 尝试创建目录
                try {
                    // 先检查目录是否存在
                    const exists = await this.checkDirectoryExists(dirUrl, webdavConfig);
                    if (exists) {
                        console.log('WebDAV目录已存在:', dirUrl);
                        return true;
                    }
                    
                    // 目录不存在，尝试创建
                    console.log('WebDAV目录不存在，尝试创建:', dirUrl);
                    await new Promise((resolve, reject) => {
                        GM_xmlhttpRequest({
                            method: 'MKCOL',
                            url: dirUrl,
                            headers: {
                                'Authorization': 'Basic ' + btoa(webdavConfig.username + ':' + webdavConfig.password)
                            },
                            onload: function(response) {
                                console.log('创建WebDAV目录响应:', response.status, response.statusText);
                                if (response.status >= 200 && response.status < 300 || response.status === 405) {
                                    // 201 表示创建成功,405 表示目录已存在,都算正常
                                    resolve(true);
                                } else {
                                    reject(new Error('创建目录失败: ' + (response.statusText || '服务器返回状态码 ' + response.status)));
                                }
                            },
                            onerror: function(error) {
                                reject(new Error('创建目录失败: ' + (error.message || '网络错误')));
                            }
                        });
                    });
                    
                    console.log('WebDAV目录创建成功:', dirUrl);
                    return true;
                } catch (error) {
                    // 如果是 405 错误(目录已存在),表示成功
                    if (error.message.includes('405')) {
                        console.log('WebDAV目录已存在,无需创建');
                        return true;
                    }
                    console.error('确保WebDAV目录存在时出错:', error);
                    throw error;
                }
            },
            async checkDirectoryExists(url, webdavConfig) {
                try {
                    const response = await new Promise((resolve, reject) => {
                        GM_xmlhttpRequest({
                            method: 'PROPFIND',
                            url: url,
                            headers: {
                                'Authorization': 'Basic ' + btoa(webdavConfig.username + ':' + webdavConfig.password),
                                'Depth': '0',
                                'Content-Type': 'application/xml'
                            },
                            onload: function(response) {
                                resolve(response);
                            },
                            onerror: function(error) {
                                reject(error);
                            }
                        });
                    });
                    
                    return response.status >= 200 && response.status < 300;
                } catch (error) {
                    console.warn('检查目录是否存在失败:', error);
                    return false;
                }
            },
            // 获取所有用户数据（用于剪贴板备份）
            getAllUserData() {
                // 获取所有存储的数据
                const allData = this.getAll();
                
                // 如果没有数据，返回空对象
                if(Object.keys(allData).length === 0) {
                    return {};
                }
                
                return allData;
            },
            
            // 从对象恢复所有用户数据（用于剪贴板恢复）
            restoreAllUserData(data) {
                if (!data || Object.keys(data).length === 0) {
                    console.error('无效的恢复数据');
                    return false;
                }
                
                try {
                    // 恢复所有数据到本地存储
                    this.setAll(data);
                    console.log('数据已从剪贴板恢复到本地存储');
                    return true;
                } catch (error) {
                    console.error('恢复数据失败:', error);
                    return false;
                }
            },
        },

        // 全局
        app.config.globalProperties.$app = {
            getName(){
                return GM_info['script']['name'];
            },
            getVersion: function() {
                return GM_info['script']['version'];
            },
            systemRole: '你是一个互联网高手，常年混迹于各大论坛，对所有内容都感兴趣，并且热衷于回复每一篇帖子，回复风格：简短、睿智、一语中的，又不失俏皮诙谐',
            prompt: '请根据帖子标题：{{title}}，进行回帖。务必直接给出回帖内容，不要包含其他无关内容',
            isNew: function(timestamp){
                if(!timestamp) return false;
                let number = 3600 * 24 * 7;
                return parseInt(new Date().getTime()/1000) - timestamp <= number;
            }
        }

        // tools
        app.config.globalProperties.$tools = {
            encodeStr: function(str) {
                let encoder = new TextEncoder();
                str = encoder.encode(str);
                return btoa(String.fromCharCode.apply(null, str));
            },
            decodeStr: function(str) {
                var byteCharacters = atob(str);
                var byteArray = new Uint8Array(byteCharacters.length);
                for (var i = 0; i < byteCharacters.length; i++) {
                    byteArray[i] = byteCharacters.charCodeAt(i);
                }

                var decoder = new TextDecoder();
                return decoder.decode(byteArray);
            }
        }
    }
}
