<template>
  <div class="quickReplyBox">
    <el-form :inline="true" size="small" class="demo-form-inline">
      <el-form-item>
          <div slot="label">            
              {{`${title}: `}}
          </div>
        <el-select v-model="currentReply" placeholder="请选择">
          <el-option v-for="(item, index) in list" :key="index" :label="item" :value="item"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
          <el-button type="primary" class="btnQuickReplySet" icon="el-icon-s-tools" @click="openSet" :title="tips"></el-button>
      </el-form-item>
    </el-form>

    <el-dialog
      :visible.sync="setShow"
      width="90%"
      append-to-body
      center> 
      <set />
    </el-dialog>

  </div>
</template>
<script>
  export default {
    data() {
      return {
        list: [],
        currentReply: '',
        setShow: false,
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
      // 获取自定义回复
      getList(){
        this.list = this.$app.getStorage();
        this.currentReply = this.list[0];
      },
      // 打开设置面板
      openSet() {
        this.setShow = !this.setShow;
      },
      // 绑定打开单独回帖面板事件
      bindFwinReplyOpen(){
        let vm = this;
        document.querySelector('body').addEventListener('click', (e)=>{
          if(e.target.className == 'fastre'){
            setTimeout(() => {                
              let $floatlayout_reply = document.querySelector('#floatlayout_reply');
              $floatlayout_reply.insertBefore(vm.$el, $floatlayout_reply.childNodes[0]);
            }, 2000);
          }
        }, true)
      },
      // 绑定打开快速回帖面板事件
      bindFastReplyOpen(){
        let vm = this;
        document.querySelector('body').addEventListener('click', (e)=>{
          if(e.target.className == 'replyfast'){
            setTimeout(() => {                
              let $floatlayout_reply = document.querySelector('#floatlayout_reply');
              $floatlayout_reply.insertBefore(vm.$el, $floatlayout_reply.childNodes[0]);
            }, 2000);
          }
        }, true)
      },
      // 绑定关闭单独回帖面板事件
      bindFwinReplyClose(){        
        let vm = this;
        document.querySelector('body').addEventListener('click', (e)=>{
          if(e.target.className == 'flbc'){
            let $fastposteditor = document.querySelector('#fastposteditor');
            $fastposteditor.insertBefore(vm.$el, $fastposteditor.childNodes[0]);
          }            
        }, true)
      }
    },
    mounted() {
      this.bindFwinReplyOpen();
      this.bindFastReplyOpen();
      this.bindFwinReplyClose();
    },
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