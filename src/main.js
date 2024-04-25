import { createApp } from 'vue';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import App from './App.vue';
import Set from './Set.vue';
import AI from './Ai.vue';
import Login from './Login.vue';
import Util from './util'
import Api from './api'

const app = createApp(App);
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.component('app-set-ai', AI);
app.component('app-set', Set);
app.component('app-login', Login);
app.use(ElementPlus)
app.use(Util);
app.use(Api);
app.mount(
    (()=>{
        // discuz
        const $fastposteditor = document.querySelector('#fastposteditor');
        const $postbox = document.querySelector('#postbox');
        const $appRoot = document.createElement('div');
        if ($fastposteditor) {
            $fastposteditor.insertBefore($appRoot, $fastposteditor.childNodes[0]);
        }
        if ($postbox) {
            $appRoot.style.paddingTop = '15px';
            $postbox.insertBefore($appRoot, $postbox.childNodes[4]);
        }
        // nodeseek
        const $editorBody = document.querySelector('.comment-container');
        if ($editorBody) {
            $appRoot.style.padding = '15px 15px 0';
            $editorBody.appendChild($appRoot);
        }
        // Discourse
        const $replyControl = document.querySelector('#reply-control');
        if ($replyControl) {
            $appRoot.style.padding = '15px 15px 0';
            $replyControl.insertBefore($appRoot, $replyControl.childNodes[2]);
        }
        // v2ex.com
        const $replyBox = document.querySelector('#reply-box');
        if ($replyBox) {
            $appRoot.style.padding = '15px 15px 0';
            $replyBox.insertBefore($appRoot, $replyBox.childNodes[2]);
        }
        return $appRoot;
    })()
);
