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

// 添加$app全局变量
app.config.globalProperties.$app = {
    getName() {
        return '论坛快捷回帖 by bmqy';
    },
    getVersion() {
        return '2.3.4';
    },
    systemRole: "你是一个互联网高手，常年混迹于各大论坛，对所有内容都感兴趣，并且热衷于回复每一篇帖子，回复风格：简短、睿智、一语中的，又不失俏皮诙谐",
    prompt: "请根据帖子标题：{{title}}，进行回帖。务必直接给出回帖内容，不要包含其他无关内容",
    isNew(timestamp) {
        if (!timestamp) return false;
        let number = 3600 * 24 * 7;
        return parseInt((new Date()).getTime() / 1000) - timestamp <= number;
    }
};

// 添加$tools全局变量
app.config.globalProperties.$tools = {
    encodeStr(str) {
        let encoder = new TextEncoder();
        str = encoder.encode(str);
        return btoa(String.fromCharCode.apply(null, str));
    },
    decodeStr(str) {
        var byteCharacters = atob(str);
        var byteArray = new Uint8Array(byteCharacters.length);
        for (var i = 0; i < byteCharacters.length; i++) {
            byteArray[i] = byteCharacters.charCodeAt(i);
        }
        var decoder = new TextDecoder();
        return decoder.decode(byteArray);
    }
};

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
