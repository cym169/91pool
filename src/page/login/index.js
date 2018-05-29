/*
* @Author: chen
* @Date:   2018/4/9
*/
'use strict';

require('page/common/simple/index.js');
require('./index.css');

var util = require('util/util.js');
var sendFlag = true;
var index = {
    init: function () {
        this.handler();
    },
    handler: function () {
        var _this = this;
        // 点击登录方式，切换不同的登录
        $('.login-type').on('click', 'li', function () {
            var i = $(this).index();
            $(this).addClass('active').siblings().removeClass('active');
            $(".login-form").hide().eq(i).show();
        });

        $("#sendCode").click(function () {
            var mark = $(this).attr('mark');
            var phone = $("#phone").val();
            if(mark == 0){
                if(!phone){

                }
                util.countDown('#sendCode',30);
            }
        })

    }
};

$(function () {
    index.init();
})