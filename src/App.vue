<script setup>
const {proxy} = getCurrentInstance();
const list = ref([]);
const currentReply = ref('');
const currentPlatform = ref('discuz');
const fwin_replyLoaded = ref(false);
const submitNow = ref(false);
const hasEditor = ref(false);
const lastClickElemet = ref(false);
const setShow = ref(false);
const setAIShow = ref(false);
const useAI = ref('');
const loadingAIReply = ref(false);
const aiNameList = ref({
    gemini: 'Gemini Pro',
    qianwen: '通义千问-turbo',
    kimi: 'Kimi'
});
onBeforeMount(()=>{
    checkPlatform();
    getList();
    proxy.$gmMenus.init();
    submitNow.value = proxy.$storage.getUserInfo('submitNow') || false;
    useAI.value = proxy.$storage.getUserInfo('useAI') || '';
    changeSubmitNow(submitNow.value);
    proxy.$gmMenus.changeDownloadListMenu(function(data){
        updateMyList(data);
    });
    proxy.$gmMenus.changeSettingMenu(setShow.value, function(){
        setShow.value ? closeSet() : openSet();
    });
    proxy.$gmMenus.changeAIMenu(function(){
        setAIShow.value ? closeSetAI() : openSetAI();
    });
});

// 检测平台
function checkPlatform() {
    if(document.documentElement.innerHTML.indexOf('Discuz') > -1){
        currentPlatform.value = 'discuz'
    } else if(document.documentElement.innerHTML.indexOf('Discourse') > -1){
        currentPlatform.value = 'discourse'
    } else {
        if(location.host.indexOf('nodeseek') > -1){
            currentPlatform.value = 'nodeseek'
        }
    }
};
// 获取立即回帖配置
function changeSubmitNow(e) {
    let checked = proxy.$storage.getUserInfo('submitNow') || false
    if(arguments.length == 1){
        checked = e
    } else {
        submitNow.value = !checked
        checked = !checked
        proxy.$storage.setUserInfo('submitNow', checked)
    }
    proxy.$gmMenus.changeSubmitNowMenu(checked, ()=>{
        changeSubmitNow()
    });
};
// 获取APP自定义回复
async function getList() {
    let myListStorage = proxy.$storage.get();
    list.value = myListStorage && myListStorage.length > 0 ? myListStorage : [];
    currentReply.value = '';
};
// 打开APP设置面板
function openSet() {
    setShow.value = true;
    // 更新设置菜单
    proxy.$gmMenus.changeSettingMenu(true, function(){
        closeSet();
    });
};
// 关闭APP设置面板
function closeSet() {
    setShow.value = false;
    // 更新设置菜单
    proxy.$gmMenus.changeSettingMenu(false, function(){
        openSet();
    });
};
// 打开AI设置面板
function openSetAI() {
    // 更新AI设置菜单
    setAIShow.value = true;
    proxy.$gmMenus.changeAIMenu(function(){
        closeSetAI();
    });
};
// 关闭AI设置面板
function closeSetAI() {
    setAIShow.value = false;
    // 更新AI设置菜单
    proxy.$gmMenus.changeAIMenu(function(){
        openSetAI();
    });
};
function updateAI() {
    useAI.value = proxy.$storage.getUserInfo('useAI') || '';
    // 更新AI设置菜单
    proxy.$gmMenus.changeAIMenu(function(){
        closeSetAI();
    });
}

function onLoginSuccess(){
    proxy.$gmMenus.changeSettingMenu(true, function(){
        closeSet();
    });
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
// 设置回复内容
function enterReply() {
    if (fwin_replyLoaded.value) {
        enterPostReply();
    } else if (hasEditor.value) {
        enterEditorReply();
    } else if(currentPlatform.value == 'nodeseek') {
        enterMarkdownItReply();
    } else if(currentPlatform.value == 'discourse') {
        enterDiscourseEmberReply();
    } else {
        enterFastPostReply();
    }
};
// 设置楼层/右下角快速回复框内容
function enterPostReply() {
    let $postmessage = document.querySelector('#postmessage');
    $postmessage.value = currentReply.value;
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
                lastClickElemet.value != theElement &&
                e.target.className == 'fastre'
            ) {
                lastClickElemet.value = theElement;
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
                lastClickElemet.value != theElement &&
                e.target.className == 'replyfast'
            ) {
                lastClickElemet.value = theElement;
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
                lastClickElemet.value != theElement &&
                e.target.className == 'flbc'
            ) {
                lastClickElemet.value = theElement;
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
// 监听楼层回复面板加载完成
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
    // discuz
    if(document.querySelector('#append_parent')){
        mos.observe(document.querySelector('#append_parent'), {
            attributes: true,
            childList: true,
            subtree: true,
        });
    }
    // nodeseek
    if(document.querySelector('.md-editor')){
        mos.observe(document.querySelector('.md-editor'), {
            attributes: true,
            childList: true,
            subtree: true,
        });
    }
    // linux.do
    if(document.querySelector('#main-outlet')){
        mos.observe(document.querySelector('#main-outlet'), {
            attributes: true,
            childList: true,
            subtree: true,
        });
    }
}

const title = computed(()=> {
    return `${proxy.$app.getName()}`;
})
const tips = computed(()=> {
    return `${proxy.$app.getName()}，控制面板：
- 分享、收藏更多精彩回帖；
- 登录账号（登录后可打开脚本菜单同步你的回帖，在任何设备上恢复并使用）；
- AI及更多功能，请点击油猴图标打开脚本菜单开启或关闭；`;
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
			<el-form :inline="true" class="demo-form-inline">
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
            width="75%"
			:show-close="true"
            destroy-on-close
			append-to-body
		>
            <template #default>
                <app-set ref="setPanel" @updateMyList="updateMyList" @onSuccess="onLoginSuccess" />
            </template>

<template #footer>
                <span class="app-dialog-foot">
                    <el-link href="https://github.com/bmqy/bbs_quickreply?tab=readme-ov-file#%E6%9B%B4%E6%96%B0%E6%97%A5%E5%BF%97" title="更新日志" target="_blank">{{ `ver: ${$app.getVersion()}` }}</el-link>
                </span>
            </template>
</el-dialog>

<el-dialog v-model="setAIShow" @close="closeSetAI" :title="$app.getName() +' - AI设置'" width="150" :show-close="true"
    destroy-on-close append-to-body>
    <template #default>
                <app-set-ai ref="setAIPanel" @updateAI="updateAI" />
            </template>

    <template #footer>
				<span class="app-dialog-foot">
                    {{ `ver: ${$app.getVersion()}` }}
				</span>
			</template>
</el-dialog>
</div>
</template>

<style scoped lang="scss">
.quickReplyBox {
    position: relative;
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
    min-width: 1000px;
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
