<script setup>
const {proxy} = getCurrentInstance();
const list = ref([]);
const currentReply = ref('');
const currentPlatform = ref('discuz');
const fwin_replyLoaded = ref(false);
const hasEditor = ref(false);
const lastClickElemet = ref(false);
const setShow = ref(false);
onBeforeMount(()=>{
    checkPlatform();
    getList();
});

// 检测平台
function checkPlatform() {
    if(document.body.outerHTML.indexOf('Discuz') > -1){
        currentPlatform.value = 'discuz'
    } else {
        if(location.host.indexOf('nodeseek') > -1){
            currentPlatform.value = 'nodeseek'
        }
    }
};
// 获取APP自定义回复
async function getList() {
    let myListStorage = proxy.$storage.get();
    list.value = myListStorage && myListStorage.length > 0 ? myListStorage : [];
    currentReply.value = '';
};
// 打开APP设置面板
function openSet() {
    setShow.value = !setShow.value;
};
// 监听更新自定义回复
function updateMyList() {
    let myListStorage = proxy.$storage.get();
    list.value = myListStorage;
};
// 设置回复内容
function enterReply() {
    if (fwin_replyLoaded.value) {
        enterPostReply();
    } else if (hasEditor.value) {
        enterEditorReply();
    } else if(currentPlatform.value == 'nodeseek') {
        enterMarkdownItReply();
    } else {
        enterFastPostReply();
    }
};
// 设置楼层/右下角快速回复框内容
function enterPostReply() {
    let $postmessage = document.querySelector('#postmessage');
    $postmessage.value = currentReply.value;
};
// 设置markdown-it编辑器内容
function enterMarkdownItReply() {
    unsafeWindow.editor && unsafeWindow.editor.setMarkdown && unsafeWindow.editor.setMarkdown(currentReply.value)
};
// 设置快速回复框内容
function enterFastPostReply() {
    try {
        let $fastpostmessage = document.querySelector(
            '#fastpostmessage'
        );
        $fastpostmessage.style.background = '';
        $fastpostmessage.value = currentReply.value;
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
}

const title = computed(()=> {
    return `${proxy.$app.getName()}`;
})
const tips = computed(()=> {
    return `${proxy.$app.getName()}设置`;
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
// 监听自定义回复变化
watch(currentReply, (n)=> {
    n && enterReply();
})
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
					<el-button
						type="primary"
						class="btnQuickReplySet"
						icon="tools"
						@click="openSet"
						:title="tips"
					></el-button>
				</el-form-item>
			</el-form>
		</transition>

		<el-dialog
			v-model="setShow"
			:title="$app.getName()"
            width="75%"
			:show-close="true"
			append-to-body
		>
            <template #default>
                <app-set @updateMyList="updateMyList" />
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
    margin-right: 0;
}

:global(.el-dialog__body) {
    flex: 1;
    overflow: auto;
    padding: 0;
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
