<template>
  <div class="quickReplyBox">
    <el-form :inline="true" :model="list" size="small" class="demo-form-inline">
      <el-form-item>
          <div slot="label" :title="tips">            
              {{`${title}: `}}
          </div>
        <el-select v-model="currentReply" placeholder="请选择">
          <el-option v-for="(item, index) in list" key="index" :label="item" :value="item"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
          <el-button type="primary" class="btnQuickReplySet" icon="el-icon-s-tools" @click="openSet" :title="tips1"></el-button>
      </el-form-item>
    </el-form>
    <set :showSet="showSet" />
  </div>
</template>
<script>
  export default {
    data() {
      return {
        list: [],
        currentReply: '',
        showSet: false
      }
    },
    created() {
      this.getList()
    },
    computed: {
      title(){
        return this.TJs.getNameSpace();
      },
      tips(){
        return `名称: ${this.TJs.getName()} \n版本: ${this.TJs.getVersion()}`;
      },
      tips1(){
        return `${this.TJs.getNameSpace()}设置`;
      }
    },
    methods: {
      getList(){
        this.list = this.TJs.getStorage();
        this.currentReply = this.list[0];
      },
      openSet() {
        this.showSet = !this.showSet;
      }
    }
  }
</script>

<style scoped lang="less">
  .quickReplyBox{    
    position: relative;
  }
  .el-form-item__label div{
    font-weight: bold;
    color: red;
  }
  .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item {
    margin-bottom: 10px;
  }
  .el-select {
    width: 300px;
  }
</style>