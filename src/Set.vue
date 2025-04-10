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
const showSettings = ref(false);
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
});

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
    myList.value.length===0 && download();
}

function closeLogin(){
    showLogin.value = false;
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
async function downloadAll(){
    let all = await proxy.$storage.downloadAll();
    myList.value = all.QuickReply || [];
    updateMyList();
}
function logout(){
    proxy.$storage.setUserInfo('userId', '');
    isLogin.value = false;
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
</script>

<template>
    <div class="setBox">
        <el-card class="box-card" shadow="never">
            <!-- 顶部添加登录按钮 -->
            <template #header>
                <div class="card-header">
                    <div class="header-left">
                        <el-button v-if="!isLogin" type="primary" size="small" @click="showLogin = true">登录</el-button>
                        <el-button v-else type="danger" size="small" @click="logout">注销</el-button>
                        <span v-if="isLogin && isWebDAVUser()" class="login-type">WebDAV 同步</span>
                        <span v-if="isLogin && !isWebDAVUser()" class="login-type">账号同步</span>
                    </div>
                    <div class="header-right">
                        <el-space>
                            <el-button v-if="isLogin" type="primary" icon="Upload" size="small" @click="uploadAll">全量备份</el-button>
                            <el-button v-if="isLogin" type="warning" icon="Download" size="small" @click="downloadAll">全量恢复</el-button>
                            <el-button v-if="isLogin" type="success" icon="Setting" size="small" @click="showSettings = !showSettings">设置</el-button>
                        </el-space>
                    </div>
                </div>
            </template>

            <!-- 登录界面 -->
            <div v-if="showLogin" class="login-container">
                <div class="login-header">
                    <h3>账号登录</h3>
                    <el-button type="link" icon="Back" @click="closeLogin">返回</el-button>
                </div>
                <app-login @onSuccess="onLoginSuccess" @onClose="closeLogin"></app-login>
            </div>

            <!-- 设置区域 -->
            <div v-else-if="showSettings" class="settings-container">
                <el-tabs type="border-card">
                    <el-tab-pane name="options" label="选项">
                        <el-space direction="vertical" alignment="flex-start">
                            <!-- 显示当前登录类型 -->
                            <div v-if="isWebDAVUser()">
                                <el-alert
                                    title="您当前使用的是 WebDAV 登录"
                                    type="success"
                                    description="所有数据将通过 WebDAV 同步,无需配置其他同步选项"
                                    show-icon
                                    :closable="false"
                                />
                            </div>
                            <div v-else>
                                <el-checkbox v-model="realtimeSync" label="实时同步，本地回复列表修改后立即上传" size="small" :checked="realtimeSync" @change="onRealtimeSyncChange" />
                            </div>
                            <div v-if="!isWebDAVUser()">
                                <el-checkbox v-model="realtimeBackup" label="实时备份，本地回复列表及任一配置修改后立即备份至云端" size="small" :checked="realtimeBackup" @change="onRealtimeBackupChange" />
                            </div>
                            <div>
                                <el-checkbox v-model="submitNow" label="立即提交，选择快捷回帖内容后立即提交回帖" size="small" :checked="submitNow" @change="onSubmitNowChange" />
                            </div>
                        </el-space>
                    </el-tab-pane>
                    <el-tab-pane name="constVar" label="常量">
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
                                <el-text type="info">* 可在快捷回帖中使用以上常量：{email}、{qq}、{wechat}、{url}，例：我的邮箱是{email}，我的QQ是{qq}；</el-text>
                            </div>
                            <div>
                                <el-text type="info">* 开启加密后，只在回帖时显示base64加密后的常量；</el-text>
                            </div>
                        </el-space>
                    </el-tab-pane>
                    <el-tab-pane name="ai" label="AI">
                        <app-set-ai ref="setAIPanel" @updateAI="updateAI" />
                    </el-tab-pane>
                </el-tabs>
                <div class="settings-footer">
                    <el-button type="primary" @click="showSettings = false">返回</el-button>
                </div>
            </div>

            <!-- 主体内容区域 -->
            <div v-else class="main-content">
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
                                                    effect="dark"
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
                                        <el-tag type="info" size="small">{{scope.row.likeCount}}</el-tag>
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

                            <el-pagination background layout="prev, pager, next" :small="windowSize.width<=640" :page-size="10" :pager-count="windowSize.width>640?5:3"
                                @current-change="currentPageChange" :total="systemListCount">
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
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.header-left {
    display: flex;
    align-items: center;
    
    .login-type {
        margin-left: 10px;
        font-size: 14px;
        color: #409eff;
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
    padding: 10px 0;
    
    .settings-footer {
        margin-top: 20px;
        text-align: right;
    }
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
</style>
