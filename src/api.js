// http
const http = function(api, data, method){
    method = method ? method.toLowerCase() : 'post';
    return new Promise((resolve, reject) => {
        let url = `https://quickreply.bmqy.net/api${api}`;
        if(method === 'get'){
            url += `?${Object.keys(data).map(key => key + '=' + encodeURIComponent(data[key])).join('&')}`;
        }
        GM_xmlhttpRequest({
            method: method,
            url: url,
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            data: method==='post' ? `${JSON.stringify(data)}` : null,
            responseType: 'json',
            onload: function (xhr) {
                if (xhr.status == 200) {
                    resolve(xhr.response);
                } else {
                    reject(xhr.response);
                }
            },
            onerror: function(xhr){
                reject(xhr.response);
            }
        });


    })
}
export default {
    install: (app, options) => {
        app.config.globalProperties.$api = {
            // 获取网友分享的回复
            selectList: async function(page = 0, prop='replyId', order='descending') {
                return await http('/selectList', {
                    page: page,
                    prop: prop,
                    order: order
                }, 'get');
            },
            // 更新收藏数量
            collectCountUpdate: async function(replyId) {
                return await http('/collectCountUpdate', {
                    replyId: replyId
                });
            },
            // 更新点赞数量
            likeCountUpdate: async function(replyId) {
                return await http('/likeCountUpdate', {
                    replyId: replyId
                });
            },
            // 添加网友分享的回复
            replyInsert: async function(content) {
                return await http('/replyInsert', {
                    content: content
                });
            },
            // 用户注册
            register: async function(params) {
                return await http('/register', params);
            },
            // 用户登录
            login: async function(params) {
                return await http('/login', params);
            },
            // 上传列表
            upQuickReplyList: async function(params) {
                return await http('/uploadList', params);
            },
            // 下载列表
            downQuickReplyList: async function(params) {
                return await http('/downloadList', params);
            },
            // 上传全量备份
            upUserAll: async function(params) {
                return await http('/uploadAll', params);
            },
            // 下载全量备份
            downUserAll: async function(params) {
                return await http('/downloadAll', params);
            },
            // 获取AI回复
            getAIReply: function(title) {
                return new Promise((resolve, reject) => {
                    let proxy = app.config.globalProperties;
                    let useAI = proxy.$storage.getUserInfo('useAI') || '';
                    if(!title){
                        reject('参数无效');
                    };
                    let systemRole = proxy.$app.systemRole;
                    let systemRoleCustom = proxy.$storage.getUserInfo('systemRoleCustom') || '';
                    let useSystemRoleCustom = proxy.$storage.getUserInfo('useSystemRoleCustom') || false;
                    if(useSystemRoleCustom && systemRoleCustom){
                        systemRole = systemRoleCustom;
                    }
                    let prompt = proxy.$app.prompt;
                    let promptCustom = proxy.$storage.getUserInfo('promptCustom') || '';
                    let usePromptCustom = proxy.$storage.getUserInfo('usePromptCustom') || false;
                    if(usePromptCustom && promptCustom){
                        prompt = promptCustom;
                    }
                    prompt = prompt.replace('{{title}}', title);
                    if(useAI == 'gemini'){
                        let geminiApiKey = proxy.$storage.getUserInfo('geminiApiKey') || '';
                        if(!geminiApiKey){
                            reject('无效api key');
                        };
                        let url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${geminiApiKey}`
                        let data = {
                            "system_instruction": {
                                "parts": {
                                    "text": systemRole
                                }
                            },
                            "contents": [
                                {
                                    "parts": [
                                        {
                                        "text": prompt
                                        }
                                    ]
                                }
                            ]
                        }
                        GM_xmlhttpRequest({
                            method: 'POST',
                            url: url,
                            headers: {
                                "Content-Type": "application/json; charset=utf-8",
                                "User-Agent": `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36`
                            },
                            data: `${JSON.stringify(data)}`,
                            responseType: 'json',
                            onload: function (xhr) {
                                let {error, candidates} = xhr.response;
                                if(error){
                                    reject(error.message);
                                }
                                resolve(candidates[0].content.parts[0].text)
                            },
                            onerror: function(xhr){
                                reject(xhr.response);
                            }
                        });
                    } else if(useAI == 'qianwen'){
                        let qianwenApiKey = proxy.$storage.getUserInfo('qianwenApiKey') || '';
                        if(!qianwenApiKey){
                            reject('无效api key');
                        };
                        let url = 'https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions'
                        let data = {
                            "model": "qwen-turbo",
                            "messages": [
                                {
                                    "role": "system",
                                    "content": systemRole
                                },
                                {
                                    "role": "user",
                                    "content": prompt
                                }
                            ]
                        }
                        GM_xmlhttpRequest({
                            method: 'POST',
                            url: url,
                            headers: {
                                "Content-Type": "application/json; charset=utf-8",
                                "User-Agent": `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36`,
                                "Authorization": `Bearer ${qianwenApiKey}`,
                            },
                            data: `${JSON.stringify(data)}`,
                            responseType: 'json',
                            onload: function (xhr) {
                                let {choices, error} = xhr.response;
                                if(error){
                                    reject(error.message);
                                }
                                let result = choices[0].message.content;
                                resolve(result)
                            },
                            onerror: function(xhr){
                                reject(xhr.response);
                            }
                        });
                    } else if(useAI == 'kimi'){
                        let kimiApiKey = proxy.$storage.getUserInfo('kimiApiKey') || '';
                        if(!kimiApiKey){
                            reject('无效api key');
                        };
                        let url = 'https://api.moonshot.cn/v1/chat/completions'
                        let data = {
                            "model": "moonshot-v1-8k",
                            "messages": [
                                {
                                    role: "system",
                                    content: systemRole
                                },
                                {
                                    "role": "user",
                                    "content": prompt
                                }
                            ]
                        }
                        GM_xmlhttpRequest({
                            method: 'POST',
                            url: url,
                            headers: {
                                "Content-Type": "application/json; charset=utf-8",
                                "User-Agent": `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36`,
                                "Authorization": `Bearer ${kimiApiKey}`,
                            },
                            data: `${JSON.stringify(data)}`,
                            responseType: 'json',
                            onload: function (xhr) {
                                let {choices, error} = xhr.response;
                                if(error){
                                    reject(error.message);
                                }
                                let result = choices[0].message.content;
                                resolve(result)
                            },
                            onerror: function(xhr){
                                reject(xhr.response);
                            }
                        });
                    } else if(useAI == 'chatgpt'){
                        let chatgptDomain = proxy.$storage.getUserInfo('chatgptDomain') || 'api.openai.com';
                        let chatgptModel = proxy.$storage.getUserInfo('chatgptModel') || 'gpt-3.5-turbo';
                        let chatgptApiKey = proxy.$storage.getUserInfo('chatgptApiKey') || '';
                        if(!chatgptDomain){
                            reject('无效地址');
                        };
                        let url = `https://${chatgptDomain}/v1/chat/completions`
                        let data = {
                            "model": `${chatgptModel}`,
                            "messages": [
                                {
                                    role: "system",
                                    content: systemRole
                                },
                                {
                                    "role": "user",
                                    "content": prompt
                                }
                            ],
                            "stream": false
                        }
                        let headers = {
                            "Content-Type": "application/json; charset=utf-8",
                            "User-Agent": `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36`,
                        }
                        if(chatgptApiKey){
                            headers['Authorization'] = `Bearer ${chatgptApiKey}`;
                        }
                        GM_xmlhttpRequest({
                            method: 'POST',
                            url: url,
                            headers: headers,
                            data: `${JSON.stringify(data)}`,
                            responseType: 'json',
                            onload: function (xhr) {
                                let {choices, error} = xhr.response;
                                if(error){
                                    reject(error.message);
                                }
                                let result = choices[0].message.content;
                                resolve(result)
                            },
                            onerror: function(xhr){
                                reject(xhr.response);
                            }
                        });
                    } else if(useAI == 'deepseek'){
                        let deepseekDomain = proxy.$storage.getUserInfo('deepseekDomain') || 'api.deepseek.com';
                        let deepseekModel = proxy.$storage.getUserInfo('deepseekModel') || 'deepseek-chat';
                        let deepseekApiKey = proxy.$storage.getUserInfo('deepseekApiKey') || '';
                        if(!deepseekDomain){
                            reject('无效地址');
                        };
                        let url = `https://${deepseekDomain}/chat/completions`
                        let data = {
                            "model": `${deepseekModel}`,
                            "messages": [
                                {
                                    role: "system",
                                    content: systemRole
                                },
                                {
                                    "role": "user",
                                    "content": prompt
                                }
                            ],
                            "stream": false
                        }
                        let headers = {
                            "Content-Type": "application/json; charset=utf-8",
                            "User-Agent": `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36`,
                        }
                        if(deepseekApiKey){
                            headers['Authorization'] = `Bearer ${deepseekApiKey}`;
                        }
                        GM_xmlhttpRequest({
                            method: 'POST',
                            url: url,
                            headers: headers,
                            data: `${JSON.stringify(data)}`,
                            responseType: 'json',
                            onload: function (xhr) {
                                let {choices, error} = xhr.response;
                                if(error){
                                    reject(error.message);
                                }
                                let result = choices[0].message.content;
                                resolve(result)
                            },
                            onerror: function(xhr){
                                reject(xhr.response);
                            }
                        });
                    } else if(useAI == 'grok'){
                        let grokDomain = proxy.$storage.getUserInfo('grokDomain') || 'api.x.ai';
                        let grokModel = proxy.$storage.getUserInfo('grokModel') || 'grok-3-mini-beta';
                        let grokApiKey = proxy.$storage.getUserInfo('grokApiKey') || '';
                        if(!grokDomain){
                            reject('无效地址');
                        };
                        let url = `https://${grokDomain}/v1/chat/completions`
                        let data = {
                            "model": `${grokModel}`,
                            "messages": [
                                {
                                    role: "system",
                                    content: systemRole
                                },
                                {
                                    "role": "user",
                                    "content": prompt
                                }
                            ],
                            "stream": false
                        }
                        let headers = {
                            "Content-Type": "application/json; charset=utf-8",
                            "User-Agent": `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36`,
                        }
                        if(grokApiKey){
                            headers['Authorization'] = `Bearer ${grokApiKey}`;
                        }
                        GM_xmlhttpRequest({
                            method: 'POST',
                            url: url,
                            headers: headers,
                            data: `${JSON.stringify(data)}`,
                            responseType: 'json',
                            onload: function (xhr) {
                                let {choices, error} = xhr.response;
                                if(error){
                                    reject(error.message);
                                }
                                let result = choices[0].message.content;
                                resolve(result)
                            },
                            onerror: function(xhr){
                                reject(xhr.response);
                            }
                        });
                    } else {
                        reject('暂未配置AI');
                    }
                });
            },
        }
    }
}
