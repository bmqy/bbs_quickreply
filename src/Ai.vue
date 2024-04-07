<script setup name="quickReplySetAI">
const {proxy} = getCurrentInstance();
const geminiApiKey = ref('');
const useGemini = ref(false);
const qianwenApiKey = ref('');
const useQianwen = ref(false);
const kimiApiKey = ref('');
const useKimi = ref(false);
const chatgptDomain = ref('');
const chatgptApiKey = ref('');
const chatgptModel = ref('gpt-3.5-turbo');
const chatgptModelList = ref([
    {value: 'gpt-4', label: 'gpt-4'},
    {value: 'gpt-4-0314', label: 'gpt-4-0314'},
    {value: 'gpt-4-0613', label: 'gpt-4-0613'},
    {value: 'gpt-4-32k', label: 'gpt-4-32k'},
    {value: 'gpt-4-32k-0314', label: 'gpt-4-32k-0314'},
    {value: 'gpt-4-32k-0613', label: 'gpt-4-32k-0613'},
    {value: 'gpt-4-1106-preview', label: 'gpt-4-1106-preview'},
    {value: 'gpt-4-vision-preview', label: 'gpt-4-vision-preview'},
    {value: 'gpt-3.5-turbo', label: 'gpt-3.5-turbo'},
    {value: 'gpt-3.5-turbo-0301', label: 'gpt-3.5-turbo-0301'},
    {value: 'gpt-3.5-turbo-0613', label: 'gpt-3.5-turbo-0613'},
    {value: 'gpt-3.5-turbo-1106', label: 'gpt-3.5-turbo-1106'},
    {value: 'gpt-3.5-turbo-16k', label: 'gpt-3.5-turbo-16k'},
    {value: 'gpt-3.5-turbo-16k-0613', label: 'gpt-3.5-turbo-16k-0613'},
]);
const useChatgpt = ref(false);
const useAI = ref('');
const promptCustom = ref('');
const usePromptCustom = ref(false);
const emit = defineEmits(['updateAI']);
onBeforeMount(()=>{
    useAI.value = proxy.$storage.getUserInfo('useAI') || '';
    geminiApiKey.value = proxy.$storage.getUserInfo('geminiApiKey') || '';
    useGemini.value = useAI.value=='gemini';
    qianwenApiKey.value = proxy.$storage.getUserInfo('qianwenApiKey') || '';
    useQianwen.value = useAI.value=='qianwen';
    kimiApiKey.value = proxy.$storage.getUserInfo('kimiApiKey') || '';
    useKimi.value = useAI.value=='kimi';
    chatgptDomain.value = proxy.$storage.getUserInfo('chatgptDomain') || '';
    chatgptApiKey.value = proxy.$storage.getUserInfo('chatgptApiKey') || '';
    chatgptModel.value = proxy.$storage.getUserInfo('chatgptModel') || '';
    useChatgpt.value = useAI.value=='chatgpt';
    promptCustom.value = proxy.$storage.getUserInfo('promptCustom') || '';
    usePromptCustom.value = proxy.$storage.getUserInfo('usePromptCustom') || false;
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
function onChatgptDomainChange(e){
    proxy.$storage.setUserInfo('chatgptDomain', e)
}
function onChatgptApiKeyChange(e){
    proxy.$storage.setUserInfo('chatgptApiKey', e)
}
function onChatgptModelChange(e){
    proxy.$storage.setUserInfo('chatgptModel', e)
    emit('updateAI');
}
function onChatgptChange(e){
    useAI.value = e ? 'chatgpt' : ''
    proxy.$storage.setUserInfo('useAI', useAI.value)
    proxy.$storage.setUserInfo('chatgptDomain', chatgptDomain.value || '')
    proxy.$storage.setUserInfo('chatgptApiKey', chatgptApiKey.value || '')
    proxy.$storage.setUserInfo('chatgptModel', chatgptModel.value || '')
    emit('updateAI');
}
function useChatgptBeforeChange(){
    if(!useChatgpt.value && !chatgptDomain.value){
        proxy.$message.error('请先填写：chatgpt api domain')
        return false
    }
    return true
}
function onPromptCustomChange(e){
    proxy.$storage.setUserInfo('promptCustom', e)
}
function onUsePromptCustomChange(e){
    proxy.$storage.setUserInfo('usePromptCustom', usePromptCustom.value)
    proxy.$storage.setUserInfo('promptCustom', promptCustom.value)
    emit('updateAI');
}
function usePromptCustomBeforeChange(){
    if(!usePromptCustom.value && !promptCustom.value){
        proxy.$message.error('请先填写：自定义 Prompt')
        return false
    }
    if(!usePromptCustom.value && promptCustom.value.indexOf('{{title}}') == -1){
        proxy.$message.error('请检查自定义 Prompt 中是否包含变量：{{title}}')
        return false
    }
    return true
}
watch(useAI, (n, o) => {
    useGemini.value = n == 'gemini';
    useQianwen.value = n == 'qianwen';
    useKimi.value = n == 'kimi';
    useChatgpt.value = n == 'chatgpt';
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
                <el-form-item label="Chatgpt Domain">
                    <el-tooltip content="请自行寻找可用域名，example: chat.customai.com" placement="top">
                        <el-input v-model="chatgptDomain" @change="onChatgptDomainChange" />
                    </el-tooltip>
                </el-form-item>
                <el-form-item label="Chatgpt API Key">
                    <el-tooltip content="按接口规则填写" placement="top">
                        <el-input v-model="chatgptApiKey" @change="onChatgptApiKeyChange" />
                    </el-tooltip>
                </el-form-item>
                <el-form-item label="Chatgpt Model">
                    <el-tooltip content="默认使用：gpt-3.5-turbo，需接口支持" placement="top">
                        <el-select
                            v-model="chatgptModel"
                            placeholder="Select"
                            size="large"
                            style="width: 240px"
                            @change="onChatgptModelChange"
                            >
                            <el-option
                                v-for="item in chatgptModelList"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            />
                            </el-select>
                    </el-tooltip>
                </el-form-item>
                <el-form-item label="启用">
                <el-switch v-model="useChatgpt" @change="onChatgptChange" :before-change="useChatgptBeforeChange" />
                </el-form-item>
                <el-form-item label="自定义 Prompt">
                    <el-tooltip content="自定义提示问语，帮你获得更个性化的回帖内容。必须包含唯一变量：{{title}}" placement="top">
                        <el-input type="textarea" v-model="promptCustom" @change="onPromptCustomChange" />
                    </el-tooltip>
                    <el-text class="mx-1" type="info">默认：{{proxy.$app.prompt}}</el-text>
                </el-form-item>
                <el-form-item label="启用">
                <el-switch v-model="usePromptCustom" @change="onUsePromptCustomChange" :before-change="usePromptCustomBeforeChange" />
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
