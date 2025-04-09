export default {
    install: (app, options) => {
        // 全局storage方法
        app.config.globalProperties.$storage = {
            key: 'QuickReply',
            userStorageKey: "QuickReplyUser",
            set(value){
                GM_setValue(this.key, value);
            },
            get(){
                return GM_getValue(this.key, []);
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
                };
            },
            setUserInfo(key, value){
                let fullKey = `${this.userStorageKey}.${key}`;
                GM_setValue(fullKey, value);
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
                
                // 先尝试创建目录
                try {
                    await new Promise((resolve, reject) => {
                        GM_xmlhttpRequest({
                            method: 'MKCOL',
                            url: baseUrl,
                            headers: {
                                'Authorization': 'Basic ' + btoa(webdavConfig.username + ':' + webdavConfig.password)
                            },
                            onload: function(response) {
                                if (response.status === 201 || response.status === 405) {
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
                } catch (error) {
                    // 如果是 405 错误(目录已存在),继续执行
                    if (error.message.includes('405')) {
                        console.log('目录已存在,继续上传');
                    } else {
                        throw error;
                    }
                }
                
                // 上传文件
                return new Promise((resolve, reject) => {
                    GM_xmlhttpRequest({
                        method: 'PUT',
                        url: `${baseUrl}/${safeFilename}`,
                        headers: {
                            'Authorization': 'Basic ' + btoa(webdavConfig.username + ':' + webdavConfig.password),
                            'Content-Type': 'application/json; charset=utf-8',
                            'Accept': '*/*'
                        },
                        data: JSON.stringify(data),
                        onload: function(response) {
                            if (response.status >= 200 && response.status < 300) {
                                resolve(true);
                            } else {
                                console.error('WebDAV 上传失败:', response);
                                let errorMsg = '上传失败';
                                try {
                                    // 尝试解析 XML 错误信息
                                    const parser = new DOMParser();
                                    const xmlDoc = parser.parseFromString(response.responseText, "text/xml");
                                    const message = xmlDoc.querySelector("s\\:message");
                                    if (message) {
                                        errorMsg += ': ' + message.textContent;
                                    } else {
                                        switch (response.status) {
                                            case 401:
                                                errorMsg += ': 认证失败,请检查用户名和密码';
                                                break;
                                            case 403:
                                                errorMsg += ': 没有权限,请检查 WebDAV 设置';
                                                break;
                                            case 404:
                                                errorMsg += ': 路径不存在,请检查 WebDAV 地址';
                                                break;
                                            case 405:
                                                errorMsg += ': 不允许此操作,请检查 WebDAV 权限';
                                                break;
                                            default:
                                                errorMsg += ': ' + (response.statusText || '服务器返回状态码 ' + response.status);
                                        }
                                    }
                                } catch (e) {
                                    errorMsg += ': ' + (response.statusText || '服务器返回状态码 ' + response.status);
                                }
                                reject(new Error(errorMsg));
                            }
                        },
                        onerror: function(error) {
                            console.error('WebDAV 上传错误:', error);
                            reject(new Error('上传失败: ' + (error.message || '网络错误')));
                        }
                    });
                }).catch(error => {
                    console.error('WebDAV 上传失败:', error);
                    throw error;
                });
            },
            async downloadFromWebDAV(filename) {
                const webdavConfig = this.getUserInfo('webdavConfig');
                if (!webdavConfig || !webdavConfig.enabled) return null;

                return new Promise((resolve, reject) => {
                    GM_xmlhttpRequest({
                        method: 'GET',
                        url: webdavConfig.url + '/' + filename,
                        headers: {
                            'Authorization': 'Basic ' + btoa(webdavConfig.username + ':' + webdavConfig.password)
                        },
                        onload: function(response) {
                            if (response.status >= 200 && response.status < 300) {
                                try {
                                    resolve(JSON.parse(response.responseText));
                                } catch (e) {
                                    reject(new Error('解析响应失败: ' + e.message));
                                }
                            } else {
                                reject(new Error('下载失败: ' + response.statusText));
                            }
                        },
                        onerror: function(error) {
                            reject(new Error('下载失败: ' + error.message));
                        }
                    });
                }).catch(error => {
                    console.error('WebDAV 下载失败:', error);
                    return null;
                });
            },
            async uploadList() {
                let proxy = app.config.globalProperties;
                let userId = proxy.$storage.getUserInfo('userId');
                let myList = proxy.$storage.get() || [];
                let webdavConfig = this.getUserInfo('webdavConfig');

                if (webdavConfig && webdavConfig.enabled) {
                    if (await this.uploadToWebDAV(myList, 'quickreply_list.json')) {
                        proxy.$message.success('WebDAV 上传成功');
                        return true;
                    }
                    proxy.$message.error('WebDAV 上传失败');
                    return false;
                }

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

                if (webdavConfig && webdavConfig.enabled) {
                    const data = await this.downloadFromWebDAV('quickreply_list.json');
                    if (data) {
                        proxy.$storage.set(data);
                        proxy.$message.success('WebDAV 下载成功');
                        return data;
                    }
                    proxy.$message.error('WebDAV 下载失败');
                    return false;
                }

                if(!userId) {
                    proxy.$message.error('请先登录');
                    return false;
                }

                let res = await proxy.$api.downQuickReplyList({
                    userId: userId
                })
                if(res.code == 0){
                    if(res.data.length == 0){
                        proxy.$message.error('云端无数据');
                    } else {
                        proxy.$storage.set(res.data);
                        proxy.$message.success('下载成功');
                        return res.data
                    }
                } else {
                    proxy.$message.error(res.message);
                };
            },
            async uploadAll() {
                let proxy = app.config.globalProperties;
                let userId = proxy.$storage.getUserInfo('userId');
                let options = proxy.$storage.getAll();
                let webdavConfig = this.getUserInfo('webdavConfig');

                if(options.QuickReply && options.QuickReply.length > 10){
                    proxy.$message.error('回复列表超出数量限制：10 条');
                    return false;
                }

                let encryptedOptions = proxy.$tools.encodeStr(JSON.stringify(options));

                if (webdavConfig && webdavConfig.enabled) {
                    try {
                        if (await this.uploadToWebDAV({options: encryptedOptions}, 'quickreply_all.json')) {
                            proxy.$message.success('WebDAV 备份成功');
                            return true;
                        }
                    } catch (error) {
                        proxy.$message.error(error.message || 'WebDAV 备份失败');
                        return false;
                    }
                }

                if(!userId) {
                    proxy.$message.error('请先登录');
                    return false;
                }
                proxy.$api.upUserAll({
                    userId: userId,
                    options: options
                }).then(res => {
                    proxy.$message.success('备份成功');
                }).catch(err => {
                    proxy.$message.error(err.message);
                });
            },
            async downloadAll() {
                let proxy = app.config.globalProperties;
                let userId = proxy.$storage.getUserInfo('userId');
                let webdavConfig = this.getUserInfo('webdavConfig');

                if (webdavConfig && webdavConfig.enabled) {
                    const data = await this.downloadFromWebDAV('quickreply_all.json');
                    if (data && data.options) {
                        const decryptedOptions = JSON.parse(proxy.$tools.decodeStr(data.options));
                        proxy.$storage.setAll(decryptedOptions);
                        proxy.$message.success('WebDAV 恢复成功');
                        return decryptedOptions;
                    }
                    proxy.$message.error('WebDAV 恢复失败');
                    return false;
                }

                if(!userId) {
                    proxy.$message.error('请先登录');
                    return false;
                }

                let res = await proxy.$api.downUserAll({
                    userId: userId
                })
                if(res.code == 0){
                    proxy.$storage.setAll(res.data);
                    proxy.$message.success('恢复成功');
                    return res.data
                } else {
                    proxy.$message.error(res.message);
                };
            }
        }

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
