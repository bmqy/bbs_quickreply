<template lang="">
    <div>
        <!-- 添加登录方式切换 -->
        <el-tabs v-model="loginType" class="login-tabs">
            <el-tab-pane label="账号登录" name="account"></el-tab-pane>
            <el-tab-pane label="WebDAV" name="webdav"></el-tab-pane>
        </el-tabs>

        <!-- 账号登录表单 -->
        <el-form v-if="loginType === 'account' && formMode===1" ref="loginFormRef" :model="loginForm" :rules="loginRules" label-width="120px">
            <el-form-item label="用户名：" prop="username" required>
                <el-input v-model="loginForm.username" />
            </el-form-item>
            <el-form-item label="密码：" prop="password" required>
                <el-input v-model="loginForm.password" type="password" show-password />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="loginOnSubmit">登录</el-button>
                <div class="margin-left">
                    <el-space>
                        <el-button type="primary" text @click="formMode=0">注册</el-button>
                        <el-button type="primary" text @click="close">关闭</el-button>
                    </el-space>
                </div>
            </el-form-item>
        </el-form>

        <!-- 注册表单 -->
        <el-form v-if="loginType === 'account' && formMode===0" ref="registerFormRef" :model="loginForm" :rules="registerRules" label-width="120px">
            <el-form-item label="用户名：" prop="username" required>
                <el-input v-model="loginForm.username" />
            </el-form-item>
            <el-form-item label="密码：" prop="password" required>
                <el-input v-model="loginForm.password" type="password" show-password />
            </el-form-item>
            <el-form-item label="确认密码：" prop="rePassword" required>
                <el-input v-model="loginForm.rePassword" type="password" show-password />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="registerOnSubmit">注册</el-button>
                <div class="margin-left">
                    <el-space>
                        <el-button type="primary" text @click="formMode=1">登录</el-button>
                        <el-button type="primary" text @click="close">关闭</el-button>
                    </el-space>
                </div>
            </el-form-item>
        </el-form>

        <!-- WebDAV 登录表单 -->
        <el-form v-if="loginType === 'webdav'" ref="webdavFormRef" :model="webdavForm" :rules="webdavRules" label-width="120px">
            <el-form-item label="服务器：" prop="url" required>
                <el-input v-model="webdavForm.url" placeholder="例如: https://dav.jianguoyun.com/dav/" />
                <div class="form-tip">
                    <el-text type="primary" class="text-info">* 坚果云 WebDAV 地址格式：https://dav.jianguoyun.com/dav/</el-text>
                </div>
            </el-form-item>
            <el-form-item label="用户名：" prop="username" required>
                <el-input v-model="webdavForm.username" placeholder="请输入邮箱地址" />
            </el-form-item>
            <el-form-item label="密码：" prop="password" required>
                <el-input v-model="webdavForm.password" type="password" placeholder="请输入应用密码" show-password />
                <div class="form-tip">
                    <el-text type="primary" class="text-info">* 坚果云需要使用应用密码而非登录密码</el-text>
                </div>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="webdavLoginOnSubmit" :loading="webdavLoading">登录</el-button>
                <div class="margin-left">
                    <el-space>
                        <el-button type="primary" text @click="close">关闭</el-button>
                    </el-space>
                </div>
            </el-form-item>
            <el-space direction="vertical" alignment="flex-start" style="margin-top: 18px;">
                <div>
                    <el-text type="primary" class="text-info">* WebDAV 配置仅存储在本地，不会上传至云端</el-text>
                </div>
                <div>
                    <el-text type="primary" class="text-info">* 启用 WebDAV 后，所有的同步操作将通过 WebDAV 进行</el-text>
                </div>
            </el-space>
        </el-form>
    </div>
</template>
<script setup>
import { getCurrentInstance, ref } from 'vue';

const {proxy} = getCurrentInstance()
const checkName = ((rule, value, callback)=>{
    if(!(/[0-9a-zA-Z@\.]{5,20}/.test(value))){
        callback('用户名5-20，只能包含字母、数字、"."、"@"等')
    }
    callback()
})
const checkPassword = ((rule, value, callback)=>{
    if(!(/[0-9a-zA-Z\.\-_]{2,20}/.test(value))){
        callback('密码2-20，只能包含字母、数字、"."、"-"、"_"等')
    }
    callback()
})
const checkRePassword = ((rule, value, callback)=>{
    if(value !== loginForm.value.password){
        callback('两次密码不一致')
    }
    callback()
})
const checkWebDAVUrl = ((rule, value, callback)=>{
    if(!value) {
        callback('WebDAV 服务器地址不能为空')
        return
    }
    const urlPattern = /^https?:\/\/.+/i;
    if(!urlPattern.test(value)){
        callback('请输入有效的 WebDAV 服务器地址，以 http:// 或 https:// 开头')
    }
    callback()
})

// 登录方式切换
const loginType = ref('account');
const registerFormRef = ref()
const formMode = ref(1)
const registerRules = ref({
    username: [
        { required: true, message: '用户名不能为空', trigger: 'blur' },
        { validator: checkName, trigger: 'blur'}
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

// WebDAV 登录相关
const webdavFormRef = ref()
const webdavForm = ref({
    url: '',
    username: '',
    password: '',
})
const webdavLoading = ref(false)
const webdavRules = ref({
    url: [
        { required: true, message: 'WebDAV 服务器地址不能为空', trigger: 'blur' },
        { validator: checkWebDAVUrl, trigger: 'blur' }
    ],
    username: [
        { required: true, message: '用户名不能为空', trigger: 'blur' }
    ],
    password: [
        { required: true, message: '密码不能为空', trigger: 'blur' }
    ]
})

const emit = defineEmits(['onSuccess', 'onClose'])

const loginSuccess = (res) => {
    proxy.$storage.setUserInfo('userId', res.data.userId);
    emit('onSuccess')
}

const webdavLoginSuccess = () => {
    // 设置 WebDAV 配置
    const webdavConfig = {
        enabled: true,
        url: webdavForm.value.url,
        username: webdavForm.value.username,
        password: webdavForm.value.password
    };
    proxy.$storage.setUserInfo('webdavConfig', webdavConfig);
    
    // 设置一个特殊的 userId 标记为 WebDAV 登录
    proxy.$storage.setUserInfo('userId', 'webdav_user');
    emit('onSuccess');
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

const webdavLoginOnSubmit = () => {
    webdavFormRef.value.validate(async (valid, fields)=>{
        if(valid){
            webdavLoading.value = true;
            try {
                await testWebDAVConnection();
                webdavLoginSuccess();
                proxy.$message.success('WebDAV 登录成功');
            } catch (error) {
                proxy.$message.error('WebDAV 登录失败: ' + error.message);
            } finally {
                webdavLoading.value = false;
            }
        }
    })
}

const testWebDAVConnection = () => {
    return new Promise((resolve, reject) => {
        GM_xmlhttpRequest({
            method: 'PROPFIND',  // 使用 PROPFIND 更适合检测 WebDAV 服务器
            url: webdavForm.value.url,
            headers: {
                'Authorization': 'Basic ' + btoa(webdavForm.value.username + ':' + webdavForm.value.password),
                'Depth': '0',
                'Content-Type': 'application/xml',
            },
            data: '<?xml version="1.0" encoding="utf-8"?><propfind xmlns="DAV:"><prop><resourcetype/></prop></propfind>',
            timeout: 15000,  // 增加到15秒超时时间
            onload: function(response) {
                console.log("WebDAV 响应:", response.status, response);
                
                if (response.status >= 200 && response.status < 300 || response.status === 207) {
                    // 207 是 WebDAV 多状态响应，表示成功
                    resolve(true);
                } else if (response.status === 401) {
                    reject(new Error('认证失败：用户名或密码错误'));
                } else if (response.status === 404) {
                    reject(new Error('服务器地址错误：请确认输入了正确的WebDAV路径 (例如: https://dav.jianguoyun.com/dav/)'));
                } else {
                    reject(new Error(`连接失败: 状态码 ${response.status}，请检查服务器地址和认证信息`));
                }
            },
            onerror: function(error) {
                console.error('WebDAV连接错误:', error);
                reject(new Error('连接失败：无法连接到服务器，请检查URL是否正确或网络是否通畅'));
            },
            ontimeout: function() {
                reject(new Error('连接超时：请检查网络或服务器地址'));
            }
        });
    });
}

const close = ()=>{
    emit('onClose')
}
</script>
<style lang="scss">
.margin-left {
    margin-left: 15px;
}
.login-tabs {
    margin-bottom: 20px;
}
.form-tip {
    margin-top: 5px;
}
</style>
