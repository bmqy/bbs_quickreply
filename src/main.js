import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';
import { createApp } from 'vue';
import AI from './Ai.vue';
import Api from './api';
import App from './App.vue';
import Login from './Login.vue';
import Set from './Set.vue';
import './styles/element-plus-override.css';
import Util from './util';

const app = createApp(App);

// 全局注册所有Element Plus图标组件
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
}

app.component('app-set-ai', AI);
app.component('app-set', Set);
app.component('app-login', Login);
app.use(ElementPlus, {
    locale: zhCn,
    size: 'default'
});
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
        // Flarum
        const $composerBox = document.querySelector('#composer');
        if ($composerBox) {
            const $composerInner = $composerBox.querySelector('.Composer');
            $appRoot.style.padding = '15px 15px 0';
            $composerInner.insertBefore($appRoot, $composerInner.childNodes[2]);
        }
        return $appRoot;
    })()
);
