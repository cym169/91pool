/*
* @Author: chen
* @Date:   2018/4/16
*/
'use strict';

require('common/isWechat/index.js');
require('./index.css');
var util = require('util/util.js');
var wx = require('util/wx.js');
var index = {
    init: function () {
        this.goback();
        this.handler();
    },
    handler: function () {
        $(document).on("click","#downloadButton",function () {
            if(util.androidOrios() === 'android'){
                // android apk链接
                window.open('https://www.baidu.com','_blank');
            }else{
                // IOS store的链接
                window.open('https://itunes.apple.com/app/id1411227187','_blank');
            }
        })
    },
    goback: function () {
        var wh = $(window).width();
        if (wh > 700) {
            // 直接切换到首页
            window.location.replace('/');
        }
    },
    wechat: function () {
        wx.setWxInfo('91poolAPP下载','91pool是一个专注于数字资产的增值服务的网站',location.href.split("#")[0])
    }
};

$(function () {
    index.init();
});