/*
* @Author: chen
* @Date:   2018/4/9
*/
'use strict';

require('common/simple/index.js');
require('./index.css');

var util = require('util/util.js');
var sendFlag = true;
var index = {
    init: function () {
        util.isMobile();
        this.setLoginTime();
        this.handler();
    },
    handler: function () {
        var _this = this;
        // 点击登录方式，切换不同的登录
        // $('.login-type').on('click', 'li', function () {
        //     var i = $(this).index();
        //     $(this).addClass('active').siblings().removeClass('active');
        //     $(".login-form").hide().eq(i).show();
        // });

        $("#sendCode").click(function () {
            var mark = $(this).attr('mark');
            var phone = $.trim($("#phone").val());
            var require = util.validate(phone,'require');
            var validate = util.validate(phone,'phone');
            if(!require){
                util.errorTips("请输入手机号！");
                return false;
            }
            if(!validate){
                util.errorTips("请输入正确的手机号！");
                return false;
            }
            if(mark == 0){
                util.countDown('#sendCode','login',60);
            }
        })

    },
    setLoginTime: function () {
        var count = localStorage.getItem('logincount');
        if(count > 0){
            util.countDown('#sendCode','login',count);
        }
    }
};

$(function () {
    index.init();
})