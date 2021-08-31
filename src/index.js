import App from './App.vue';
import Set from './Set.vue';
import * as Api from './api.js'

const $fastposteditor = document.querySelector('#fastposteditor');
const $postbox = document.querySelector('#postbox');
const $appRoot = document.createElement('div');

$appRoot.id = 'app';
if($fastposteditor){  
  $fastposteditor.insertBefore($appRoot, $fastposteditor.childNodes[0]);
}
if($postbox){  
  $postbox.insertBefore($appRoot, $postbox.childNodes[4]);
}

Vue.prototype.$api = Api

Vue.prototype.$app = {
  storageKey: 'QuickReply',
  myList: [],  
  
  setStorage(value){
    if(chrome){
      let key = this.storageKey;
      chrome.storage.sync.set({[key]: value}, function() {});
    } else {
      GM_setValue(key, value);
    }    
  },
  async getStorage(){
    var key = this.storageKey;

    if(chrome){
      return new Promise((resolve, reject)=>{
        chrome.storage.sync.get([key], function(result) {
          resolve(result[key]);
        });
      });
      
    } else {
      if(GM_getValue(key) && GM_getValue(key).length > 0){
        resolve(GM_getValue(key));        
      }
      //TODO 兼容旧版本key名，待移除
      if(GM_getValue('replysCustom') && GM_getValue('replysCustom').length > 0){
        this.setStorage('');
        resolve(GM_getValue('replysCustom'));
      }
    }

    resolve([]);
  },  
  getName: function() {
    return (chrome) ? chrome.runtime.getManifest().name : GM_info['script']['name'];
  },
  getVersion: function() {
    return (chrome) ? chrome.runtime.getManifest().version : GM_info['script']['version'];
  },
}

Vue.component("set", Set);

new Vue({
  el: '#app',
  render: h => h(App)
});