<script setup name="quickReplySetAI">
const {proxy} = getCurrentInstance();
const geminiApiKey = ref('');
const useGemini = ref(false);
const qianwenApiKey = ref('');
const useQianwen = ref(false);
const kimiApiKey = ref('');
const useKimi = ref(false);
const useAI = ref('');
const emit = defineEmits(['updateAI']);
onBeforeMount(()=>{
    useAI.value = proxy.$storage.getUserInfo('useAI') || '';
    geminiApiKey.value = proxy.$storage.getUserInfo('geminiApiKey') || '';
    useGemini.value = useAI.value=='gemini';
    qianwenApiKey.value = proxy.$storage.getUserInfo('qianwenApiKey') || '';
    useQianwen.value = useAI.value=='qianwen';
    kimiApiKey.value = proxy.$storage.getUserInfo('kimiApiKey') || '';
    useKimi.value = useAI.value=='kimi';
});

function onGeminiApiKeyChange(e){
    proxy.$storage.setUserInfo('geminiApiKey', e)
}
function onGeminiChange(e){
    useAI.value = e ? 'gemini' : ''
    proxy.$storage.setUserInfo('useAI', useAI.value)
    proxy.$storage.setUserInfo('geminiApiKey', geminiApiKey.value || '')
    emit('updateAI');
}
function useGeminiBeforeChange(){
    if(!useGemini.value && !geminiApiKey.value){
        proxy.$message.error('请先填写：gemini api key')
        return false
    }
    return true
}
function onQianwenApiKeyChange(e){
    proxy.$storage.setUserInfo('qianwenApiKey', e)
}
function onQianwenChange(e){
    useAI.value = e ? 'qianwen' : ''
    proxy.$storage.setUserInfo('useAI', useAI.value)
    proxy.$storage.setUserInfo('qianwenApiKey', qianwenApiKey.value || '')
    emit('updateAI');
}
function useQianwenBeforeChange(){
    if(!useQianwen.value && !qianwenApiKey.value){
        proxy.$message.error('请先填写：通义千问 api key')
        return false
    }
    return true
}
function onKimiApiKeyChange(e){
    proxy.$storage.setUserInfo('kimiApiKey', e)
}
function onKimiChange(e){
    useAI.value = e ? 'kimi' : ''
    proxy.$storage.setUserInfo('useAI', useAI.value)
    proxy.$storage.setUserInfo('kimiApiKey', kimiApiKey.value || '')
    emit('updateAI');
}
function useKimiBeforeChange(){
    if(!useKimi.value && !kimiApiKey.value){
        proxy.$message.error('请先填写：Kimi api key')
        return false
    }
    return true
}
watch(useAI, (n, o) => {
    useGemini.value = n == 'gemini';
    useQianwen.value = n == 'qianwen';
    useKimi.value = n == 'kimi';
})
</script>

<template>
    <div class="setAIBox">
        <el-card class="box-card" shadow="never">
            <el-form label-width="auto">
                <el-form-item label="Gemini API Key">
                    <el-tooltip content="获取API Key：https://aistudio.google.com/app/apikey" placement="top">
                        <el-input v-model="geminiApiKey" @change="onGeminiApiKeyChange" />
                    </el-tooltip>
                </el-form-item>
                <el-form-item label="启用">
                <el-switch v-model="useGemini" @change="onGeminiChange" :before-change="useGeminiBeforeChange" />
                </el-form-item>
                <el-form-item label="通义千问 API Key">
                    <el-tooltip content="获取API Key：https://dashscope.console.aliyun.com/apiKey" placement="top">
                        <el-input v-model="qianwenApiKey" @change="onQianwenApiKeyChange" />
                    </el-tooltip>
                </el-form-item>
                <el-form-item label="启用">
                <el-switch v-model="useQianwen" @change="onQianwenChange" :before-change="useQianwenBeforeChange" />
                </el-form-item>
                <el-form-item label="Kimi API Key">
                    <el-tooltip content="获取API Key：https://platform.moonshot.cn/console/api-keys" placement="top">
                        <el-input v-model="kimiApiKey" @change="onKimiApiKeyChange" />
                    </el-tooltip>
                </el-form-item>
                <el-form-item label="启用">
                <el-switch v-model="useKimi" @change="onKimiChange" :before-change="useKimiBeforeChange" />
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<style scoped lang="scss">
.setAIBox {}

.box-card {
    .el-card__header {
        padding: 10px 20px;

        span {
            font-size: 14px;
        }
    }
}

:global(.setAIBox .el-input__inner) {
    margin-bottom: 0;
    background-color: transparent;
    border: 0;
    outline: none;
}
</style>
