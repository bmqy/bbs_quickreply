<script setup name="quickReplySet">
import { getCurrentInstance, ref } from 'vue';

const {proxy} = getCurrentInstance();
const myList = ref([]);
const systemList = ref([]);
const systemListCount = ref(0);
const loading = ref(false);
const isLogin = ref(false);
const realtimeSync = ref(false);
const realtimeBackup = ref(false);
const submitNow = ref(false);
const showLogin = ref(false);
const showOptionsSettings = ref(false);
const showConstSettings = ref(false);
const showAISettings = ref(false);
const newReply = ref('');
const windowSize = ref({
    width: window.innerWidth,
    height: window.innerHeight
})
const queryData = ref({
    page: 1,
    prop: 'replyId',
    order: 'desc',
});
const constVar = ref({
    email: '',
    qq: '',
    wechat: '',
    url: '',
    base64: false,
});
const emit = defineEmits(['updateMyList', 'updateConstVar', 'updateAIModel']);
onBeforeMount(()=>{
    const userId = proxy.$storage.getUserInfo('userId');
    isLogin.value = !!userId;
    realtimeSync.value = proxy.$storage.getUserInfo('realtimeSync') || false;
    realtimeBackup.value = proxy.$storage.getUserInfo('realtimeBackup') || false;
    submitNow.value = proxy.$storage.getUserInfo('submitNow') || false;
    constVar.value = proxy.$storage.getUserInfo('constVar') || constVar.value;
    
    // WebDAV 配置仅在登录界面中管理,这里不再需要加载
    // webdavConfig.value = proxy.$storage.getUserInfo('webdavConfig') || webdavConfig.value;
    
    getMyList();
    getSystemList();
    
    // 添加全局数据恢复事件监听
    proxy.$on('dataRestored', handleDataRestored);
});

// 处理数据恢复事件
function handleDataRestored(data) {
    console.log('设置组件接收到数据恢复事件', data);
    
    // 更新所有组件状态
    if (data) {
        // 更新回复列表
        if (data.QuickReply) {
            myList.value = data.QuickReply;
            updateMyList();
            console.log('设置面板已更新回复列表', myList.value.length, '条');
        }
        
        // 更新用户设置
        const userSettingsPrefix = proxy.$storage.userStorageKey + '.';
        Object.keys(data).forEach(key => {
            if (key.startsWith(userSettingsPrefix)) {
                const settingKey = key.replace(userSettingsPrefix, '');
                
                // 更新已知的设置项
                if (settingKey === 'realtimeSync') {
                    realtimeSync.value = data[key] || false;
                    console.log('已更新实时同步设置:', realtimeSync.value);
                } else if (settingKey === 'realtimeBackup') {
                    realtimeBackup.value = data[key] || false;
                    console.log('已更新实时备份设置:', realtimeBackup.value);
                } else if (settingKey === 'submitNow') {
                    submitNow.value = data[key] || false;
                    console.log('已更新立即提交设置:', submitNow.value);
                } else if (settingKey === 'constVar') {
                    constVar.value = data[key] || constVar.value;
                    emit('updateConstVar');
                    console.log('已更新常量设置');
                }
            }
        });
        
        // 更新系统列表（如有必要）
        getSystemList();
    }
}

// 获取我的自定义回复列表
function getMyList() {
    let myListStorage = proxy.$storage.get();
    myList.value = myListStorage && myListStorage.length > 0 ? myListStorage : [];
}
// 获取网友分享的回复列表
async function getSystemList() {
    loading.value = true;
    let res = await proxy.$api.selectList(queryData.value.page, queryData.value.prop, queryData.value.order);
    systemList.value = res.data.totalCount > 0 ? res.data.list : [];
    systemListCount.value = res.data.totalCount;
    loading.value = false;
}
// 监听分页
function currentPageChange(current) {
    queryData.value.page = current;
    getSystemList();
}
// 变更排序
function sortChange(e){
    queryData.value.prop = e.order ? e.prop : 'replyId';
    queryData.value.order = (e.order==='descending' || !e.order) ? 'desc' : 'asc';
    getSystemList()
}
// 添加自定义回复
function addReply() {
    if (newReply.value == '') {
        proxy.$message.error('回复内容不能为空！');
        return false;
    }
    if (myList.value.indexOf(newReply.value) != -1) {
        proxy.$message.error('该回复已添加过！');
        newReply.value = '';
        return false;
    }

    if (myList.value.length >= 10) {
        proxy.$message.warning('自定义回复，超出条数上限！');
        return false;
    }
    myList.value.push(newReply.value);
    realtimeSync.value && upload();
    realtimeBackup.value && uploadAll();
    updateMyList();
    newReply.value = '';
    return true;
}
// 更新自定义回复
function updateMyList() {
    proxy.$storage.set(myList.value);
    emit('updateMyList', myList.value);
}
// 删除自定义回复
function delReply(index) {
    myList.value.splice(index, 1);
    updateMyList();
    realtimeSync.value && upload();
    realtimeBackup.value && uploadAll();
}
// 分享自定义回复
function shareReply(index) {
    proxy.$api
        .replyInsert(myList.value[index])
        .then((res) => {
            proxy.$message.success(res.message);
            getSystemList();
        })
        .catch((err) => {
            proxy.$message.error(err.message);
        });
}
// 点赞网友分享的回复
function likeReply(index) {
    proxy.$api
        .likeCountUpdate(systemList.value[index].replyId)
        .then((res) => {
            if(res.code == 0){
                systemList.value[index]['likeCount'] = res.data.likeCount
                proxy.$message.success('点赞成功');
            } else {
                proxy.$message.error(res.message);
            }
        })
        .catch((err) => {
            proxy.$message.error(err.message);
        });
}
// 收藏网友分享的回复
function collectReply(index) {
    let nStr = systemList.value[index].content;
    if (myList.value.indexOf(nStr) != -1) {
        proxy.$message.error('该回复已添加过！');
        return false;
    }
    newReply.value = nStr;
    proxy.$api
        .collectCountUpdate(systemList.value[index].replyId)
        .then((res) => {
            if(res.code == 0){
                addReply() && proxy.$message.success('收藏成功');
                realtimeSync.value && upload();
                realtimeBackup.value && uploadAll();
            } else {
                proxy.$message.error(res.message);
            }
        })
        .catch((err) => {
            proxy.$message.error(err.message);
        });
}

function onLoginSuccess(){
    showLogin.value = false;
    isLogin.value = true;
    
    // 判断是否是WebDAV用户，WebDAV用户直接进行全量恢复
    const userId = proxy.$storage.getUserInfo('userId');
    if (userId === 'webdav_user') {
        // WebDAV用户直接执行全量恢复
        console.log('WebDAV用户登录成功，自动执行全量恢复');
        downloadAll();
    } else {
        // 非WebDAV用户仅在回复列表为空时下载回复列表
        myList.value.length === 0 && download();
    }
}

function closeLogin(){
    showLogin.value = false;
}

function closeOptionsSettings() {
    showOptionsSettings.value = false;
}

function closeConstSettings() {
    showConstSettings.value = false;
}

function closeAISettings() {
    showAISettings.value = false;
}

function upload(){
    proxy.$storage.uploadList();
}
async function download(){
    let list = await proxy.$storage.downloadList();
    myList.value = list;
    updateMyList();
}
function uploadAll(){
    proxy.$storage.uploadAll();
}
async function downloadAll() {
    loading.value = true;
    try {
        let all = await proxy.$storage.downloadAll();
        if (all) {
            // 由于已经在 util.js 中触发了全局事件，这里不需要重复更新
            // 显示提示信息
            if (!all.QuickReply || all.QuickReply.length === 0) {
                proxy.$message.warning('恢复的数据中没有快捷回复');
            } else {
                console.log('全量恢复完成，恢复了', all.QuickReply.length, '条回复');
            }
        }
    } catch (error) {
        console.error('全量恢复出错:', error);
        proxy.$message.error('全量恢复出错: ' + error.message);
    } finally {
        loading.value = false;
    }
}
function logout(){
    proxy.$storage.setUserInfo('userId', '');
    isLogin.value = false;
    
    // 确保关闭所有设置页面，返回到主页面
    showOptionsSettings.value = false;
    showConstSettings.value = false;
    showAISettings.value = false;
    
    proxy.$message.success('已注销登录');
}

function onRealtimeSyncChange(e){
    realtimeSync.value = e;
    proxy.$storage.setUserInfo('realtimeSync', e);
    realtimeBackup.value && uploadAll();
}

function onRealtimeBackupChange(e){
    realtimeBackup.value = e;
    proxy.$storage.setUserInfo('realtimeBackup', e);
    realtimeBackup.value && uploadAll();
}

function onSubmitNowChange(e){
    submitNow.value = e;
    proxy.$storage.setUserInfo('submitNow', e);
    realtimeBackup.value && uploadAll();
}

function updateAI() {
    emit('updateAIModel');
    realtimeBackup.value && uploadAll();
}

function constVarChange(){
    proxy.$storage.setUserInfo('constVar', constVar.value);
    emit('updateConstVar');
    realtimeBackup.value && uploadAll();
}

// 判断是否是 WebDAV 用户
function isWebDAVUser() {
    const userId = proxy.$storage.getUserInfo('userId');
    return userId === 'webdav_user';
}

// 添加函数处理按钮点击
function openOptionsSettings() {
    showOptionsSettings.value = true;
    showConstSettings.value = false;
    showAISettings.value = false;
}

function openConstSettings() {
    showOptionsSettings.value = false;
    showConstSettings.value = true;
    showAISettings.value = false;
}

function openAISettings() {
    showOptionsSettings.value = false;
    showConstSettings.value = false;
    showAISettings.value = true;
}

function backupToClipboard() {
    loading.value = true;
    try {
        // 获取所有数据
        const allData = proxy.$storage.getAllUserData();
        // 将数据转换为JSON字符串并添加前缀提示信息
        const dataString = JSON.stringify({
            _meta: {
                app: 'bbs_quickreply',
                version: proxy.$app.version,
                timestamp: new Date().toISOString(),
                note: 'Beta功能: 此备份仅用于在不同登录方式间迁移数据，非长期存储方案'
            },
            data: allData
        });
        
        // 复制到剪贴板
        navigator.clipboard.writeText(dataString).then(() => {
            proxy.$message.success('数据已成功备份到剪贴板');
        }).catch(err => {
            console.error('剪贴板操作失败:', err);
            proxy.$message.error('剪贴板操作失败: ' + err.message);
        });
    } catch (error) {
        console.error('备份到剪贴板出错:', error);
        proxy.$message.error('备份到剪贴板出错: ' + error.message);
    } finally {
        loading.value = false;
    }
}

function restoreFromClipboard() {
    loading.value = true;
    try {
        // 从剪贴板读取数据
        navigator.clipboard.readText().then(text => {
            try {
                const clipData = JSON.parse(text);
                
                // 验证剪贴板数据格式
                if (!clipData._meta || clipData._meta.app !== 'bbs_quickreply') {
                    proxy.$message.error('无效的备份数据格式');
                    loading.value = false;
                    return;
                }
                
                // 显示确认对话框
                proxy.$confirm(
                    '从剪贴板恢复将覆盖当前数据。这是一个Beta功能，主要用于数据迁移。确定要继续吗？',
                    '恢复确认',
                    {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }
                ).then(() => {
                    // 用户确认，开始恢复
                    const restoreData = clipData.data;
                    
                    // 恢复数据
                    proxy.$storage.restoreAllUserData(restoreData);
                    
                    // 更新UI
                    if (restoreData.QuickReply) {
                        myList.value = restoreData.QuickReply;
                        updateMyList();
                    }
                    
                    // 重新加载用户设置
                    const userId = proxy.$storage.getUserInfo('userId');
                    isLogin.value = !!userId;
                    realtimeSync.value = proxy.$storage.getUserInfo('realtimeSync') || false;
                    realtimeBackup.value = proxy.$storage.getUserInfo('realtimeBackup') || false;
                    submitNow.value = proxy.$storage.getUserInfo('submitNow') || false;
                    constVar.value = proxy.$storage.getUserInfo('constVar') || constVar.value;
                    
                    // 发送更新事件
                    emit('updateConstVar');
                    emit('updateAIModel');
                    
                    proxy.$message.success('数据恢复成功');
                }).catch(() => {
                    // 用户取消
                    proxy.$message.info('已取消恢复操作');
                }).finally(() => {
                    loading.value = false;
                });
            } catch (error) {
                console.error('解析剪贴板数据出错:', error);
                proxy.$message.error('无法解析剪贴板数据: ' + error.message);
                loading.value = false;
            }
        }).catch(err => {
            console.error('读取剪贴板失败:', err);
            proxy.$message.error('读取剪贴板失败: ' + err.message);
            loading.value = false;
        });
    } catch (error) {
        console.error('从剪贴板恢复出错:', error);
        proxy.$message.error('从剪贴板恢复出错: ' + error.message);
        loading.value = false;
    }
}
</script>

<template>
    <div class="setBox">
        <el-card class="box-card" shadow="never">
            <!-- 顶部添加登录按钮 -->
            <template #header>
                <div class="card-header">
                    <el-row :gutter="10">
                        <el-col :xs="24" :sm="6" :md="6" :lg="6" :xl="6">
                            <div class="header-left">
                                <el-button v-if="!isLogin" type="primary" size="small" @click="showLogin = true">登录</el-button>
                                <el-button v-else type="danger" size="small" @click="logout">注销</el-button>
                                <span v-if="isLogin && isWebDAVUser()" class="login-type">WebDAV 同步</span>
                                <span v-if="isLogin && !isWebDAVUser()" class="login-type">账号同步</span>
                            </div>
                        </el-col>
                        <el-col :xs="24" :sm="18" :md="18" :lg="18" :xl="18">
                            <div class="header-right">
                                <el-row :gutter="8">
                                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                                        <div class="button-group">
                                            <el-dropdown v-if="isLogin" trigger="click" class="header-button">
                                                <el-button type="primary" size="small">
                                                    全量同步
                                                    <el-icon class="el-icon--right"><ArrowDown /></el-icon>
                                                </el-button>
                                                <template #dropdown>
                                                    <el-dropdown-menu>
                                                        <el-dropdown-item icon="Upload" @click="uploadAll">
                                                            全量备份
                                                        </el-dropdown-item>
                                                        <el-dropdown-item icon="Download" @click="downloadAll">
                                                            全量恢复
                                                        </el-dropdown-item>
                                                        <el-divider style="margin: 5px 0;"></el-divider>
                                                        <el-dropdown-item icon="CopyDocument" @click="backupToClipboard">
                                                            备份到剪贴板
                                                        </el-dropdown-item>
                                                        <el-dropdown-item icon="DocumentCopy" @click="restoreFromClipboard">
                                                            从剪贴板恢复
                                                        </el-dropdown-item>
                                                    </el-dropdown-menu>
                                                </template>
                                            </el-dropdown>
                                            <el-button v-if="isLogin" type="success" icon="Setting" size="small" class="header-button" @click="openOptionsSettings">选项</el-button>
                                            <el-button v-if="isLogin" type="info" icon="Edit" size="small" class="header-button" @click="openConstSettings">常量</el-button>
                                            <el-button v-if="isLogin" type="primary" icon="MagicStick" size="small" class="header-button" @click="openAISettings">AI</el-button>
                                        </div>
                                    </el-col>
                                </el-row>
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </template>

            <!-- 登录界面 -->
            <div v-if="showLogin" class="login-container">
                <div class="login-header">
                    <h3>账号登录</h3>
                    <el-button type="primary" text icon="Back" @click="closeLogin">返回</el-button>
                </div>
                <app-login @onSuccess="onLoginSuccess" @onClose="closeLogin"></app-login>
            </div>

            <!-- 选项设置界面 -->
            <div v-if="showOptionsSettings" class="settings-container">
                <div class="settings-header">
                    <h3>选项设置</h3>
                    <el-button type="primary" text icon="Back" @click="closeOptionsSettings">返回</el-button>
                </div>
                <el-space direction="vertical" alignment="flex-start">
                    <!-- 只为非 WebDAV 用户显示实时同步选项 -->
                    <div v-if="!isWebDAVUser()">
                        <el-checkbox v-model="realtimeSync" label="实时同步，本地回复列表修改后立即上传" size="small" :checked="realtimeSync" @change="onRealtimeSyncChange" />
                    </div>
                    <div>
                        <el-checkbox v-model="realtimeBackup" label="实时备份，本地回复列表及任一配置修改后立即备份至云端" size="small" :checked="realtimeBackup" @change="onRealtimeBackupChange" />
                    </div>
                    <div>
                        <el-checkbox v-model="submitNow" label="立即提交，选择快捷回帖内容后立即提交回帖" size="small" :checked="submitNow" @change="onSubmitNowChange" />
                    </div>
                
                    <el-space direction="vertical" alignment="flex-start" style="margin-top: 18px;">
                        <div v-if="!isWebDAVUser()">
                            <el-text type="primary" class="text-info">* AI和常量只存在本地，不参与同步</el-text>
                        </div>
                        <div v-if="!isWebDAVUser()">
                            <el-text type="primary" class="text-info">* 如需备份所有配置请使用操全量同步操作中的全量备份、全量恢复功能</el-text>
                        </div>
                        <div>
                            <el-text type="primary" class="text-info">* 全量备份仅为方便多设备同步配置，使用base64存储，请知悉</el-text>
                        </div>
                    </el-space>
                </el-space>
            </div>

            <!-- 常量设置界面 -->
            <div v-if="showConstSettings" class="settings-container">
                <div class="settings-header">
                    <h3>常量设置</h3>
                    <el-button type="primary" text icon="Back" @click="closeConstSettings">返回</el-button>
                </div>
                <el-form :model="constVar" label-width="60" style="max-width: 600px">
                    <el-form-item label="邮箱">
                        <el-input v-model="constVar.email" @change="constVarChange" />
                    </el-form-item>
                    <el-form-item label="QQ">
                        <el-input v-model="constVar.qq" @change="constVarChange" />
                    </el-form-item>
                    <el-form-item label="微信">
                        <el-input v-model="constVar.wechat" @change="constVarChange" />
                    </el-form-item>
                    <el-form-item label="网址">
                        <el-input v-model="constVar.url" @change="constVarChange" />
                    </el-form-item>
                    <el-form-item label="加密">
                        <el-switch v-model="constVar.base64" @change="constVarChange" />
                    </el-form-item>
                </el-form>
                <el-space direction="vertical" alignment="flex-start">
                    <div>
                        <el-text type="primary" class="text-info">* 可在快捷回帖中使用以上常量：{email}、{qq}、{wechat}、{url}，例：我的邮箱是{email}，我的QQ是{qq}；</el-text>
                    </div>
                    <div>
                        <el-text type="primary" class="text-info">* 开启加密后，只在回帖时显示base64加密后的常量；</el-text>
                    </div>
                </el-space>
            </div>

            <!-- AI设置界面 -->
            <div v-if="showAISettings" class="settings-container">
                <div class="settings-header">
                    <h3>AI设置</h3>
                    <el-button type="primary" text icon="Back" @click="closeAISettings">返回</el-button>
                </div>
                <app-set-ai ref="setAIPanel" @updateAI="updateAI" />
            </div>

            <!-- 主体内容区域 -->
            <div v-if="!showLogin && !showOptionsSettings && !showConstSettings && !showAISettings" class="main-content">
                <el-row :gutter="30">
                    <!-- 左侧我在用的列表 -->
                    <el-col :span="9" :md="{span: 9}" :sm="{span: 24}" :xs="{span: 24}">
                        <el-card class="my-replies-card" shadow="never">
                            <template #header>
                                <div class="card-title">我在用的</div>
                            </template>
                            <div>
                                <ul class="list" v-if="myList.length > 0">
                                    <li v-for="(item, index) in myList" :key="index">
                                        <div class="list-left">
                                            <div class="list-number">
                                                {{ `${index + 1}、` }}
                                            </div>
                                            <div class="list-title">
                                                {{ `${item}` }}
                                            </div>
                                        </div>
                                        <div class="list-right">
                                            <el-tooltip class="item" effect="dark" content="分享它" placement="top-start">
                                                <el-button type="success" size="small" icon="Share" circle @click="shareReply(index)"></el-button>
                                            </el-tooltip>
                                            <el-tooltip class="item" effect="dark" content="移除" placement="top-start">
                                                <el-button type="danger" size="small" icon="DeleteFilled" circle
                                                    @click="delReply(index)"></el-button>
                                            </el-tooltip>
                                        </div>
                                    </li>
                                </ul>
                                <div v-else class="tips">
                                    <p>未设置快速回帖内容!</p>
                                </div>
                            </div>
                        </el-card>
                    </el-col>

                    <!-- 右侧网友分享的列表 -->
                    <el-col :span="15" :md="{span: 15}" :sm="{span: 24}" :xs="{span: 24}" :style="{'margin-top': windowSize.width<992?'15px':0}">
                        <el-card class="box-card" shadow="never" :body-style="{padding: '0 20px 20px'}">
                            <template #header class="clearfix">
                                <span>网友分享的</span>
                            </template>

                            <el-table ref="filterTable" :data="systemList" size="small" stripe v-loading="loading"
                                @sort-change="sortChange">
                                <el-table-column prop="replyId" label="ID" width="50" align="center"></el-table-column>
                                <el-table-column prop="content" label="内容">
                                    <template #default="scope">
                                        <div v-if="$app.isNew(scope.row.created)">
                                            {{ scope.row.content }}
                                            <el-tooltip class="item" effect="dark" content="7天内新增" placement="top-start">
                                                <el-tag
                                                    type="primary"
                                                    effect="plain"
                                                    size="small"
                                                    round
                                                    style="transform: scale(0.7);"
                                                    >
                                                NEW
                                                </el-tag>
                                            </el-tooltip>
                                        </div>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="likeCount" sortable="custom" width="70" align="center" label="点赞">
                                    <template #default="scope">
                                        <el-tag effect="light" type="info" size="small">{{scope.row.likeCount}}</el-tag>
                                    </template>
                                </el-table-column>
                                <el-table-column label="操作" width="100" align="center">
                                    <template #default="scope">
                                        <el-tooltip class="item" effect="dark" content="给个赞" placement="top-start">
                                            <el-button type="success" size="small" icon="Pointer" circle
                                                @click="likeReply(scope.$index)"></el-button>
                                        </el-tooltip>
                                        <el-tooltip class="item" effect="dark" content="收藏进我的" placement="top-start">
                                            <el-button type="danger" size="small" icon="StarFilled" circle
                                                @click="collectReply(scope.$index)"></el-button>
                                        </el-tooltip>
                                    </template>
                                </el-table-column>
                            </el-table>

                            <el-pagination 
                                background 
                                layout="prev, pager, next" 
                                :size="windowSize.width<=640 ? 'small' : 'default'" 
                                :page-size="10" 
                                :pager-count="5"
                                @current-change="currentPageChange" 
                                :total="systemListCount">
                            </el-pagination>
                        </el-card>
                    </el-col>
                </el-row>

                <div class="addReplyBox">
                    <el-input placeholder="请输入新的回复内容" v-model="newReply" :autosize="{ minRows: 1, maxRows: 3 }" maxlength="100"
                        :show-word-limit="true" resize="none" clearable class="input-with-select">

                        <template #append>
                            <el-button icon="Plus" @click="addReply"></el-button>
                        </template>
                    </el-input>
                </div>
            </div>
        </el-card>
    </div>
</template>

<style scoped lang="scss">
.setBox {
    :global(.el-dialog__footer) {
        background-color: #fff;
    }
}

.card-header {
    width: 100%;
}

.header-left {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    
    .login-type {
        margin-left: 10px;
        font-size: 14px;
        color: #409eff;
    }

    @media (min-width: 768px) {
        margin-bottom: 0;
    }
}

.header-right {
    width: 100%;

    .button-group {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        justify-content: flex-start;

        @media (min-width: 768px) {
            justify-content: flex-end;
        }
    }
}

.login-container {
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 5px;
    margin-bottom: 20px;
    
    .login-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 15px;
        padding-bottom: 10px;
        border-bottom: 1px solid #ebeef5;
        
        h3 {
            margin: 0;
            font-size: 18px;
            color: #303133;
        }
    }
}

.settings-container {
    padding: 20px;
}

.settings-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

.my-replies-card {
    min-height: 300px;
    
    .card-title {
        font-weight: bold;
    }
}

.list {
    &-left {
        padding-right: 15px;
        display: flex;
        flex: 1;
        align-items: stretch;
        justify-content: start;
    }

    &-number {
        margin-right: 5px;
        color: #909399;
    }

    &-title {
        flex: 1;
        font-weight: normal;
    }

    &-right {
        min-width: 70px;

        .el-badge.item {
            margin-right: 30px;
        }
    }

    li {
        margin-bottom: 5px;
        padding-bottom: 5px;
        font-size: 13px;
        line-height: 30px;
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        border-bottom: 1px solid #ebeef5;

        &:hover {
            background-color: #f5f5f5;
        }
    }
}

.tips {
    margin-left: 50px;
    text-align: left;
    font-size: 12px;
}

.addReplyBox {
    margin-top: 15px;
    padding-top: 10px;
    border-top: 1px dashed #ccc;
}

.box-card {
    .el-card__header {
        padding: 10px 20px;

        span {
            font-size: 14px;
        }
    }
}

.clearfix:before,
.clearfix:after {
    display: table;
    content: '';
}

.clearfix:after {
    clear: both;
}

.el-pagination {
    padding: 15px 5px 0;
}

:global(.setBox .el-input__inner) {
    margin-bottom: 0;
    background-color: transparent;
    border: 0;
    outline: none;
}
:global(.setBox .el-checkbox) {
    white-space: wrap;
}

/* 添加自定义text-info样式 */
:global(.text-info) {
    color: #909399 !important;
    font-size: 13px;
}
</style>
