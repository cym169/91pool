/*
* @Author: chen
* @Date:   2018/4/9
*/
'use strict';

require('page/common/simple/index.js');
require('./index.css');

var $ = require('jQuery');

var index = {
    pw: '<form class="pw-login login-form">\n' +
    '<input type="text" placeholder="请输入手机号 / 邮箱" name="account" id="account">\n' +
    '<input type="password" placeholder="请输入密码">\n' +
    '<input type="submit" value="登录">\n' +
    '</form>',
    ph: '<form class="ph-login login-form" >\n' +
    '<input type="text" placeholder="请输入手机号" name="phone" id="account">\n' +
    '<div class="send-box">\n' +
    '<input type="password" placeholder="请获取验证码">\n' +
    '<span class="send no-send">发送验证码</span>\n' +
    '</div>\n' +
    '<input type="submit" value="登录">\n' +
    '</form>',
    init: function () {
        this.default();
        this.handler();
    },
    handler: function () {
        var _this = this;
        // 点击登录方式，切换不同的登录
        $('.login-type').on('click', 'li', function () {
            $('#login-form').html('');
            $('#loading').show();
            $(this).addClass('active').siblings().removeClass('active');
            var type = $(this).attr('type');
            var html = '';
            if (type === 'pw') {
                html = _this.pw;
            }
            else if (type === 'ph') {
                html = _this.ph;
            }
            setTimeout(function () {
                $('#loading').hide();
                $('#login-form').html(html);
            }, 1000);
        });


    },
    default: function () {
        var _this = this;
        $('#login-form').html(_this.pw);
    }
};

$(function () {
    index.init();
})