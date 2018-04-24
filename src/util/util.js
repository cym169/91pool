/*
* @Author: Chen
* @Date:   2018.04.08
*/

'use strict';
var $ = require('jQuery');
var jsonp = require('jsonp');
var type = '';

var util = {
    // 网络请求
    request : function(param){
        $.ajax({
            type        : param.type                || 'get',
            url         : param.url     || '',
            dataType    : param.dataType            || 'json',
            data        : param.data                || '',
            success     : param.success,
            error       : param.error
        });
    },
    getJsonp : function (param) {
        jsonp(param.url,{},param.callback);
    },
    // 获取url参数
    getUrlParam : function(name){
        var reg     = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
        var result  = window.location.search.substr(1).match(reg);
        return result ? decodeURIComponent(result[2]) : null;
    },
    // 成功提示
    successTips : function(msg){
        alert(msg || '操作成功！');
    },
    // 错误提示
    errorTips : function(msg){
        alert(msg || '哪里不对了~');
    },
    // 字段的验证，支持非空、手机、邮箱的判断
    validate : function(value, type){
        var value = $.trim(value);
        // 非空验证
        if('require' === type){
            return !!value;
        }
        // 手机号验证
        if('phone' === type){
            return /^1\d{10}$/.test(value);
        }
        // 邮箱格式验证
        if('email' === type){
            return /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(value);
        }
    },
    // 统一登录处理
    doLogin : function(){
        window.location.href = './login.html?redirect=' + encodeURIComponent(window.location.href);
    },
    goHome : function(){
        window.location.href = '/';
    },
    setMonth : function(month){
        var arr=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
        var a=parseInt(month);
        if(a&&a>0&&a<13){
            return arr[a-1]
        }
    }
};

module.exports = util;