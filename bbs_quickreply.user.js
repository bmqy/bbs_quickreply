// ==UserScript==
// @name         论坛快捷回帖
// @namespace    http://bmqy.net/
// @version      0.1.2
// @description  使用本扩展预定义的回帖内容，快捷回复支持的论坛的发帖！
// @author       bmqy
// @match        *://bbs.*/*
// @match        *://www.52pojie.cn/*
// @match        *://www.miui.com/*
// @match        *://club.huawei.com/*
// @grant        GM_getValue
// @grant        GM_setValue
// ==/UserScript==

(function() {
    'use strict';

    // 预定义回复内容
    var aReplys = GM_getValue('replysCustom').toString().trim() === '' ? [
        '感谢楼主分享，支持一下！',
        '支持一下，希望楼主做的更好，加油！',
        '做的不错哦，楼主加油，期待更好的作品！',
        '标记一下，先看看好不好，谢谢楼主咯！',
    ] : GM_getValue('replysCustom');

    // 更新快捷回帖列表
    function quickReplysUpdate(obj, arrReplys){
        obj.options.length = 0;
        for(var i=0;i<arrReplys.length;i++){
            obj.options.add(new Option(arrReplys[i], i));
        }
    }

    // 更新自定义回帖内容
    function quickReplysCustomUpdate(obj, arrReplys){
        var _tempAReplys = '';
        for(var i=0;i<arrReplys.length; i++){
            _tempAReplys += arrReplys[i] +'\n';
        }
        obj.value = _tempAReplys;
    }

    // 理论上支持任意Discuz类论坛
    if(document.querySelector('#fastposteditor')){

        // 自定义回复
        var oCustomPanel = document.createElement('div');
        oCustomPanel.style = 'width:280px;height:180px;text-align:center;background-color: #fff;padding:10px;box-shadow:0 0 3px 5px #ddd;position:fixed;left:50%;top:13%;display:none;';

        var oCustomTips = document.createElement('p');
        oCustomTips.style = 'text-align:left;';
        oCustomTips.innerHTML = '<font color="red">* 一行一条，请注意回车换行</font>';

        var oCustomTextarea = document.createElement('textarea');
        oCustomTextarea.style = 'width:96%;padding:5px;';
        oCustomTextarea.rows = '7';
        oCustomTextarea.id = 'quickReplyCustom';
        quickReplysCustomUpdate(oCustomTextarea, aReplys);

        var oCustomSaveBtn = document.createElement('button');
        oCustomSaveBtn.style = 'width: 100%;';
        oCustomSaveBtn.innerHTML = '保存';
        oCustomSaveBtn.id = 'customReplySaveBtn';

        oCustomSaveBtn.addEventListener('click', function(){
            var _customReply = oCustomTextarea.value.split('\n');
            var _tempArr = [];
            for(var i=0; i<_customReply.length; i++){
                if(_customReply[i] !== ''){
                    _tempArr.push(_customReply[i]);
                }
            }
            if(_tempArr.length === 0){
                _tempArr = [
                    '感谢楼主分享，支持一下！',
                    '支持一下，希望楼主做的更好，加油！',
                    '做的不错哦，楼主加油，期待更好的作品！',
                    '标记一下，先看看好不好，谢谢楼主咯！',
                ];
            }
            oCustomPanel.style.display = 'none';
            quickReplysCustomUpdate(oCustomTextarea, _tempArr);
            quickReplysUpdate(oQuikReplyList, _tempArr);
            GM_setValue('replysCustom', _tempArr);
        });

        oCustomPanel.appendChild(oCustomTextarea);
        oCustomPanel.appendChild(oCustomTips);
        oCustomPanel.appendChild(oCustomSaveBtn);
        document.body.appendChild(oCustomPanel);

        // 载入快捷回帖
        var oReplyEdit = document.querySelector('#fastposteditor');
        var oReplyEditContent = document.querySelector('#fastpostmessage');
        var oQuikReplyWarp = document.createElement('div');

        var oQuikReplyLabel = document.createElement('label');
        oQuikReplyLabel.style = 'color:red;font-weight:bolder';
        oQuikReplyLabel.innerHTML = '快捷回帖：';

        var oQuikReplyList = document.createElement('select');
        oQuikReplyList.id = 'quickReply';
        for(var j=0;j<aReplys.length;j++){
            oQuikReplyList.options.add(new Option(aReplys[j], j));
        }

        var oQuickReplyBtnCustom = document.createElement('a');
        oQuickReplyBtnCustom.innerHTML = '自定义回复';
        oQuickReplyBtnCustom.href = 'javascript:;';
        oQuickReplyBtnCustom.style = "margin-left:10px;color:#999;font-size:12px;";
        oQuickReplyBtnCustom.id = 'btnCustomReply';

        oQuikReplyLabel.appendChild(oQuikReplyList);
        oQuikReplyWarp.appendChild(oQuikReplyLabel);
        oQuikReplyWarp.appendChild(oQuickReplyBtnCustom);
        oReplyEdit.insertBefore(oQuikReplyWarp, oReplyEdit.childNodes[0]);

        oReplyEditContent.value = aReplys[0];
        oReplyEditContent.style.background = 'none';

        oQuikReplyList.addEventListener('change', function(){
            oReplyEditContent.value = this.options[this.selectedIndex].text;
            oReplyEditContent.style.background = 'none';
        });

        oQuickReplyBtnCustom.addEventListener('click', function(e){
            var _posX = e.clientX;
            var _posY = e.clientY;

            oCustomPanel.style.top = _posY - 220 +'px';
            oCustomPanel.style.left = _posX - 150 +'px';
            oCustomPanel.style.display = 'block';
        });
    }
})();