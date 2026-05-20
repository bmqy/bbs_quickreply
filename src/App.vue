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
    
    // 初始化 debug 配置
    proxy.$app.debug = proxy.$storage.getUserInfo('debug') || false;
    
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
    proxy.$tools.log(`[BBS QuickReply] 检测到论坛平台: ${currentPlatform.value}`);
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
// 获取帖子内容
function getPostContent() {
    let content = '';
    const contentLengthLimit = proxy.$storage.getUserInfo('contentLengthLimit') || 500;
    
    if(currentPlatform.value == 'discuz'){
        // Discuz: 获取帖子正文内容
        let $postContent = document.querySelector('#post_content');
        if(!$postContent) {
            $postContent = document.querySelector('.t_fsz');
        }
        if($postContent) {
            content = $postContent.innerText;
        }
    } else if(currentPlatform.value == 'discourse'){
        // Discourse: 获取帖子正文
        let $cooked = document.querySelector('.cooked');
        if(!$cooked) {
            $cooked = document.querySelector('[data-post-id] .post-content');
        }
        if($cooked) {
            content = $cooked.innerText;
        }
    } else if(currentPlatform.value == 'nodeseek'){
        // NodeSeek: 获取帖子内容
        let $postContent = document.querySelector('.post-content');
        if(!$postContent) {
            $postContent = document.querySelector('[data-content]');
        }
        if($postContent) {
            content = $postContent.innerText;
        }
    } else if(currentPlatform.value == 'v2ex'){
        // V2ex: 获取话题内容
        let $topicContent = document.querySelector('.topic_content');
        if(!$topicContent) {
            $topicContent = document.querySelector('#Main .box .cell');
        }
        if($topicContent) {
            content = $topicContent.innerText;
        }
    }
    
    // 清理内容：移除多余空白和换行
    content = content.trim().replace(/\s+/g, ' ');
    
    // 限制内容长度
    if(content.length > contentLengthLimit) {
        content = content.substring(0, contentLengthLimit) + '...';
    }
    
    return content;
}

// 获取AI回复
async function getAIReply(){
    let title = ''
    let content = ''
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
        loadingAIReply.value = false;
        return false;
    }
    
    // 获取帖子内容
    content = getPostContent();
    if(!content){
        proxy.$message.warning('无法获取帖子内容，将仅使用标题生成回复')
    }
    
    // 调试日志
    proxy.$tools.log('[BBS QuickReply - 正在调用AI接口]');
    proxy.$tools.log('帖子标题:', title);
    proxy.$tools.log('帖子正文内容:', content);
    proxy.$tools.log('当前论坛平台:', currentPlatform.value);
    
    await proxy.$api.getAIReply(title, content).then((res) => {
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
    unsafeWindow.codemirrorInstance && unsafeWindow.codemirrorInstance.setValue && unsafeWindow.codemirrorInstance.setValue(currentReply.value)
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

// 获取回复帖的正文内容
function getReplyContent(replyElement) {
    let content = '';
    
    if(currentPlatform.value == 'discuz'){
        // Discuz: 从回复帖中提取内容
        let $postMessage = replyElement.querySelector('[id^="postmessage_"]');
        if(!$postMessage) {
            $postMessage = replyElement.querySelector('.t_fswillem');
        }
        if($postMessage) {
            content = $postMessage.innerText;
        }
    } else if(currentPlatform.value == 'discourse'){
        // Discourse: 从回复中提取内容
        let $cooked = replyElement.querySelector('.cooked');
        if($cooked) {
            content = $cooked.innerText;
        }
    } else if(currentPlatform.value == 'nodeseek'){
        // NodeSeek: 从回复中提取内容
        let $postContent = replyElement.querySelector('.post-content');
        if($postContent) {
            content = $postContent.innerText;
        }
    } else if(currentPlatform.value == 'v2ex'){
        // V2ex: 从回复中提取内容
        let $replyBody = replyElement.querySelector('.reply_content');
        if(!$replyBody) {
            $replyBody = replyElement.querySelector('.cell');
        }
        if($replyBody) {
            content = $replyBody.innerText;
        }
    } else if(currentPlatform.value == 'flarum'){
        // Flarum: 从帖子正文容器中提取内容
        let $postBody = replyElement.querySelector('.Post-body');
        if(!$postBody) {
            $postBody = replyElement.querySelector('.Post-body-content');
        }
        if(!$postBody) {
            $postBody = replyElement.querySelector('.CommentPost-content');
        }
        if($postBody) {
            content = $postBody.innerText;
        }
    }
    
    return content.trim();
}

// 添加回复到我的列表
async function addToMyList(replyContent) {
    if(!replyContent) {
        proxy.$message.error('无法获取回复内容');
        return;
    }
    
    if(list.value.includes(replyContent)) {
        proxy.$message.warning('该回复已在列表中');
        return;
    }
    
    list.value.push(replyContent);
    proxy.$storage.set(list.value);
    proxy.$message.success('已添加到我的回复列表');
    proxy.$tools.log('[BBS QuickReply - 添加回复到列表]', replyContent);
}

// 添加回复到列表并分享
async function addToMyListAndShare(replyContent) {
    if(!replyContent) {
        proxy.$message.error('无法获取回复内容');
        return;
    }
    
    // 先添加到本地列表
    if(!list.value.includes(replyContent)) {
        list.value.push(replyContent);
        proxy.$storage.set(list.value);
    }
    
    // 然后分享到后台
    try {
        const res = await proxy.$api.replyInsert(replyContent);
        proxy.$message.success('已添加到我的回复并分享成功');
        proxy.$tools.log('[BBS QuickReply - 添加并分享回复]', replyContent, res);
    } catch (err) {
        proxy.$message.error('分享失败: ' + (err.message || err));
        proxy.$tools.log('[BBS QuickReply - 分享失败]', err);
    }
}

// 为回复帖注入快捷按钮
function injectQuickAddButtons() {
    proxy.$tools.log(`[BBS QuickReply - injectQuickAddButtons] 当前平台: ${currentPlatform.value}`);
    
    // 诊断：检查当前 DOM 中是否存在我们要找的元素
    if(currentPlatform.value == 'flarum') {
        const allArticles = document.querySelectorAll('article');
        const allPostBodies = document.querySelectorAll('.Post-body');
        proxy.$tools.log(`[Flarum 诊断] 当前页面中有 ${allArticles.length} 个 article, ${allPostBodies.length} 个 .Post-body`);
        
        // 输出前 3 个 article 的内容，用于调试
        for(let i = 0; i < Math.min(3, allArticles.length); i++) {
            proxy.$tools.log(`[Flarum 诊断] article ${i}:`, allArticles[i].className, allArticles[i].innerHTML.substring(0, 100));
        }
    }
    
    if(currentPlatform.value == 'discuz'){
        // Discuz 平台
        const $replies = document.querySelectorAll('#postlist > div[id^="post_"]');
        $replies.forEach((replyElement) => {
            // 检查是否已经注入过按钮
            if(replyElement.querySelector('.quickAddBtnGroup')) {
                return;
            }
            
            // 找到回复内容所在的位置
            let $postMessage = replyElement.querySelector('[id^="postmessage_"]');
            if(!$postMessage) {
                $postMessage = replyElement.querySelector('.t_fswillem');
            }
            
            if($postMessage) {
                const replyContent = getReplyContent(replyElement);
                
                // 创建按钮容器
                const $btnGroup = document.createElement('div');
                $btnGroup.className = 'quickAddBtnGroup';
                $btnGroup.style.cssText = 'margin-top: 8px; display: none !important; gap: 8px; flex-wrap: wrap;';
                
                // 添加到我的按钮
                const $addBtn = document.createElement('button');
                $addBtn.textContent = '➕ 添加到我的';
                $addBtn.title = 'BBS QuickReply - 添加到我的回复';
                $addBtn.className = 'btn btn-sm btn-info quickAddBtn';
                $addBtn.style.cssText = 'padding: 4px 12px; font-size: 12px; cursor: pointer; background-color: #409EFF; color: white; border: none; border-radius: 3px;';
                $addBtn.onclick = () => addToMyList(replyContent);
                
                // 添加到我的并分享按钮
                const $addShareBtn = document.createElement('button');
                $addShareBtn.textContent = '⭐ 添加到我的并分享';
                $addShareBtn.title = 'BBS QuickReply - 添加到我的回复并分享给网友';
                $addShareBtn.className = 'btn btn-sm btn-success quickAddShareBtn';
                $addShareBtn.style.cssText = 'padding: 4px 12px; font-size: 12px; cursor: pointer; background-color: #67C23A; color: white; border: none; border-radius: 3px;';
                $addShareBtn.onclick = () => addToMyListAndShare(replyContent);
                
                $btnGroup.appendChild($addBtn);
                $btnGroup.appendChild($addShareBtn);
                
                // 将按钮插入到回复内容下方
                $postMessage.appendChild($btnGroup);
                
                // 添加 hover 事件：显示/隐藏按钮
                replyElement.addEventListener('mouseenter', () => {
                    $btnGroup.style.display = 'flex';
                });
                replyElement.addEventListener('mouseleave', () => {
                    $btnGroup.style.display = 'none';
                });
            }
        });
    } else if(currentPlatform.value == 'nodeseek'){
        // NodeSeek 平台
        const $replies = document.querySelectorAll('li.content-item');
        $replies.forEach((replyElement) => {
            // 检查是否已经注入过按钮
            if(replyElement.querySelector('.quickAddBtnGroup')) {
                return;
            }
            
            // 找到回复内容容器
            const $postContent = replyElement.querySelector('.post-content');
            if($postContent) {
                const replyContent = getReplyContent(replyElement);
                
                // 创建按钮容器
                const $btnGroup = document.createElement('div');
                $btnGroup.className = 'quickAddBtnGroup';
                $btnGroup.style.cssText = 'margin-top: 8px; display: none !important; gap: 8px; flex-wrap: wrap;';
                
                // 添加到我的按钮
                const $addBtn = document.createElement('button');
                $addBtn.textContent = '➕ 添加到我的';
                $addBtn.title = 'BBS QuickReply - 添加到我的回复';
                $addBtn.className = 'btn btn-sm btn-info quickAddBtn';
                $addBtn.style.cssText = 'padding: 4px 12px; font-size: 12px; cursor: pointer; background-color: #409EFF; color: white; border: none; border-radius: 3px;';
                $addBtn.onclick = () => addToMyList(replyContent);
                
                // 添加到我的并分享按钮
                const $addShareBtn = document.createElement('button');
                $addShareBtn.textContent = '⭐ 添加到我的并分享';
                $addShareBtn.title = 'BBS QuickReply - 添加到我的回复并分享给网友';
                $addShareBtn.className = 'btn btn-sm btn-success quickAddShareBtn';
                $addShareBtn.style.cssText = 'padding: 4px 12px; font-size: 12px; cursor: pointer; background-color: #67C23A; color: white; border: none; border-radius: 3px;';
                $addShareBtn.onclick = () => addToMyListAndShare(replyContent);
                
                $btnGroup.appendChild($addBtn);
                $btnGroup.appendChild($addShareBtn);
                
                // 将按钮插入到回复内容下方
                $postContent.appendChild($btnGroup);
                
                // 添加 hover 事件：显示/隐藏按钮
                replyElement.addEventListener('mouseenter', () => {
                    $btnGroup.style.display = 'flex';
                });
                replyElement.addEventListener('mouseleave', () => {
                    $btnGroup.style.display = 'none';
                });
            }
        });
    } else if(currentPlatform.value == 'discourse'){
        // Discourse 平台（含 LinuxDo）
        // 过滤主帖：data-post-number="1" 为主帖，仅保留回帖
        const $replies = document.querySelectorAll('#topic .topic-post:not([data-post-number="1"]), .topic-post:not([data-post-number="1"])');
        $replies.forEach((replyElement) => {
            if(replyElement.getAttribute('data-post-number') === '1') {
                return;
            }

            // 检查是否已经注入过按钮
            if(replyElement.querySelector('.quickAddBtnGroup')) {
                return;
            }

            // 找到回复内容容器
            let $postContent = replyElement.querySelector('.topic-body .cooked');
            if(!$postContent) {
                $postContent = replyElement.querySelector('.cooked');
            }

            if($postContent) {
                const replyContent = getReplyContent(replyElement);

                // 创建按钮容器
                const $btnGroup = document.createElement('div');
                $btnGroup.className = 'quickAddBtnGroup';
                $btnGroup.style.cssText = 'margin-top: 8px; display: none !important; gap: 8px; flex-wrap: wrap;';

                // 添加到我的按钮
                const $addBtn = document.createElement('button');
                $addBtn.textContent = '➕ 添加到我的';
                $addBtn.title = 'BBS QuickReply - 添加到我的回复';
                $addBtn.className = 'btn btn-sm btn-info quickAddBtn';
                $addBtn.style.cssText = 'padding: 4px 12px; font-size: 12px; cursor: pointer; background-color: #409EFF; color: white; border: none; border-radius: 3px;';
                $addBtn.onclick = () => addToMyList(replyContent);

                // 添加到我的并分享按钮
                const $addShareBtn = document.createElement('button');
                $addShareBtn.textContent = '⭐ 添加到我的并分享';
                $addShareBtn.title = 'BBS QuickReply - 添加到我的回复并分享给网友';
                $addShareBtn.className = 'btn btn-sm btn-success quickAddShareBtn';
                $addShareBtn.style.cssText = 'padding: 4px 12px; font-size: 12px; cursor: pointer; background-color: #67C23A; color: white; border: none; border-radius: 3px;';
                $addShareBtn.onclick = () => addToMyListAndShare(replyContent);

                $btnGroup.appendChild($addBtn);
                $btnGroup.appendChild($addShareBtn);

                // 将按钮插入到回复内容下方
                $postContent.appendChild($btnGroup);

                // 添加 hover 事件：显示/隐藏按钮
                replyElement.addEventListener('mouseenter', () => {
                    $btnGroup.style.display = 'flex';
                });
                replyElement.addEventListener('mouseleave', () => {
                    $btnGroup.style.display = 'none';
                });
            }
        });
    } else if(currentPlatform.value == 'v2ex'){
        // V2EX 平台
        const $replies = document.querySelectorAll('div.cell[id^="r_"]');
        proxy.$tools.log(`[V2EX] 找到 ${$replies.length} 条回复`);
        
        $replies.forEach((replyElement, index) => {
            // 检查是否已经注入过按钮
            if(replyElement.querySelector('.quickAddBtnGroup')) {
                return;
            }
            
            // 找到回复内容容器 - 尝试多个选择器
            let $replyContent = replyElement.querySelector('.reply_content');
            if (!$replyContent) {
                $replyContent = replyElement.querySelector('[class*="reply"]');
            }
            if (!$replyContent) {
                $replyContent = replyElement.querySelector('.cell');
            }
            
            if($replyContent) {
                const replyContent = getReplyContent(replyElement);
                
                // 创建按钮容器
                const $btnGroup = document.createElement('div');
                $btnGroup.className = 'quickAddBtnGroup';
                $btnGroup.style.cssText = 'margin-top: 8px; display: none !important; gap: 8px; flex-wrap: wrap;';
                
                // 添加到我的按钮
                const $addBtn = document.createElement('button');
                $addBtn.textContent = '➕ 添加到我的';
                $addBtn.title = 'BBS QuickReply - 添加到我的回复';
                $addBtn.className = 'btn btn-sm btn-info quickAddBtn';
                $addBtn.style.cssText = 'padding: 4px 12px; font-size: 12px; cursor: pointer; background-color: #409EFF; color: white; border: none; border-radius: 3px; font-weight: normal;';
                $addBtn.onclick = () => addToMyList(replyContent);
                
                // 添加到我的并分享按钮
                const $addShareBtn = document.createElement('button');
                $addShareBtn.textContent = '⭐ 添加到我的并分享';
                $addShareBtn.title = 'BBS QuickReply - 添加到我的回复并分享给网友';
                $addShareBtn.className = 'btn btn-sm btn-success quickAddShareBtn';
                $addShareBtn.style.cssText = 'padding: 4px 12px; font-size: 12px; cursor: pointer; background-color: #67C23A; color: white; border: none; border-radius: 3px; font-weight: normal;';
                $addShareBtn.onclick = () => addToMyListAndShare(replyContent);
                
                $btnGroup.appendChild($addBtn);
                $btnGroup.appendChild($addShareBtn);
                
                // 将按钮插入到回复内容下方
                $replyContent.appendChild($btnGroup);
                
                // 添加 hover 事件：显示/隐藏按钮
                replyElement.addEventListener('mouseenter', () => {
                    $btnGroup.style.display = 'flex';
                });
                replyElement.addEventListener('mouseleave', () => {
                    $btnGroup.style.display = 'none';
                });
                
            }
        });
    } else if(currentPlatform.value == 'flarum'){
        // Flarum 平台 - 直接遍历所有 .Post-body，跳过主帖（第一个）
        const $postBodies = document.querySelectorAll('.Post-body');
        proxy.$tools.log(`[Flarum] 找到 ${$postBodies.length} 条帖子`);

        $postBodies.forEach((postBodyElement, index) => {
            // 跳过主帖（index === 0），只在回帖上注入按钮
            if(index === 0) {
                return;
            }
            
            // 找到最近的 article 或容器
            let replyElement = postBodyElement.closest('article');
            if(!replyElement) {
                replyElement = postBodyElement.closest('div[class*="Post"]');
            }
            
            if(!replyElement) {
                return;
            }
            
            // 检查是否已经注入过按钮
            if(replyElement.querySelector('.quickAddBtnGroup')) {
                return;
            }

            const replyContent = getReplyContent(replyElement);

            // 创建按钮容器
            const $btnGroup = document.createElement('div');
            $btnGroup.className = 'quickAddBtnGroup';
            $btnGroup.style.cssText = 'margin-top: 8px; display: none !important; gap: 8px; flex-wrap: wrap;';

            // 添加到我的按钮
            const $addBtn = document.createElement('button');
            $addBtn.textContent = '➕ 添加到我的';
            $addBtn.title = 'BBS QuickReply - 添加到我的回复';
            $addBtn.className = 'btn btn-sm btn-info quickAddBtn';
            $addBtn.style.cssText = 'padding: 4px 12px; font-size: 12px; cursor: pointer; background-color: #409EFF; color: white; border: none; border-radius: 3px;';
            $addBtn.onclick = () => addToMyList(replyContent);

            // 添加到我的并分享按钮
            const $addShareBtn = document.createElement('button');
            $addShareBtn.textContent = '⭐ 添加到我的并分享';
            $addShareBtn.title = 'BBS QuickReply - 添加到我的回复并分享给网友';
            $addShareBtn.className = 'btn btn-sm btn-success quickAddShareBtn';
            $addShareBtn.style.cssText = 'padding: 4px 12px; font-size: 12px; cursor: pointer; background-color: #67C23A; color: white; border: none; border-radius: 3px;';
            $addShareBtn.onclick = () => addToMyListAndShare(replyContent);

            $btnGroup.appendChild($addBtn);
            $btnGroup.appendChild($addShareBtn);

            // 将按钮插入到回复内容下方
            postBodyElement.appendChild($btnGroup);

            // 添加 hover 事件：显示/隐藏按钮
            replyElement.addEventListener('mouseenter', () => {
                $btnGroup.style.display = 'flex';
            });
            replyElement.addEventListener('mouseleave', () => {
                $btnGroup.style.display = 'none';
            });
        });
    }
    // 可以为其他平台添加支持
}

onMounted(()=> {
    checkEditor();
    postReplyMutationObserver();
    injectQuickAddButtons();
    enterReply();
    fastreBindClick();
    replyfastBindClick();
    flbcBindClick();
    
    // 监听 DOM 变化，实时注入快捷按钮
    const observer = new MutationObserver(() => {
        injectQuickAddButtons();
    });
    
    observer.observe(document.body, {
        childList: true,
        subtree: true,
    });
});
watch(fwin_replyLoaded, (n)=>{
    // 该挂载逻辑仅适用于 Discuz，其他论坛不应尝试操作 Discuz 容器
    if (currentPlatform.value !== 'discuz') {
        return;
    }
    // 监听楼层回复面板显示状态
    if (n) {
        let $floatlayout_reply = document.querySelector(
            '#floatlayout_reply'
        );
        if(!$floatlayout_reply){
            proxy.$tools.log('[BBS QuickReply] 未找到 #floatlayout_reply，跳过挂载');
            return;
        }
        $floatlayout_reply.insertBefore(
            proxy.$el,
            $floatlayout_reply.childNodes[0]
        );
        enterPostReply();
    } else {
        let $fastposteditor = document.querySelector(
            '#fastposteditor'
        );
        if(!$fastposteditor){
            proxy.$tools.log('[BBS QuickReply] 未找到 #fastposteditor，跳过挂载');
            return;
        }
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

/* 快速添加按钮样式 */
:global(.quickAddBtnGroup) {
    gap: 8px;
    align-items: center;
    flex-wrap: wrap;
    margin-top: 8px;
}

:global(.quickAddBtnGroup button) {
    padding: 6px 14px !important;
    font-size: 12px !important;
    cursor: pointer !important;
    border: none !important;
    border-radius: 3px !important;
    line-height: 1.5 !important;
    white-space: nowrap !important;
    transition: all 0.2s ease !important;
    display: inline-flex !important;
    align-items: center !important;
    gap: 4px !important;
    font-weight: 500 !important;
}

:global(.quickAddBtn) {
    background-color: #409EFF !important;
    color: white !important;
}

:global(.quickAddBtn:hover) {
    background-color: #66B1FF !important;
    color: white !important;
    opacity: 0.95 !important;
}

:global(.quickAddShareBtn) {
    background-color: #67C23A !important;
    color: white !important;
}

:global(.quickAddShareBtn:hover) {
    background-color: #85CE61 !important;
    color: white !important;
    opacity: 0.95 !important;
}
</style>
