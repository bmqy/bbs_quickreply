import { createApp } from 'vue';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import App from './App.vue';
import Set from './Set.vue';
import Login from './Login.vue';
import Storage from './util'
import Api from './api'

const app = createApp(App);
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.component('app-set', Set);
app.component('app-login', Login);
app.use(ElementPlus)
app.use(Storage);
app.use(Api);
app.mount(
    (()=>{
        const $fastposteditor = document.querySelector('#fastposteditor');
        const $postbox = document.querySelector('#postbox');
        const $appRoot = document.createElement('div');
        if ($fastposteditor) {
            $fastposteditor.insertBefore($appRoot, $fastposteditor.childNodes[0]);
        }
        if ($postbox) {
            $postbox.insertBefore($appRoot, $postbox.childNodes[4]);
        }
        return $appRoot;
    })()
);
