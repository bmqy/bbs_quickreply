import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import Set from './Set.vue';

const $fastposteditor = document.querySelector('#fastposteditor');
const $app = document.createElement('div');
$app.id = 'app';
$fastposteditor.insertBefore($app, $fastposteditor.childNodes[0]);

Vue.prototype.$app = {
  storageKey: 'QuickReply',
  defaultReply: [
      '感谢楼主分享，支持一下！',
      '支持一下，希望楼主做的更好，加油！',
      '做的不错哦，楼主加油，期待更好的作品！',
      '标记一下，先看看好不好，谢谢楼主咯！'
  ],  
  setStorage(value){
    GM_setValue(this.storageKey, value);
  },
  getStorage(){
    var key = this.storageKey;

    if(GM_getValue(key) && GM_getValue(key).length > 0){
      return GM_getValue(key);        
    }
    //TODO 兼容旧版本key名，待移除
    if(GM_getValue('replysCustom') && GM_getValue('replysCustom').length > 0){
      this.setStorage('');
      return GM_getValue('replysCustom');
    }

    return this.defaultReply;
  },  
  getName: function() {
    return GM_info['script']['name'];
  },
  getNameSpace: function() {
    return GM_info['script']['namespace'];
  },
  getVersion: function() {
    return GM_info['script']['version'];
  },
}

Vue.use(ElementUI);
Vue.component("set", Set);

new Vue({
  el: '#app',
  render: h => h(App)
});