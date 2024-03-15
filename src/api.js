// http
const http = function(api, data){
    return new Promise((resolve, reject) => {
        GM_xmlhttpRequest({
            method: 'POST',
            url: `https://quickreply.lc.bmqy.net/1.1/functions${api}`,
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "X-LC-Id": `JLqezdmWrYQOatywxVKmB9pX-gzGzoHsz`,
                "X-LC-Key": `hemx77fyB2Usg317i2crcuer`
            },
            data: `${JSON.stringify(data)}`,
            responseType: 'json',
            onload: function (xhr) {
                if (xhr.status == 200) {
                    resolve(xhr.response.result);
                } else {
                    reject(xhr.response.result);
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
            selectList: async function(skip = 0, prop='replyId', order='descending') {
                return await http('/selectList', {
                    skip: skip,
                    prop: prop,
                    order: order
                });
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
            // 获取AI回复
            getAIReply: function(title) {
                return new Promise((resolve, reject) => {
                    let proxy = app.config.globalProperties;
                    let useAI = proxy.$storage.getUserInfo('useAI') || '';
                    if(!title){
                        reject('参数无效');
                    };
                    if(useAI == 'gemini'){
                        let geminiApiKey = proxy.$storage.getUserInfo('geminiApiKey') || '';
                        if(!geminiApiKey){
                            reject('无效api key');
                        };
                        let url = `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${geminiApiKey}`
                        let data = {
                            "contents": [
                                {
                                    "parts": [
                                        {
                                        "text": `"请根据帖子标题：${title}，以回帖的语气生成一条15字左右的简短回复"`
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
                        let url = 'https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation'
                        let data = {
                            "model": "qwen-turbo",
                            "parameters": {
                                "result_format": "text"
                            },
                            "input": {
                                "prompt": `"请根据帖子标题：${title}，以回帖的语气生成一条15字左右的简短回复"`
                            }
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
                                let {output, code, message} = xhr.response;
                                if(code){
                                    reject(message);
                                }
                                let result = output.text;
                                result = result.replace(/[\\"]+/g, '');
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
