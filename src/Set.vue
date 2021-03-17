<template>
  <div class="setBox" v-show="showSet">   
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>自定义设置</span>
      </div>
      <ul class="list" v-if="list.length > 0">
        <li v-for="(item, index) in list" :key="index">
          {{`${index+1}、${list[index]}`}} <el-button type="danger" size="mini" icon="el-icon-delete" circle @click="delReply(index)"></el-button>
        </li>
      </ul>
      <p v-if="list.length == 0" class="tips">未设置快速回帖内容!</p>
      <div class="addReplyBox">          
        <el-input placeholder="请输入回复内容" v-model="newReply" clearable class="input-with-select">
          <el-button slot="append" icon="el-icon-s-promotion" @click="addReply"></el-button>
        </el-input>
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
      type: 'Boolean',
      default: false
    },
  },
  watch: {
    showSet(newVal, oldVal){
      let vm = this;
      if(newVal == false && vm.list.length == 0){
        vm.$confirm('未设置快速回帖内容', '是否重置设置', {
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
    position: absolute;
    bottom: 52px;
    left: 0;
    z-index: 999;
    &::after{
      content: "";
      display: block;
      position: absolute;
      bottom: -4px;
      right: 70px;
      width: 6px;
      height: 6px;
      background-color: #fff;
      border: 0 solid transparent;
      border-right: 1px solid #ddd;
      border-bottom: 1px solid #ddd;
      transform: rotate(45deg);
    }
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
    width: 480px;
    .el-card__header {
      padding: 10px 20px;
      span{
        font-size: 14px;
      }
    }
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