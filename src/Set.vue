<template>
  <div>
    <div class="showSetBox" v-show="showSetBox">        
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>自定义设置</span>
          <el-button style="float: right; padding: 3px 0" type="text" @click="openAddReply">添加</el-button>
        </div>
        <div v-for="(item, index) in list" key="index" class="text item">
          {{list[index]}}
        </div>
      </el-card>
    </div>

    <div class="addbox" v-show="showAddBox">
      <el-input placeholder="请输入回复内容" v-model="input3" class="input-with-select">
        <el-button slot="append" icon="el-icon-s-promotion"></el-button>
      </el-input>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      showSetBox: false,
      showAddBox: false
    }
  },
  computed: {
    list(){
      return this.TJs.getStorage()
    }
  },
  methods: {
    openAddReply(){
      this.showAddBox = !this.showAddBox;
    }
  },
}
</script>

<style scoped language="less">
  .text {
    font-size: 14px;
  }
  .item {
    margin-bottom: 18px;
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
  .box-card {
    width: 480px;
  }

</style>