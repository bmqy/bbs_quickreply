<template>
  <div class="setBox">   
    <el-card class="box-card" shadow="never">
      <div slot="header" class="clearfix">
        <span>{{$app.getName()}}</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="closeSetBox"><i class="el-icon-circle-close"></i></el-button>        
      </div>
      <ul class="list" v-if="list.length > 0">
        <li v-for="(item, index) in list" :key="index">
          {{`${index+1}、${list[index]}`}} <el-button type="danger" size="mini" icon="el-icon-delete" circle @click="delReply(index)"></el-button>
        </li>
      </ul>
      <p v-if="list.length == 0" class="tips">未设置快速回帖内容!</p>
      <div class="addReplyBox">          
        <el-input placeholder="请输入新的回复内容" v-model="newReply" clearable class="input-with-select">
          <el-button slot="append" icon="el-icon-s-promotion" @click="addReply"></el-button>
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
    getList(){
      this.list = this.$app.getStorage();
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
      &:hover{
        background-color: #f5f5f5;
      }
      .el-button{
        float: right;
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