export default {
    install: (app, options) => {
        app.config.globalProperties.$api = {
            // http
            http: function(api, data){
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
            },
            // 获取网友分享的回复
            selectList: async function(skip = 0, prop='replyId', order='descending') {
                return await this.http('/selectList', {
                    skip: skip,
                    prop: prop,
                    order: order
                });
            },
            // 更新收藏数量
            collectCountUpdate: async function(replyId) {
                return await this.http('/collectCountUpdate', {
                    replyId: replyId
                });
            },
            // 更新点赞数量
            likeCountUpdate: async function(replyId) {
                return await this.http('/likeCountUpdate', {
                    replyId: replyId
                });
            },
            // 添加网友分享的回复
            replyInsert: async function(content) {
                return await this.http('/replyInsert', {
                    content: content
                });
            },
        }
    }
}
