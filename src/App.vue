<template>
  <div class="quickReplyBox">
    <el-form :inline="true" size="small" class="demo-form-inline">
      <el-form-item>
          <div slot="label">            
              {{`${title}: `}}
          </div>
        <el-select v-model="currentReply" placeholder="请选择" @change="enterReply">
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
        hasFloatlayout: false, // 是否打开了弹层回复
        hasEditor: false, // 是否打开了高级回复
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
      // 移动快捷回复APP dom
      moveApp(){
        let vm = this;
        let $floatlayout_reply = document.querySelector('#floatlayout_reply');
        $floatlayout_reply.insertBefore(vm.$el, $floatlayout_reply.childNodes[0]);
      },
      // 设置回复内容
      enterReply(){
        let vm = this;
        if(vm.hasFloatlayout){
          vm.enterPostReply();
        } else if(vm.hasEditor) {
          vm.enterEditorReply();
        } else {
          vm.enterFastPostReply();
        }
      },
      // 设置回复框内容
      enterPostReply(){
        let vm = this;
        let $postmessage = document.querySelector('#postmessage');
        $postmessage.value = vm.currentReply;
      },
      // 设置快速回复框内容
      enterFastPostReply(){
        let vm = this;
        let $fastpostmessage = document.querySelector('#fastpostmessage');
        $fastpostmessage.style.background = '';
        $fastpostmessage.value = vm.currentReply;
      },
      // 设置高级回复框内容
      enterEditorReply(){
        let vm = this;
        let $editorIframe = document.querySelector('#e_iframe').contentWindow.document.body;
        $editorIframe.style.background = '';
        $editorIframe.innerHTML = vm.currentReply;
      },
      // 绑定打开单独回帖面板事件
      bindFwinReplyOpen(){
        let vm = this;
        document.querySelector('body').addEventListener('click', (e)=>{
          if(e.target.className == 'fastre'){
            vm.hasFloatlayout = false;
          }
        }, true)
      },
      // 绑定打开快速回帖面板事件
      bindFastReplyOpen(){
        let vm = this;
        document.querySelector('body').addEventListener('click', (e)=>{
          if(e.target.className == 'replyfast'){
            vm.hasFloatlayout = false;
          }
        }, true)
      },
      // 绑定关闭单独回帖面板事件
      bindFwinReplyClose(){        
        let vm = this;
        document.querySelector('body').addEventListener('click', (e)=>{
          if(e.target.className == 'flbc'){
            vm.hasFloatlayout = false;            
          }            
        }, true)
      },
      // 检测是否是高级回复
      checkEditor(){
        this.hasEditor = document.querySelector('#e_iframe');
      },
      // 监听回复弹层加载完成
      postReplyMutationObserver(){
        let vm = this;
        let mos =  new MutationObserver(function(mutations, observer){
          let targetId = 'floatlayout_reply';
          for (const mutation in mutations) {
            if (Object.hasOwnProperty.call(mutations, mutation)) {
              const element = mutations[mutation];
              if(element.target.id == targetId){
                console.log(mutations);
                vm.hasFloatlayout = true;
              }
            }
          }
        });
        mos.observe(document.querySelector('#append_parent'), { 
          attributes: true,
          childList: true,
          subtree: true 
        });
      }
    },
    mounted() {
      this.checkEditor();
      this.postReplyMutationObserver();
      this.enterReply();
      this.bindFwinReplyOpen();
      this.bindFastReplyOpen();
      this.bindFwinReplyClose();
    },
    watch: {
      hasFloatlayout(n, o){
        let vm = this;
        if(n){
          let $floatlayout_reply = document.querySelector('#floatlayout_reply');
          $floatlayout_reply.insertBefore(vm.$el, $floatlayout_reply.childNodes[0]);
          vm.enterPostReply();
        } else {
          let $fastposteditor = document.querySelector('#fastposteditor');
          $fastposteditor.insertBefore(vm.$el, $fastposteditor.childNodes[0]);
        }
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