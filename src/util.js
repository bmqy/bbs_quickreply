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
