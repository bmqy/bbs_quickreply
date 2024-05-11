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
            uploadList(){
                let proxy = app.config.globalProperties;
                let userId = proxy.$storage.getUserInfo('userId');
                let myList = proxy.$storage.get() || [];

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
            async downloadList(){
                let proxy = app.config.globalProperties;
                let userId = proxy.$storage.getUserInfo('userId');
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
            uploadAll(){
                let proxy = app.config.globalProperties;
                let userId = proxy.$storage.getUserInfo('userId');
                let options = proxy.$storage.getAll();
                // 验证数据
                if(options.QuickReply && options.QuickReply.length > 10){
                    proxy.$message.error('回复列表超出数量限制：10 条');
                    return false;
                }
                // 数据加密
                options = JSON.stringify(options);
                options = proxy.$tools.encodeStr(options);
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
            async downloadAll(){
                let proxy = app.config.globalProperties;
                let userId = proxy.$storage.getUserInfo('userId');
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
            prompt: '请根据帖子标题：{{title}}，以回帖的语气生成一条15字左右的简短回复'
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
