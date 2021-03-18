<template>
  <div class="quickReplyBox">
    <el-form :inline="true" :model="list" size="small" class="demo-form-inline">
      <el-form-item>
          <div slot="label">            
              {{`${title}: `}}
          </div>
        <el-select v-model="currentReply" placeholder="请选择">
          <el-option v-for="(item, index) in list" key="index" :label="item" :value="item"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
          <el-button type="primary" class="btnQuickReplySet" icon="el-icon-s-tools" @click="openSet" :title="tips"></el-button>
      </el-form-item>
    </el-form>
    <set v-bind:showSet.sync="showSet" />
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
      this.getList();
    },
    computed: {
      title(){
        return this.$app.getNameSpace();
      },
      tips(){
        return `${this.$app.getNameSpace()}设置`;
      }
    },
    methods: {
      getList(){
        this.list = this.$app.getStorage();
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