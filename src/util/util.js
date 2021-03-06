/*
* @Author: Chen
* @Date:   2018.04.08
*/

'use strict';
var jsonp = require('jsonp');
require("layui-layer");
var Hogan = require('hogan.js');
var util = {

    // 判断是否为移动端设备
    isMobile: function () {
        var width = $(window).width();
        if (width <= 700) {
            window.location.replace("./downloadAPP.html");
            return
        }
    },
    // ajax网络请求
    request: function (param) {
        $.ajax({
            type: param.type || 'get',
            url: param.url || '',
            dataType: param.dataType || 'json',
            data: param.data || '',
            time: param.time || '0',
            success: param.success,
            error: param.error
        });
    },
    // jsonp获取请求
    getJsonp: function (param) {
        jsonp(param.url, {}, param.callback);
    },
    // 获取url参数
    getUrlParam: function (name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
        var result = window.location.search.substr(1).match(reg);
        return result ? decodeURIComponent(result[2]) : null;
    },
    // 渲染html模板
    renderHtml: function (htmlTemplate, data) {
        var template = Hogan.compile(htmlTemplate),
            result = template.render(data);
        return result;
    },
    // 成功提示
    successTips: function (msg, resolve) {
        layer.alert(msg, {icon: 1}, resolve);
    },
    // 错误提示
    errorTips: function (msg, reject) {
        layer.alert(msg, {icon: 2}, reject);
    },
    // 字段的验证，支持非空、手机、邮箱的判断
    validate: function (value, type) {
        var value = $.trim(value);
        // 非空验证
        if ('require' === type) {
            return !!value;
        }
        // 手机号验证
        if ('phone' === type) {
            return /^1\d{10}$/.test(value);
        }
        // 邮箱格式验证
        if ('email' === type) {
            return /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(value);
        }
        // 验证正数
        if ('plus' === type) {
            return /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/.test(value)
        }
    },
    // 统一登录处理
    doLogin: function () {
        window.location.href = './login.html?redirect=' + encodeURIComponent(window.location.href);
    },
    goHome: function () {
        window.location.href = '/';
    },
    // 月份换算，用于活动公告日期
    setMonth: function (month) {
        var arr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        var a = parseInt(month);
        if (a && a > 0 && a < 13) {
            return arr[a - 1]
        }
    },
    // 手机倒数计时
    countDown: function (obj, mark, time) {
        var count = time;
        var name = mark + 'count';
        setTime(obj);

        function setTime(obj) {
            if (count <= 0) {
                $(obj).attr('disabled', false).attr('mark', 0).val("发送验证码").removeClass('has-send').addClass('no-send');
                localStorage.removeItem(name);
                count = time;
                return;
            } else {
                $(obj).attr('disabled', true).attr('mark', 1).val(count + "s").removeClass('no-send').addClass('has-send');
                localStorage.setItem(name, count);
                count--;
            }
            setTimeout(function () {
                setTime(obj)
            }, 1000)
        }
    },
    androidOrios: function () {
        var u = navigator.userAgent;
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
        var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        if (isAndroid) {
            return 'android';
        }
        if (isIOS) {
            return 'ios';
        }
    }
}

module.exports = util;