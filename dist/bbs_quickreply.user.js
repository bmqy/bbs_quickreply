// ==UserScript==
// @name         论坛快捷回帖
// @namespace    bmqy.net
// @version      3.4.3
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
// @require      https://cdn.jsdelivr.net/npm/vue@3.3.4/dist/vue.global.prod.js
// @require      data:application/javascript,%3Bwindow.Vue%3DVue%3B
// @require      https://cdn.jsdelivr.net/npm/element-plus@2.3.6/dist/index.full.min.js
// @require      https://cdn.jsdelivr.net/npm/@element-plus/icons-vue@2.1.0/dist/index.iife.min.js
// @resource     element-plus/dist/index.css  https://cdn.jsdelivr.net/npm/element-plus@2.3.6/dist/index.css
// @connect      quickreply.lc.bmqy.net
// @connect      generativelanguage.googleapis.com
// @connect      dashscope.aliyuncs.com
// @grant        GM_getResourceText
// @grant        GM_getValue
// @grant        GM_info
// @grant        GM_registerMenuCommand
// @grant        GM_setValue
// @grant        GM_xmlhttpRequest
// @grant        unsafeWindow
// ==/UserScript==

(a=>{const t=document.createElement("style");t.dataset.source="vite-plugin-monkey",t.textContent=a,document.head.append(t)})(' .quickReplyBox[data-v-d5dcb926]{position:relative}.el-dialog{display:flex;flex-direction:column;margin:0!important;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);max-height:calc(100% - 30px);max-width:1300px;min-width:1000px}.el-dialog__header{margin-right:0!important}.el-dialog__body{flex:1;overflow:auto;padding:0}.quickReplyBox .el-input__inner{margin-bottom:0;background-color:transparent;border:0;outline:none}#reply-control.open{height:calc(var(--composer-height) + 65px)!important}.app-dialog-foot[data-v-d5dcb926]{color:#909399;font-size:14px}.quickReplyBoxTitle[data-v-d5dcb926]{margin-right:10px;font-weight:700;color:red}.el-form-item--mini.el-form-item[data-v-d5dcb926],.el-form-item--small.el-form-item[data-v-d5dcb926]{margin-bottom:10px}.el-select[data-v-d5dcb926]{width:300px}.app-margin-right-30[data-v-06ead464]{margin-right:30px}.list-left[data-v-06ead464]{padding-right:15px;display:flex;flex:1;align-items:stretch;justify-content:start}.list-number[data-v-06ead464]{margin-right:5px;color:#909399}.list-title[data-v-06ead464]{flex:1;font-weight:400}.list-right[data-v-06ead464]{min-width:70px}.list-right .el-badge.item[data-v-06ead464]{margin-right:30px}.list li[data-v-06ead464]{margin-bottom:5px;padding-bottom:5px;font-size:13px;line-height:30px;display:flex;align-items:flex-start;justify-content:space-between;border-bottom:1px solid #ebeef5}.list li[data-v-06ead464]:hover{background-color:#f5f5f5}.tips[data-v-06ead464]{color:#909399;font-size:14px;text-align:center}.quickReplyLoginBox .tips[data-v-06ead464]{margin-left:50px;text-align:left;font-size:12px}.addReplyBox[data-v-06ead464]{margin-top:15px;padding-top:10px;border-top:1px dashed #ccc}.box-card .el-card__header[data-v-06ead464]{padding:10px 20px}.box-card .el-card__header span[data-v-06ead464]{font-size:14px}.clearfix[data-v-06ead464]:before,.clearfix[data-v-06ead464]:after{display:table;content:""}.clearfix[data-v-06ead464]:after{clear:both}.el-pagination[data-v-06ead464]{padding:15px 5px 0}.setBox .el-input__inner{margin-bottom:0;background-color:transparent;border:0;outline:none}.box-card .el-card__header[data-v-51179c71]{padding:10px 20px}.box-card .el-card__header span[data-v-51179c71]{font-size:14px}.setAIBox .el-input__inner{margin-bottom:0;background-color:transparent;border:0;outline:none}.margin-left{margin-left:15px} ');

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
  var _GM_registerMenuCommand = /* @__PURE__ */ (() => typeof GM_registerMenuCommand != "undefined" ? GM_registerMenuCommand : void 0)();
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
  const _hoisted_3$1 = { class: "app-dialog-foot" };
  const _hoisted_4$1 = { class: "app-dialog-foot" };
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
      const lastClickElemet = vue.ref(false);
      const setShow = vue.ref(false);
      const setAIShow = vue.ref(false);
      const useAI = vue.ref("");
      const loadingAIReply = vue.ref(false);
      const aiNameList = vue.ref({
        gemini: "Gemini Pro",
        qianwen: "通义千问-turbo"
      });
      vue.onBeforeMount(() => {
        checkPlatform();
        getList();
        proxy.$gmMenus.init();
        submitNow.value = proxy.$storage.getUserInfo("submitNow") || false;
        useAI.value = proxy.$storage.getUserInfo("useAI") || "";
        changeSubmitNow(submitNow.value);
        proxy.$gmMenus.changeDownloadListMenu(function(data) {
          updateMyList(data);
        });
        proxy.$gmMenus.changeSettingMenu(setShow.value, function() {
          setShow.value ? closeSet() : openSet();
        });
        proxy.$gmMenus.changeAIMenu(function() {
          setAIShow.value ? closeSetAI() : openSetAI();
        });
      });
      function checkPlatform() {
        if (document.documentElement.innerHTML.indexOf("Discuz") > -1) {
          currentPlatform.value = "discuz";
        } else if (document.documentElement.innerHTML.indexOf("Discourse") > -1) {
          currentPlatform.value = "discourse";
        } else {
          if (location.host.indexOf("nodeseek") > -1) {
            currentPlatform.value = "nodeseek";
          }
        }
      }
      function changeSubmitNow(e) {
        let checked = proxy.$storage.getUserInfo("submitNow") || false;
        if (arguments.length == 1) {
          checked = e;
        } else {
          submitNow.value = !checked;
          checked = !checked;
          proxy.$storage.setUserInfo("submitNow", checked);
        }
        proxy.$gmMenus.changeSubmitNowMenu(checked, () => {
          changeSubmitNow();
        });
      }
      async function getList() {
        let myListStorage = proxy.$storage.get();
        list.value = myListStorage && myListStorage.length > 0 ? myListStorage : [];
        currentReply.value = "";
      }
      function openSet() {
        setShow.value = true;
        proxy.$gmMenus.changeSettingMenu(true, function() {
          closeSet();
        });
      }
      function closeSet() {
        setShow.value = false;
        proxy.$gmMenus.changeSettingMenu(false, function() {
          openSet();
        });
      }
      function openSetAI() {
        setAIShow.value = true;
        proxy.$gmMenus.changeAIMenu(function() {
          closeSetAI();
        });
      }
      function closeSetAI() {
        setAIShow.value = false;
        proxy.$gmMenus.changeAIMenu(function() {
          openSetAI();
        });
      }
      function updateAI() {
        useAI.value = proxy.$storage.getUserInfo("useAI") || "";
        proxy.$gmMenus.changeAIMenu(function() {
          closeSetAI();
        });
      }
      function onLoginSuccess() {
        proxy.$gmMenus.changeSettingMenu(true, function() {
          closeSet();
        });
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
        }
        if (!title2) {
          proxy.$message.error("无法获取帖子标题，请检查脚本是否支持此论坛");
          return false;
        }
        await proxy.$api.getAIReply(title2).then((res) => {
          currentReply.value = res;
          enterReply();
        }).catch((err2) => {
          proxy.$message.error(err2);
        }).finally(() => {
          loadingAIReply.value = false;
        });
      }
      function enterReply() {
        if (fwin_replyLoaded.value) {
          enterPostReply();
        } else if (hasEditor.value) {
          enterEditorReply();
        } else if (currentPlatform.value == "nodeseek") {
          enterMarkdownItReply();
        } else if (currentPlatform.value == "discourse") {
          enterDiscourseEmberReply();
        } else {
          enterFastPostReply();
        }
      }
      function enterPostReply() {
        let $postmessage = document.querySelector("#postmessage");
        $postmessage.value = currentReply.value;
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
        } catch (err2) {
          console.log("请检查发帖权限！");
        }
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
            if (lastClickElemet.value != theElement && e.target.className == "fastre") {
              lastClickElemet.value = theElement;
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
            if (lastClickElemet.value != theElement && e.target.className == "replyfast") {
              lastClickElemet.value = theElement;
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
            if (lastClickElemet.value != theElement && e.target.className == "flbc") {
              lastClickElemet.value = theElement;
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
        if (document.querySelector(".md-editor")) {
          mos.observe(document.querySelector(".md-editor"), {
            attributes: true,
            childList: true,
            subtree: true
          });
        }
        if (document.querySelector("#main-outlet")) {
          mos.observe(document.querySelector("#main-outlet"), {
            attributes: true,
            childList: true,
            subtree: true
          });
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
        const _component_app_set_ai = vue.resolveComponent("app-set-ai");
        return vue.openBlock(), vue.createElementBlock("div", _hoisted_1$3, [
          vue.createVNode(vue.Transition, { name: "el-fade-in-linear" }, {
            default: vue.withCtx(() => [
              vue.createVNode(_component_el_form, {
                inline: true,
                class: "demo-form-inline"
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
                onOnSuccess: onLoginSuccess
              }, null, 512)
            ]),
            footer: vue.withCtx(() => [
              vue.createElementVNode("span", _hoisted_3$1, [
                vue.createVNode(_component_el_link, {
                  href: "https://github.com/bmqy/bbs_quickreply?tab=readme-ov-file#%E6%9B%B4%E6%96%B0%E6%97%A5%E5%BF%97",
                  title: "更新日志",
                  target: "_blank"
                }, {
                  default: vue.withCtx(() => [
                    vue.createTextVNode(vue.toDisplayString(`ver: ${_ctx.$app.getVersion()}`), 1)
                  ]),
                  _: 1
                })
              ])
            ]),
            _: 1
          }, 8, ["modelValue", "title"]),
          vue.createVNode(_component_el_dialog, {
            modelValue: vue.unref(setAIShow),
            "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => vue.isRef(setAIShow) ? setAIShow.value = $event : null),
            onClose: closeSetAI,
            title: _ctx.$app.getName() + " - AI设置",
            width: "150",
            "show-close": true,
            "destroy-on-close": "",
            "append-to-body": ""
          }, {
            default: vue.withCtx(() => [
              vue.createVNode(_component_app_set_ai, {
                ref: "setAIPanel",
                onUpdateAI: updateAI
              }, null, 512)
            ]),
            footer: vue.withCtx(() => [
              vue.createElementVNode("span", _hoisted_4$1, vue.toDisplayString(`ver: ${_ctx.$app.getVersion()}`), 1)
            ]),
            _: 1
          }, 8, ["modelValue", "title"])
        ]);
      };
    }
  };
  const App = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-d5dcb926"]]);
  const _withScopeId = (n) => (vue.pushScopeId("data-v-06ead464"), n = n(), vue.popScopeId(), n);
  const _hoisted_1$2 = { class: "setBox" };
  const _hoisted_2$1 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ vue.createElementVNode("span", null, "我在用的", -1));
  const _hoisted_3 = {
    key: 0,
    class: "quickReplyLoginBox"
  };
  const _hoisted_4 = { style: { "margin-top": "15px" } };
  const _hoisted_5 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ vue.createElementVNode("p", { class: "tips" }, [
    /* @__PURE__ */ vue.createTextVNode(" * 登录后，即可在任意设备同步你的配置；"),
    /* @__PURE__ */ vue.createElementVNode("br"),
    /* @__PURE__ */ vue.createTextVNode(" * 云端只负责保存账号及其回复列表，不留存多余信息；"),
    /* @__PURE__ */ vue.createElementVNode("br"),
    /* @__PURE__ */ vue.createTextVNode(" * 如不需登录，也可忽略登录界面，直接使用即可；"),
    /* @__PURE__ */ vue.createElementVNode("br")
  ], -1));
  const _hoisted_6 = { key: 1 };
  const _hoisted_7 = {
    key: 0,
    class: "list"
  };
  const _hoisted_8 = { class: "list-left" };
  const _hoisted_9 = { class: "list-number" };
  const _hoisted_10 = { class: "list-title" };
  const _hoisted_11 = { class: "list-right" };
  const _hoisted_12 = {
    key: 1,
    class: "tips"
  };
  const _hoisted_13 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ vue.createElementVNode("p", null, "未设置快速回帖内容!", -1));
  const _hoisted_14 = [
    _hoisted_13
  ];
  const _hoisted_15 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ vue.createElementVNode("span", null, "网友分享的", -1));
  const _hoisted_16 = { class: "addReplyBox" };
  const _sfc_main$2 = {
    __name: "Set",
    emits: ["updateMyList"],
    setup(__props, { emit }) {
      const { proxy } = vue.getCurrentInstance();
      const myList = vue.ref([]);
      const systemList = vue.ref([]);
      const systemListCount = vue.ref(0);
      const loading = vue.ref(false);
      const isLogin = vue.ref(false);
      const realtimeSync = vue.ref(false);
      const showLoginForce = vue.ref(false);
      const newReply = vue.ref("");
      const queryData = vue.ref({
        skip: 0,
        prop: "replyId",
        order: "descending"
      });
      vue.onBeforeMount(() => {
        isLogin.value = proxy.$storage.getUserInfo("userId");
        realtimeSync.value = proxy.$storage.getUserInfo("realtimeSync");
        changeRealtimeSync(realtimeSync.value);
        getMyList();
        getSystemList();
      });
      function getMyList() {
        let myListStorage = proxy.$storage.get();
        myList.value = myListStorage && myListStorage.length > 0 ? myListStorage : [];
      }
      async function getSystemList() {
        loading.value = true;
        let res = await proxy.$api.selectList(queryData.value.skip, queryData.value.prop, queryData.value.order);
        systemList.value = res.data.totalCount > 0 ? res.data.list : [];
        systemListCount.value = res.data.totalCount;
        loading.value = false;
      }
      function currentPageChange(current) {
        queryData.value.skip = (current - 1) * 10;
        getSystemList();
      }
      function sortChange(e) {
        queryData.value.prop = e.order ? e.prop : "replyId";
        queryData.value.order = e.order ? e.order : "descending";
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
      }
      function shareReply(index) {
        proxy.$api.replyInsert(myList.value[index]).then((res) => {
          proxy.$message.success(res.memo);
        }).catch((err2) => {
          proxy.$message.error(err2.memo);
        });
      }
      function likeReply(index) {
        proxy.$api.likeCountUpdate(systemList.value[index].id).then((res) => {
          systemList.value[index]["likeCount"] = res.data.likeCount;
          proxy.$message.success(res.memo);
        }).catch((err2) => {
          proxy.$message.error(err2.memo);
        });
      }
      function collectReply(index) {
        let nStr = systemList.value[index].content;
        if (myList.value.indexOf(nStr) != -1) {
          proxy.$message.error("该回复已添加过！");
          return false;
        }
        newReply.value = nStr;
        proxy.$api.collectCountUpdate(systemList.value[index].id).then((res) => {
          addReply() && proxy.$message.success(res.memo);
          realtimeSync.value && upload();
        }).catch((err2) => {
          proxy.$message.error(err2.memo);
        });
      }
      function onLoginSuccess() {
        showLoginForce.value = false;
        isLogin.value = true;
        proxy.$gmMenus.changeSettingMenu();
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
      function loginForce() {
        showLoginForce.value = !showLoginForce.value;
      }
      function logout() {
        proxy.$storage.setUserInfo("userId", "");
        isLogin.value = false;
        proxy.$gmMenus.changeSettingMenu();
      }
      function changeRealtimeSync(e) {
        let checked = proxy.$storage.getUserInfo("realtimeSync") || false;
        if (arguments.length == 1) {
          checked = e;
        } else {
          realtimeSync.value = !checked;
          checked = !checked;
          proxy.$storage.setUserInfo("realtimeSync", checked);
        }
        proxy.$gmMenus.changeRealtimeMenu(checked, () => {
          changeRealtimeSync();
        });
      }
      return (_ctx, _cache) => {
        const _component_el_col = vue.resolveComponent("el-col");
        const _component_el_button = vue.resolveComponent("el-button");
        const _component_el_tooltip = vue.resolveComponent("el-tooltip");
        const _component_el_row = vue.resolveComponent("el-row");
        const _component_app_login = vue.resolveComponent("app-login");
        const _component_el_card = vue.resolveComponent("el-card");
        const _component_el_table_column = vue.resolveComponent("el-table-column");
        const _component_el_tag = vue.resolveComponent("el-tag");
        const _component_el_table = vue.resolveComponent("el-table");
        const _component_el_pagination = vue.resolveComponent("el-pagination");
        const _component_el_input = vue.resolveComponent("el-input");
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
                      vue.createVNode(_component_el_card, {
                        class: "box-card",
                        shadow: "never"
                      }, {
                        header: vue.withCtx(() => [
                          vue.createVNode(_component_el_row, {
                            gutter: 20,
                            justify: "space-between"
                          }, {
                            default: vue.withCtx(() => [
                              vue.createVNode(_component_el_col, {
                                span: 12,
                                offset: 0
                              }, {
                                default: vue.withCtx(() => [
                                  _hoisted_2$1
                                ]),
                                _: 1
                              }),
                              vue.unref(isLogin) ? (vue.openBlock(), vue.createBlock(_component_el_col, {
                                key: 0,
                                span: 12,
                                offset: 0,
                                style: { "display": "flex", "justify-content": "end" }
                              }, {
                                default: vue.withCtx(() => [
                                  vue.createVNode(_component_el_tooltip, {
                                    class: "item",
                                    effect: "dark",
                                    content: "注销登录（注销后将不能再同步列表）",
                                    placement: "top-start"
                                  }, {
                                    default: vue.withCtx(() => [
                                      vue.createVNode(_component_el_button, {
                                        type: "danger",
                                        icon: "SwitchButton",
                                        size: "small",
                                        circle: "",
                                        onClick: logout
                                      })
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              })) : vue.createCommentVNode("", true),
                              !vue.unref(isLogin) && vue.unref(myList).length > 0 ? (vue.openBlock(), vue.createBlock(_component_el_col, {
                                key: 1,
                                span: 12,
                                offset: 0,
                                style: { "display": "flex", "justify-content": "end" }
                              }, {
                                default: vue.withCtx(() => [
                                  vue.createVNode(_component_el_tooltip, {
                                    class: "item",
                                    effect: "dark",
                                    content: "登录账号，云端同步",
                                    placement: "top-start"
                                  }, {
                                    default: vue.withCtx(() => [
                                      vue.createVNode(_component_el_button, {
                                        type: "success",
                                        icon: "UserFilled",
                                        size: "small",
                                        circle: "",
                                        onClick: loginForce
                                      })
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              })) : vue.createCommentVNode("", true)
                            ]),
                            _: 1
                          })
                        ]),
                        default: vue.withCtx(() => [
                          vue.unref(myList).length === 0 && !vue.unref(isLogin) || vue.unref(showLoginForce) ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_3, [
                            vue.createElementVNode("div", _hoisted_4, [
                              vue.createVNode(_component_app_login, { onOnSuccess: onLoginSuccess }),
                              _hoisted_5
                            ])
                          ])) : (vue.openBlock(), vue.createElementBlock("div", _hoisted_6, [
                            !vue.unref(showLoginForce) || vue.unref(myList).length > 0 ? (vue.openBlock(), vue.createElementBlock("ul", _hoisted_7, [
                              (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(vue.unref(myList), (item, index) => {
                                return vue.openBlock(), vue.createElementBlock("li", { key: index }, [
                                  vue.createElementVNode("div", _hoisted_8, [
                                    vue.createElementVNode("div", _hoisted_9, vue.toDisplayString(`${index + 1}、`), 1),
                                    vue.createElementVNode("div", _hoisted_10, vue.toDisplayString(`${item}`), 1)
                                  ]),
                                  vue.createElementVNode("div", _hoisted_11, [
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
                            vue.unref(myList).length == 0 ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_12, _hoisted_14)) : vue.createCommentVNode("", true)
                          ]))
                        ]),
                        _: 1
                      })
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
                          _hoisted_15
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
              vue.createElementVNode("div", _hoisted_16, [
                vue.createVNode(_component_el_input, {
                  placeholder: "请输入新的回复内容",
                  modelValue: vue.unref(newReply),
                  "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => vue.isRef(newReply) ? newReply.value = $event : null),
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
  const Set = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-06ead464"]]);
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
      const useAI = vue.ref("");
      vue.onBeforeMount(() => {
        useAI.value = proxy.$storage.getUserInfo("useAI") || "";
        geminiApiKey.value = proxy.$storage.getUserInfo("geminiApiKey") || "";
        useGemini.value = useAI.value == "gemini";
        qianwenApiKey.value = proxy.$storage.getUserInfo("qianwenApiKey") || "";
        useQianwen.value = useAI.value == "qianwen";
      });
      function onGeminiApiKeyChange(e) {
        proxy.$storage.setUserInfo("geminiApiKey", e);
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
      vue.watch(useAI, (n, o) => {
        useGemini.value = n == "gemini";
        useQianwen.value = n == "qianwen";
      });
      return (_ctx, _cache) => {
        const _component_el_input = vue.resolveComponent("el-input");
        const _component_el_tooltip = vue.resolveComponent("el-tooltip");
        const _component_el_form_item = vue.resolveComponent("el-form-item");
        const _component_el_switch = vue.resolveComponent("el-switch");
        const _component_el_form = vue.resolveComponent("el-form");
        const _component_el_card = vue.resolveComponent("el-card");
        return vue.openBlock(), vue.createElementBlock("div", _hoisted_1$1, [
          vue.createVNode(_component_el_card, {
            class: "box-card",
            shadow: "never"
          }, {
            default: vue.withCtx(() => [
              vue.createVNode(_component_el_form, { "label-width": "auto" }, {
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
  const AI = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-51179c71"]]);
  const _hoisted_1 = { class: "margin-left" };
  const _hoisted_2 = { class: "margin-left" };
  const _sfc_main = {
    __name: "Login",
    emits: ["onSuccess"],
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
                proxy.$message.error(res.memo);
                return false;
              }
              loginSuccess(res);
            }).catch((err2) => {
              console.log("登录失败：", err2);
            });
          }
        });
      };
      const registerOnSubmit = () => {
        registerFormRef.value.validate(async (valid, fields) => {
          if (valid) {
            proxy.$api.register(loginForm.value).then((res) => {
              if (res.code != 0) {
                proxy.$message.error(res.memo);
                return false;
              }
              loginSuccess(res);
            }).catch((err2) => {
              console.log("注册失败：", err2);
            });
          }
        });
      };
      return (_ctx, _cache) => {
        const _component_el_input = vue.resolveComponent("el-input");
        const _component_el_form_item = vue.resolveComponent("el-form-item");
        const _component_el_button = vue.resolveComponent("el-button");
        const _component_el_link = vue.resolveComponent("el-link");
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
                    vue.createVNode(_component_el_link, {
                      href: "javascript:;",
                      onClick: _cache[2] || (_cache[2] = ($event) => formMode.value = 0)
                    }, {
                      default: vue.withCtx(() => [
                        vue.createTextVNode("注册")
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
                    vue.createVNode(_component_el_link, {
                      href: "javascript:;",
                      onClick: _cache[6] || (_cache[6] = ($event) => formMode.value = 1)
                    }, {
                      default: vue.withCtx(() => [
                        vue.createTextVNode("登录")
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
          if (_GM_getValue(this.key) && _GM_getValue(this.key).length > 0) {
            return _GM_getValue(this.key);
          } else {
            return [];
          }
        },
        setUserInfo(key, value) {
          let fullKey = `${this.userStorageKey}.${key}`;
          _GM_setValue(fullKey, value);
        },
        getUserInfo(key) {
          let fullKey = `${this.userStorageKey}.${key}`;
          if (_GM_getValue(fullKey) !== "") {
            return _GM_getValue(fullKey);
          } else {
            return "";
          }
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
            proxy.$message.success(res.memo);
          }).catch((err2) => {
            proxy.$message.error(err2.memo);
          });
        },
        async downloadList(callback) {
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
            proxy.$storage.set(res.data);
            proxy.$message.success("下载成功");
            callback && callback(res.data);
            return res.data;
          } else {
            proxy.$message.error(err.memo);
          }
        }
      };
      app2.config.globalProperties.$gmMenus = {
        init() {
          let proxy = app2.config.globalProperties;
          _GM_registerMenuCommand("- 上传列表", function() {
            proxy.$storage.uploadList();
          }, {
            id: "uploadList",
            autoClose: true,
            title: "点此上传将覆盖云端已存储数据"
          });
          _GM_registerMenuCommand("- 下载列表", function() {
            proxy.$storage.downloadList();
          }, {
            id: "downloadList",
            autoClose: true,
            title: "点此下载将覆盖本地已存储数据"
          });
          proxy.$gmMenus.changeSubmitNowMenu(proxy.$storage.getUserInfo("submitNow"));
          proxy.$gmMenus.changeRealtimeMenu(proxy.$storage.getUserInfo("realtimeSync"));
          proxy.$gmMenus.changeAIMenu(proxy.$storage.getUserInfo("AI"));
          proxy.$gmMenus.changeSettingMenu();
        },
        changeDownloadListMenu(callback) {
          let proxy = app2.config.globalProperties;
          if (arguments.length == 1) {
            _GM_registerMenuCommand("- 下载列表", function() {
              proxy.$storage.downloadList(callback);
            }, {
              id: "downloadList",
              autoClose: true,
              title: "点此下载将覆盖本地已存储数据"
            });
          } else {
            _GM_registerMenuCommand("- 下载列表", function() {
              proxy.$storage.downloadList();
            }, {
              id: "downloadList",
              autoClose: true,
              title: "点此下载将覆盖本地已存储数据"
            });
          }
        },
        changeSubmitNowMenu(status, callback) {
          let proxy = app2.config.globalProperties;
          if (arguments.length == 2) {
            _GM_registerMenuCommand(`- 立即提交：${status ? "已启用" : "已停用"}`, callback, {
              id: "submitNow",
              autoClose: true,
              title: "开启后，选择快捷回帖内容后立即提交回帖"
            });
          } else {
            status = proxy.$storage.getUserInfo("submitNow") || false;
            _GM_registerMenuCommand(`- 立即提交：${status ? "已启用" : "已停用"}`, function() {
              proxy.$storage.setUserInfo("submitNow", !status);
              proxy.$gmMenus.changeSubmitNowMenu(!status);
            }, {
              id: "submitNow",
              autoClose: true,
              title: "开启后，选择快捷回帖内容后立即提交回帖"
            });
          }
        },
        changeRealtimeMenu(status, callback) {
          let proxy = app2.config.globalProperties;
          if (arguments.length == 2) {
            _GM_registerMenuCommand(`- 实时同步：${status ? "已启用" : "已停用"}`, callback, {
              id: "realtimeSync",
              autoClose: true,
              title: "开启后，本地列表修改后立即同步到云端存储"
            });
          } else {
            status = proxy.$storage.getUserInfo("realtimeSync") || false;
            _GM_registerMenuCommand(`- 实时同步：${status ? "已启用" : "已停用"}`, function() {
              proxy.$storage.setUserInfo("realtimeSync", !status);
              proxy.$gmMenus.changeRealtimeMenu(!status);
            }, {
              id: "realtimeSync",
              autoClose: true,
              title: "开启后，本地列表修改后立即同步到云端存储"
            });
          }
        },
        changeAIMenu(callback) {
          let proxy = app2.config.globalProperties;
          let useAI = proxy.$storage.getUserInfo("useAI") || "";
          _GM_registerMenuCommand(`- 人工智能：${useAI ? "已启用" : "已停用"}`, callback, {
            id: "AI",
            autoClose: true,
            title: "开启后，使用人工智能(AI)生成回复内容"
          });
        },
        changeSettingMenu(status, callback) {
          let proxy = app2.config.globalProperties;
          let isUserId = proxy.$storage.getUserInfo("userId");
          if (arguments.length == 2) {
            _GM_registerMenuCommand(`- 设置面板：${isUserId ? "已登录" : "未登录"}`, callback, {
              id: "setting",
              autoClose: true,
              title: "打开/关闭设置面板"
            });
          } else {
            _GM_registerMenuCommand(`- 设置面板：${isUserId ? "已登录" : "未登录"}`, null, {
              id: "setting",
              autoClose: true,
              title: "打开/关闭设置面板"
            });
          }
        }
      };
      app2.config.globalProperties.$app = {
        getName() {
          return _GM_info["script"]["name"];
        },
        getVersion: function() {
          return _GM_info["script"]["version"];
        }
      };
    }
  };
  const http = function(api, data) {
    return new Promise((resolve, reject) => {
      _GM_xmlhttpRequest({
        method: "POST",
        url: `https://quickreply.lc.bmqy.net/1.1/functions${api}`,
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "X-LC-Id": `JLqezdmWrYQOatywxVKmB9pX-gzGzoHsz`,
          "X-LC-Key": `hemx77fyB2Usg317i2crcuer`
        },
        data: `${JSON.stringify(data)}`,
        responseType: "json",
        onload: function(xhr) {
          if (xhr.status == 200) {
            resolve(xhr.response.result);
          } else {
            reject(xhr.response.result);
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
        selectList: async function(skip = 0, prop = "replyId", order = "descending") {
          return await http("/selectList", {
            skip,
            prop,
            order
          });
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
        // 获取AI回复
        getAIReply: function(title) {
          return new Promise((resolve, reject) => {
            let proxy = app2.config.globalProperties;
            let useAI = proxy.$storage.getUserInfo("useAI") || "";
            if (!title) {
              reject("参数无效");
            }
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
                        "text": `"请根据帖子标题：${title}，以回帖的语气生成一条15字左右的简短回复"`
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
                  "prompt": `"请根据帖子标题：${title}，以回帖的语气生成一条15字左右的简短回复"`
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
      return $appRoot;
    })()
  );

})(Vue, ElementPlus, ElementPlusIconsVue);
