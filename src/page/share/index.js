/*
* @Author: chen
* @Date:   2018/4/16
*/
'use strict';

require('common/simple/index.js');
require('./index.css');
var util = require('util/util.js');
var wx = require('util/wx.js');
var index = {
    init: function () {
        this.handler();
    },
    handler: function () {
        var qrcode = new QRCode('qrcode', {
            text: 'http://www.91pool.com/downloadAPP.html',
            width: 104,
            height: 104,
            colorDark : '#fdaa0f',
            colorLight : '#ffffff',
            correctLevel : QRCode.CorrectLevel.H
        });

        var inviterCode = util.getUrlParam('InviterCode');
        if(inviterCode){
            $("#inviteCode").html(inviterCode);
        }else{
            $("#inviteCode").html('XXXXX');
        }


    },
    wechat: function () {
        wx.setWxInfo('91pool与人分享获取超级返利','91pool是一个专注于数字资产的增值服务的网站',location.href.split("#")[0])
    }
};

$(function () {
    index.init();
});