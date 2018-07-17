/*
* @Author: wang
* @Date:   2018/7/16
*/
'use strict';

require('./index.css');

var wechat = {
    init: function () {
        this.handler();
    },
    handler: function () {

        $(".iswechat").on('touchmove', function (event) {
            event.preventDefault();
        }, false);

        if(this.iswechat()){
            $(".iswechat").show();
            return false;
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
    wechat.init();
});