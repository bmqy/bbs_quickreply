<template>
  <div class="setBox">   
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>{{$app.getName()}}</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="closeSetBox"><i class="el-icon-circle-close"></i></el-button>        
      </div>
      <el-row gutter="30">
        <el-col span="8">
          <el-card class="box-card" shadow="never">
            <div slot="header" class="clearfix">
              <span>我添加的</span>
            </div>
            <ul class="list" v-if="list.length > 0">
              <li v-for="(item, index) in list" :key="index">
                {{`${index+1}、${item.content}`}}
                <div class="list-right">            
                  <el-tooltip class="item" effect="dark" content="分享给大家用" placement="top-start">
                    <el-button type="success" size="mini" icon="el-icon-s-promotion" circle @click="delReply(index)"></el-button>
                  </el-tooltip>
                  <el-tooltip class="item" effect="dark" content="从我的回帖中移除" placement="top-start">
                    <el-button type="danger" size="mini" icon="el-icon-minus" circle @click="delReply(index)"></el-button>
                  </el-tooltip>
                </div>
              </li>
            </ul>
            <p v-if="list.length == 0" class="tips">未设置快速回帖内容!</p>
          </el-card>
          
        </el-col>
        <el-col span="16">
          <el-card class="box-card" shadow="never">
            <div slot="header" class="clearfix">
              <span>网友分享</span>
            </div>
            <ul class="list" v-if="list.length > 0">
              <li v-for="(item, index) in list" :key="index">
                {{`${index+1}、${item.content}`}}
                <div class="list-right">
                  <el-tooltip class="item" effect="dark" content="这句不错，给个赞" placement="top-start">
                    <el-button type="success" size="mini" icon="el-icon-thumb" circle @click="delReply(index)"></el-button>
                  </el-tooltip>
                  <el-tooltip class="item" effect="dark" content="收藏进我的回帖" placement="top-start">
                    <el-button type="danger" size="mini" icon="el-icon-star-off" circle @click="delReply(index)"></el-button>
                  </el-tooltip>
                </div>
              </li>
            </ul>
            <el-pagination
              background
              layout="prev, pager, next"
              :page-size=2
              :total="4">
            </el-pagination>
          </el-card>
        </el-col>
      </el-row>
      
      <div class="addReplyBox">          
        <el-input placeholder="请输入新的回复内容" v-model="newReply" clearable class="input-with-select">
          <el-button slot="append" icon="el-icon-plus" @click="addReply"></el-button>
        </el-input>
      </div>
      <div>
        <span class="demo-card-foot">{{`ver: ${$app.getVersion()}`}}</span>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data(){
    return {
      list: [],
      showAddBox: false,
      newReply: '',
    }
  },
  props: {
    showSet: {
      type: Boolean,
      default: false
    },
  },
  watch: {
    showSet(newVal, oldVal){
      let vm = this;
      if(newVal == false && vm.list.length == 0){
        vm.$confirm('未设置快速回帖内容，是否重置为默认设置？', '提示', {
          confirmButtonText: '是',
          cancelButtonText: '否',
          type: 'success',
        }).then(action => {
          vm.list = vm.$app.defaultReply;
        }).catch(() => {
          vm.$message.info('请输入自定义回复内容');
        });
        
        vm.$emit('update:showSet', true);
        vm.showSet = true;
        return false;
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    async getList(){
      let list = await this.$api.getSystemReply();
      this.list = this.$app.getStorage().length>0 ? this.$app.getStorage() : list;
      this.currentReply = this.list[0];
    },
    closeSetBox(){
      this.$emit('update:showSet', false);
    },
    delReply(index){
      this.list.splice(index, 1);
    },
    addReply(){
      if(this.newReply == ''){
        this.$message.error('回复内容不能为空！');
        return false;
      }
      if(this.list.indexOf(this.newReply) != -1){
        this.$message.error('已存在相同内容！');
        return false;
      }
      this.list.push(this.newReply);
      this.newReply = ''
    }
  },
}
</script>

<style scoped lang="less">
  .setBox{
  }
  .list {
    li{
      margin-bottom: 10px;
      font-size: 14px;
      line-height: 30px;
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      &:hover{
        background-color: #f5f5f5;
      }   
    }
  }
  .tips{
    color: #909399;
    font-size: 14px;
    text-align: center;
  }
  .addReplyBox{
    margin-top:15px;
    padding-top:10px;
    border-top:1px dashed #ccc;
  }
  .box-card {
    .el-card__header {
      padding: 10px 20px;
      span{
        font-size: 14px;
      }
    }
  }
  .demo-card-foot{
    padding: 10px 0;
    float: right;
    color: #909399;
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

</style>