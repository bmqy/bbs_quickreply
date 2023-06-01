<template lang="">
    <div>
        <el-form ref="formRef" :model="form" :rules="rules" label-width="120px">
            <el-form-item label="Token：" prop="token" required>
                <el-input v-model="form.token" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">确认</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script setup>
const {proxy} = getCurrentInstance()
const formRef = ref()
const form = ref({
    token: '123.75e16f652970fad2398af68c389cb2c4.YGYRkNk2oqS7LucCJ0QSSFFijEdFQnp7bglxtI5.l1mqWw',
})
const rules = reactive({
  token: [
    { required: true, message: 'token不能为空', trigger: 'blur' },
  ]
})

const onSubmit = () => {
    formRef.value.validate(async (valid, fields)=>{
        if(valid){
            let res = await proxy.$api.selectBaiduData({
                'access_token': form.value.token
            })
            if(res.errno != 0){
                proxy.$message.error(res.errmsg)
                return false;
            }

            proxy.$storage.setBaiduInfo('token', form.value.token);
            proxy.$storage.setBaiduInfo('netdisk_name', res.netdisk_name);
            proxy.$storage.setBaiduInfo('avatar_url', res.avatar_url);
            form.value.token = '';
        }
    })
}
</script>
<style lang="scss"></style>