// ==UserScript==
// @name         论坛快捷回帖
// @namespace    http://bmqy.net/
// @version      0.2.0.1
// @description  使用自定义内容或本扩展预定义的回帖内容，快捷回复支持的论坛的发帖！
// @author       bmqy
// @match        */thread*.*
// @match        */forum.php?mod==viewthread*
// @grant        GM_getValue
// @grant        GM_setValue
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
            sTargetReplyfastBtn: '.replyfast',
            sQuickReplyWarp: 'quickReplyWarp',
            sQuickReplySelect: 'quickReplySelect',
            sQuickReplyCustom: 'quickReplyCustom',
            sCustomKey: 'replysCustom',
            aReplysDefault: [
                '感谢楼主分享，支持一下！',
                '支持一下，希望楼主做的更好，加油！',
                '做的不错哦，楼主加油，期待更好的作品！',
                '标记一下，先看看好不好，谢谢楼主咯！'
            ]
        },

        setItem: function(key, value){
            GM_setValue(key, value);
        },

        getItem: function(key){
            var arr = [];
            if(GM_getValue(key) && GM_getValue(key).length > 0){
                arr = GM_getValue(key);
            }
            else{
                arr = this.options.aReplysDefault;
            }
            return arr;
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
            var oTargetMessage = (typeof sTargetMessage === 'undefined') ? document.querySelector(_this.options.sTargetMessage) : document.querySelector(sTargetMessage);

            var oQuikReplyWarp = document.createElement('div');
            oQuikReplyWarp.id = _this.options.sQuickReplyWarp;

            var oQuikReplyLabel = document.createElement('label');
            oQuikReplyLabel.style = 'color:red;font-weight:bolder';
            oQuikReplyLabel.innerHTML = '快捷回帖：';
            var oQuikReplySelect = document.createElement('select');
            oQuikReplySelect.id =  _this.options.sQuickReplySelect;
            _this.updateReplysSelect(oQuikReplySelect, _this.getItem(_this.options.sCustomKey));

            oQuikReplySelect.addEventListener('change', function(e){
                oTargetMessage.value = this.options[this.selectedIndex].text;
                oTargetMessage.style.background = 'none';
            });

            var oQuickReplyBtnCustom = document.createElement('a');
            oQuickReplyBtnCustom.innerHTML = '自定义回帖';
            oQuickReplyBtnCustom.href = 'javascript:;';
            oQuickReplyBtnCustom.style = "margin-left:10px;color:#999;font-size:12px;";

            oQuickReplyBtnCustom.addEventListener('click', function(e){
                var _posX = e.clientX;
                var _posY = e.clientY;
                var oQuickReplyCustom = document.querySelector('#'+ _this.options.sQuickReplyCustom);

                oQuickReplyCustom.style.top = _posY - 280 +'px';
                oQuickReplyCustom.style.left = _posX - 150 +'px';
                oQuickReplyCustom.style.display = 'block';
            });

            oQuikReplyLabel.appendChild(oQuikReplySelect);
            oQuikReplyWarp.appendChild(oQuikReplyLabel);
            oQuikReplyWarp.appendChild(oQuickReplyBtnCustom);

            if(!oTarget.querySelector('#'+ _this.options.sQuickReplyWarp)){
                oTarget.insertBefore(oQuikReplyWarp, oTarget.childNodes[0]);
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
            oCustomPanel.style = 'width:280px;height:190px;text-align:center;background-color: #fff;padding:10px;box-shadow:0 0 3px 5px #ddd;position:fixed;left:50%;top:13%;display:none;';

            var oCustomTips = document.createElement('p');
            oCustomTips.style = 'text-align:left;';
            oCustomTips.innerHTML = '<font color="red">* 一行一条，请注意回车换行</font>';

            var oCustomTextarea = document.createElement('textarea');
            oCustomTextarea.style = 'width:96%;padding:5px;';
            oCustomTextarea.rows = '7';
            _this.updateReplysCustom(oCustomTextarea, _this.getItem(_this.options.sCustomKey));

            var oCustomSaveBtn = document.createElement('button');
            oCustomSaveBtn.style = 'width: 100%;';
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
                    _tempArr = _this.options.aReplysDefault;
                }
                oCustomPanel.style.display = 'none';
                _this.setItem(_this.options.sCustomKey, _tempArr);
            });

            oCustomPanel.appendChild(oCustomTextarea);
            oCustomPanel.appendChild(oCustomTips);
            oCustomPanel.appendChild(oCustomSaveBtn);
            document.body.appendChild(oCustomPanel);
        },

        addListenConfig: function(){
            var _this = this;
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
        },

        bindReplyfast: function(){
            var _this = this;
            var oBtnReplyFast = document.querySelector(_this.options.sTargetReplyfastBtn);
            oBtnReplyFast.addEventListener('click', function(e){
                document.addEventListener('DOMNodeInserted', function(){
                    if(document.querySelector(_this.options.sTargetFloat)){
                        var sTargetFloat = _this.options.sTargetFloat;
                        var sTargetFloatMessage = _this.options.sTargetFloatMessage;
                        _this.initAfter(sTargetFloat, sTargetFloatMessage);
                        _this.getQuickReply(sTargetFloat, sTargetFloatMessage);
                        _this.getReplysCustom(sTargetFloat, sTargetFloatMessage);
                    }
                });
            });
        },


        initAfter: function(sTarget, sTargetMessage){
            var _this = this;
            var oTarget = (typeof sTarget === 'undefined') ? document.querySelector(_this.options.sTarget) : document.querySelector(sTarget);
            var oTargetMessage = (typeof sTargetMessage === 'undefined') ? document.querySelector(_this.options.sTargetMessage) : document.querySelector(sTargetMessage);

            oTargetMessage.value = _this.getItem(_this.options.sCustomKey)[0];
            oTargetMessage.style.background = 'none';
        },

        init: function(opt){
            for(var k in opt){
                this.options[k] = opt[k];
            }
            if(!this.options.bEnabled){
                return false;
            }

            if(document.querySelector(this.options.sTarget)){
                this.initAfter();
                this.getQuickReply();
                this.getReplysCustom();
            }
            this.bindReplyfast();
            this.addListenConfig();
        }
    };

    QuickReply.init();
})();