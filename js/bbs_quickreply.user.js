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
