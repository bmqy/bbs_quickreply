<script setup>
import { StarFilled } from '@element-plus/icons-vue';
const {proxy} = getCurrentInstance();
const list = ref([]);
const currentReply = ref('');
const currentPlatform = ref('discuz');
const fwin_replyLoaded = ref(false);
const submitNow = ref(false);
const hasEditor = ref(false);
const lastClickElement = ref(false);
const setShow = ref(false);
const useAI = ref('');
const loadingAIReply = ref(false);
const aiNameList = ref({
    gemini: 'Gemini',
    qianwen: '通义千问',
    kimi: 'Kimi',
    chatgpt: 'ChatGPT',
    deepseek: 'DeepSeek',
    grok: 'Grok',
});
const constVar = ref({
    email: '',
    qq: '',
    wechat: '',
    url: '',
    base64: false,
});
onBeforeMount(()=>{
    checkPlatform();
    getList();
    submitNow.value = proxy.$storage.getUserInfo('submitNow') || false;
    useAI.value = proxy.$storage.getUserInfo('useAI') || '';
    updateConstVar();
    updateAIModel();
    
    // 监听数据恢复事件
    proxy.$on('dataRestored', handleDataRestored);
});

// 处理数据恢复事件
function handleDataRestored(data) {
    console.log('App组件接收到数据恢复事件', data);
    
    // 更新所有数据
    if (data) {
        // 更新快捷回复列表
        if (data.QuickReply) {
            list.value = data.QuickReply;
            console.log('已更新快捷回复列表', list.value);
        }
        
        // 更新用户设置
        const userStorageKey = proxy.$storage.userStorageKey;
        const submitNowKey = `${userStorageKey}.submitNow`;
        const useAIKey = `${userStorageKey}.useAI`;
        const constVarKey = `${userStorageKey}.constVar`;
        
        // 更新提交设置
        if (data[submitNowKey] !== undefined) {
            submitNow.value = data[submitNowKey] || false;
            console.log('已更新提交设置', submitNow.value);
        }
        
        // 更新AI模型设置
        if (data[useAIKey] !== undefined) {
            useAI.value = data[useAIKey] || '';
            updateAIModel();
            console.log('已更新AI模型设置', useAI.value);
        }
        
        // 更新常量设置
        if (data[constVarKey]) {
            constVar.value = data[constVarKey];
            console.log('已更新常量设置', constVar.value);
        }
        
        // 如果选择框有值，需要重新设置回复内容到编辑器中
        if (currentReply.value) {
            enterReply();
            console.log('已更新当前回复内容到编辑器');
        }
    }
}

// 检测平台
function checkPlatform() {
    if(location.host.indexOf('nodeseek') > -1){
        currentPlatform.value = 'nodeseek';
    } else if(location.host.indexOf('v2ex') > -1){
        currentPlatform.value = 'v2ex';
    } else {
        let $generator = document.head.querySelector("meta[name=generator]");
        if($generator){
            if($generator.content.indexOf('Discuz') > -1){
                currentPlatform.value = 'discuz';
            } else if($generator.content.indexOf('Discourse') > -1){
                currentPlatform.value = 'discourse';
            }
        } else{
            let $html = document.body.innerHTML;
            if($html.indexOf('flarum-loading') > -1){
                currentPlatform.value = 'flarum';
            }
        }
    }
};
// 获取APP自定义回复
async function getList() {
    let myListStorage = proxy.$storage.get();
    const oldListEmpty = list.value.length === 0;
    list.value = myListStorage && myListStorage.length > 0 ? myListStorage : [];
    
    // 如果从空列表变为有数据，或者当前已选择了回复内容，更新编辑器
    if ((oldListEmpty && list.value.length > 0) || currentReply.value) {
        // 当列表变化时，如果当前选中的回复在新列表中不存在，清空它
        if (currentReply.value && !list.value.includes(currentReply.value)) {
            currentReply.value = '';
        }
        
        // 如果当前有选中回复，则重新应用到编辑器
        if (currentReply.value) {
            enterReply();
        }
    }
};
// 打开APP设置面板
function openSet() {
    setShow.value = true;
};
// 关闭APP设置面板
function closeSet() {
    setShow.value = false;
};
// 更新AI模型
function updateAIModel(){
    useAI.value = proxy.$storage.getUserInfo('useAI') || '';
    if(useAI.value){
        let aiModel = proxy.$storage.getUserInfo(`${useAI.value}Model`);
        aiNameList.value[useAI.value] = `${useAI.value} (${aiModel})`;
    }
}
// 更新常量
function updateConstVar(){
    constVar.value = proxy.$storage.getUserInfo('constVar') || constVar.value;
}
// 监听更新自定义回复
function updateMyList(data) {
    let myListStorage = data || [];
    list.value = myListStorage;
};
// 获取AI回复
async function getAIReply(){
    let title = ''
    if(loadingAIReply.value) return false;
    loadingAIReply.value = true;
    if(currentPlatform.value == 'discuz'){
        title = document.querySelector('#thread_subject').innerText
    } else if(currentPlatform.value == 'discourse'){
        if(document.querySelector('#topic-title h1>a')){
            title = document.querySelector('#topic-title h1>a').innerText
        } else {
            title = document.querySelector('h1.header-title a').innerText
        }
    } else if(currentPlatform.value == 'nodeseek'){
        title = document.querySelector('h1>a.post-title-link').innerText
    } else if(currentPlatform.value == 'v2ex'){
        title = document.querySelector('#Main .header>h1').innerText
    }
    if(!title){
        proxy.$message.error('无法获取帖子标题，请检查脚本是否支持此论坛')
        return false;
    }
    await proxy.$api.getAIReply(title).then((res) => {
        currentReply.value = res;
        enterReply()
    }).catch(err=>{
        proxy.$message.error(err)
    }).finally(()=>{
        loadingAIReply.value = false;
    })
}
// 设置楼层/右下角快速回复框内容
function enterPostReply() {
    let $postmessage = document.querySelector('#postmessage');
    $postmessage.value = currentReply.value;
};
// 设置高级回复框内容
function enterEditorReply() {
    let $editorTextarea = document.querySelector('#e_textarea');
    let $editorIframe = document.querySelector('#e_iframe')
        .contentWindow.document.body;
    $editorIframe.style.background = '';
    $editorIframe.innerHTML = currentReply.value || window.bbcode2html(`${$editorTextarea.value}`);
};
// 点击楼层回复
function fastreBindClick() {
    document.querySelector('body').addEventListener(
        'click',
        (e) => {
            let theElement = `fastre&${e.target.href}`;
            if (
                lastClickElement.value != theElement &&
                e.target.className == 'fastre'
            ) {
                lastClickElement.value = theElement;
                fwin_replyLoaded.value = false;
            }
        },
        true
    );
};
// 点击右下角快速回复按钮
function replyfastBindClick() {
    document.querySelector('body').addEventListener(
        'click',
        (e) => {
            let theElement = `replyfast&${e.target.href}`;
            if (
                lastClickElement.value != theElement &&
                e.target.className == 'replyfast'
            ) {
                lastClickElement.value = theElement;
                fwin_replyLoaded.value = false;
            }
        },
        true
    );
};
// 点击楼层/右下角快速回复面板关闭按钮
function flbcBindClick() {
    document.querySelector('body').addEventListener(
        'click',
        (e) => {
            let theElement = `flbc&${e.target.href}`;
            if (
                lastClickElement.value != theElement &&
                e.target.className == 'flbc'
            ) {
                lastClickElement.value = theElement;
                fwin_replyLoaded.value = false;
            }
        },
        true
    );
};
// 检测是否是高级回复
function checkEditor() {
    hasEditor.value = document.querySelector('#e_iframe');
}
// discuz：监听楼层回复面板加载完成
function postReplyMutationObserver() {
    let mos = new MutationObserver(function(mutations, observer) {
        for (const mutation in mutations) {
            if (Object.hasOwnProperty.call(mutations, mutation)) {
                const element = mutations[mutation];
                if (element.target.id == 'subjecthide') {
                    fwin_replyLoaded.value = true;
                }
            }
        }
    });
    if(document.querySelector('#append_parent')){
        mos.observe(document.querySelector('#append_parent'), {
            attributes: true,
            childList: true,
            subtree: true,
        });
    }
}

// 设置回复内容
function enterReply() {
    currentReply.value = currentReply.value.replace('{email}', constVar.value.base64 ? proxy.$tools.encodeStr(constVar.value.email) : constVar.value.email)
    currentReply.value = currentReply.value.replace('{qq}', constVar.value.base64 ? proxy.$tools.encodeStr(constVar.value.qq) : constVar.value.qq)
    currentReply.value = currentReply.value.replace('{wechat}', constVar.value.base64 ? proxy.$tools.encodeStr(constVar.value.wechat) : constVar.value.wechat)
    currentReply.value = currentReply.value.replace('{url}', constVar.value.base64 ? proxy.$tools.encodeStr(constVar.value.url) : constVar.value.url)
    if (fwin_replyLoaded.value) {
        enterPostReply();
    } else if (hasEditor.value) {
        enterEditorReply();
    } else if(currentPlatform.value == 'nodeseek') {
        enterMarkdownItReply();
    } else if(currentPlatform.value == 'discourse') {
        enterDiscourseEmberReply();
    } else if(currentPlatform.value == 'v2ex') {
        enterReplyContentReply();
    } else if(currentPlatform.value == 'flarum') {
        enterFlarumTextEditorReply();
    }  else {
        enterFastPostReply();
    }
};
// NodeSeek：设置markdown-it编辑器内容
function enterMarkdownItReply() {
    unsafeWindow.editor && unsafeWindow.editor.setMarkdown && unsafeWindow.editor.setMarkdown(currentReply.value)
    if(submitNow.value && !useAI.value && currentReply.value){
        document.querySelector('.md-editor button.submit').click()
    }
};
// Discourse：设置Discourse编辑器内容
function enterDiscourseEmberReply() {
    let $emberTextarea = document.querySelector('textarea.ember-text-area.d-editor-input');
    if($emberTextarea){
        $emberTextarea.value = currentReply.value;
        $emberTextarea.dispatchEvent(new Event('change'));
    }
    if(submitNow.value && !useAI.value && currentReply.value){
        document.querySelector('.submit-panel button.btn.create').click();
        currentReply.value = '';
    }
};
// v2ex：设置编辑器内容
function enterReplyContentReply() {
    let $replyContent = document.querySelector('textarea#reply_content');
    if($replyContent){
        $replyContent.value = currentReply.value;
    }
    if(submitNow.value && !useAI.value && currentReply.value){
        document.querySelector('#reply-box input[type="submit"]').click();
        currentReply.value = '';
    }
};
// Flarum：设置Flarum编辑器内容
function enterFlarumTextEditorReply() {
    let $textEditor = document.querySelector('textarea.FormControl.TextEditor-editor');
    if($textEditor){
        $textEditor.value = currentReply.value;
        $textEditor.dispatchEvent(new Event('change'));
    }
    if(submitNow.value && !useAI.value && currentReply.value){
        document.querySelector('.item-submit button.Button').click();
        currentReply.value = '';
    }
};
// 设置快速回复框内容
function enterFastPostReply() {
    try {
        let $fastpostmessage = document.querySelector(
            '#fastpostmessage'
        );
        $fastpostmessage.style.background = '';
        $fastpostmessage.value = currentReply.value;

        if(submitNow.value && !useAI.value && currentReply.value){
            document.querySelector('button#fastpostsubmit').click();
        }
    } catch (err) {
        console.log('请检查发帖权限！');
    }
}

const title = computed(()=> {
    return `${proxy.$app.getName()}`;
})
const tips = computed(()=> {
    return `${proxy.$app.getName()}，控制面板：
- 分享、收藏更多精彩回帖；
- 登录账号（登录后可打开脚本菜单同步你的回帖，在任何设备上恢复并使用）；
- AI及更多功能，请点击设置图标开启或关闭；`;
})
onMounted(()=> {
    checkEditor();
    postReplyMutationObserver();
    enterReply();
    fastreBindClick();
    replyfastBindClick();
    flbcBindClick();
});
watch(fwin_replyLoaded, (n)=>{
    // 监听楼层回复面板显示状态
    if (n) {
        let $floatlayout_reply = document.querySelector(
            '#floatlayout_reply'
        );
        $floatlayout_reply.insertBefore(
            proxy.$el,
            $floatlayout_reply.childNodes[0]
        );
        enterPostReply();
    } else {
        let $fastposteditor = document.querySelector(
            '#fastposteditor'
        );
        $fastposteditor.insertBefore(
            proxy.$el,
            $fastposteditor.childNodes[0]
        );
    }
});
</script>

<template>
	<div class="quickReplyBox">
		<transition name="el-fade-in-linear">
			<el-form :inline="true" class="reply-form-inline">
				<el-form-item>
					<div slot="label" class="quickReplyBoxTitle">
						{{ `${title}: ` }}
					</div>
					<el-select
						v-model="currentReply"
						placeholder="请选择"
                        no-data-text="这里啥都没有..."
						@change="enterReply"
					>
						<el-option
							v-for="(item, index) in list"
							:key="index"
							:label="item"
							:value="item"
						></el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
                    <el-button-group>
                        <el-button
                            type="primary"
                            class="btnQuickReplySet"
                            icon="tools"
                            @click="openSet"
                            :title="tips"
                        ></el-button>
                        <el-button
                            v-if="useAI != ''"
                            type="success"
                            class="btnQuickReplySet"
                            :loading="loadingAIReply"
                            icon="magicStick"
                            @click="getAIReply"
                            :title="`正在由【${aiNameList[useAI]}】为你提供创意回帖\n\nTips：使用AI就像开盲盒，请准备好是否接受结果再提交`"
                        ></el-button>
                    </el-button-group>
				</el-form-item>
			</el-form>
		</transition>

		<el-dialog
			v-model="setShow"
            @close="closeSet"
			:title="$app.getName()"
            width="96%"
			:show-close="true"
            destroy-on-close
			append-to-body
		>
            <template #default>
                <app-set ref="setPanel" @updateMyList="updateMyList" @updateConstVar="updateConstVar" @updateAIModel="updateAIModel" />
            </template>

            <template #footer>
                <el-link type="info" href="https://github.com/bmqy/bbs_quickreply" title="点个Star，支持下吧" target="_blank">
                    <el-icon><StarFilled /></el-icon> Star
                </el-link>
                <el-divider direction="vertical" />
                <el-link type="info" href="https://github.com/bmqy/bbs_quickreply?tab=readme-ov-file#%E6%9B%B4%E6%96%B0%E6%97%A5%E5%BF%97" title="更新日志" target="_blank">{{ `ver: ${$app.getVersion()}` }}</el-link>
            </template>
        </el-dialog>
    </div>
</template>

<style scoped lang="scss">
.quickReplyBox {
    position: relative;
    .el-form{
        text-align: left;
    }
    .reply-form-inline .el-form-item{
        margin-bottom: 15px;
    }
    :global(.el-dialog__footer a){
        text-decoration: none;
    }
    :global(.el-tabs__nav-next),
    :global(.el-tabs__nav-prev) {
        height: 44px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
}


:global(.el-dialog) {
    display: flex;
    flex-direction: column;
    margin: 0 !important;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-height: calc(100% - 30px);
    max-width: 1300px;
}

:global(.el-dialog__header) {
    margin-right: 0 !important;
}

:global(.el-dialog__body) {
    flex: 1;
    overflow: auto;
    padding: 0;
}

:global(.quickReplyBox .el-input__inner) {
    margin-bottom: 0;
    background-color: transparent;
    border: 0;
    outline: none;
}

:global(#reply-control.open) {
    height: calc(var(--composer-height) + 65px) !important;
}
:global(#reply-control .reply-area) {
    height: calc(100% - 11px - 80px) !important;
}

.app-dialog-foot {
    color: #909399;
    font-size: 14px;
}

.quickReplyBoxTitle {
    margin-right: 10px;
    font-weight: bold;
    color: red;
}

.el-form-item--mini.el-form-item,
.el-form-item--small.el-form-item {
    margin-bottom: 10px;
}

.el-select {
    width: 300px;
}
</style>
