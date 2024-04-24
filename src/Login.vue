<template lang="">
    <div>
        <el-form v-if="formMode===1" ref="loginFormRef" :model="loginForm" :rules="loginRules" label-width="120px">
            <el-form-item label="用户名：" prop="username" required>
                <el-input v-model="loginForm.username" />
            </el-form-item>
            <el-form-item label="密码：" prop="password" required>
                <el-input v-model="loginForm.password" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="loginOnSubmit">登录</el-button>
                <div class="margin-left">
                    <el-space>
                        <el-link href="javascript:;" @click="formMode=0">注册</el-link>
                        <el-link href="javascript:;" @click="close">关闭</el-link>
                    </el-space>
                </div>
            </el-form-item>
        </el-form>
        <el-form v-else ref="registerFormRef" :model="loginForm" :rules="registerRules" label-width="120px">
            <el-form-item label="用户名：" prop="username" required>
                <el-input v-model="loginForm.username" />
            </el-form-item>
            <el-form-item label="密码：" prop="password" required>
                <el-input v-model="loginForm.password" />
            </el-form-item>
            <el-form-item label="确认密码：" prop="rePassword" required>
                <el-input v-model="loginForm.rePassword" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="registerOnSubmit">注册</el-button>
                <div class="margin-left">
                    <el-space>
                        <el-link href="javascript:;" @click="formMode=1">登录</el-link>
                        <el-link href="javascript:;" @click="close">关闭</el-link>
                    </el-space>
                </div>
            </el-form-item>
        </el-form>
    </div>
</template>
<script setup>
const {proxy} = getCurrentInstance()
const checkName = ((rule, value, callback)=>{
    if(!(/[0-9a-zA-Z@\.]{5,20}/.test(value))){
        callback('用户名5-20，只能包含字母、数字、“.”、“@”等')
    }
    callback()
})
const checkPassword = ((rule, value, callback)=>{
    if(!(/[0-9a-zA-Z\.\-_]{2,20}/.test(value))){
        callback('密码2-20，只能包含字母、数字、“.”、“-”、“_”等')
    }
    callback()
})
const checkRePassword = ((rule, value, callback)=>{
    if(value !== loginForm.value.password){
        callback('两次密码不一致')
    }
    callback()
})
const registerFormRef = ref()
const formMode = ref(1)
const registerRules = ref({
    username: [
        { required: true, message: '用户名不能为空', trigger: 'blur' },
        // { validator: checkName, trigger: 'blur'}
    ],
    password: [
        { required: true, message: '密码不能为空', trigger: 'blur' },
        { validator: checkPassword, trigger: 'blur'}
    ],
    rePassword: [
        { required: true, message: '确认密码不能为空', trigger: 'blur' },
        { validator: checkRePassword, trigger: 'blur'}
    ]
})
const loginFormRef = ref()
const loginForm = ref({
    username: '',
    password: '',
    rePassword: '',
})
const loginRules = ref({
    username: [
        { required: true, message: '用户名不能为空', trigger: 'blur' },
        { validator: checkName, trigger: 'blur'}
    ],
    password: [
        { required: true, message: '密码不能为空', trigger: 'blur' },
        { validator: checkPassword, trigger: 'blur'}
    ],
})
const emit = defineEmits(['onSuccess', 'onClose'])

const loginSuccess = (res) => {
    proxy.$storage.setUserInfo('userId', res.data.userId);
    emit('onSuccess')
}
const loginOnSubmit = () => {
    loginFormRef.value.validate(async (valid, fields)=>{
        if(valid){
            proxy.$api.login(loginForm.value).then(res=>{
                if(res.code != 0){
                    proxy.$message.error(res.message)
                    return false;
                }
                loginSuccess(res)
            }).catch(err=>{
                proxy.$message.error(err.message)
            })
        }
    })
}
const registerOnSubmit = () => {
    registerFormRef.value.validate(async (valid, fields)=>{
        if(valid){
            proxy.$api.register(loginForm.value).then(res=>{
                if(res.code != 0){
                    proxy.$message.error(res.message)
                    return false;
                }
                loginSuccess(res)
            }).catch(err=>{
                proxy.$message.error(err.message)
            })
        }
    })
}
const close = ()=>{
    emit('onClose')
}
</script>
<style lang="scss">
.margin-left {
    margin-left: 15px;
}
</style>
