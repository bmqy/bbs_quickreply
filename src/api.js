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
        }
    }
}
