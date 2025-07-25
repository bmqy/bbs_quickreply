<script setup name="quickReplySetAI">
import { computed, getCurrentInstance, onMounted, onUnmounted, ref } from 'vue';

const {proxy} = getCurrentInstance();
// AI基础配置
const activeTab = ref('general');
const currentAI = ref('');

// 通用设置
const systemRoleCustom = ref('');
const useSystemRoleCustom = ref(false);
const promptCustom = ref('');
const usePromptCustom = ref(false);

// Gemini配置
const geminiApiKey = ref('');
const geminiModel = ref('gemini-2.0-flash');

// 通义千问配置
const qianwenApiKey = ref('');
const qianwenModel = ref('qwen-turbo');

// Kimi配置
const kimiApiKey = ref('');
const kimiModel = ref('moonshot-v1-8k');

// ChatGPT配置
const chatgptDomain = ref('');
const chatgptApiKey = ref('');
const chatgptModel = ref('gpt-3.5-turbo');

// DeepSeek配置
const deepseekDomain = ref('');
const deepseekApiKey = ref('');
const deepseekModel = ref('deepseek-chat');

// Grok配置
const grokDomain = ref('');
const grokApiKey = ref('');
const grokModel = ref('grok-3-mini-beta');

const emit = defineEmits(['updateAI']);

// 可选的AI列表
const aiOptions = computed(() => {
    return [
        { value: 'gemini', label: `Gemini (${geminiModel.value})`, disabled: !geminiApiKey.value },
        { value: 'qianwen', label: `通义千问 (${qianwenModel.value})`, disabled: !qianwenApiKey.value },
        { value: 'kimi', label: `Kimi (${kimiModel.value})`, disabled: !kimiApiKey.value },
        { value: 'chatgpt', label: `ChatGPT (${chatgptModel.value})`, disabled: !chatgptApiKey.value },
        { value: 'deepseek', label: `DeepSeek (${deepseekModel.value})`, disabled: !deepseekApiKey.value },
        { value: 'grok', label: `Grok (${grokModel.value})`, disabled: !grokApiKey.value },
    ];
});

const useMobileLayout = ref(false);

onMounted(() => {
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
});

onUnmounted(() => {
    window.removeEventListener('resize', checkScreenSize);
});

function checkScreenSize() {
    useMobileLayout.value = window.innerWidth <= 768;
}

onBeforeMount(()=>{
    // 加载通用设置
    currentAI.value = proxy.$storage.getUserInfo('useAI') || '';
    systemRoleCustom.value = proxy.$storage.getUserInfo('systemRoleCustom') || '';
    useSystemRoleCustom.value = proxy.$storage.getUserInfo('useSystemRoleCustom') || false;
    promptCustom.value = proxy.$storage.getUserInfo('promptCustom') || '';
    usePromptCustom.value = proxy.$storage.getUserInfo('usePromptCustom') || false;
    
    // 加载各AI平台配置
    geminiApiKey.value = proxy.$storage.getUserInfo('geminiApiKey') || '';
    geminiModel.value = proxy.$storage.getUserInfo('geminiModel') || 'gemini-2.0-flash';
    
    qianwenApiKey.value = proxy.$storage.getUserInfo('qianwenApiKey') || '';
    qianwenModel.value = proxy.$storage.getUserInfo('qianwenModel') || 'qwen-turbo';

    kimiApiKey.value = proxy.$storage.getUserInfo('kimiApiKey') || '';
    kimiModel.value = proxy.$storage.getUserInfo('kimiModel') || 'moonshot-v1-8k';
    
    chatgptDomain.value = proxy.$storage.getUserInfo('chatgptDomain') || '';
    chatgptApiKey.value = proxy.$storage.getUserInfo('chatgptApiKey') || '';
    chatgptModel.value = proxy.$storage.getUserInfo('chatgptModel') || 'gpt-3.5-turbo';
    
    deepseekDomain.value = proxy.$storage.getUserInfo('deepseekDomain') || '';
    deepseekApiKey.value = proxy.$storage.getUserInfo('deepseekApiKey') || '';
    deepseekModel.value = proxy.$storage.getUserInfo('deepseekModel') || 'deepseek-chat';
    
    grokDomain.value = proxy.$storage.getUserInfo('grokDomain') || '';
    grokApiKey.value = proxy.$storage.getUserInfo('grokApiKey') || '';
    grokModel.value = proxy.$storage.getUserInfo('grokModel') || 'grok-3-mini-beta';
});

// 更新当前使用的AI模型
function onCurrentAIChange(value) {
    // 检查选择的AI是否有有效的配置
    if (value && !isAIConfigValid(value)) {
        proxy.$message.error(`${getAILabel(value)}配置不完整，请先完成配置`);
        currentAI.value = '';
        return;
    }
    
    proxy.$storage.setUserInfo('useAI', value);
    emit('updateAI');
}

// 检查AI配置是否有效
function isAIConfigValid(aiType) {
    switch(aiType) {
        case 'gemini': return !!geminiApiKey.value;
        case 'qianwen': return !!qianwenApiKey.value;
        case 'kimi': return !!kimiApiKey.value;
        case 'chatgpt': return !!chatgptApiKey.value;
        case 'deepseek': return !!deepseekApiKey.value;
        case 'grok': return !!grokApiKey.value;
        default: return false;
    }
}

// 获取AI的显示名称
function getAILabel(aiType) {
    const option = aiOptions.value.find(opt => opt.value === aiType);
    return option ? option.label : aiType;
}

// Domain 变更
function onDomainChange($event, aiName) {
    proxy.$storage.setUserInfo(aiName + 'Domain', $event);
    emit('updateAI');
}
// API Key 变更
function onApiKeyChange($event, aiName) {
    proxy.$storage.setUserInfo(aiName + 'ApiKey', $event);
    emit('updateAI');
}

// Model 变更
function onModelChange($event, aiName) {
    proxy.$storage.setUserInfo(aiName + 'Model', $event);
    emit('updateAI');
}

// 系统角色自定义
function onSystemRoleCustomChange(e) {
    proxy.$storage.setUserInfo('systemRoleCustom', e);
    emit('updateAI');
}

function onUseSystemRoleCustomChange(e) {
    if(!useSystemRoleCustom.value && !systemRoleCustom.value) {
        proxy.$message.error('请先填写：自定义 SystemRole');
        useSystemRoleCustom.value = false;
        return;
    }
    
    proxy.$storage.setUserInfo('useSystemRoleCustom', useSystemRoleCustom.value);
    proxy.$storage.setUserInfo('systemRoleCustom', systemRoleCustom.value);
    emit('updateAI');
}

// 提示词自定义
function onPromptCustomChange(e) {
    proxy.$storage.setUserInfo('promptCustom', e);
    emit('updateAI');
}

function onUsePromptCustomChange(e) {
    if(!usePromptCustom.value && !promptCustom.value) {
        proxy.$message.error('请先填写：自定义 Prompt');
        usePromptCustom.value = false;
        return;
    }
    
    if(!usePromptCustom.value && promptCustom.value.indexOf('{{title}}') == -1) {
        proxy.$message.error('请检查自定义 Prompt 中是否包含变量：{{title}}');
        usePromptCustom.value = false;
        return;
    }
    
    proxy.$storage.setUserInfo('usePromptCustom', usePromptCustom.value);
    proxy.$storage.setUserInfo('promptCustom', promptCustom.value);
    emit('updateAI');
}
</script>

<template>
    <div class="setAIBox">
        <el-card class="box-card" :body-style="{ padding: '0' }" shadow="never">
            <el-tabs v-model="activeTab" type="border-card">
                <!-- 通用设置 Tab -->
                <el-tab-pane label="通用设置" name="general">
                    <div class="tab-content">
                        <el-form :label-width="useMobileLayout ? 'auto' : '120'" 
                               :label-position="useMobileLayout ? 'top' : 'left'" 
                               size="small">
                            <el-form-item label="选择AI">
                                <el-select v-model="currentAI" placeholder="选择AI" @change="onCurrentAIChange" :style="useMobileLayout ? 'width: 100%' : 'width: 220px'">
                                    <el-option value="" label="请选择"></el-option>
                                    <el-option
                                        v-for="item in aiOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                        :disabled="item.disabled"
                                    >
                                        <span :style="{ color: item.disabled ? '#909399' : '#606266' }">{{ item.label }}</span>
                                        <span v-if="item.disabled" style="float: right; color: #E6A23C; font-size: 12px;">未配置</span>
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            
                            <el-form-item label="系统角色">
                                <el-tooltip content="自定义系统角色，帮你获得更个性化的回帖内容。" placement="top">
                                    <el-input type="textarea" v-model="systemRoleCustom" @change="onSystemRoleCustomChange" :placeholder="`默认：${proxy.$app.systemRole}`" />
                                </el-tooltip>
                            </el-form-item>
                            <el-form-item label="启用">
                                <el-switch v-model="useSystemRoleCustom" @change="onUseSystemRoleCustomChange" />
                            </el-form-item>
                            
                            <el-form-item label="提示词">
                                <el-tooltip content="自定义提示词，帮你获得更个性化的回帖内容。必须包含唯一变量：{{title}}" placement="top">
                                    <el-input type="textarea" v-model="promptCustom" @change="onPromptCustomChange" :placeholder="`默认：${proxy.$app.prompt}`" />
                                </el-tooltip>
                            </el-form-item>
                            <el-form-item label="启用">
                                <el-switch v-model="usePromptCustom" @change="onUsePromptCustomChange" />
                            </el-form-item>
                        </el-form>
                    </div>
                </el-tab-pane>
                
                <!-- Gemini Tab -->
                <el-tab-pane label="Gemini" name="gemini">
                    <div class="tab-content">
                        <div class="form-tips">
                            <el-alert
                                type="info"
                                :closable="false"
                                show-icon
                            >
                                <p style="margin: 0;">带 <span class="required-star">*</span> 标记的字段为必填项</p>
                            </el-alert>
                        </div>
                        <el-form :label-width="useMobileLayout ? 'auto' : '120'" 
                               :label-position="useMobileLayout ? 'top' : 'left'"
                               size="small">
                            <el-form-item label="API Key" required>
                                <el-tooltip content="获取API Key：https://aistudio.google.com/app/apikey" placement="top">
                                    <el-input v-model="geminiApiKey" @change="onApiKeyChange($event, 'gemini')" />
                                </el-tooltip>
                            </el-form-item>
                            <el-form-item label="模型选择" required>
                                <el-tooltip content="默认使用：gemini-2.0-flash，需接口支持" placement="top">
                                    <el-input v-model="geminiModel" @change="onModelChange($event, 'gemini')" placeholder="gemini-2.0-flash" />
                                </el-tooltip>
                                <el-link type="primary" :underline="false" href="https://ai.google.dev/gemini-api/docs/models" target="_blank" style="font-size: 12px;">可用模型</el-link>
                            </el-form-item>
                        </el-form>
                    </div>
                </el-tab-pane>
                
                <!-- 通义千问 Tab -->
                <el-tab-pane label="通义千问" name="qianwen">
                    <div class="tab-content">
                        <div class="form-tips">
                            <el-alert
                                type="info"
                                :closable="false"
                                show-icon
                            >
                                <p style="margin: 0;">带 <span class="required-star">*</span> 标记的字段为必填项</p>
                            </el-alert>
                        </div>
                        <el-form :label-width="useMobileLayout ? 'auto' : '120'" 
                               :label-position="useMobileLayout ? 'top' : 'left'"
                               size="small">
                            <el-form-item label="API Key" required>
                                <el-tooltip content="获取API Key：https://dashscope.console.aliyun.com/apiKey" placement="top">
                                    <el-input v-model="qianwenApiKey" @change="onApiKeyChange($event, 'qianwen')" />
                                </el-tooltip>
                            </el-form-item>
                            <el-form-item label="模型选择" required>
                                <el-tooltip content="默认使用：qwen-turbo，需接口支持" placement="top">
                                    <el-input v-model="qianwenModel" @change="onModelChange($event, 'qianwen')" placeholder="qwen-turbo" />
                                </el-tooltip>
                                <el-link type="primary" :underline="false" href="https://help.aliyun.com/zh/model-studio/models" target="_blank" style="font-size: 12px;">可用模型</el-link>
                            </el-form-item>
                        </el-form>
                    </div>
                </el-tab-pane>
                
                <!-- Kimi Tab -->
                <el-tab-pane label="Kimi" name="kimi">
                    <div class="tab-content">
                        <div class="form-tips">
                            <el-alert
                                type="info"
                                :closable="false"
                                show-icon
                            >
                                <p style="margin: 0;">带 <span class="required-star">*</span> 标记的字段为必填项</p>
                            </el-alert>
                        </div>
                        <el-form :label-width="useMobileLayout ? 'auto' : '120'" 
                               :label-position="useMobileLayout ? 'top' : 'left'"
                               size="small">
                            <el-form-item label="API Key" required>
                                <el-tooltip content="获取API Key：https://platform.moonshot.cn/console/api-keys" placement="top">
                                    <el-input v-model="kimiApiKey" @change="onApiKeyChange($event, 'kimi')" />
                                </el-tooltip>
                            </el-form-item>
                            <el-form-item label="模型选择" required>
                                <el-tooltip content="默认使用：moonshot-v1-8k，需接口支持" placement="top">
                                    <el-input v-model="kimiModel" @change="onModelChange($event, 'kimi')" placeholder="moonshot-v1-8k" />
                                </el-tooltip>
                                <el-link type="primary" :underline="false" href="https://platform.moonshot.cn/docs/pricing/chat#%E4%BA%A7%E5%93%81%E5%AE%9A%E4%BB%B7" target="_blank" style="font-size: 12px;">可用模型</el-link>
                            </el-form-item>
                        </el-form>
                    </div>
                </el-tab-pane>
                
                <!-- ChatGPT Tab -->
                <el-tab-pane label="ChatGPT" name="chatgpt">
                    <div class="tab-content">
                        <div class="form-tips">
                            <el-alert
                                type="info"
                                :closable="false"
                                show-icon
                            >
                                <p style="margin: 0;">带 <span class="required-star">*</span> 标记的字段为必填项</p>
                            </el-alert>
                        </div>
                        <el-form :label-width="useMobileLayout ? 'auto' : '120'" 
                               :label-position="useMobileLayout ? 'top' : 'left'"
                               size="small">
                            <el-form-item label="API Domain">
                                <el-tooltip content="请自行寻找可用域名，example: chat.customai.com" placement="top">
                                    <el-input v-model="chatgptDomain" @change="onDomainChange($event, 'chatgpt')" />
                                </el-tooltip>
                            </el-form-item>
                            <el-form-item label="API Key" required>
                                <el-tooltip content="按接口规则填写" placement="top">
                                    <el-input v-model="chatgptApiKey" @change="onApiKeyChange($event, 'chatgpt')" />
                                </el-tooltip>
                            </el-form-item>
                            <el-form-item label="模型选择" required>
                                <el-tooltip content="默认使用：gpt-3.5-turbo，需接口支持" placement="top">
                                    <el-input v-model="chatgptModel" @change="onModelChange($event, 'chatgpt')" placeholder="gpt-3.5-turbo" />
                                </el-tooltip>
                                <el-link type="primary" :underline="false" href="https://platform.openai.com/docs/models" target="_blank" style="font-size: 12px;">可用模型</el-link>
                            </el-form-item>
                        </el-form>
                    </div>
                </el-tab-pane>
                
                <!-- DeepSeek Tab -->
                <el-tab-pane label="DeepSeek" name="deepseek">
                    <div class="tab-content">
                        <div class="form-tips">
                            <el-alert
                                type="info"
                                :closable="false"
                                show-icon
                            >
                                <p style="margin: 0;">带 <span class="required-star">*</span> 标记的字段为必填项</p>
                            </el-alert>
                        </div>
                        <el-form :label-width="useMobileLayout ? 'auto' : '120'" 
                               :label-position="useMobileLayout ? 'top' : 'left'"
                               size="small">
                            <el-form-item label="API Domain">
                                <el-tooltip content="请自行寻找可用域名，example: chat.customai.com" placement="top">
                                    <el-input v-model="deepseekDomain" @change="onDomainChange($event, 'deepseek')" />
                                </el-tooltip>
                            </el-form-item>
                            <el-form-item label="API Key" required>
                                <el-tooltip content="按接口规则填写" placement="top">
                                    <el-input v-model="deepseekApiKey" @change="onApiKeyChange($event, 'deepseek')" />
                                </el-tooltip>
                            </el-form-item>
                            <el-form-item label="模型选择" required>
                                <el-tooltip content="默认使用：deepseek-chat，需接口支持" placement="top">
                                    <el-input v-model="deepseekModel" @change="onModelChange($event, 'deepseek')" placeholder="deepseek-chat" />
                                </el-tooltip>
                                <el-link type="primary" :underline="false" href="https://api-docs.deepseek.com/zh-cn/quick_start/pricing" target="_blank" style="font-size: 12px;">可用模型</el-link>
                            </el-form-item>
                        </el-form>
                    </div>
                </el-tab-pane>
                
                <!-- Grok Tab -->
                <el-tab-pane label="Grok" name="grok">
                    <div class="tab-content">
                        <div class="form-tips">
                            <el-alert
                                type="info"
                                :closable="false"
                                show-icon
                            >
                                <p style="margin: 0;">带 <span class="required-star">*</span> 标记的字段为必填项</p>
                            </el-alert>
                        </div>
                        <el-form :label-width="useMobileLayout ? 'auto' : '120'" 
                               :label-position="useMobileLayout ? 'top' : 'left'"
                               size="small">
                            <el-form-item label="API Domain">
                                <el-tooltip content="请自行寻找可用域名，example: chat.customai.com" placement="top">
                                    <el-input v-model="grokDomain" @change="onDomainChange($event, 'grok')" />
                                </el-tooltip>
                            </el-form-item>
                            <el-form-item label="API Key" required>
                                <el-tooltip content="按接口规则填写" placement="top">
                                    <el-input v-model="grokApiKey" @change="onApiKeyChange($event, 'grok')" />
                                </el-tooltip>
                            </el-form-item>
                            <el-form-item label="模型选择" required>
                                <el-tooltip content="默认使用：grok-3-mini-beta，需接口支持" placement="top">
                                    <el-input v-model="grokModel" @change="onModelChange($event, 'grok')" placeholder="grok-3-mini-beta" />
                                </el-tooltip>
                                <el-link type="primary" :underline="false" href="https://docs.x.ai/docs/models" target="_blank" style="font-size: 12px;">可用模型</el-link>
                            </el-form-item>
                        </el-form>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </el-card>
    </div>
</template>

<style scoped lang="scss">
.setAIBox {
    width: 100%;
}

.box-card {
    border: none;
    
    .el-card__header {
        padding: 0;
        margin: 0;
        border: none;
    }
    
    .el-card__body {
        padding: 0;
    }
}

.tab-content {
    padding: 20px;
}

.form-tips {
    margin-bottom: 20px;
}

.required-star {
    color: #F56C6C;
    font-weight: bold;
}

:global(.setAIBox .el-input__inner) {
    margin-bottom: 0;
    background-color: transparent;
    border: 0;
    outline: none;
}

:global(.setAIBox .el-tabs__content) {
    padding: 0;
}

:global(.setAIBox .el-tabs--border-card) {
    border: none;
    box-shadow: none;
}

:global(.setAIBox .el-tabs--border-card > .el-tabs__header) {
    background-color: #f5f7fa;
    border: 1px solid #e4e7ed;
    border-bottom: none;
    margin: 0;
}

:global(.setAIBox .el-tabs--border-card > .el-tabs__content) {
    border: 1px solid #e4e7ed;
    border-top: none;
}

/* 移动端优化样式 */
:global(.setAIBox .el-form--label-top .el-form-item__label) {
    padding: 0 0 8px;
}

@media (max-width: 768px) {
    .tab-content {
        padding: 15px 10px;
    }
    
    .form-tips {
        margin-bottom: 15px;
    }
    
    :global(.setAIBox .el-tabs__item) {
        padding: 0 10px !important;
    }
    
    :global(.setAIBox .el-form-item) {
        margin-bottom: 18px;
    }
    
    :global(.setAIBox .el-input__wrapper) {
        width: 100%;
    }
    
    :global(.setAIBox .el-form-item__label) {
        line-height: 1.5;
        margin-bottom: 4px;
        font-weight: 500;
    }
    
    :global(.setAIBox .el-form-item__content) {
        width: 100%;
    }
}
</style>
