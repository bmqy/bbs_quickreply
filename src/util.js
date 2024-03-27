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
            if (GM_getValue(this.key) && GM_getValue(this.key).length > 0) {
                return GM_getValue(this.key);
            } else {
                return []
            }
        },
        setUserInfo(key, value){
            let fullKey = `${this.userStorageKey}.${key}`;
            GM_setValue(fullKey, value);
        },
        getUserInfo(key){
            let fullKey = `${this.userStorageKey}.${key}`;
            if (GM_getValue(fullKey) !== '') {
                return GM_getValue(fullKey);
            } else {
                return '';
            }
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
                proxy.$message.success(res.memo);
            }).catch(err=>{
                proxy.$message.error(err.memo);
            });
        },
        async downloadList(callback){
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
                proxy.$storage.set(res.data);
                proxy.$message.success('下载成功');
                callback && callback(res.data);
                return res.data
            } else {
                proxy.$message.error(err.memo);
            };
        }
    }

    // 全局油猴菜单
    app.config.globalProperties.$gmMenus = {
        init(){
            let proxy = app.config.globalProperties;
            // 上传本地列表
            GM_registerMenuCommand("- ⬆️上传列表", function() {
                proxy.$storage.uploadList();
            }, {
                id: 'uploadList',
                autoClose: true,
                title: '点此上传将覆盖云端已存储数据'
            });
            // 下载列表
            GM_registerMenuCommand("- ⬇️下载列表", function() {
                proxy.$storage.downloadList();
            }, {
                id: 'downloadList',
                autoClose: true,
                title: '点此下载将覆盖本地已存储数据'
            });
            // 回帖刷新
            proxy.$gmMenus.changeSubmitNowMenu(proxy.$storage.getUserInfo('submitNow'));
            // 实时同步
            proxy.$gmMenus.changeRealtimeMenu(proxy.$storage.getUserInfo('realtimeSync'));
            // 人工智能
            proxy.$gmMenus.changeAIMenu(proxy.$storage.getUserInfo('AI'));
            // 设置
            proxy.$gmMenus.changeSettingMenu();
        },
        changeDownloadListMenu(callback){
            let proxy = app.config.globalProperties;
            if(arguments.length == 1){
                GM_registerMenuCommand("- ⬇️下载列表", function() {
                    proxy.$storage.downloadList(callback);
                }, {
                    id: 'downloadList',
                    autoClose: true,
                    title: '点此下载将覆盖本地已存储数据'
                });
            } else {
                GM_registerMenuCommand("- ⬇️下载列表", function() {
                    proxy.$storage.downloadList();
                }, {
                    id: 'downloadList',
                    autoClose: true,
                    title: '点此下载将覆盖本地已存储数据'
                });
            }
        },
        changeSubmitNowMenu(status, callback){
            let proxy = app.config.globalProperties;
            if(arguments.length == 2){
                GM_registerMenuCommand(`- 🎯立即提交：${status ? '已启用' : '已停用'}`, callback, {
                    id: 'submitNow',
                    autoClose: true,
                    title: '开启后，选择快捷回帖内容后立即提交回帖'
                })
            } else {
                status = proxy.$storage.getUserInfo('submitNow') || false;
                GM_registerMenuCommand(`- 🎯立即提交：${status ? '已启用' : '已停用'}`, function() {
                    proxy.$storage.setUserInfo('submitNow', !status);
                    proxy.$gmMenus.changeSubmitNowMenu(!status);
                }, {
                    id: 'submitNow',
                    autoClose: true,
                    title: '开启后，选择快捷回帖内容后立即提交回帖'
                })
            }
        },
        changeRealtimeMenu(status, callback){
            let proxy = app.config.globalProperties;
            if(arguments.length == 2){
                GM_registerMenuCommand(`- ⏱️实时同步：${status ? '已启用' : '已停用'}`, callback, {
                    id: 'realtimeSync',
                    autoClose: true,
                    title: '开启后，本地列表修改后立即同步到云端存储'
                })
            } else {
                status = proxy.$storage.getUserInfo('realtimeSync') || false;
                GM_registerMenuCommand(`- ⏱️实时同步：${status ? '已启用' : '已停用'}`, function() {
                    proxy.$storage.setUserInfo('realtimeSync', !status);
                    proxy.$gmMenus.changeRealtimeMenu(!status);
                }, {
                    id: 'realtimeSync',
                    autoClose: true,
                    title: '开启后，本地列表修改后立即同步到云端存储'
                })
            }
        },
        changeAIMenu(callback){
            let proxy = app.config.globalProperties;
            let useAI = proxy.$storage.getUserInfo('useAI') || '';
            GM_registerMenuCommand(`- 🤖人工智能：${useAI ? '已启用' : '已停用'}`, callback, {
                id: 'AI',
                autoClose: true,
                title: '开启后，使用人工智能(AI)生成回复内容'
            })
        },
        changeSettingMenu(status, callback){
            let proxy = app.config.globalProperties;
            let isUserId = proxy.$storage.getUserInfo('userId');
            if(arguments.length == 2){
                GM_registerMenuCommand(`- ⚙️设置面板：${isUserId ? '已登录' : '未登录'}`, callback, {
                    id: 'setting',
                    autoClose: true,
                    title: '打开/关闭设置面板'
                });
            } else {
                GM_registerMenuCommand(`- ⚙️设置面板：${isUserId ? '已登录' : '未登录'}`, null, {
                    id: 'setting',
                    autoClose: true,
                    title: '打开/关闭设置面板'
                });
            }
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
    }
  }
}
