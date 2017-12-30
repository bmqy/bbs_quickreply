(function() {
    'use strict';
    function QuickReply(){
        // 预定义回复内容
        this.replysDefault = [
            '感谢楼主分享，支持一下！',
            '支持一下，希望楼主做的更好，加油！',
            '做的不错哦，楼主加油，期待更好的作品！',
            '标记一下，先看看好不好，谢谢楼主咯！'
        ];

        // 自定义回复内容
        this.replysCustom = this.replysDefault;

        // 源回复框
        this.targetReplyEditWarp = document.querySelector('#fastposteditor');
        this.targetReplyEditContent = document.querySelector('#fastpostmessage');
    }

    QuickReply.prototype.getQuickReply = function(){
        var oQuikReplyWarp = document.createElement('div');

        var oQuikReplyLabel = document.createElement('label');
        oQuikReplyLabel.style = 'color:red;font-weight:bolder';
        oQuikReplyLabel.innerHTML = '快捷回帖：';

        var oQuikReplySelect = document.createElement('select');
        oQuikReplySelect.id = 'quickReplyList';
        QuickReply.updateReplysSelect(oQuikReplySelect, QuickReply.replysCustom);

        oQuikReplySelect.addEventListener('change', function(e){
            QuickReply.targetReplyEditContent.value = this.options[this.selectedIndex].text;
            QuickReply.targetReplyEditContent.style.background = 'none';
        });

        var oQuickReplyBtnCustom = document.createElement('a');
        oQuickReplyBtnCustom.innerHTML = '自定义回帖';
        oQuickReplyBtnCustom.href = 'javascript:;';
        oQuickReplyBtnCustom.style = "margin-left:10px;color:#999;font-size:12px;";

        oQuickReplyBtnCustom.addEventListener('click', function(e){
            var _posX = e.clientX;
            var _posY = e.clientY;
            var oQuickReplyCustom = document.querySelector('#quickReplyCustom');

            oQuickReplyCustom.style.top = _posY - 230 +'px';
            oQuickReplyCustom.style.left = _posX - 150 +'px';
            oQuickReplyCustom.style.display = 'block';
        });

        oQuikReplyLabel.appendChild(oQuikReplySelect);
        oQuikReplyWarp.appendChild(oQuikReplyLabel);
        oQuikReplyWarp.appendChild(oQuickReplyBtnCustom);

        QuickReply.targetReplyEditWarp.insertBefore(oQuikReplyWarp, QuickReply.targetReplyEditWarp.childNodes[0]);
    };

    QuickReply.prototype.getReplysCustom = function(){
        var oCustomPanel = document.createElement('div');
        oCustomPanel.id = 'quickReplyCustom';
        oCustomPanel.style = 'width:280px;height:190px;text-align:center;background-color: #fff;padding:10px;box-shadow:0 0 3px 5px #ddd;position:fixed;left:50%;top:13%;display:none;';

        var oCustomTips = document.createElement('p');
        oCustomTips.style = 'text-align:left;';
        oCustomTips.innerHTML = '<font color="red">* 一行一条，请注意回车换行</font>';

        var oCustomTextarea = document.createElement('textarea');
        oCustomTextarea.style = 'width:96%;padding:5px;';
        oCustomTextarea.rows = '7';
        QuickReply.updateReplysCustom(oCustomTextarea, this.replysCustom);

        var oCustomSaveBtn = document.createElement('button');
        oCustomSaveBtn.style = 'width: 100%;';
        oCustomSaveBtn.innerHTML = '保存';

        oCustomSaveBtn.addEventListener('click', function(){
            var oQuickReplySelect = document.querySelector('#quickReplyList');
            var _customReply = oCustomTextarea.value.split('\n');
            var _tempArr = [];

            for(var i=0; i<_customReply.length; i++){
                if(_customReply[i] !== ''){
                    _tempArr.push(_customReply[i]);
                }
            }
            if(_tempArr.length === 0){
                _tempArr = QuickReply.replysDefault;
            }
            oCustomPanel.style.display = 'none';
            QuickReply.updateReplysCustom(oCustomTextarea, _tempArr);
            QuickReply.updateReplysSelect(oQuickReplySelect, _tempArr);
            QuickReply.targetReplyEditContent.value = _tempArr[0];
            QuickReply.setItem({'replysCustom': _tempArr});
        });

        oCustomPanel.appendChild(oCustomTextarea);
        oCustomPanel.appendChild(oCustomTips);
        oCustomPanel.appendChild(oCustomSaveBtn);
        document.body.appendChild(oCustomPanel);
    };

    QuickReply.prototype.updateReplysSelect = function (obj, arrReplys){
        obj.options.length = 0;
        for(var i=0;i<arrReplys.length;i++){
            obj.options.add(new Option(arrReplys[i], i));
        }
    };

    QuickReply.prototype.updateReplysCustom = function(obj, arrReplys){
        var _tempAReplys = '';
        for(var i=0;i<arrReplys.length; i++){
            _tempAReplys += arrReplys[i] +'\n';
        }
        obj.value = _tempAReplys;
    };

    QuickReply.prototype.setItem = function(data){
        chrome.storage.sync.set(data);
    };

    QuickReply.prototype.initBefore = function(callback){
        chrome.storage.sync.get('replysCustom', function (item) {
            callback && callback(item);
        });
    };

    QuickReply.prototype.init = function(res){
        if(res){
            QuickReply.replysCustom = res.replysCustom;
        }
        // 理论上支持大部分Discuz类论坛
        if(document.querySelector('#fastposteditor')){
            QuickReply.getQuickReply();
            QuickReply.getReplysCustom();
            QuickReply.targetReplyEditContent.value = QuickReply.replysCustom[0];
            QuickReply.targetReplyEditContent.style.background = 'none';
        }
    };

    var QuickReply = new QuickReply();
    QuickReply.initBefore(function(res){
        QuickReply.init(res);
    });
})();