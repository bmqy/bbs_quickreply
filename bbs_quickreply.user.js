// ==UserScript==
// @name         论坛快捷回帖
// @namespace    快捷回帖
// @homepage     http://bmqy.net/
// @version      1.1.0
// @description  使用自定义内容或本扩展预定义的回帖内容，快捷回复支持的论坛的发帖！
// @author       bmqy
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4RpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo1NjY1Njk3Ni1hNmQ2LWQ1NDAtYTBlZC0yOTc4MzRkMTk3N2EiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RUMzMzI0MjVFQUFBMTFFNzg2NzE4QUI1NzM0QThGNTciIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RUMzMzI0MjRFQUFBMTFFNzg2NzE4QUI1NzM0QThGNTciIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6M2NjNjZkNGUtYzdhMC0wNTQwLWFiODEtZjJmYzJiMmM5MTE3IiBzdFJlZjpkb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6YzNjZGU3YmUtZWFhYS0xMWU3LTllYTUt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
// @require      https://cdn.bootcdn.net/ajax/libs/jquery/1.12.4/jquery.min.js
// @match        */thread*.*
// @match        */forum.php?mod==viewthread*
// @match        */forum.php?mod=viewthread*
// @match        */forum/forum.php?mod=viewthread*
// @match        */forum/thread*
// @match        */bbs/forum.php?mod=viewthread*
// @match        */forum.php?mod=post*
// @grant        GM_info
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_deleteValue
// @grant        GM_addValueChangeListener
// ==/UserScript==

(function() {
    'use strict';
    var QuickReply = {
        options: {
            bEnabled: true,
            sTarget: '#fastposteditor',
            sTargetMessage: '#fastpostmessage',
            sTargetFloat: '#floatlayout_reply',
            sTargetFloatMessage: '#postmessage',
            aTargetReplyfastBtn: ['.replyfast', '#post_replytmp', '.fastre'],
            sTargetEditorBox: '#postbox',
            sTargetEditor: '#e_body',
            sTargetEditorMessage: '#e_iframe',
            sQuickReplyWarp: 'quickReplyWarp',
            sQuickReplySelect: 'quickReplySelect',
            sQuickReplyCustom: 'quickReplyCustom',
            sCustomKey: 'replysCustom',
            defaultReply: [
                '感谢楼主分享，支持一下！',
                '支持一下，希望楼主做的更好，加油！',
                '做的不错哦，楼主加油，期待更好的作品！',
                '标记一下，先看看好不好，谢谢楼主咯！'
            ],
            userReply: []
        },

        setItem: function(value){
            let key = this.options.sCustomKey;
            // 兼容chrome
            try{
                if(GM_info){
                    GM_setValue(key, value);
                } 
            } catch(e){
                if(chrome){
                    chrome.storage.sync.set({[key]: value});
                }
            }            
        },

        getItem: function(){
            var _this = this;
            let key = _this.options.sCustomKey;
            var arr = [];
            try{
                if(GM_info){
                    arr = GM_getValue(key);
                }
            } catch(e){
                if(chrome){
                    arr = _this.options.userReply;
                }
            }
            return arr && arr.length>0 ? arr : _this.options.defaultReply;
        },

        _getChromeStorage: async function(){
            this.options.userReply = await this.getChromeStorageSyncData();
        },

        getChromeStorageSyncData: function () {
            let _this = this;
            let key = _this.options.sCustomKey;
            return new Promise((resolve, reject) => {
                chrome.storage.sync.get(key, (items) => {
                    if (chrome.runtime.lastError) {
                        reject(chrome.runtime.lastError);
                    }
                    resolve(items[key] ? items[key] : items['key']);
                });
            });
        },

        getVersion: function(){
            try{
                if(GM_info){
                    return GM_info['script']['version'];
                }
                
            } catch(e) {
                if(chrome){
                    var manifestData = chrome.runtime.getManifest();
                    return manifestData.version;
                }
            }
        },

        updateReplysSelect: function (obj, arrReplys){
            obj.options.length = 0;
            for(var i=0;i<arrReplys.length;i++){
                obj.options.add(new Option(arrReplys[i], i));
            }
        },

        updateReplysCustom: function(obj, arrReplys){
            var _tempAReplys = '';
            for(var i=0;i<arrReplys.length; i++){
                _tempAReplys += arrReplys[i] +'\n';
            }
            obj.value = _tempAReplys;
        },

        getQuickReply: function(sTarget, sTargetMessage){
            var _this = this;
            var oTarget = (typeof sTarget === 'undefined') ? document.querySelector(_this.options.sTarget) : document.querySelector(sTarget);
            if(document.querySelector(_this.options.sTargetEditorBox)){
                oTarget = document.querySelector(_this.options.sTargetEditorBox);
            }
            var oTargetMessage = (typeof sTargetMessage === 'undefined') ? document.querySelector(_this.options.sTargetMessage) : document.querySelector(sTargetMessage);

            var oQuikReplyWarp = document.createElement('div');
            oQuikReplyWarp.id = _this.options.sQuickReplyWarp;
            oQuikReplyWarp.style= `margin-bottom: 10px;`;

            var oQuikReplyLabel = document.createElement('label');
            oQuikReplyLabel.style = 'color:red;font-weight:bolder';
            oQuikReplyLabel.innerHTML = '快捷回帖：';
            var oQuikReplySelect = document.createElement('select');
            oQuikReplySelect.id =  _this.options.sQuickReplySelect;
            oQuikReplySelect.style =  `
                width: 300px;
                height: 28px;
                padding: 0 15px;
                display: inline-block;
                background-color: #fff;
                background-image: none;
                border-radius: 4px;
                border: 1px solid #dcdfe6;
                box-sizing: border-box;
                color: #606266;
                font-size: 14px;
                line-height: 28px;
                outline: none;
                transition: border-color .2s cubic-bezier(.645,.045,.355,1);
                position: relative;
                cursor: pointer;
            `;
            _this.updateReplysSelect(oQuikReplySelect, _this.getItem());

            oQuikReplySelect.addEventListener('change', function(e){
                if(document.querySelector(_this.options.sTargetEditor)){
                    var oTargetEditorMessage = document.querySelector(_this.options.sTargetEditorMessage).contentWindow.document.body;
                    oTargetEditorMessage.innerHTML = this.options[this.selectedIndex].text;
                } else if(document.querySelector(_this.options.sTargetMessage)){
                    oTargetMessage.value = this.options[this.selectedIndex].text;
                    oTargetMessage.style.background = 'none';
                }
            });

            var oQuickReplyBtnCustom = document.createElement('a');
            oQuickReplyBtnCustom.innerHTML = '自定义回帖';
            oQuickReplyBtnCustom.href = 'javascript:;';
            oQuickReplyBtnCustom.style = "margin-left:10px;color:#999;font-size:12px;";

            oQuickReplyBtnCustom.addEventListener('click', function(e){
                var _posX = e.clientX;
                var _posY = e.clientY;
                var oQuickReplyCustom = document.querySelector('#'+ _this.options.sQuickReplyCustom);
                oQuickReplyCustom.style.display = 'block';
                var _panelW = oQuickReplyCustom.offsetWidth;
                var _panelH = oQuickReplyCustom.offsetHeight;
                oQuickReplyCustom.style.top = _posY - _panelW - 20 +'px';
                oQuickReplyCustom.style.left = _posX - _panelH/2 +'px';
            });

            oQuikReplyLabel.appendChild(oQuikReplySelect);
            oQuikReplyWarp.appendChild(oQuikReplyLabel);
            oQuikReplyWarp.appendChild(oQuickReplyBtnCustom);

            if(!oTarget.querySelector('#'+ _this.options.sQuickReplyWarp)){
                if(document.querySelector(_this.options.sTargetEditorBox)){
                    var oTargetEditor = document.querySelector(_this.options.sTargetEditor);
                    oTarget.insertBefore(oQuikReplyWarp, oTargetEditor);
                } else {
                    oTarget.insertBefore(oQuikReplyWarp, oTarget.childNodes[0]);
                }
            }
        },

        getReplysCustom: function(sTarget, sTargetMessage){
            var _this = this;
            var oTarget = (typeof sTarget === 'undefined') ? document.querySelector(_this.options.sTarget) : document.querySelector(sTarget);
            var oTargetMessage = (typeof sTargetMessage === 'undefined') ? document.querySelector(_this.options.sTargetMessage) : document.querySelector(sTargetMessage);

            if(document.querySelector('#'+ _this.options.sQuickReplyCustom)){
                return false;
            }

            var oCustomPanel = document.createElement('div');
            oCustomPanel.id = _this.options.sQuickReplyCustom;
            oCustomPanel.style = `
                width: 300px;
                height: auto;
                text-align: center;
                background-color: rgb(255, 255, 255);
                padding: 10px;
                box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
                position: fixed;
                left: 473px;
                top: 577px;
                border-radius: 4px;
                display: none;
                box-sizing: border-box;
            `;

            var oCustomTips = document.createElement('p');
            oCustomTips.style = `text-align:left;line-height: 32px;`;
            oCustomTips.innerHTML = '<font color="red">* 一行一条，请注意回车换行</font>';

            var oCustomTextarea = document.createElement('textarea');
            oCustomTextarea.style = `
                width:100%;
                padding:5px;
                display: block;
                resize: none;
                padding: 5px 15px;
                line-height: 1.5;
                box-sizing: border-box;
                font-size: inherit;
                color: #606266;
                background-color: #fff;
                background-image: none;
                border: 1px solid #dcdfe6;
                border-radius: 4px;
                transition: border-color .2s cubic-bezier(.645,.045,.355,1);
            `;
            oCustomTextarea.addEventListener('focus', function(){
                this.style=`width:100%;padding:5px;display: block;resize: none;padding: 5px 15px;line-height: 1.5;box-sizing: border-box;font-size: inherit;color: #606266;background-color: #fff;background-image: none;border: 1px solid #dcdfe6;border-radius: 4px;transition: border-color .2s cubic-bezier(.645,.045,.355,1);outline: none;border-color: #409eff;`
            });
            oCustomTextarea.addEventListener('blur', function(){
                this.style=`width:100%;padding:5px;display: block;resize: none;padding: 5px 15px;line-height: 1.5;box-sizing: border-box;font-size: inherit;color: #606266;background-color: #fff;background-image: none;border: 1px solid #dcdfe6;border-radius: 4px;transition: border-color .2s cubic-bezier(.645,.045,.355,1);`
            });
            oCustomTextarea.rows = '7';
            _this.updateReplysCustom(oCustomTextarea, _this.getItem());

            var oCustomSaveBtn = document.createElement('button');
            oCustomSaveBtn.style = `
                width: 100%;
                display: inline-block;
                line-height: 1;
                white-space: nowrap;
                cursor: pointer;
                background: #fff;
                border: 1px solid #dcdfe6;
                color: #606266;
                -webkit-appearance: none;
                text-align: center;
                box-sizing: border-box;
                outline: none;
                margin: 0;
                transition: .1s;
                font-weight: 500;
                -moz-user-select: none;
                -webkit-user-select: none;
                -ms-user-select: none;
                padding: 9px 15px;
                font-size: 12px;
                border-radius: 3px;
            `;
            oCustomSaveBtn.innerHTML = '保存';

            oCustomSaveBtn.addEventListener('click', function(){
                var oQuickReplySelect = document.querySelector('#'+ _this.options.sQuickReplySelect);
                var _customReply = oCustomTextarea.value.split('\n');
                var _tempArr = [];

                for(var i=0; i<_customReply.length; i++){
                    if(_customReply[i] !== ''){
                        _tempArr.push(_customReply[i]);
                    }
                }
                if(_tempArr.length === 0){
                    _tempArr = _this.options.defaultReply;
                }
                oCustomPanel.style.display = 'none';
                _this.setItem(_tempArr);
            });

            var oCustomVersion = document.createElement('div');
            oCustomVersion.style = `padding:5px 0 0;text-align:right;color: #999;font-size:12px;`;
            oCustomVersion.innerHTML = `ver: ${_this.getVersion()}`;

            oCustomPanel.appendChild(oCustomTextarea);
            oCustomPanel.appendChild(oCustomTips);
            oCustomPanel.appendChild(oCustomSaveBtn);
            oCustomPanel.appendChild(oCustomVersion);
            document.body.appendChild(oCustomPanel);
        },

        addListenConfig: function(){
            var _this = this;
            try{
                if(GM_info){
                    GM_addValueChangeListener(_this.options.sCustomKey, function(name, old_value, new_value, remote){
                        var aNewReplyCustom = new_value;
                        var oQuickReplySelect = null;
                        if(document.querySelector(_this.options.sTarget)){
                            oQuickReplySelect = document.querySelector(_this.options.sTarget +' #'+ _this.options.sQuickReplySelect);
                            _this.updateReplysSelect(oQuickReplySelect, aNewReplyCustom);
                            document.querySelector(_this.options.sTargetMessage).value = aNewReplyCustom[0];
                        }
                        if(document.querySelector(_this.options.sTargetFloat)){
                            oQuickReplySelect = document.querySelector(_this.options.sTargetFloat +' #'+ _this.options.sQuickReplySelect);
                            _this.updateReplysSelect(oQuickReplySelect, aNewReplyCustom);
                            document.querySelector(_this.options.sTargetFloatMessage).value = aNewReplyCustom[0];
                        }
                    });
                }
            } catch(e){
                if(chrome){
                    chrome.storage.onChanged.addListener(function(changes){
                        var _arr = [];
                        for (var name in changes) {
                            _arr = changes[name].newValue;
                        }
        
                        _this.options.userReply = _arr;
        
                        var aNewReplyCustom = _arr;
                        var oQuickReplySelect = null;
                        if(document.querySelector(_this.options.sTarget)){
                            oQuickReplySelect = document.querySelector(_this.options.sTarget +' #'+ _this.options.sQuickReplySelect);
                            _this.updateReplysSelect(oQuickReplySelect, aNewReplyCustom);
                            document.querySelector(_this.options.sTargetMessage).value = aNewReplyCustom[0];
                        }
                        if(document.querySelector(_this.options.sTargetFloat)){
                            oQuickReplySelect = document.querySelector(_this.options.sTargetFloat +' #'+ _this.options.sQuickReplySelect);
                            _this.updateReplysSelect(oQuickReplySelect, aNewReplyCustom);
                            document.querySelector(_this.options.sTargetFloatMessage).value = aNewReplyCustom[0];
                        }
                    });
                }
            }
        },

        bindReplyBtn: function(){
            var _this = this;
            _this.options.aTargetReplyfastBtn.forEach(function(e, i){
                var aBtn = document.querySelectorAll(e);
                for(let i=0; i<aBtn.length; i++){
                    let btn = aBtn[i];
                    btn.addEventListener('click', function(){
                        document.addEventListener('DOMNodeInserted', function(e){
                            if(e.target.id === 'postform'){
                                var sTF = _this.options.sTargetFloat;
                                var sTFM = _this.options.sTargetFloatMessage;
                                _this.initAfter(sTF, sTFM);
                                _this.getQuickReply(sTF, sTFM);
                            }
                        });
                    });
                }
            });
        },

        bindEditor: function(){
            var _this = this;
            if(document.querySelector(_this.options.sTargetEditor)){
                var sE = _this.options.sTargetEditor;
                var sER = _this.options.sTargetEditorMessage;
                _this.initAfter(sE, sER);
                _this.getQuickReply(sE, sER);
                _this.getReplysCustom(sE, sER);
            }
        },


        initAfter: function(sTarget, sTargetMessage){
            var _this = this;
            var oTarget = (typeof sTarget === 'undefined') ? document.querySelector(_this.options.sTarget) : document.querySelector(sTarget);
            var oTargetMessage = (typeof sTargetMessage === 'undefined') ? document.querySelector(_this.options.sTargetMessage) : document.querySelector(sTargetMessage);

            if(document.querySelector(_this.options.sTargetEditor)){
                var oTargetEditorMessage = document.querySelector(_this.options.sTargetEditorMessage).contentWindow.document.body;
                oTargetEditorMessage.innerHTML = location.href.indexOf('action=edit')==-1 ? _this.getItem()[0] : oTargetEditorMessage.innerHTML;
            } else if(document.querySelector(_this.options.sTargetMessage)){
                oTargetMessage.value = _this.getItem()[0];
                oTargetMessage.style.background = 'none';
            }
        },

        init: async function(opt){
            for(var k in opt){
                this.options[k] = opt[k];
            }
            if(!this.options.bEnabled){
                return false;
            }
            
            try{
                await this._getChromeStorage();
            } catch(e){}

            if(document.querySelector(this.options.sTarget)){
                this.initAfter();
                this.getQuickReply();
                this.getReplysCustom();
            }
            this.bindReplyBtn();
            this.bindEditor();
            this.addListenConfig();
        }
    };

    QuickReply.init();
})();
