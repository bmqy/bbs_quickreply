<script setup name="quickReplySet">
const {proxy} = getCurrentInstance();
const myList = ref([]);
const systemList = ref([]);
const systemListCount = ref(0);
const loading = ref(false);
const isLogin = ref(false);
const realtimeSync = ref(false);
const realtimeBackup = ref(false);
const submitNow = ref(false);
const currentTab = ref('mine');
const showLoginForce = ref(false);
const newReply = ref('');
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
    isLogin.value = proxy.$storage.getUserInfo('userId');
    realtimeSync.value = proxy.$storage.getUserInfo('realtimeSync') || false;
    realtimeBackup.value = proxy.$storage.getUserInfo('realtimeBackup') || false;
    submitNow.value = proxy.$storage.getUserInfo('submitNow') || false;
    constVar.value = proxy.$storage.getUserInfo('constVar') || constVar.value;
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
    showLoginForce.value = false;
    isLogin.value = true;
    myList.value.length===0 && download();
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
function loginForce(){
    showLoginForce.value = !showLoginForce.value;
    currentTab.value = 'mine';
}
function loginCancel(){
    showLoginForce.value = false;
    currentTab.value = 'mine';
}
function logout(){
    proxy.$storage.setUserInfo('userId', '')
    isLogin.value = false;
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
</script>

<template>
    <div class="setBox">
        <el-card class="box-card" shadow="never">
            <el-row :gutter="30">
                <el-col :span="9">
                    <el-tabs type="border-card" class="my-list-tabs" v-model="currentTab">
                        <el-tab-pane name="mine" label="我在用的">
                            <div v-if="(myList.length===0 && !isLogin) || showLoginForce" class="quickReplyLoginBox">
                                <div style="margin-top: 15px;">
                                    <app-login @onSuccess="onLoginSuccess" @onClose="loginCancel"></app-login>
                                    <el-space direction="vertical" alignment="flex-start">
                                        <div>
                                            <el-text type="info">* 登录后，即可在任意设备同步你的配置；</el-text>
                                        </div>
                                        <div>
                                            <el-text type="info">* 云端只负责保存账号及其回复列表，不留存多余信息；</el-text>
                                        </div>
                                        <div>
                                            <el-text type="info">* 忘记密码无法恢复，可重新注册；</el-text>
                                        </div>
                                        <div>
                                            <el-text type="info">* 如不需登录，也可忽略登录界面，直接使用即可；</el-text>
                                        </div>
                                    </el-space>
                                </div>
                            </div>
                            <div v-else>
                                <ul class="list" v-if="!showLoginForce || myList.length>0">
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
                                <div v-if="myList.length == 0" class="tips">
                                    <p>未设置快速回帖内容!</p>
                                </div>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane v-if="isLogin" name="options" label="选项">
                            <el-space direction="vertical" alignment="flex-start">
                                <div>
                                    <el-checkbox v-model="realtimeSync" label="实时同步，本地回复列表修改后立即上传" size="small" :checked="realtimeSync" @change="onRealtimeSyncChange" />
                                </div>
                                <div>
                                    <el-checkbox v-model="realtimeBackup" label="实时备份，本地回复列表及任一配置修改后立即备份至云端" size="small" :checked="realtimeBackup" @change="onRealtimeBackupChange" />
                                </div>
                                <div>
                                    <el-checkbox v-model="submitNow" label="立即提交，选择快捷回帖内容后立即提交回帖" size="small" :checked="submitNow" @change="onSubmitNowChange" />
                                </div>
                                <el-space direction="vertical" alignment="flex-start" style="margin-top: 18px;">
                                    <div>
                                        <el-text type="info">* AI和常量只存在本地，不参与同步</el-text>
                                    </div>
                                    <div>
                                        <el-text type="info">* 如需备份所有配置请使用操作中的全量备份、全量恢复</el-text>
                                    </div>
                                    <div>
                                        <el-text type="info">* 全量备份仅为方便多设备同步配置，使用base64存储，请知悉</el-text>
                                    </div>
                                </el-space>
                            </el-space>
                        </el-tab-pane>
                        <el-tab-pane v-if="isLogin" name="constVar" label="常量">
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
                        <el-tab-pane name="actions" label="操作">
                            <el-space wrap>
                                <el-button v-if="!isLogin" type="success" icon="UserFilled" size="small" @click="loginForce">登录，登录后即可在任意设备同步你的配置</el-button>
                                <el-button v-if="isLogin" type="danger" icon="SwitchButton" size="small" @click="logout">注销，注销登录后将不能再同步列表</el-button>
                                <el-button v-if="isLogin" type="primary" icon="Upload" size="small" @click="upload">上传，上传本地列表会覆盖云端数据</el-button>
                                <el-button v-if="isLogin" type="warning" icon="Download" size="small" @click="download">下载，下载云端列表会覆盖本地数据</el-button>
                                <el-button v-if="isLogin" type="primary" icon="Upload" size="small" @click="uploadAll">全量备份，全量备份本地所有配置信息到云端</el-button>
                                <el-button v-if="isLogin" type="warning" icon="Download" size="small" @click="downloadAll">全量恢复，全量恢复云端配置信息覆盖本地数据</el-button>
                            </el-space>
                        </el-tab-pane>
                    </el-tabs>
                </el-col>
                <el-col :span="15">
                    <el-card class="box-card" shadow="never" :body-style="{padding: '0 20px 20px'}">
                        <template #header class="clearfix">
                            <span>网友分享的</span>
                        </template>

                        <el-table ref="filterTable" :data="systemList" size="small" stripe v-loading="loading"
                            @sort-change="sortChange">
                            <el-table-column prop="replyId" label="ID" width="80"></el-table-column>
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
                            <el-table-column prop="likeCount" sortable="custom" width="100" label="点赞">
                                <template #default="scope">
                                    <el-tag type="info" size="small">{{scope.row.likeCount}}</el-tag>
                                </template>
                            </el-table-column>
                            <el-table-column label="操作" width="100">
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

                        <el-pagination background layout="prev, pager, next" :page-size="10" :pager-count="5"
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
        </el-card>
    </div>
</template>

<style scoped lang="scss">
.setBox {
    :global(.el-dialog__footer) {
        background-color: #fff;
    }
}

.app-margin-right-30 {
    margin-right: 30px;
}

.my-list-tabs{
    border-radius: var(--el-card-border-radius);
    border: 1px solid var(--el-card-border-color);
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
.quickReplyLoginBox .tips {
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
</style>
