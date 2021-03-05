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
            aReplysCustom: [],
            aReplysDefault: [
                '感谢楼主分享，支持一下！',
                '支持一下，希望楼主做的更好，加油！',
                '做的不错哦，楼主加油，期待更好的作品！',
                '标记一下，先看看好不好，谢谢楼主咯！'
            ]
        },

        setItem: function(key, value){
            chrome.storage.sync.set({'replysCustom': value});
        },

        getItem: function(key, callback){
            var _this = this;
            var arr = _this.options.aReplysDefault;
            chrome.storage.sync.get(key, function(item){
                for(var key in item){
                    if(item[_this.options.sCustomKey].length > 0){
                        arr = item[_this.options.sCustomKey];
                    }
                }

                if(arr && callback){
                    callback(arr);
                }
            });
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

        getQuickReply: function(sTarget, sTargetMessage, isHtml){
            var _this = this;
            var oTarget = (typeof sTarget === 'undefined') ? document.querySelector(_this.options.sTarget) : document.querySelector(sTarget);
            if(document.querySelector(_this.options.sTargetEditorBox)){
                oTarget = document.querySelector(_this.options.sTargetEditorBox);
            }
            var oTargetMessage = (typeof sTargetMessage === 'undefined') ? document.querySelector(_this.options.sTargetMessage) : document.querySelector(sTargetMessage);

            var oQuikReplyWarp = document.createElement('div');
            oQuikReplyWarp.id = _this.options.sQuickReplyWarp;

            var oQuikReplyLabel = document.createElement('label');
            oQuikReplyLabel.style = 'color:red;font-weight:bolder';
            oQuikReplyLabel.innerHTML = '快捷回帖：';
            var oQuikReplySelect = document.createElement('select');
            oQuikReplySelect.id =  _this.options.sQuickReplySelect;
            _this.updateReplysSelect(oQuikReplySelect, _this.options.aReplysCustom);

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

                oQuickReplyCustom.style.top = _posY - 280 +'px';
                oQuickReplyCustom.style.left = _posX - 150 +'px';
                oQuickReplyCustom.style.display = 'block';
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
            oCustomPanel.style = 'width:280px;height:190px;text-align:center;background-color: #fff;padding:10px;box-shadow:0 0 3px 5px #ddd;position:fixed;left:50%;top:13%;display:none;';

            var oCustomTips = document.createElement('p');
            oCustomTips.style = 'text-align:left;';
            oCustomTips.innerHTML = '<font color="red">* 一行一条，请注意回车换行</font>';

            var oCustomTextarea = document.createElement('textarea');
            oCustomTextarea.style = 'width:96%;padding:5px;';
            oCustomTextarea.rows = '7';
            _this.updateReplysCustom(oCustomTextarea, _this.options.aReplysCustom);

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
            chrome.storage.onChanged.addListener(function(changes){
                var _arr = [];
                for (var name in changes) {
                    _arr = changes[name].newValue;
                }

                _this.options.aReplysDefault = _arr;

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

        initBefore: function (key, callback) {
            this.getItem(key, callback);
        },

        initAfter: function(sTarget, sTargetMessage){
            var _this = this;
            var oTarget = (typeof sTarget === 'undefined') ? document.querySelector(_this.options.sTarget) : document.querySelector(sTarget);
            var oTargetMessage = (typeof sTargetMessage === 'undefined') ? document.querySelector(_this.options.sTargetMessage) : document.querySelector(sTargetMessage);

            if(document.querySelector(_this.options.sTargetEditor)){
                var oTargetEditorMessage = document.querySelector(_this.options.sTargetEditorMessage).contentWindow.document.body;
                oTargetEditorMessage.innerHTML = _this.options.aReplysCustom[0];
            } else if(document.querySelector(_this.options.sTargetMessage)){
                oTargetMessage.value = _this.options.aReplysCustom[0];
                oTargetMessage.style.background = 'none';
            }
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
            this.bindReplyBtn();
            this.bindEditor();
            this.addListenConfig();
        }
    };

    QuickReply.initBefore(QuickReply.options.sCustomKey, function (res) {
        QuickReply.init({'aReplysCustom': res});
    });
})();