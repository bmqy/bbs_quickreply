// ==UserScript==
// @name         论坛快捷回帖
// @namespace    bmqy.net
// @version      3.7.2
// @author       bmqy
// @description  使用自定义内容或本扩展预定义的回帖内容，快捷回复支持的论坛的发帖！
// @license      ISC
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4RpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo1NjY1Njk3Ni1hNmQ2LWQ1NDAtYTBlZC0yOTc4MzRkMTk3N2EiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RUMzMzI0MjVFQUFBMTFFNzg2NzE4QUI1NzM0QThGNTciIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RUMzMzI0MjRFQUFBMTFFNzg2NzE4QUI1NzM0QThGNTciIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6M2NjNjZkNGUtYzdhMC0wNTQwLWFiODEtZjJmYzJiMmM5MTE3IiBzdFJlZjpkb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6YzNjZGU3YmUtZWFhYS0xMWU3LTllYTUtYTJlMzRjY2Y4N2EyIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+6Z3FfgAACS1JREFUeNrkWwtMV1UYPyA+UBJ84fvJw3yRQgoiKjqblqWu16ZpaTVzWVsUtVorazKd09aLmWnWZlauh5k6sxZWA0FKFCEVEXyBLQ0V1CRQpO/D39XT2b3//7nnD/jg237zfy73nnu+75zzfb/vO1e/2tpa0ZTFXzRxafIGCLgZBpmbmyvKy8t1b28ZEhJSNXToUL272Qfc6IiPj9dVfj5hWGxsrHbfAYZWblS5cOGCzm1PEuYQVgcGBnq8MSMjo+7fhISEawaYN2+eyM7Ovlm38iTCB4QlhH+NfIA3q93AMorwJXTZovMAz/ytEgWiCd8QbiMUE/5oSmFwAOFrQme0MwlnbyUD9CT0dfhbH8y8/PctbjovLS31u5EM0JwwkHA/4S3Cr4SdhLE294Zi5gdI1zh8ZbngFX4pKSn+15MIdSKEYQ+PhjIRhNbSPdVY1rJ0g8OLUa7nEY7pvLiqqkpMmTJFhIaG1jSWAdjS4YRIAjOaEVC2l5fnzjAFkNqtCJ/D66uyjjmdjvKpqamipKSkNjw8vMGocHtCPwJz0TGEwZjtti774dXgh98dCR85bAmWQTDuXkKFneJZWVkiJydHJCcnX2XA9WWAMMzwSEIcZrqvQT+1CGWFhGws/zIrdMOQvGybOVBgxkHe4oQVhG3yrFuK+5oMtYWygzG7d8AA7QwUPgOFef+mE/LRtuPjGwhb4Sh5FUzD+1WJgCH/4kZSUlJgWlrapfz8/Iu+ZIO8ZxPxwggYwN9wdnmGdmCG+fchF30wxd0FXHYwwB7CfYQSbtCyb0bKV5qmw7yk3yTc1cCz61Z4C0y3uZ6PlVFi7e+goKDzpvUAzqzeh+d1M7vZ0uwWN1BUGQQHKwtT4KmEI3XholUrUVNTI06dOmVUEOGUctV1ml0duZuLHlJ7H5Q/bF04d+6cmDFjRl2K79YATDGX2dxXBOq5DcoWi+sj7HumSO39UP5/viQzM9O4JPY84rgsTE1TGnGGPcntXPHB7wPY80X1VRPsSphhw7CSfeg/Dt76HLh6ro8GYIccCK4wFf96yzHYR13SMQDH9A5yJQpRwER4kB8SZhFOI2wxm/sYDtb0MOIRTuSg/AGHHGMyeMlQkLJZnlaJbIDeyt8yHV6ik9l9i4TlUcIPMMCzhNe5JEf4xKDfGCjGChY43FODsliodC3SkwH8FQ4vy3nDmUoiTCSMI3xKOAlKu4DwGXxKcyXJ8dPodwhWT56He06DKMkSr+sDTip/6w4DXXZJUtiPLHQoTz2HdHYs2GUCDH8R979ro4AlXzC11xgDr9xJUjvWM4tBfTwxMTEeytYCZRopqyrsR5h99LcpX/HsbYYX3yG9Rwb7nVc0V4QnRyn3eUzxbXVC+tbpLW8B9qjHpXYH7B83Mgwe9wTaQXCGv4NcTQZXT/PgPBcRxvtggIMga/JKDtfxAWU2YWW4gQHKUJxsQ/iOMBe/LRmFkpcnecmHVP2Y4vT8bSpIjkXR35T2veDeV6lnZGSkWLZsmVN/d0ph70WHmRwCB1vqQYnxBqvPEn73bl1HqBogy+ZBdiobEU9bFxYWipUrV9r11RJkaj9+P+bwzq4IZzlenHOsD9tgu9KOUvIHRwPsB2uT42oBBrMG6MxGsJHBqARx8SIYcBIe0KuEt63ihY087IMB8hBZLOmLPMerAY7KWRXC2grQWVbsAUKqg5d+kPAPVlELDxxiI4hQD8JycaUUXqXs4U0Ie6ZyCLoIyRkP1DFAtQ3RGIlrvAWWQlHVCUwgvAwWZlVzKxwG9w7hCZS49kH5VeiT4/ds8IHReLeJnLVhsfG69QCmqjOldjRWwnl4Z57lN+DwMlAmmwolFkuMrMShOMrkp6dEmycg55gNujxcorJnhIsDDxtCNNlbRLOr7e1W2F+YNGCBwSZg9kYjyZmJcCdnXVul36UgQUnwI5ukv43B4JZiwDKPHy3MT6/Us36OKp11VkARCJGldAiY3RHFy273MoAt8Pjfo6Dpj/x9OZzf38jehoM9FsPYasgMA7kxIUSnJBbYBav1hLcVcNpm/8QZDGAP8n+u1/OJzk+EZwj3ICT9LK2OfAxWlTZSAcStlCqVKz9sW69bwG75xBkOYjqWdRflOqfJ88DbJ6LOF+XQxzQfCJGaWI3SNUCWTSkqxGAQaxyuP4Qy20hUndYJ5wo0FzZaGxohQ2kPUvty4tsFCCXWeR77g34eUlUn2YUwp7IwXo5Pa/bRHzF8p4EB8hHaW6DdB5Fpr7cVcFSptDYz3IsH5JcZir8PfOCQ4rwDwVi9boFLcGIe94+GXLJZhiYyzvC58zYTEKdjAJZ0m2JHM4NBbK4HA7Tz4dldNltKywC5SIZkQtTbYAD7PCQ8bgqtpqKG12BdAxSDzsoPmuTox4VzFVdXNvnwbHelXalrgHLdhEJD1vugABtwteGzATY8okjXAALFy/ogRKuwFdxKOQorZYbvTbZJgzf4YoBIQ4fEucBrQv+cgfftWiRdaQbv6wTlFym1Cy7ObtMhQnIcL5dYIBOicHRksg34zOA9DFAolafdwHq897DLfc5EbQS2aYyNw2ZqvADESNsAx0AmoqUVM8zQAAKUNwtp7iisiGwUXHZr9tESkzAAfcSg3dXLcwuRmQo3BqhBOIxWCNFKH5zaUWCt5v2dEYJjsCUGQGHdz9srofxi3YqQXULxuA0hqhH1LwFQrj+W8nC0exqywB/hB3I8vVAnr5e/z4uAZ82vB4U7imsfVY5Fv6xwkEFflSiCFKDW8IsO/9AxQCFIkUWCWqN+94LLAfphKUciuRmB330MjfcnYvpOVKcOwADVbpec7lKSWeBc5AobPDwXAoWjUPcbgtkNNlC2Wprd7VC6GEbwec/pCJ8FzBHXzvh4iX4lrhx8rkZ9rwUUjsMMR6BtctJ7ErO7Cz5oPwxQ2RBORzevT1E8KT87H6UtywDtDcZQA+V4q2VidguVPKTBxM0J7BLs16eU6+wcu7jMzooRXtORrx/EVmt0cWOAWsw2f8nBHzF003zG+gJ8B1DkkuU1jgEqK7W3F/sD/miSj8r4mKwXyIr1VUkJQmc6GF5jfkWqHzOhr5/1YXFeXp6oqKgw6asHuDgXP60jsRv+/+QHBweLqKgo8Z8AAwDLxAqw4SNMdgAAAABJRU5ErkJggg==
// @homepage     https://github.com/bmqy/bbs_quickreply#readme
// @homepageURL  https://github.com/bmqy/bbs_quickreply#readme
// @source       https://github.com/bmqy/bbs_quickreply.git
// @supportURL   https://github.com/bmqy/bbs_quickreply/issues
// @match        *://*/thread*.*
// @match        *://*/forum.php?mod==viewthread*
// @match        *://*/forum.php?mod=viewthread*
// @match        *://*/forum/forum.php?mod=viewthread*
// @match        *://*/forum/thread*
// @match        *://*/bbs/forum.php?mod=viewthread*
// @match        *://*/bbs/thread*.*
// @match        *://*/forum.php?mod=post*
// @match        *://www.nodeseek.com/post*
// @match        *://linux.do/*
// @match        *://meta.appinn.net/*
// @match        *://www.v2ex.com/t/*
// @require      https://cdn.jsdelivr.net/npm/vue@3.3.4/dist/vue.global.prod.js
// @require      data:application/javascript,%3Bwindow.Vue%3DVue%3B
// @require      https://cdn.jsdelivr.net/npm/element-plus@2.3.6/dist/index.full.min.js
// @require      https://cdn.jsdelivr.net/npm/@element-plus/icons-vue@2.1.0/dist/index.iife.min.js
// @resource     element-plus/dist/index.css  https://cdn.jsdelivr.net/npm/element-plus@2.3.6/dist/index.css
// @connect      quickreply.bmqy.net
// @connect      generativelanguage.googleapis.com
// @connect      dashscope.aliyuncs.com
// @connect      api.moonshot.cn
// @connect      api.openai.com
// @connect      *
// @grant        GM_getResourceText
// @grant        GM_getValue
// @grant        GM_info
// @grant        GM_listValues
// @grant        GM_setValue
// @grant        GM_xmlhttpRequest
// @grant        unsafeWindow
// ==/UserScript==

(a=>{const e=document.createElement("style");e.dataset.source="vite-plugin-monkey",e.textContent=a,document.head.append(e)})(' .quickReplyBox[data-v-029dc477]{position:relative}.quickReplyBox .el-form[data-v-029dc477]{text-align:left}.quickReplyBox .reply-form-inline .el-form-item[data-v-029dc477]{margin-bottom:15px}.el-dialog__footer a{text-decoration:none}.el-tabs__nav-next,.el-tabs__nav-prev{height:44px;display:flex;justify-content:center;align-items:center}.el-dialog{display:flex;flex-direction:column;margin:0!important;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);max-height:calc(100% - 30px);max-width:1300px;min-width:1000px}.el-dialog__header{margin-right:0!important}.el-dialog__body{flex:1;overflow:auto;padding:0}.quickReplyBox .el-input__inner{margin-bottom:0;background-color:transparent;border:0;outline:none}#reply-control.open{height:calc(var(--composer-height) + 65px)!important}#reply-control .reply-area{height:calc(100% - 91px)!important}.app-dialog-foot[data-v-029dc477]{color:#909399;font-size:14px}.quickReplyBoxTitle[data-v-029dc477]{margin-right:10px;font-weight:700;color:red}.el-form-item--mini.el-form-item[data-v-029dc477],.el-form-item--small.el-form-item[data-v-029dc477]{margin-bottom:10px}.el-select[data-v-029dc477]{width:300px}.el-dialog__footer{background-color:#fff}.app-margin-right-30[data-v-3e5595ab]{margin-right:30px}.my-list-tabs[data-v-3e5595ab]{border-radius:var(--el-card-border-radius);border:1px solid var(--el-card-border-color)}.list-left[data-v-3e5595ab]{padding-right:15px;display:flex;flex:1;align-items:stretch;justify-content:start}.list-number[data-v-3e5595ab]{margin-right:5px;color:#909399}.list-title[data-v-3e5595ab]{flex:1;font-weight:400}.list-right[data-v-3e5595ab]{min-width:70px}.list-right .el-badge.item[data-v-3e5595ab]{margin-right:30px}.list li[data-v-3e5595ab]{margin-bottom:5px;padding-bottom:5px;font-size:13px;line-height:30px;display:flex;align-items:flex-start;justify-content:space-between;border-bottom:1px solid #ebeef5}.list li[data-v-3e5595ab]:hover{background-color:#f5f5f5}.quickReplyLoginBox .tips[data-v-3e5595ab]{margin-left:50px;text-align:left;font-size:12px}.addReplyBox[data-v-3e5595ab]{margin-top:15px;padding-top:10px;border-top:1px dashed #ccc}.box-card .el-card__header[data-v-3e5595ab]{padding:10px 20px}.box-card .el-card__header span[data-v-3e5595ab]{font-size:14px}.clearfix[data-v-3e5595ab]:before,.clearfix[data-v-3e5595ab]:after{display:table;content:""}.clearfix[data-v-3e5595ab]:after{clear:both}.el-pagination[data-v-3e5595ab]{padding:15px 5px 0}.setBox .el-input__inner{margin-bottom:0;background-color:transparent;border:0;outline:none}.box-card .el-card__header[data-v-66d8ae03]{padding:10px 20px}.box-card .el-card__header span[data-v-66d8ae03]{font-size:14px}.setAIBox .el-input__inner{margin-bottom:0;background-color:transparent;border:0;outline:none}.margin-left{margin-left:15px} ');

(function (vue, ElementPlus, ElementPlusIconsVue) {
  'use strict';

  function _interopNamespaceDefault(e) {
    const n = Object.create(null, { [Symbol.toStringTag]: { value: 'Module' } });
    if (e) {
      for (const k in e) {
        if (k !== 'default') {
          const d = Object.getOwnPropertyDescriptor(e, k);
          Object.defineProperty(n, k, d.get ? d : {
            enumerable: true,
            get: () => e[k]
          });
        }
      }
    }
    n.default = e;
    return Object.freeze(n);
  }

  const ElementPlusIconsVue__namespace = /*#__PURE__*/_interopNamespaceDefault(ElementPlusIconsVue);

  const cssLoader = (e) => {
    const t = GM_getResourceText(e), o = document.createElement("style");
    return o.innerText = t, document.head.append(o), t;
  };
  cssLoader("element-plus/dist/index.css");
  var _GM_getValue = /* @__PURE__ */ (() => typeof GM_getValue != "undefined" ? GM_getValue : void 0)();
  var _GM_info = /* @__PURE__ */ (() => typeof GM_info != "undefined" ? GM_info : void 0)();
  var _GM_listValues = /* @__PURE__ */ (() => typeof GM_listValues != "undefined" ? GM_listValues : void 0)();
  var _GM_setValue = /* @__PURE__ */ (() => typeof GM_setValue != "undefined" ? GM_setValue : void 0)();
  var _GM_xmlhttpRequest = /* @__PURE__ */ (() => typeof GM_xmlhttpRequest != "undefined" ? GM_xmlhttpRequest : void 0)();
  var _unsafeWindow = /* @__PURE__ */ (() => typeof unsafeWindow != "undefined" ? unsafeWindow : void 0)();
  const _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  const _hoisted_1$3 = { class: "quickReplyBox" };
  const _hoisted_2$2 = {
    slot: "label",
    class: "quickReplyBoxTitle"
  };
  const _sfc_main$3 = {
    __name: "App",
    setup(__props) {
      const { proxy } = vue.getCurrentInstance();
      const list = vue.ref([]);
      const currentReply = vue.ref("");
      const currentPlatform = vue.ref("discuz");
      const fwin_replyLoaded = vue.ref(false);
      const submitNow = vue.ref(false);
      const hasEditor = vue.ref(false);
      const lastClickElement = vue.ref(false);
      const setShow = vue.ref(false);
      const useAI = vue.ref("");
      const loadingAIReply = vue.ref(false);
      const aiNameList = vue.ref({
        gemini: "Gemini Pro",
        qianwen: "通义千问-turbo",
        kimi: "Kimi",
        chatgpt: "ChatGPT"
      });
      const constVar = vue.ref({
        email: "",
        qq: "",
        wechat: "",
        url: "",
        base64: false
      });
      vue.onBeforeMount(() => {
        checkPlatform();
        getList();
        submitNow.value = proxy.$storage.getUserInfo("submitNow") || false;
        useAI.value = proxy.$storage.getUserInfo("useAI") || "";
        updateConstVar();
        updateAIModel();
      });
      function checkPlatform() {
        if (location.host.indexOf("nodeseek") > -1) {
          currentPlatform.value = "nodeseek";
        } else if (location.host.indexOf("v2ex") > -1) {
          currentPlatform.value = "v2ex";
        } else {
          let $generator = document.head.querySelector("meta[name=generator]");
          if ($generator) {
            if ($generator.content.indexOf("Discuz") > -1) {
              currentPlatform.value = "discuz";
            } else if ($generator.content.indexOf("Discourse") > -1) {
              currentPlatform.value = "discourse";
            }
          }
        }
      }
      async function getList() {
        let myListStorage = proxy.$storage.get();
        list.value = myListStorage && myListStorage.length > 0 ? myListStorage : [];
        currentReply.value = "";
      }
      function openSet() {
        setShow.value = true;
      }
      function closeSet() {
        setShow.value = false;
      }
      function updateAIModel() {
        useAI.value = proxy.$storage.getUserInfo("useAI") || "";
        let chatgptModel = proxy.$storage.getUserInfo("chatgptModel") || "gpt-3.5-turbo";
        if (useAI.value === "chatgpt") {
          aiNameList.value["chatgpt"] = `ChatGPT (${chatgptModel})`;
        }
      }
      function updateConstVar() {
        constVar.value = proxy.$storage.getUserInfo("constVar") || constVar.value;
      }
      function updateMyList(data) {
        let myListStorage = data || [];
        list.value = myListStorage;
      }
      async function getAIReply() {
        let title2 = "";
        if (loadingAIReply.value)
          return false;
        loadingAIReply.value = true;
        if (currentPlatform.value == "discuz") {
          title2 = document.querySelector("#thread_subject").innerText;
        } else if (currentPlatform.value == "discourse") {
          if (document.querySelector("#topic-title h1>a")) {
            title2 = document.querySelector("#topic-title h1>a").innerText;
          } else {
            title2 = document.querySelector("h1.header-title a").innerText;
          }
        } else if (currentPlatform.value == "nodeseek") {
          title2 = document.querySelector("h1>a.post-title-link").innerText;
        } else if (currentPlatform.value == "v2ex") {
          title2 = document.querySelector("#Main .header>h1").innerText;
        }
        if (!title2) {
          proxy.$message.error("无法获取帖子标题，请检查脚本是否支持此论坛");
          return false;
        }
        await proxy.$api.getAIReply(title2).then((res) => {
          currentReply.value = res;
          enterReply();
        }).catch((err) => {
          proxy.$message.error(err);
        }).finally(() => {
          loadingAIReply.value = false;
        });
      }
      function enterPostReply() {
        let $postmessage = document.querySelector("#postmessage");
        $postmessage.value = currentReply.value;
      }
      function enterEditorReply() {
        let $editorTextarea = document.querySelector("#e_textarea");
        let $editorIframe = document.querySelector("#e_iframe").contentWindow.document.body;
        $editorIframe.style.background = "";
        $editorIframe.innerHTML = currentReply.value || window.bbcode2html(`${$editorTextarea.value}`);
      }
      function fastreBindClick() {
        document.querySelector("body").addEventListener(
          "click",
          (e) => {
            let theElement = `fastre&${e.target.href}`;
            if (lastClickElement.value != theElement && e.target.className == "fastre") {
              lastClickElement.value = theElement;
              fwin_replyLoaded.value = false;
            }
          },
          true
        );
      }
      function replyfastBindClick() {
        document.querySelector("body").addEventListener(
          "click",
          (e) => {
            let theElement = `replyfast&${e.target.href}`;
            if (lastClickElement.value != theElement && e.target.className == "replyfast") {
              lastClickElement.value = theElement;
              fwin_replyLoaded.value = false;
            }
          },
          true
        );
      }
      function flbcBindClick() {
        document.querySelector("body").addEventListener(
          "click",
          (e) => {
            let theElement = `flbc&${e.target.href}`;
            if (lastClickElement.value != theElement && e.target.className == "flbc") {
              lastClickElement.value = theElement;
              fwin_replyLoaded.value = false;
            }
          },
          true
        );
      }
      function checkEditor() {
        hasEditor.value = document.querySelector("#e_iframe");
      }
      function postReplyMutationObserver() {
        let mos = new MutationObserver(function(mutations, observer) {
          for (const mutation in mutations) {
            if (Object.hasOwnProperty.call(mutations, mutation)) {
              const element = mutations[mutation];
              if (element.target.id == "subjecthide") {
                fwin_replyLoaded.value = true;
              }
            }
          }
        });
        if (document.querySelector("#append_parent")) {
          mos.observe(document.querySelector("#append_parent"), {
            attributes: true,
            childList: true,
            subtree: true
          });
        }
      }
      function enterReply() {
        currentReply.value = currentReply.value.replace("{email}", constVar.value.base64 ? proxy.$tools.encodeStr(constVar.value.email) : constVar.value.email);
        currentReply.value = currentReply.value.replace("{qq}", constVar.value.base64 ? proxy.$tools.encodeStr(constVar.value.qq) : constVar.value.qq);
        currentReply.value = currentReply.value.replace("{wechat}", constVar.value.base64 ? proxy.$tools.encodeStr(constVar.value.wechat) : constVar.value.wechat);
        currentReply.value = currentReply.value.replace("{url}", constVar.value.base64 ? proxy.$tools.encodeStr(constVar.value.url) : constVar.value.url);
        if (fwin_replyLoaded.value) {
          enterPostReply();
        } else if (hasEditor.value) {
          enterEditorReply();
        } else if (currentPlatform.value == "nodeseek") {
          enterMarkdownItReply();
        } else if (currentPlatform.value == "discourse") {
          enterDiscourseEmberReply();
        } else if (currentPlatform.value == "v2ex") {
          enterReplyContentReply();
        } else {
          enterFastPostReply();
        }
      }
      function enterMarkdownItReply() {
        _unsafeWindow.editor && _unsafeWindow.editor.setMarkdown && _unsafeWindow.editor.setMarkdown(currentReply.value);
        if (submitNow.value && !useAI.value && currentReply.value) {
          document.querySelector(".md-editor button.submit").click();
        }
      }
      function enterDiscourseEmberReply() {
        let $emberTextarea = document.querySelector("textarea.ember-text-area.d-editor-input");
        if ($emberTextarea) {
          $emberTextarea.value = currentReply.value;
          $emberTextarea.dispatchEvent(new Event("change"));
        }
        if (submitNow.value && !useAI.value && currentReply.value) {
          document.querySelector(".submit-panel button.btn.create").click();
          currentReply.value = "";
        }
      }
      function enterReplyContentReply() {
        let $replyContent = document.querySelector("textarea#reply_content");
        if ($replyContent) {
          $replyContent.value = currentReply.value;
        }
        if (submitNow.value && !useAI.value && currentReply.value) {
          document.querySelector('#reply-box input[type="submit"]').click();
          currentReply.value = "";
        }
      }
      function enterFastPostReply() {
        try {
          let $fastpostmessage = document.querySelector(
            "#fastpostmessage"
          );
          $fastpostmessage.style.background = "";
          $fastpostmessage.value = currentReply.value;
          if (submitNow.value && !useAI.value && currentReply.value) {
            document.querySelector("button#fastpostsubmit").click();
          }
        } catch (err) {
          console.log("请检查发帖权限！");
        }
      }
      const title = vue.computed(() => {
        return `${proxy.$app.getName()}`;
      });
      const tips = vue.computed(() => {
        return `${proxy.$app.getName()}，控制面板：
- 分享、收藏更多精彩回帖；
- 登录账号（登录后可打开脚本菜单同步你的回帖，在任何设备上恢复并使用）；
- AI及更多功能，请点击油猴图标打开脚本菜单开启或关闭；`;
      });
      vue.onMounted(() => {
        checkEditor();
        postReplyMutationObserver();
        enterReply();
        fastreBindClick();
        replyfastBindClick();
        flbcBindClick();
      });
      vue.watch(fwin_replyLoaded, (n) => {
        if (n) {
          let $floatlayout_reply = document.querySelector(
            "#floatlayout_reply"
          );
          $floatlayout_reply.insertBefore(
            proxy.$el,
            $floatlayout_reply.childNodes[0]
          );
          enterPostReply();
        } else {
          let $fastposteditor = document.querySelector(
            "#fastposteditor"
          );
          $fastposteditor.insertBefore(
            proxy.$el,
            $fastposteditor.childNodes[0]
          );
        }
      });
      return (_ctx, _cache) => {
        const _component_el_option = vue.resolveComponent("el-option");
        const _component_el_select = vue.resolveComponent("el-select");
        const _component_el_form_item = vue.resolveComponent("el-form-item");
        const _component_el_button = vue.resolveComponent("el-button");
        const _component_el_button_group = vue.resolveComponent("el-button-group");
        const _component_el_form = vue.resolveComponent("el-form");
        const _component_app_set = vue.resolveComponent("app-set");
        const _component_el_link = vue.resolveComponent("el-link");
        const _component_el_dialog = vue.resolveComponent("el-dialog");
        return vue.openBlock(), vue.createElementBlock("div", _hoisted_1$3, [
          vue.createVNode(vue.Transition, { name: "el-fade-in-linear" }, {
            default: vue.withCtx(() => [
              vue.createVNode(_component_el_form, {
                inline: true,
                class: "reply-form-inline"
              }, {
                default: vue.withCtx(() => [
                  vue.createVNode(_component_el_form_item, null, {
                    default: vue.withCtx(() => [
                      vue.createElementVNode("div", _hoisted_2$2, vue.toDisplayString(`${vue.unref(title)}: `), 1),
                      vue.createVNode(_component_el_select, {
                        modelValue: vue.unref(currentReply),
                        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => vue.isRef(currentReply) ? currentReply.value = $event : null),
                        placeholder: "请选择",
                        "no-data-text": "这里啥都没有...",
                        onChange: enterReply
                      }, {
                        default: vue.withCtx(() => [
                          (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(vue.unref(list), (item, index) => {
                            return vue.openBlock(), vue.createBlock(_component_el_option, {
                              key: index,
                              label: item,
                              value: item
                            }, null, 8, ["label", "value"]);
                          }), 128))
                        ]),
                        _: 1
                      }, 8, ["modelValue"])
                    ]),
                    _: 1
                  }),
                  vue.createVNode(_component_el_form_item, null, {
                    default: vue.withCtx(() => [
                      vue.createVNode(_component_el_button_group, null, {
                        default: vue.withCtx(() => [
                          vue.createVNode(_component_el_button, {
                            type: "primary",
                            class: "btnQuickReplySet",
                            icon: "tools",
                            onClick: openSet,
                            title: vue.unref(tips)
                          }, null, 8, ["title"]),
                          vue.unref(useAI) != "" ? (vue.openBlock(), vue.createBlock(_component_el_button, {
                            key: 0,
                            type: "success",
                            class: "btnQuickReplySet",
                            loading: vue.unref(loadingAIReply),
                            icon: "magicStick",
                            onClick: getAIReply,
                            title: `正在由【${vue.unref(aiNameList)[vue.unref(useAI)]}】为你提供创意回帖

Tips：使用AI就像开盲盒，请准备好是否接受结果再提交`
                          }, null, 8, ["loading", "title"])) : vue.createCommentVNode("", true)
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
            ]),
            _: 1
          }),
          vue.createVNode(_component_el_dialog, {
            modelValue: vue.unref(setShow),
            "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => vue.isRef(setShow) ? setShow.value = $event : null),
            onClose: closeSet,
            title: _ctx.$app.getName(),
            width: "75%",
            "show-close": true,
            "destroy-on-close": "",
            "append-to-body": ""
          }, {
            default: vue.withCtx(() => [
              vue.createVNode(_component_app_set, {
                ref: "setPanel",
                onUpdateMyList: updateMyList,
                onUpdateConstVar: updateConstVar,
                onUpdateAIModel: updateAIModel
              }, null, 512)
            ]),
            footer: vue.withCtx(() => [
              vue.createVNode(_component_el_link, {
                type: "info",
                href: "https://github.com/bmqy/bbs_quickreply?tab=readme-ov-file#%E6%9B%B4%E6%96%B0%E6%97%A5%E5%BF%97",
                title: "更新日志",
                target: "_blank"
              }, {
                default: vue.withCtx(() => [
                  vue.createTextVNode(vue.toDisplayString(`ver: ${_ctx.$app.getVersion()}`), 1)
                ]),
                _: 1
              })
            ]),
            _: 1
          }, 8, ["modelValue", "title"])
        ]);
      };
    }
  };
  const App = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-029dc477"]]);
  const _withScopeId = (n) => (vue.pushScopeId("data-v-3e5595ab"), n = n(), vue.popScopeId(), n);
  const _hoisted_1$2 = { class: "setBox" };
  const _hoisted_2$1 = {
    key: 0,
    class: "quickReplyLoginBox"
  };
  const _hoisted_3 = { style: { "margin-top": "15px" } };
  const _hoisted_4 = { key: 1 };
  const _hoisted_5 = {
    key: 0,
    class: "list"
  };
  const _hoisted_6 = { class: "list-left" };
  const _hoisted_7 = { class: "list-number" };
  const _hoisted_8 = { class: "list-title" };
  const _hoisted_9 = { class: "list-right" };
  const _hoisted_10 = {
    key: 1,
    class: "tips"
  };
  const _hoisted_11 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ vue.createElementVNode("p", null, "未设置快速回帖内容!", -1));
  const _hoisted_12 = [
    _hoisted_11
  ];
  const _hoisted_13 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ vue.createElementVNode("span", null, "网友分享的", -1));
  const _hoisted_14 = { key: 0 };
  const _hoisted_15 = { class: "addReplyBox" };
  const _sfc_main$2 = {
    __name: "Set",
    emits: ["updateMyList", "updateConstVar", "updateAIModel"],
    setup(__props, { emit }) {
      const { proxy } = vue.getCurrentInstance();
      const myList = vue.ref([]);
      const systemList = vue.ref([]);
      const systemListCount = vue.ref(0);
      const loading = vue.ref(false);
      const isLogin = vue.ref(false);
      const realtimeSync = vue.ref(false);
      const realtimeBackup = vue.ref(false);
      const submitNow = vue.ref(false);
      const currentTab = vue.ref("mine");
      const showLoginForce = vue.ref(false);
      const newReply = vue.ref("");
      const queryData = vue.ref({
        page: 1,
        prop: "replyId",
        order: "desc"
      });
      const constVar = vue.ref({
        email: "",
        qq: "",
        wechat: "",
        url: "",
        base64: false
      });
      vue.onBeforeMount(() => {
        isLogin.value = proxy.$storage.getUserInfo("userId");
        realtimeSync.value = proxy.$storage.getUserInfo("realtimeSync") || false;
        realtimeBackup.value = proxy.$storage.getUserInfo("realtimeBackup") || false;
        submitNow.value = proxy.$storage.getUserInfo("submitNow") || false;
        constVar.value = proxy.$storage.getUserInfo("constVar") || constVar.value;
        getMyList();
        getSystemList();
      });
      function getMyList() {
        let myListStorage = proxy.$storage.get();
        myList.value = myListStorage && myListStorage.length > 0 ? myListStorage : [];
      }
      async function getSystemList() {
        loading.value = true;
        let res = await proxy.$api.selectList(queryData.value.page, queryData.value.prop, queryData.value.order);
        systemList.value = res.data.totalCount > 0 ? res.data.list : [];
        systemListCount.value = res.data.totalCount;
        loading.value = false;
      }
      function currentPageChange(current) {
        queryData.value.page = current;
        getSystemList();
      }
      function sortChange(e) {
        queryData.value.prop = e.order ? e.prop : "replyId";
        queryData.value.order = e.order === "descending" || !e.order ? "desc" : "asc";
        getSystemList();
      }
      function addReply() {
        if (newReply.value == "") {
          proxy.$message.error("回复内容不能为空！");
          return false;
        }
        if (myList.value.indexOf(newReply.value) != -1) {
          proxy.$message.error("该回复已添加过！");
          newReply.value = "";
          return false;
        }
        if (myList.value.length >= 10) {
          proxy.$message.warning("自定义回复，超出条数上限！");
          return false;
        }
        myList.value.push(newReply.value);
        realtimeSync.value && upload();
        realtimeBackup.value && uploadAll();
        updateMyList();
        newReply.value = "";
        return true;
      }
      function updateMyList() {
        proxy.$storage.set(myList.value);
        emit("updateMyList", myList.value);
      }
      function delReply(index) {
        myList.value.splice(index, 1);
        updateMyList();
        realtimeSync.value && upload();
        realtimeBackup.value && uploadAll();
      }
      function shareReply(index) {
        proxy.$api.replyInsert(myList.value[index]).then((res) => {
          proxy.$message.success(res.message);
          getSystemList();
        }).catch((err) => {
          proxy.$message.error(err.message);
        });
      }
      function likeReply(index) {
        proxy.$api.likeCountUpdate(systemList.value[index].replyId).then((res) => {
          if (res.code == 0) {
            systemList.value[index]["likeCount"] = res.data.likeCount;
            proxy.$message.success("点赞成功");
          } else {
            proxy.$message.error(res.message);
          }
        }).catch((err) => {
          proxy.$message.error(err.message);
        });
      }
      function collectReply(index) {
        let nStr = systemList.value[index].content;
        if (myList.value.indexOf(nStr) != -1) {
          proxy.$message.error("该回复已添加过！");
          return false;
        }
        newReply.value = nStr;
        proxy.$api.collectCountUpdate(systemList.value[index].replyId).then((res) => {
          if (res.code == 0) {
            addReply() && proxy.$message.success("收藏成功");
            realtimeSync.value && upload();
            realtimeBackup.value && uploadAll();
          } else {
            proxy.$message.error(res.message);
          }
        }).catch((err) => {
          proxy.$message.error(err.message);
        });
      }
      function onLoginSuccess() {
        showLoginForce.value = false;
        isLogin.value = true;
        myList.value.length === 0 && download();
      }
      function upload() {
        proxy.$storage.uploadList();
      }
      async function download() {
        let list = await proxy.$storage.downloadList();
        myList.value = list;
        updateMyList();
      }
      function uploadAll() {
        proxy.$storage.uploadAll();
      }
      async function downloadAll() {
        let all = await proxy.$storage.downloadAll();
        myList.value = all.QuickReply || [];
        updateMyList();
      }
      function loginForce() {
        showLoginForce.value = !showLoginForce.value;
        currentTab.value = "mine";
      }
      function loginCancel() {
        showLoginForce.value = false;
        currentTab.value = "mine";
      }
      function logout() {
        proxy.$storage.setUserInfo("userId", "");
        isLogin.value = false;
      }
      function onRealtimeSyncChange(e) {
        realtimeSync.value = e;
        proxy.$storage.setUserInfo("realtimeSync", e);
        realtimeBackup.value && uploadAll();
      }
      function onRealtimeBackupChange(e) {
        realtimeBackup.value = e;
        proxy.$storage.setUserInfo("realtimeBackup", e);
        realtimeBackup.value && uploadAll();
      }
      function onSubmitNowChange(e) {
        submitNow.value = e;
        proxy.$storage.setUserInfo("submitNow", e);
        realtimeBackup.value && uploadAll();
      }
      function updateAI() {
        emit("updateAIModel");
        realtimeBackup.value && uploadAll();
      }
      function constVarChange() {
        proxy.$storage.setUserInfo("constVar", constVar.value);
        emit("updateConstVar");
        realtimeBackup.value && uploadAll();
      }
      return (_ctx, _cache) => {
        const _component_app_login = vue.resolveComponent("app-login");
        const _component_el_text = vue.resolveComponent("el-text");
        const _component_el_space = vue.resolveComponent("el-space");
        const _component_el_button = vue.resolveComponent("el-button");
        const _component_el_tooltip = vue.resolveComponent("el-tooltip");
        const _component_el_tab_pane = vue.resolveComponent("el-tab-pane");
        const _component_el_checkbox = vue.resolveComponent("el-checkbox");
        const _component_el_input = vue.resolveComponent("el-input");
        const _component_el_form_item = vue.resolveComponent("el-form-item");
        const _component_el_switch = vue.resolveComponent("el-switch");
        const _component_el_form = vue.resolveComponent("el-form");
        const _component_app_set_ai = vue.resolveComponent("app-set-ai");
        const _component_el_tabs = vue.resolveComponent("el-tabs");
        const _component_el_col = vue.resolveComponent("el-col");
        const _component_el_table_column = vue.resolveComponent("el-table-column");
        const _component_el_tag = vue.resolveComponent("el-tag");
        const _component_el_table = vue.resolveComponent("el-table");
        const _component_el_pagination = vue.resolveComponent("el-pagination");
        const _component_el_card = vue.resolveComponent("el-card");
        const _component_el_row = vue.resolveComponent("el-row");
        const _directive_loading = vue.resolveDirective("loading");
        return vue.openBlock(), vue.createElementBlock("div", _hoisted_1$2, [
          vue.createVNode(_component_el_card, {
            class: "box-card",
            shadow: "never"
          }, {
            default: vue.withCtx(() => [
              vue.createVNode(_component_el_row, { gutter: 30 }, {
                default: vue.withCtx(() => [
                  vue.createVNode(_component_el_col, { span: 9 }, {
                    default: vue.withCtx(() => [
                      vue.createVNode(_component_el_tabs, {
                        type: "border-card",
                        class: "my-list-tabs",
                        modelValue: vue.unref(currentTab),
                        "onUpdate:modelValue": _cache[8] || (_cache[8] = ($event) => vue.isRef(currentTab) ? currentTab.value = $event : null)
                      }, {
                        default: vue.withCtx(() => [
                          vue.createVNode(_component_el_tab_pane, {
                            name: "mine",
                            label: "我在用的"
                          }, {
                            default: vue.withCtx(() => [
                              vue.unref(myList).length === 0 && !vue.unref(isLogin) || vue.unref(showLoginForce) ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_2$1, [
                                vue.createElementVNode("div", _hoisted_3, [
                                  vue.createVNode(_component_app_login, {
                                    onOnSuccess: onLoginSuccess,
                                    onOnClose: loginCancel
                                  }),
                                  vue.createVNode(_component_el_space, {
                                    direction: "vertical",
                                    alignment: "flex-start"
                                  }, {
                                    default: vue.withCtx(() => [
                                      vue.createElementVNode("div", null, [
                                        vue.createVNode(_component_el_text, { type: "info" }, {
                                          default: vue.withCtx(() => [
                                            vue.createTextVNode("* 登录后，即可在任意设备同步你的配置；")
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      vue.createElementVNode("div", null, [
                                        vue.createVNode(_component_el_text, { type: "info" }, {
                                          default: vue.withCtx(() => [
                                            vue.createTextVNode("* 云端只负责保存账号及其回复列表，不留存多余信息；")
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      vue.createElementVNode("div", null, [
                                        vue.createVNode(_component_el_text, { type: "info" }, {
                                          default: vue.withCtx(() => [
                                            vue.createTextVNode("* 忘记密码无法恢复，可重新注册；")
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      vue.createElementVNode("div", null, [
                                        vue.createVNode(_component_el_text, { type: "info" }, {
                                          default: vue.withCtx(() => [
                                            vue.createTextVNode("* 如不需登录，也可忽略登录界面，直接使用即可；")
                                          ]),
                                          _: 1
                                        })
                                      ])
                                    ]),
                                    _: 1
                                  })
                                ])
                              ])) : (vue.openBlock(), vue.createElementBlock("div", _hoisted_4, [
                                !vue.unref(showLoginForce) || vue.unref(myList).length > 0 ? (vue.openBlock(), vue.createElementBlock("ul", _hoisted_5, [
                                  (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(vue.unref(myList), (item, index) => {
                                    return vue.openBlock(), vue.createElementBlock("li", { key: index }, [
                                      vue.createElementVNode("div", _hoisted_6, [
                                        vue.createElementVNode("div", _hoisted_7, vue.toDisplayString(`${index + 1}、`), 1),
                                        vue.createElementVNode("div", _hoisted_8, vue.toDisplayString(`${item}`), 1)
                                      ]),
                                      vue.createElementVNode("div", _hoisted_9, [
                                        vue.createVNode(_component_el_tooltip, {
                                          class: "item",
                                          effect: "dark",
                                          content: "分享它",
                                          placement: "top-start"
                                        }, {
                                          default: vue.withCtx(() => [
                                            vue.createVNode(_component_el_button, {
                                              type: "success",
                                              size: "small",
                                              icon: "Share",
                                              circle: "",
                                              onClick: ($event) => shareReply(index)
                                            }, null, 8, ["onClick"])
                                          ]),
                                          _: 2
                                        }, 1024),
                                        vue.createVNode(_component_el_tooltip, {
                                          class: "item",
                                          effect: "dark",
                                          content: "移除",
                                          placement: "top-start"
                                        }, {
                                          default: vue.withCtx(() => [
                                            vue.createVNode(_component_el_button, {
                                              type: "danger",
                                              size: "small",
                                              icon: "DeleteFilled",
                                              circle: "",
                                              onClick: ($event) => delReply(index)
                                            }, null, 8, ["onClick"])
                                          ]),
                                          _: 2
                                        }, 1024)
                                      ])
                                    ]);
                                  }), 128))
                                ])) : vue.createCommentVNode("", true),
                                vue.unref(myList).length == 0 ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_10, _hoisted_12)) : vue.createCommentVNode("", true)
                              ]))
                            ]),
                            _: 1
                          }),
                          vue.unref(isLogin) ? (vue.openBlock(), vue.createBlock(_component_el_tab_pane, {
                            key: 0,
                            name: "options",
                            label: "选项"
                          }, {
                            default: vue.withCtx(() => [
                              vue.createVNode(_component_el_space, {
                                direction: "vertical",
                                alignment: "flex-start"
                              }, {
                                default: vue.withCtx(() => [
                                  vue.createElementVNode("div", null, [
                                    vue.createVNode(_component_el_checkbox, {
                                      modelValue: vue.unref(realtimeSync),
                                      "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => vue.isRef(realtimeSync) ? realtimeSync.value = $event : null),
                                      label: "实时同步，本地回复列表修改后立即上传",
                                      size: "small",
                                      checked: vue.unref(realtimeSync),
                                      onChange: onRealtimeSyncChange
                                    }, null, 8, ["modelValue", "checked"])
                                  ]),
                                  vue.createElementVNode("div", null, [
                                    vue.createVNode(_component_el_checkbox, {
                                      modelValue: vue.unref(realtimeBackup),
                                      "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => vue.isRef(realtimeBackup) ? realtimeBackup.value = $event : null),
                                      label: "实时备份，本地回复列表及任一配置修改后立即备份至云端",
                                      size: "small",
                                      checked: vue.unref(realtimeBackup),
                                      onChange: onRealtimeBackupChange
                                    }, null, 8, ["modelValue", "checked"])
                                  ]),
                                  vue.createElementVNode("div", null, [
                                    vue.createVNode(_component_el_checkbox, {
                                      modelValue: vue.unref(submitNow),
                                      "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => vue.isRef(submitNow) ? submitNow.value = $event : null),
                                      label: "立即提交，选择快捷回帖内容后立即提交回帖",
                                      size: "small",
                                      checked: vue.unref(submitNow),
                                      onChange: onSubmitNowChange
                                    }, null, 8, ["modelValue", "checked"])
                                  ]),
                                  vue.createVNode(_component_el_space, {
                                    direction: "vertical",
                                    alignment: "flex-start",
                                    style: { "margin-top": "18px" }
                                  }, {
                                    default: vue.withCtx(() => [
                                      vue.createElementVNode("div", null, [
                                        vue.createVNode(_component_el_text, { type: "info" }, {
                                          default: vue.withCtx(() => [
                                            vue.createTextVNode("* AI和常量只存在本地，不参与同步")
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      vue.createElementVNode("div", null, [
                                        vue.createVNode(_component_el_text, { type: "info" }, {
                                          default: vue.withCtx(() => [
                                            vue.createTextVNode("* 如需备份所有配置请使用操作中的全量备份、全量恢复")
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      vue.createElementVNode("div", null, [
                                        vue.createVNode(_component_el_text, { type: "info" }, {
                                          default: vue.withCtx(() => [
                                            vue.createTextVNode("* 全量备份仅为方便多设备同步配置，使用base64存储，请知悉")
                                          ]),
                                          _: 1
                                        })
                                      ])
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })) : vue.createCommentVNode("", true),
                          vue.unref(isLogin) ? (vue.openBlock(), vue.createBlock(_component_el_tab_pane, {
                            key: 1,
                            name: "constVar",
                            label: "常量"
                          }, {
                            default: vue.withCtx(() => [
                              vue.createVNode(_component_el_form, {
                                model: vue.unref(constVar),
                                "label-width": "60",
                                style: { "max-width": "600px" }
                              }, {
                                default: vue.withCtx(() => [
                                  vue.createVNode(_component_el_form_item, { label: "邮箱" }, {
                                    default: vue.withCtx(() => [
                                      vue.createVNode(_component_el_input, {
                                        modelValue: vue.unref(constVar).email,
                                        "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => vue.unref(constVar).email = $event),
                                        onChange: constVarChange
                                      }, null, 8, ["modelValue"])
                                    ]),
                                    _: 1
                                  }),
                                  vue.createVNode(_component_el_form_item, { label: "QQ" }, {
                                    default: vue.withCtx(() => [
                                      vue.createVNode(_component_el_input, {
                                        modelValue: vue.unref(constVar).qq,
                                        "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => vue.unref(constVar).qq = $event),
                                        onChange: constVarChange
                                      }, null, 8, ["modelValue"])
                                    ]),
                                    _: 1
                                  }),
                                  vue.createVNode(_component_el_form_item, { label: "微信" }, {
                                    default: vue.withCtx(() => [
                                      vue.createVNode(_component_el_input, {
                                        modelValue: vue.unref(constVar).wechat,
                                        "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => vue.unref(constVar).wechat = $event),
                                        onChange: constVarChange
                                      }, null, 8, ["modelValue"])
                                    ]),
                                    _: 1
                                  }),
                                  vue.createVNode(_component_el_form_item, { label: "网址" }, {
                                    default: vue.withCtx(() => [
                                      vue.createVNode(_component_el_input, {
                                        modelValue: vue.unref(constVar).url,
                                        "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => vue.unref(constVar).url = $event),
                                        onChange: constVarChange
                                      }, null, 8, ["modelValue"])
                                    ]),
                                    _: 1
                                  }),
                                  vue.createVNode(_component_el_form_item, { label: "加密" }, {
                                    default: vue.withCtx(() => [
                                      vue.createVNode(_component_el_switch, {
                                        modelValue: vue.unref(constVar).base64,
                                        "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => vue.unref(constVar).base64 = $event),
                                        onChange: constVarChange
                                      }, null, 8, ["modelValue"])
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }, 8, ["model"]),
                              vue.createVNode(_component_el_space, {
                                direction: "vertical",
                                alignment: "flex-start"
                              }, {
                                default: vue.withCtx(() => [
                                  vue.createElementVNode("div", null, [
                                    vue.createVNode(_component_el_text, { type: "info" }, {
                                      default: vue.withCtx(() => [
                                        vue.createTextVNode("* 可在快捷回帖中使用以上常量：{email}、{qq}、{wechat}、{url}，例：我的邮箱是{email}，我的QQ是{qq}；")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  vue.createElementVNode("div", null, [
                                    vue.createVNode(_component_el_text, { type: "info" }, {
                                      default: vue.withCtx(() => [
                                        vue.createTextVNode("* 开启加密后，只在回帖时显示base64加密后的常量；")
                                      ]),
                                      _: 1
                                    })
                                  ])
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })) : vue.createCommentVNode("", true),
                          vue.createVNode(_component_el_tab_pane, {
                            name: "ai",
                            label: "AI"
                          }, {
                            default: vue.withCtx(() => [
                              vue.createVNode(_component_app_set_ai, {
                                ref: "setAIPanel",
                                onUpdateAI: updateAI
                              }, null, 512)
                            ]),
                            _: 1
                          }),
                          vue.createVNode(_component_el_tab_pane, {
                            name: "actions",
                            label: "操作"
                          }, {
                            default: vue.withCtx(() => [
                              vue.createVNode(_component_el_space, { wrap: "" }, {
                                default: vue.withCtx(() => [
                                  !vue.unref(isLogin) ? (vue.openBlock(), vue.createBlock(_component_el_button, {
                                    key: 0,
                                    type: "success",
                                    icon: "UserFilled",
                                    size: "small",
                                    onClick: loginForce
                                  }, {
                                    default: vue.withCtx(() => [
                                      vue.createTextVNode("登录，登录后即可在任意设备同步你的配置")
                                    ]),
                                    _: 1
                                  })) : vue.createCommentVNode("", true),
                                  vue.unref(isLogin) ? (vue.openBlock(), vue.createBlock(_component_el_button, {
                                    key: 1,
                                    type: "danger",
                                    icon: "SwitchButton",
                                    size: "small",
                                    onClick: logout
                                  }, {
                                    default: vue.withCtx(() => [
                                      vue.createTextVNode("注销，注销登录后将不能再同步列表")
                                    ]),
                                    _: 1
                                  })) : vue.createCommentVNode("", true),
                                  vue.unref(isLogin) ? (vue.openBlock(), vue.createBlock(_component_el_button, {
                                    key: 2,
                                    type: "primary",
                                    icon: "Upload",
                                    size: "small",
                                    onClick: upload
                                  }, {
                                    default: vue.withCtx(() => [
                                      vue.createTextVNode("上传，上传本地列表会覆盖云端数据")
                                    ]),
                                    _: 1
                                  })) : vue.createCommentVNode("", true),
                                  vue.unref(isLogin) ? (vue.openBlock(), vue.createBlock(_component_el_button, {
                                    key: 3,
                                    type: "warning",
                                    icon: "Download",
                                    size: "small",
                                    onClick: download
                                  }, {
                                    default: vue.withCtx(() => [
                                      vue.createTextVNode("下载，下载云端列表会覆盖本地数据")
                                    ]),
                                    _: 1
                                  })) : vue.createCommentVNode("", true),
                                  vue.unref(isLogin) ? (vue.openBlock(), vue.createBlock(_component_el_button, {
                                    key: 4,
                                    type: "primary",
                                    icon: "Upload",
                                    size: "small",
                                    onClick: uploadAll
                                  }, {
                                    default: vue.withCtx(() => [
                                      vue.createTextVNode("全量备份，全量备份本地所有配置信息到云端")
                                    ]),
                                    _: 1
                                  })) : vue.createCommentVNode("", true),
                                  vue.unref(isLogin) ? (vue.openBlock(), vue.createBlock(_component_el_button, {
                                    key: 5,
                                    type: "warning",
                                    icon: "Download",
                                    size: "small",
                                    onClick: downloadAll
                                  }, {
                                    default: vue.withCtx(() => [
                                      vue.createTextVNode("全量恢复，全量恢复云端配置信息覆盖本地数据")
                                    ]),
                                    _: 1
                                  })) : vue.createCommentVNode("", true)
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }, 8, ["modelValue"])
                    ]),
                    _: 1
                  }),
                  vue.createVNode(_component_el_col, { span: 15 }, {
                    default: vue.withCtx(() => [
                      vue.createVNode(_component_el_card, {
                        class: "box-card",
                        shadow: "never",
                        "body-style": { padding: "0 20px 20px" }
                      }, {
                        header: vue.withCtx(() => [
                          _hoisted_13
                        ]),
                        default: vue.withCtx(() => [
                          vue.withDirectives((vue.openBlock(), vue.createBlock(_component_el_table, {
                            ref: "filterTable",
                            data: vue.unref(systemList),
                            size: "small",
                            stripe: "",
                            onSortChange: sortChange
                          }, {
                            default: vue.withCtx(() => [
                              vue.createVNode(_component_el_table_column, {
                                prop: "replyId",
                                label: "ID",
                                width: "80"
                              }),
                              vue.createVNode(_component_el_table_column, {
                                prop: "content",
                                label: "内容"
                              }, {
                                default: vue.withCtx((scope) => [
                                  _ctx.$app.isNew(scope.row.created) ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_14, [
                                    vue.createTextVNode(vue.toDisplayString(scope.row.content) + " ", 1),
                                    vue.createVNode(_component_el_tooltip, {
                                      class: "item",
                                      effect: "dark",
                                      content: "7天内新增",
                                      placement: "top-start"
                                    }, {
                                      default: vue.withCtx(() => [
                                        vue.createVNode(_component_el_tag, {
                                          type: "primary",
                                          effect: "dark",
                                          size: "small",
                                          round: "",
                                          style: { "transform": "scale(0.7)" }
                                        }, {
                                          default: vue.withCtx(() => [
                                            vue.createTextVNode(" NEW ")
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    })
                                  ])) : vue.createCommentVNode("", true)
                                ]),
                                _: 1
                              }),
                              vue.createVNode(_component_el_table_column, {
                                prop: "likeCount",
                                sortable: "custom",
                                width: "100",
                                label: "点赞"
                              }, {
                                default: vue.withCtx((scope) => [
                                  vue.createVNode(_component_el_tag, {
                                    type: "info",
                                    size: "small"
                                  }, {
                                    default: vue.withCtx(() => [
                                      vue.createTextVNode(vue.toDisplayString(scope.row.likeCount), 1)
                                    ]),
                                    _: 2
                                  }, 1024)
                                ]),
                                _: 1
                              }),
                              vue.createVNode(_component_el_table_column, {
                                label: "操作",
                                width: "100"
                              }, {
                                default: vue.withCtx((scope) => [
                                  vue.createVNode(_component_el_tooltip, {
                                    class: "item",
                                    effect: "dark",
                                    content: "给个赞",
                                    placement: "top-start"
                                  }, {
                                    default: vue.withCtx(() => [
                                      vue.createVNode(_component_el_button, {
                                        type: "success",
                                        size: "small",
                                        icon: "Pointer",
                                        circle: "",
                                        onClick: ($event) => likeReply(scope.$index)
                                      }, null, 8, ["onClick"])
                                    ]),
                                    _: 2
                                  }, 1024),
                                  vue.createVNode(_component_el_tooltip, {
                                    class: "item",
                                    effect: "dark",
                                    content: "收藏进我的",
                                    placement: "top-start"
                                  }, {
                                    default: vue.withCtx(() => [
                                      vue.createVNode(_component_el_button, {
                                        type: "danger",
                                        size: "small",
                                        icon: "StarFilled",
                                        circle: "",
                                        onClick: ($event) => collectReply(scope.$index)
                                      }, null, 8, ["onClick"])
                                    ]),
                                    _: 2
                                  }, 1024)
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }, 8, ["data"])), [
                            [_directive_loading, vue.unref(loading)]
                          ]),
                          vue.createVNode(_component_el_pagination, {
                            background: "",
                            layout: "prev, pager, next",
                            "page-size": 10,
                            "pager-count": 5,
                            onCurrentChange: currentPageChange,
                            total: vue.unref(systemListCount)
                          }, null, 8, ["total"])
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              vue.createElementVNode("div", _hoisted_15, [
                vue.createVNode(_component_el_input, {
                  placeholder: "请输入新的回复内容",
                  modelValue: vue.unref(newReply),
                  "onUpdate:modelValue": _cache[9] || (_cache[9] = ($event) => vue.isRef(newReply) ? newReply.value = $event : null),
                  autosize: { minRows: 1, maxRows: 3 },
                  maxlength: "100",
                  "show-word-limit": true,
                  resize: "none",
                  clearable: "",
                  class: "input-with-select"
                }, {
                  append: vue.withCtx(() => [
                    vue.createVNode(_component_el_button, {
                      icon: "Plus",
                      onClick: addReply
                    })
                  ]),
                  _: 1
                }, 8, ["modelValue"])
              ])
            ]),
            _: 1
          })
        ]);
      };
    }
  };
  const Set = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-3e5595ab"]]);
  const _hoisted_1$1 = { class: "setAIBox" };
  const _sfc_main$1 = {
    __name: "Ai",
    emits: ["updateAI"],
    setup(__props, { emit }) {
      const { proxy } = vue.getCurrentInstance();
      const geminiApiKey = vue.ref("");
      const useGemini = vue.ref(false);
      const qianwenApiKey = vue.ref("");
      const useQianwen = vue.ref(false);
      const kimiApiKey = vue.ref("");
      const useKimi = vue.ref(false);
      const chatgptDomain = vue.ref("");
      const chatgptApiKey = vue.ref("");
      const chatgptModel = vue.ref("gpt-3.5-turbo");
      const chatgptModelList = vue.ref([
        { value: "gpt-4", label: "gpt-4" },
        { value: "gpt-4-0314", label: "gpt-4-0314" },
        { value: "gpt-4-0613", label: "gpt-4-0613" },
        { value: "gpt-4-32k", label: "gpt-4-32k" },
        { value: "gpt-4-32k-0314", label: "gpt-4-32k-0314" },
        { value: "gpt-4-32k-0613", label: "gpt-4-32k-0613" },
        { value: "gpt-4-1106-preview", label: "gpt-4-1106-preview" },
        { value: "gpt-4-vision-preview", label: "gpt-4-vision-preview" },
        { value: "gpt-3.5-turbo", label: "gpt-3.5-turbo" },
        { value: "gpt-3.5-turbo-0301", label: "gpt-3.5-turbo-0301" },
        { value: "gpt-3.5-turbo-0613", label: "gpt-3.5-turbo-0613" },
        { value: "gpt-3.5-turbo-1106", label: "gpt-3.5-turbo-1106" },
        { value: "gpt-3.5-turbo-16k", label: "gpt-3.5-turbo-16k" },
        { value: "gpt-3.5-turbo-16k-0613", label: "gpt-3.5-turbo-16k-0613" }
      ]);
      const useChatgpt = vue.ref(false);
      const useAI = vue.ref("");
      const promptCustom = vue.ref("");
      const usePromptCustom = vue.ref(false);
      vue.onBeforeMount(() => {
        useAI.value = proxy.$storage.getUserInfo("useAI") || "";
        geminiApiKey.value = proxy.$storage.getUserInfo("geminiApiKey") || "";
        useGemini.value = useAI.value == "gemini";
        qianwenApiKey.value = proxy.$storage.getUserInfo("qianwenApiKey") || "";
        useQianwen.value = useAI.value == "qianwen";
        kimiApiKey.value = proxy.$storage.getUserInfo("kimiApiKey") || "";
        useKimi.value = useAI.value == "kimi";
        chatgptDomain.value = proxy.$storage.getUserInfo("chatgptDomain") || "";
        chatgptApiKey.value = proxy.$storage.getUserInfo("chatgptApiKey") || "";
        chatgptModel.value = proxy.$storage.getUserInfo("chatgptModel") || "";
        useChatgpt.value = useAI.value == "chatgpt";
        promptCustom.value = proxy.$storage.getUserInfo("promptCustom") || "";
        usePromptCustom.value = proxy.$storage.getUserInfo("usePromptCustom") || false;
      });
      function onGeminiApiKeyChange(e) {
        proxy.$storage.setUserInfo("geminiApiKey", e);
        emit("updateAI");
      }
      function onGeminiChange(e) {
        useAI.value = e ? "gemini" : "";
        proxy.$storage.setUserInfo("useAI", useAI.value);
        proxy.$storage.setUserInfo("geminiApiKey", geminiApiKey.value || "");
        emit("updateAI");
      }
      function useGeminiBeforeChange() {
        if (!useGemini.value && !geminiApiKey.value) {
          proxy.$message.error("请先填写：gemini api key");
          return false;
        }
        return true;
      }
      function onQianwenApiKeyChange(e) {
        proxy.$storage.setUserInfo("qianwenApiKey", e);
        emit("updateAI");
      }
      function onQianwenChange(e) {
        useAI.value = e ? "qianwen" : "";
        proxy.$storage.setUserInfo("useAI", useAI.value);
        proxy.$storage.setUserInfo("qianwenApiKey", qianwenApiKey.value || "");
        emit("updateAI");
      }
      function useQianwenBeforeChange() {
        if (!useQianwen.value && !qianwenApiKey.value) {
          proxy.$message.error("请先填写：通义千问 api key");
          return false;
        }
        return true;
      }
      function onKimiApiKeyChange(e) {
        proxy.$storage.setUserInfo("kimiApiKey", e);
        emit("updateAI");
      }
      function onKimiChange(e) {
        useAI.value = e ? "kimi" : "";
        proxy.$storage.setUserInfo("useAI", useAI.value);
        proxy.$storage.setUserInfo("kimiApiKey", kimiApiKey.value || "");
        emit("updateAI");
      }
      function useKimiBeforeChange() {
        if (!useKimi.value && !kimiApiKey.value) {
          proxy.$message.error("请先填写：Kimi api key");
          return false;
        }
        return true;
      }
      function onChatgptDomainChange(e) {
        proxy.$storage.setUserInfo("chatgptDomain", e);
        emit("updateAI");
      }
      function onChatgptApiKeyChange(e) {
        proxy.$storage.setUserInfo("chatgptApiKey", e);
        emit("updateAI");
      }
      function onChatgptModelChange(e) {
        proxy.$storage.setUserInfo("chatgptModel", e);
        emit("updateAI");
      }
      function onChatgptChange(e) {
        useAI.value = e ? "chatgpt" : "";
        proxy.$storage.setUserInfo("useAI", useAI.value);
        proxy.$storage.setUserInfo("chatgptDomain", chatgptDomain.value || "");
        proxy.$storage.setUserInfo("chatgptApiKey", chatgptApiKey.value || "");
        proxy.$storage.setUserInfo("chatgptModel", chatgptModel.value || "");
        emit("updateAI");
      }
      function useChatgptBeforeChange() {
        if (!useChatgpt.value && !chatgptDomain.value) {
          proxy.$message.error("请先填写：chatgpt api domain");
          return false;
        }
        return true;
      }
      function onPromptCustomChange(e) {
        proxy.$storage.setUserInfo("promptCustom", e);
        emit("updateAI");
      }
      function onUsePromptCustomChange(e) {
        proxy.$storage.setUserInfo("usePromptCustom", usePromptCustom.value);
        proxy.$storage.setUserInfo("promptCustom", promptCustom.value);
        emit("updateAI");
      }
      function usePromptCustomBeforeChange() {
        if (!usePromptCustom.value && !promptCustom.value) {
          proxy.$message.error("请先填写：自定义 Prompt");
          return false;
        }
        if (!usePromptCustom.value && promptCustom.value.indexOf("{{title}}") == -1) {
          proxy.$message.error("请检查自定义 Prompt 中是否包含变量：{{title}}");
          return false;
        }
        return true;
      }
      vue.watch(useAI, (n, o) => {
        useGemini.value = n == "gemini";
        useQianwen.value = n == "qianwen";
        useKimi.value = n == "kimi";
        useChatgpt.value = n == "chatgpt";
      });
      return (_ctx, _cache) => {
        const _component_el_input = vue.resolveComponent("el-input");
        const _component_el_tooltip = vue.resolveComponent("el-tooltip");
        const _component_el_form_item = vue.resolveComponent("el-form-item");
        const _component_el_switch = vue.resolveComponent("el-switch");
        const _component_el_option = vue.resolveComponent("el-option");
        const _component_el_select = vue.resolveComponent("el-select");
        const _component_el_form = vue.resolveComponent("el-form");
        const _component_el_card = vue.resolveComponent("el-card");
        return vue.openBlock(), vue.createElementBlock("div", _hoisted_1$1, [
          vue.createVNode(_component_el_card, {
            class: "box-card",
            shadow: "never"
          }, {
            default: vue.withCtx(() => [
              vue.createVNode(_component_el_form, {
                "label-width": "110",
                "label-position": "left",
                size: "small"
              }, {
                default: vue.withCtx(() => [
                  vue.createVNode(_component_el_form_item, { label: "Gemini API Key" }, {
                    default: vue.withCtx(() => [
                      vue.createVNode(_component_el_tooltip, {
                        content: "获取API Key：https://aistudio.google.com/app/apikey",
                        placement: "top"
                      }, {
                        default: vue.withCtx(() => [
                          vue.createVNode(_component_el_input, {
                            modelValue: vue.unref(geminiApiKey),
                            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => vue.isRef(geminiApiKey) ? geminiApiKey.value = $event : null),
                            onChange: onGeminiApiKeyChange
                          }, null, 8, ["modelValue"])
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  vue.createVNode(_component_el_form_item, { label: "启用" }, {
                    default: vue.withCtx(() => [
                      vue.createVNode(_component_el_switch, {
                        modelValue: vue.unref(useGemini),
                        "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => vue.isRef(useGemini) ? useGemini.value = $event : null),
                        onChange: onGeminiChange,
                        "before-change": useGeminiBeforeChange
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                  }),
                  vue.createVNode(_component_el_form_item, { label: "通义千问 API Key" }, {
                    default: vue.withCtx(() => [
                      vue.createVNode(_component_el_tooltip, {
                        content: "获取API Key：https://dashscope.console.aliyun.com/apiKey",
                        placement: "top"
                      }, {
                        default: vue.withCtx(() => [
                          vue.createVNode(_component_el_input, {
                            modelValue: vue.unref(qianwenApiKey),
                            "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => vue.isRef(qianwenApiKey) ? qianwenApiKey.value = $event : null),
                            onChange: onQianwenApiKeyChange
                          }, null, 8, ["modelValue"])
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  vue.createVNode(_component_el_form_item, { label: "启用" }, {
                    default: vue.withCtx(() => [
                      vue.createVNode(_component_el_switch, {
                        modelValue: vue.unref(useQianwen),
                        "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => vue.isRef(useQianwen) ? useQianwen.value = $event : null),
                        onChange: onQianwenChange,
                        "before-change": useQianwenBeforeChange
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                  }),
                  vue.createVNode(_component_el_form_item, { label: "Kimi API Key" }, {
                    default: vue.withCtx(() => [
                      vue.createVNode(_component_el_tooltip, {
                        content: "获取API Key：https://platform.moonshot.cn/console/api-keys",
                        placement: "top"
                      }, {
                        default: vue.withCtx(() => [
                          vue.createVNode(_component_el_input, {
                            modelValue: vue.unref(kimiApiKey),
                            "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => vue.isRef(kimiApiKey) ? kimiApiKey.value = $event : null),
                            onChange: onKimiApiKeyChange
                          }, null, 8, ["modelValue"])
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  vue.createVNode(_component_el_form_item, { label: "启用" }, {
                    default: vue.withCtx(() => [
                      vue.createVNode(_component_el_switch, {
                        modelValue: vue.unref(useKimi),
                        "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => vue.isRef(useKimi) ? useKimi.value = $event : null),
                        onChange: onKimiChange,
                        "before-change": useKimiBeforeChange
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                  }),
                  vue.createVNode(_component_el_form_item, { label: "Chatgpt Domain" }, {
                    default: vue.withCtx(() => [
                      vue.createVNode(_component_el_tooltip, {
                        content: "请自行寻找可用域名，example: chat.customai.com",
                        placement: "top"
                      }, {
                        default: vue.withCtx(() => [
                          vue.createVNode(_component_el_input, {
                            modelValue: vue.unref(chatgptDomain),
                            "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => vue.isRef(chatgptDomain) ? chatgptDomain.value = $event : null),
                            onChange: onChatgptDomainChange
                          }, null, 8, ["modelValue"])
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  vue.createVNode(_component_el_form_item, { label: "Chatgpt API Key" }, {
                    default: vue.withCtx(() => [
                      vue.createVNode(_component_el_tooltip, {
                        content: "按接口规则填写",
                        placement: "top"
                      }, {
                        default: vue.withCtx(() => [
                          vue.createVNode(_component_el_input, {
                            modelValue: vue.unref(chatgptApiKey),
                            "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => vue.isRef(chatgptApiKey) ? chatgptApiKey.value = $event : null),
                            onChange: onChatgptApiKeyChange
                          }, null, 8, ["modelValue"])
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  vue.createVNode(_component_el_form_item, { label: "Chatgpt Model" }, {
                    default: vue.withCtx(() => [
                      vue.createVNode(_component_el_tooltip, {
                        content: "默认使用：gpt-3.5-turbo，需接口支持",
                        placement: "top"
                      }, {
                        default: vue.withCtx(() => [
                          vue.createVNode(_component_el_select, {
                            modelValue: vue.unref(chatgptModel),
                            "onUpdate:modelValue": _cache[8] || (_cache[8] = ($event) => vue.isRef(chatgptModel) ? chatgptModel.value = $event : null),
                            placeholder: "Select",
                            size: "large",
                            style: { "width": "240px" },
                            onChange: onChatgptModelChange
                          }, {
                            default: vue.withCtx(() => [
                              (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(vue.unref(chatgptModelList), (item) => {
                                return vue.openBlock(), vue.createBlock(_component_el_option, {
                                  key: item.value,
                                  label: item.label,
                                  value: item.value
                                }, null, 8, ["label", "value"]);
                              }), 128))
                            ]),
                            _: 1
                          }, 8, ["modelValue"])
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  vue.createVNode(_component_el_form_item, { label: "启用" }, {
                    default: vue.withCtx(() => [
                      vue.createVNode(_component_el_switch, {
                        modelValue: vue.unref(useChatgpt),
                        "onUpdate:modelValue": _cache[9] || (_cache[9] = ($event) => vue.isRef(useChatgpt) ? useChatgpt.value = $event : null),
                        onChange: onChatgptChange,
                        "before-change": useChatgptBeforeChange
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                  }),
                  vue.createVNode(_component_el_form_item, { label: "自定义 Prompt" }, {
                    default: vue.withCtx(() => [
                      vue.createVNode(_component_el_tooltip, {
                        content: "自定义提示问语，帮你获得更个性化的回帖内容。必须包含唯一变量：{{title}}",
                        placement: "top"
                      }, {
                        default: vue.withCtx(() => [
                          vue.createVNode(_component_el_input, {
                            type: "textarea",
                            modelValue: vue.unref(promptCustom),
                            "onUpdate:modelValue": _cache[10] || (_cache[10] = ($event) => vue.isRef(promptCustom) ? promptCustom.value = $event : null),
                            onChange: onPromptCustomChange,
                            placeholder: `默认：${vue.unref(proxy).$app.prompt}`
                          }, null, 8, ["modelValue", "placeholder"])
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  vue.createVNode(_component_el_form_item, { label: "启用" }, {
                    default: vue.withCtx(() => [
                      vue.createVNode(_component_el_switch, {
                        modelValue: vue.unref(usePromptCustom),
                        "onUpdate:modelValue": _cache[11] || (_cache[11] = ($event) => vue.isRef(usePromptCustom) ? usePromptCustom.value = $event : null),
                        onChange: onUsePromptCustomChange,
                        "before-change": usePromptCustomBeforeChange
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
            ]),
            _: 1
          })
        ]);
      };
    }
  };
  const AI = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-66d8ae03"]]);
  const _hoisted_1 = { class: "margin-left" };
  const _hoisted_2 = { class: "margin-left" };
  const _sfc_main = {
    __name: "Login",
    emits: ["onSuccess", "onClose"],
    setup(__props, { emit }) {
      const { proxy } = vue.getCurrentInstance();
      const checkName = (rule, value, callback) => {
        if (!/[0-9a-zA-Z@\.]{5,20}/.test(value)) {
          callback("用户名5-20，只能包含字母、数字、“.”、“@”等");
        }
        callback();
      };
      const checkPassword = (rule, value, callback) => {
        if (!/[0-9a-zA-Z\.\-_]{2,20}/.test(value)) {
          callback("密码2-20，只能包含字母、数字、“.”、“-”、“_”等");
        }
        callback();
      };
      const checkRePassword = (rule, value, callback) => {
        if (value !== loginForm.value.password) {
          callback("两次密码不一致");
        }
        callback();
      };
      const registerFormRef = vue.ref();
      const formMode = vue.ref(1);
      const registerRules = vue.ref({
        username: [
          { required: true, message: "用户名不能为空", trigger: "blur" }
          // { validator: checkName, trigger: 'blur'}
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { validator: checkPassword, trigger: "blur" }
        ],
        rePassword: [
          { required: true, message: "确认密码不能为空", trigger: "blur" },
          { validator: checkRePassword, trigger: "blur" }
        ]
      });
      const loginFormRef = vue.ref();
      const loginForm = vue.ref({
        username: "",
        password: "",
        rePassword: ""
      });
      const loginRules = vue.ref({
        username: [
          { required: true, message: "用户名不能为空", trigger: "blur" },
          { validator: checkName, trigger: "blur" }
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { validator: checkPassword, trigger: "blur" }
        ]
      });
      const loginSuccess = (res) => {
        proxy.$storage.setUserInfo("userId", res.data.userId);
        emit("onSuccess");
      };
      const loginOnSubmit = () => {
        loginFormRef.value.validate(async (valid, fields) => {
          if (valid) {
            proxy.$api.login(loginForm.value).then((res) => {
              if (res.code != 0) {
                proxy.$message.error(res.message);
                return false;
              }
              loginSuccess(res);
            }).catch((err) => {
              proxy.$message.error(err.message);
            });
          }
        });
      };
      const registerOnSubmit = () => {
        registerFormRef.value.validate(async (valid, fields) => {
          if (valid) {
            proxy.$api.register(loginForm.value).then((res) => {
              if (res.code != 0) {
                proxy.$message.error(res.message);
                return false;
              }
              loginSuccess(res);
            }).catch((err) => {
              proxy.$message.error(err.message);
            });
          }
        });
      };
      const close = () => {
        emit("onClose");
      };
      return (_ctx, _cache) => {
        const _component_el_input = vue.resolveComponent("el-input");
        const _component_el_form_item = vue.resolveComponent("el-form-item");
        const _component_el_button = vue.resolveComponent("el-button");
        const _component_el_link = vue.resolveComponent("el-link");
        const _component_el_space = vue.resolveComponent("el-space");
        const _component_el_form = vue.resolveComponent("el-form");
        return vue.openBlock(), vue.createElementBlock("div", null, [
          vue.unref(formMode) === 1 ? (vue.openBlock(), vue.createBlock(_component_el_form, {
            key: 0,
            ref_key: "loginFormRef",
            ref: loginFormRef,
            model: vue.unref(loginForm),
            rules: vue.unref(loginRules),
            "label-width": "120px"
          }, {
            default: vue.withCtx(() => [
              vue.createVNode(_component_el_form_item, {
                label: "用户名：",
                prop: "username",
                required: ""
              }, {
                default: vue.withCtx(() => [
                  vue.createVNode(_component_el_input, {
                    modelValue: vue.unref(loginForm).username,
                    "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => vue.unref(loginForm).username = $event)
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
              }),
              vue.createVNode(_component_el_form_item, {
                label: "密码：",
                prop: "password",
                required: ""
              }, {
                default: vue.withCtx(() => [
                  vue.createVNode(_component_el_input, {
                    modelValue: vue.unref(loginForm).password,
                    "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => vue.unref(loginForm).password = $event)
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
              }),
              vue.createVNode(_component_el_form_item, null, {
                default: vue.withCtx(() => [
                  vue.createVNode(_component_el_button, {
                    type: "primary",
                    onClick: loginOnSubmit
                  }, {
                    default: vue.withCtx(() => [
                      vue.createTextVNode("登录")
                    ]),
                    _: 1
                  }),
                  vue.createElementVNode("div", _hoisted_1, [
                    vue.createVNode(_component_el_space, null, {
                      default: vue.withCtx(() => [
                        vue.createVNode(_component_el_link, {
                          href: "javascript:;",
                          onClick: _cache[2] || (_cache[2] = ($event) => formMode.value = 0)
                        }, {
                          default: vue.withCtx(() => [
                            vue.createTextVNode("注册")
                          ]),
                          _: 1
                        }),
                        vue.createVNode(_component_el_link, {
                          href: "javascript:;",
                          onClick: close
                        }, {
                          default: vue.withCtx(() => [
                            vue.createTextVNode("关闭")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })
                  ])
                ]),
                _: 1
              })
            ]),
            _: 1
          }, 8, ["model", "rules"])) : (vue.openBlock(), vue.createBlock(_component_el_form, {
            key: 1,
            ref_key: "registerFormRef",
            ref: registerFormRef,
            model: vue.unref(loginForm),
            rules: vue.unref(registerRules),
            "label-width": "120px"
          }, {
            default: vue.withCtx(() => [
              vue.createVNode(_component_el_form_item, {
                label: "用户名：",
                prop: "username",
                required: ""
              }, {
                default: vue.withCtx(() => [
                  vue.createVNode(_component_el_input, {
                    modelValue: vue.unref(loginForm).username,
                    "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => vue.unref(loginForm).username = $event)
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
              }),
              vue.createVNode(_component_el_form_item, {
                label: "密码：",
                prop: "password",
                required: ""
              }, {
                default: vue.withCtx(() => [
                  vue.createVNode(_component_el_input, {
                    modelValue: vue.unref(loginForm).password,
                    "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => vue.unref(loginForm).password = $event)
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
              }),
              vue.createVNode(_component_el_form_item, {
                label: "确认密码：",
                prop: "rePassword",
                required: ""
              }, {
                default: vue.withCtx(() => [
                  vue.createVNode(_component_el_input, {
                    modelValue: vue.unref(loginForm).rePassword,
                    "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => vue.unref(loginForm).rePassword = $event)
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
              }),
              vue.createVNode(_component_el_form_item, null, {
                default: vue.withCtx(() => [
                  vue.createVNode(_component_el_button, {
                    type: "primary",
                    onClick: registerOnSubmit
                  }, {
                    default: vue.withCtx(() => [
                      vue.createTextVNode("注册")
                    ]),
                    _: 1
                  }),
                  vue.createElementVNode("div", _hoisted_2, [
                    vue.createVNode(_component_el_space, null, {
                      default: vue.withCtx(() => [
                        vue.createVNode(_component_el_link, {
                          href: "javascript:;",
                          onClick: _cache[6] || (_cache[6] = ($event) => formMode.value = 1)
                        }, {
                          default: vue.withCtx(() => [
                            vue.createTextVNode("登录")
                          ]),
                          _: 1
                        }),
                        vue.createVNode(_component_el_link, {
                          href: "javascript:;",
                          onClick: close
                        }, {
                          default: vue.withCtx(() => [
                            vue.createTextVNode("关闭")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })
                  ])
                ]),
                _: 1
              })
            ]),
            _: 1
          }, 8, ["model", "rules"]))
        ]);
      };
    }
  };
  const Util = {
    install: (app2, options) => {
      app2.config.globalProperties.$storage = {
        key: "QuickReply",
        userStorageKey: "QuickReplyUser",
        set(value) {
          _GM_setValue(this.key, value);
        },
        get() {
          return _GM_getValue(this.key, []);
        },
        getAll() {
          let keyList = _GM_listValues();
          let all = {};
          keyList.forEach((key) => {
            all[key] = _GM_getValue(key, "");
          });
          return all;
        },
        setAll(data) {
          for (let key in data) {
            _GM_setValue(key, data[key]);
          }
        },
        setUserInfo(key, value) {
          let fullKey = `${this.userStorageKey}.${key}`;
          _GM_setValue(fullKey, value);
        },
        getUserInfo(key) {
          let fullKey = `${this.userStorageKey}.${key}`;
          return _GM_getValue(fullKey, "");
        },
        uploadList() {
          let proxy = app2.config.globalProperties;
          let userId = proxy.$storage.getUserInfo("userId");
          let myList = proxy.$storage.get() || [];
          if (!userId) {
            proxy.$message.error("请先登录");
            return false;
          }
          if (myList.length == 0) {
            proxy.$message.error("无可同步数据");
            return false;
          }
          proxy.$api.upQuickReplyList({
            userId,
            list: myList
          }).then((res) => {
            proxy.$message.success("上传成功");
          }).catch((err) => {
            proxy.$message.error(err.message);
          });
        },
        async downloadList() {
          let proxy = app2.config.globalProperties;
          let userId = proxy.$storage.getUserInfo("userId");
          if (!userId) {
            proxy.$message.error("请先登录");
            return false;
          }
          let res = await proxy.$api.downQuickReplyList({
            userId
          });
          if (res.code == 0) {
            if (res.data.length == 0) {
              proxy.$message.error("云端无数据");
            } else {
              proxy.$storage.set(res.data);
              proxy.$message.success("下载成功");
              return res.data;
            }
          } else {
            proxy.$message.error(res.message);
          }
        },
        uploadAll() {
          let proxy = app2.config.globalProperties;
          let userId = proxy.$storage.getUserInfo("userId");
          let options2 = proxy.$storage.getAll();
          if (options2.QuickReply && options2.QuickReply.length > 10) {
            proxy.$message.error("回复列表超出数量限制：10 条");
            return false;
          }
          options2 = JSON.stringify(options2);
          options2 = proxy.$tools.encodeStr(options2);
          if (!userId) {
            proxy.$message.error("请先登录");
            return false;
          }
          proxy.$api.upUserAll({
            userId,
            options: options2
          }).then((res) => {
            proxy.$message.success("备份成功");
          }).catch((err) => {
            proxy.$message.error(err.message);
          });
        },
        async downloadAll() {
          let proxy = app2.config.globalProperties;
          let userId = proxy.$storage.getUserInfo("userId");
          if (!userId) {
            proxy.$message.error("请先登录");
            return false;
          }
          let res = await proxy.$api.downUserAll({
            userId
          });
          if (res.code == 0) {
            proxy.$storage.setAll(res.data);
            proxy.$message.success("恢复成功");
            return res.data;
          } else {
            proxy.$message.error(res.message);
          }
        }
      };
      app2.config.globalProperties.$app = {
        getName() {
          return _GM_info["script"]["name"];
        },
        getVersion: function() {
          return _GM_info["script"]["version"];
        },
        prompt: "请根据帖子标题：{{title}}，以回帖的语气生成一条15字左右的简短回复",
        isNew: function(timestamp) {
          if (!timestamp)
            return false;
          let number = 3600 * 24 * 7;
          return parseInt((/* @__PURE__ */ new Date()).getTime() / 1e3) - timestamp <= number;
        }
      };
      app2.config.globalProperties.$tools = {
        encodeStr: function(str) {
          let encoder = new TextEncoder();
          str = encoder.encode(str);
          return btoa(String.fromCharCode.apply(null, str));
        },
        decodeStr: function(str) {
          var byteCharacters = atob(str);
          var byteArray = new Uint8Array(byteCharacters.length);
          for (var i = 0; i < byteCharacters.length; i++) {
            byteArray[i] = byteCharacters.charCodeAt(i);
          }
          var decoder = new TextDecoder();
          return decoder.decode(byteArray);
        }
      };
    }
  };
  const http = function(api, data, method) {
    return new Promise((resolve, reject) => {
      let url = `https://quickreply.bmqy.net/api${api}`;
      if (method && method.toLowerCase() === "get") {
        url += `?${Object.keys(data).map((key) => key + "=" + encodeURIComponent(data[key])).join("&")}`;
      }
      _GM_xmlhttpRequest({
        method: method ? method : "post",
        url,
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        },
        data: `${JSON.stringify(data)}`,
        responseType: "json",
        onload: function(xhr) {
          if (xhr.status == 200) {
            resolve(xhr.response);
          } else {
            reject(xhr.response);
          }
        },
        onerror: function(xhr) {
          reject(xhr.response);
        }
      });
    });
  };
  const Api = {
    install: (app2, options) => {
      app2.config.globalProperties.$api = {
        // 获取网友分享的回复
        selectList: async function(page = 0, prop = "replyId", order = "descending") {
          return await http("/selectList", {
            page,
            prop,
            order
          }, "get");
        },
        // 更新收藏数量
        collectCountUpdate: async function(replyId) {
          return await http("/collectCountUpdate", {
            replyId
          });
        },
        // 更新点赞数量
        likeCountUpdate: async function(replyId) {
          return await http("/likeCountUpdate", {
            replyId
          });
        },
        // 添加网友分享的回复
        replyInsert: async function(content) {
          return await http("/replyInsert", {
            content
          });
        },
        // 用户注册
        register: async function(params) {
          return await http("/register", params);
        },
        // 用户登录
        login: async function(params) {
          return await http("/login", params);
        },
        // 上传列表
        upQuickReplyList: async function(params) {
          return await http("/uploadList", params);
        },
        // 下载列表
        downQuickReplyList: async function(params) {
          return await http("/downloadList", params);
        },
        // 上传全量备份
        upUserAll: async function(params) {
          return await http("/uploadAll", params);
        },
        // 下载全量备份
        downUserAll: async function(params) {
          return await http("/downloadAll", params);
        },
        // 获取AI回复
        getAIReply: function(title) {
          return new Promise((resolve, reject) => {
            let proxy = app2.config.globalProperties;
            let useAI = proxy.$storage.getUserInfo("useAI") || "";
            if (!title) {
              reject("参数无效");
            }
            let prompt = proxy.$app.prompt;
            let promptCustom = proxy.$storage.getUserInfo("promptCustom") || "";
            let usePromptCustom = proxy.$storage.getUserInfo("usePromptCustom") || false;
            if (usePromptCustom && promptCustom) {
              prompt = promptCustom;
            }
            prompt = prompt.replace("{{title}}", title);
            if (useAI == "gemini") {
              let geminiApiKey = proxy.$storage.getUserInfo("geminiApiKey") || "";
              if (!geminiApiKey) {
                reject("无效api key");
              }
              let url = `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${geminiApiKey}`;
              let data = {
                "contents": [
                  {
                    "parts": [
                      {
                        "text": prompt
                      }
                    ]
                  }
                ]
              };
              _GM_xmlhttpRequest({
                method: "POST",
                url,
                headers: {
                  "Content-Type": "application/json; charset=utf-8",
                  "User-Agent": `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36`
                },
                data: `${JSON.stringify(data)}`,
                responseType: "json",
                onload: function(xhr) {
                  let { error, candidates } = xhr.response;
                  if (error) {
                    reject(error.message);
                  }
                  resolve(candidates[0].content.parts[0].text);
                },
                onerror: function(xhr) {
                  reject(xhr.response);
                }
              });
            } else if (useAI == "qianwen") {
              let qianwenApiKey = proxy.$storage.getUserInfo("qianwenApiKey") || "";
              if (!qianwenApiKey) {
                reject("无效api key");
              }
              let url = "https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation";
              let data = {
                "model": "qwen-turbo",
                "parameters": {
                  "result_format": "text"
                },
                "input": {
                  "prompt": prompt
                }
              };
              _GM_xmlhttpRequest({
                method: "POST",
                url,
                headers: {
                  "Content-Type": "application/json; charset=utf-8",
                  "User-Agent": `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36`,
                  "Authorization": `Bearer ${qianwenApiKey}`
                },
                data: `${JSON.stringify(data)}`,
                responseType: "json",
                onload: function(xhr) {
                  let { output, code, message } = xhr.response;
                  if (code) {
                    reject(message);
                  }
                  let result = output.text;
                  result = result.replace(/[\\"]+/g, "");
                  resolve(result);
                },
                onerror: function(xhr) {
                  reject(xhr.response);
                }
              });
            } else if (useAI == "kimi") {
              let kimiApiKey = proxy.$storage.getUserInfo("kimiApiKey") || "";
              if (!kimiApiKey) {
                reject("无效api key");
              }
              let url = "https://api.moonshot.cn/v1/chat/completions";
              let data = {
                "model": "moonshot-v1-8k",
                "messages": [
                  {
                    "role": "user",
                    "content": prompt
                  }
                ]
              };
              _GM_xmlhttpRequest({
                method: "POST",
                url,
                headers: {
                  "Content-Type": "application/json; charset=utf-8",
                  "User-Agent": `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36`,
                  "Authorization": `Bearer ${kimiApiKey}`
                },
                data: `${JSON.stringify(data)}`,
                responseType: "json",
                onload: function(xhr) {
                  let { choices, error } = xhr.response;
                  if (error) {
                    reject(error.message);
                  }
                  let result = choices[0].message.content;
                  resolve(result);
                },
                onerror: function(xhr) {
                  reject(xhr.response);
                }
              });
            } else if (useAI == "chatgpt") {
              let chatgptDomain = proxy.$storage.getUserInfo("chatgptDomain") || "api.openai.com";
              let chatgptModel = proxy.$storage.getUserInfo("chatgptModel") || "gpt-3.5-turbo";
              let chatgptApiKey = proxy.$storage.getUserInfo("chatgptApiKey") || "";
              if (!chatgptDomain) {
                reject("无效地址");
              }
              let url = `https://${chatgptDomain}/v1/chat/completions`;
              let data = {
                "model": `${chatgptModel}`,
                "messages": [
                  {
                    "role": "user",
                    "content": prompt
                  }
                ],
                "stream": false
              };
              let headers = {
                "Content-Type": "application/json; charset=utf-8",
                "User-Agent": `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36`
              };
              if (chatgptApiKey) {
                headers["Authorization"] = `Bearer ${chatgptApiKey}`;
              }
              _GM_xmlhttpRequest({
                method: "POST",
                url,
                headers,
                data: `${JSON.stringify(data)}`,
                responseType: "json",
                onload: function(xhr) {
                  let { choices, error } = xhr.response;
                  if (error) {
                    reject(error.message);
                  }
                  let result = choices[0].message.content;
                  resolve(result);
                },
                onerror: function(xhr) {
                  reject(xhr.response);
                }
              });
            } else {
              reject("暂未配置AI");
            }
          });
        }
      };
    }
  };
  const app = vue.createApp(App);
  for (const [key, component] of Object.entries(ElementPlusIconsVue__namespace)) {
    app.component(key, component);
  }
  app.component("app-set-ai", AI);
  app.component("app-set", Set);
  app.component("app-login", _sfc_main);
  app.use(ElementPlus);
  app.use(Util);
  app.use(Api);
  app.mount(
    (() => {
      const $fastposteditor = document.querySelector("#fastposteditor");
      const $postbox = document.querySelector("#postbox");
      const $appRoot = document.createElement("div");
      if ($fastposteditor) {
        $fastposteditor.insertBefore($appRoot, $fastposteditor.childNodes[0]);
      }
      if ($postbox) {
        $appRoot.style.paddingTop = "15px";
        $postbox.insertBefore($appRoot, $postbox.childNodes[4]);
      }
      const $editorBody = document.querySelector(".comment-container");
      if ($editorBody) {
        $appRoot.style.padding = "15px 15px 0";
        $editorBody.appendChild($appRoot);
      }
      const $replyControl = document.querySelector("#reply-control");
      if ($replyControl) {
        $appRoot.style.padding = "15px 15px 0";
        $replyControl.insertBefore($appRoot, $replyControl.childNodes[2]);
      }
      const $replyBox = document.querySelector("#reply-box");
      if ($replyBox) {
        $appRoot.style.padding = "15px 15px 0";
        $replyBox.insertBefore($appRoot, $replyBox.childNodes[2]);
      }
      return $appRoot;
    })()
  );

})(Vue, ElementPlus, ElementPlusIconsVue);
