// ==UserScript==
// @name         论坛快捷回帖
// @namespace    http://bmqy.net/
// @version      0.1.0
// @description  使用本扩展预定义的回帖内容，快捷回复支持的论坛的发帖！
// @author       bmqy
// @match        *://bbs.*/*
// @match        *://www.52pojie.cn/*
// @match        *://www.miui.com/*
// @match        *://club.huawei.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // 预定义回复内容
    var aReplys = [
        '感谢楼主分享，支持一下！',
        '支持一下，希望楼主做的更好，加油！',
        '做的不错哦，楼主加油，期待更好的作品！',
        '标记一下，先看看好不好，谢谢楼主咯！',
    ];

    // 理论上支持任意Discuz类论坛
    if(document.querySelector('#fastposteditor')){
        var oReplyEdit = document.querySelector('#fastposteditor');
        var oReplyEditContent = document.querySelector('#fastpostmessage');
        var oQuikReplyWarp = document.createElement('div');

        var oQuikReplyLabel = document.createElement('label');
        oQuikReplyLabel.style = 'color:red;font-weight:bolder';
        oQuikReplyLabel.innerHTML = '快捷回帖：';

        var oQuikReplyList = document.createElement('select');
        oQuikReplyList.id = 'quickReply';
        for(var i=0;i<aReplys.length;i++){
            oQuikReplyList.options.add(new Option(aReplys[i], i));
        }

        oQuikReplyLabel.appendChild(oQuikReplyList);
        oQuikReplyWarp.appendChild(oQuikReplyLabel);
        oReplyEdit.insertBefore(oQuikReplyWarp, oReplyEdit.childNodes[0]);

        oQuikReplyList.addEventListener('change', function(){
            oReplyEditContent.value = this.options[this.selectedIndex].text;
            oReplyEditContent.style.background = 'none';
        });
    }
})();