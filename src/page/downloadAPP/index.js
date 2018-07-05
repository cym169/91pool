/*
* @Author: chen
* @Date:   2018/4/16
*/
'use strict';

require('common/simple/index.js');
require('./index.css');
var index = {
    init: function () {
        this.goback();
        this.handler();
    },
    handler: function () {
        // if(this.iswechat()){
        //     $(".iswechat").show();
        //     return false;
        // }
        // var data = OpenInstall.parseUrlParams();
        new OpenInstall({
            /*appKey必选参数，openinstall平台为每个应用分配的ID*/
            appKey: "hg1nfq",
            /*可选参数，自定义android平台的apk下载文件名，只有apk在openinstall托管时才有效；个别andriod浏览器下载时，中文文件名显示乱码，请慎用中文文件名！*/
            // apkFileName : '91pool.apk',
            /*可选参数，是否优先考虑拉起app，以牺牲下载体验为代价*/
            //preferWakeup:true,
            /*自定义遮罩的html*/
            //mask:function(){
            //  return "<div id='openinstall_shadow' style='position:fixed;left:0;top:0;background:rgba(0,255,0,0.5);filter:alpha(opacity=50);width:100%;height:100%;z-index:10000;'></div>"
            //},
            /*openinstall初始化完成的回调函数，可选*/
            onready: function () {
                var m = this, button = document.getElementById("downloadButton");
                button.style.visibility = "visible";
                /*用户点击某个按钮时(假定按钮id为downloadButton)，安装app*/
                button.onclick = function () {
                    m.install();
                    return false;
                }
            }
        });
    },
    goback: function () {
        var wh = $(window).width();
        if (wh > 700) {
            // 直接切换到首页
            window.location.replace('/');
        }
    },
    iswechat: function () {
        var ua = navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == "micromessenger") {
            return true;
        } else {
            return false;
        }
    }
};

$(function () {
    index.init();
});