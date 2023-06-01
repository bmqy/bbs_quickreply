<script setup name="quickReplySet">
const {proxy} = getCurrentInstance();
const myList = ref([]);
const systemList = ref([]);
const systemListCount = ref(0);
const loading = ref(false);
const newReply = ref('');
const queryData = ref({
    skip: 0,
    prop: 'replyId',
    order: 'descending',
});
const emit = defineEmits(['updateMyList']);
onBeforeMount(()=>{
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
    loading.value = true
    let res = await proxy.$api.selectList(queryData.value.skip, queryData.value.prop, queryData.value.order);
    systemList.value = res.data.totalCount > 0 ? res.data.list : [];
    systemListCount.value = res.data.totalCount;
    loading.value = false
}
// 监听分页
function currentPageChange(current) {
    queryData.value.skip = (current - 1) * 10;
    getSystemList();
}
// 变更排序
function sortChange(e){
    queryData.value.prop = e.order ? e.prop : 'replyId';
    queryData.value.order = e.order ? e.order : 'descending';
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
    updateMyList();
    newReply.value = '';
    return true;
}
// 更新自定义回复
function updateMyList() {
    proxy.$storage.set(myList.value);
    emit('updateMyList');
}
// 删除自定义回复
function delReply(index) {
    myList.value.splice(index, 1);
    updateMyList();
}
// 分享自定义回复
function shareReply(index) {
    proxy.$api
        .replyInsert(myList.value[index])
        .then((res) => {
            proxy.$message.success(res.memo);
        })
        .catch((err) => {
            proxy.$message.error(err.memo);
        });
}
// 点赞网友分享的回复
function likeReply(index) {
    proxy.$api
        .likeCountUpdate(systemList.value[index].id)
        .then((res) => {
            systemList.value[index]['likeCount'] = res.data.likeCount
            proxy.$message.success(res.memo);
        })
        .catch((err) => {
            proxy.$message.error(err.memo);
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
        .collectCountUpdate(systemList.value[index].id)
        .then((res) => {
            addReply() && proxy.$message.success(res.memo);
        })
        .catch((err) => {
            proxy.$message.error(err.memo);
        });
}

function upQuickReplyData(){
    if(myList.length == 0){
        proxy.$message.error('无可同步数据');
        return false;
    }
    console.log('upload');
    proxy.$api.uploadBaiduFile();
}
function downQuickReplyData(){
    console.log('donwn');
    proxy.$api.selectBaiduFileList().then(res=>{
        console.log('res', res);
        if(res.errno != 0){
            proxy.$message.error('未同步任何数据');
            return false;
        }
    })
}
</script>

<template>
    <div class="setBox">
        <el-card class="box-card" shadow="never">
            <el-row :gutter="30">
                <el-col :span="9">
                    <el-card class="box-card" shadow="never">
                        <template #header class="clearfix">
                            <el-row :gutter="20" justify="space-between">
                                <el-col :span="4" :offset="0"><span>我在用的</span></el-col>
                                <el-col :span="5" :offset="0"></el-col>
                            </el-row>
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
                                            <el-button type="success" size="mini" icon="Share" circle
                                                @click="shareReply(index)"></el-button>
                                        </el-tooltip>
                                        <el-tooltip class="item" effect="dark" content="移除" placement="top-start">
                                            <el-button type="danger" size="mini" icon="DeleteFilled" circle
                                                @click="delReply(index)"></el-button>
                                        </el-tooltip>
                                    </div>
                                </li>
                            </ul>
                            <div v-if="myList.length == 0" class="tips">
                                <p>未设置快速回帖内容!</p>
                            </div>
                        </div>
                    </el-card>
                </el-col>
                <el-col :span="15">
                    <el-card class="box-card" shadow="never" :body-style="{padding: '0 20px 20px'}">
                        <template #header class="clearfix">
                            <span>网友分享的</span>
                        </template>

                        <el-table ref="filterTable" :data="systemList" size="small" stripe v-loading="loading" @sort-change="sortChange">
                            <el-table-column prop="replyId" label="ID" width="80"></el-table-column>
                            <el-table-column prop="content" label="内容"></el-table-column>
                            <el-table-column prop="likeCount" sortable="custom" width="100" label="点赞">
                                <template #default="scope">
                                    <el-tag type="info" size="mini">{{scope.row.likeCount}}</el-tag>
                                </template>
                            </el-table-column>
                            <el-table-column label="操作" width="100">
                                <template #default="scope">
                                    <el-tooltip class="item" effect="dark" content="给个赞" placement="top-start">
                                        <el-button type="success" size="mini" icon="Pointer" circle
                                            @click="likeReply(scope.$index)"></el-button>
                                    </el-tooltip>
                                    <el-tooltip class="item" effect="dark" content="收藏进我的" placement="top-start">
                                        <el-button type="danger" size="mini" icon="StarFilled" circle
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
                <el-input placeholder="请输入新的回复内容" v-model="newReply" :autosize="{ minRows: 1, maxRows: 3 }"
                    maxlength="100" :show-word-limit="true" resize="none" clearable class="input-with-select">
                    <template #append>
                        <el-button icon="Plus" @click="addReply"></el-button>
                    </template>
                </el-input>
            </div>
        </el-card>
    </div>
</template>

<style scoped lang="scss">
.setBox {}

.app-margin-right-30 {
    margin-right: 30px;
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
    color: #909399;
    font-size: 14px;
    text-align: center;
}

.quickReplyLoginBox .tips {
    margin-left: 20px;
    text-align: left;
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
</style>
