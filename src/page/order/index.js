/*
* @Author: chen
* @Date:   2018/4/17
*/
'use strict';

require('./index.css');
require('page/common/header/index.js');
require('page/common/footer/index.js');

var $ = require('jQuery');
var util = require('util/util.js');

$(function () {
    util.getWxInfo();

    var baseUrl = location.href.split("#")[0];
    wx.ready(function () {
        // <% --公共方法--%>
        var shareData = {
            title: "91pool服务条款",
            desc: "使用我们的服务不会赋予您对我们服务中的任何知识产权或您访问的内容的所有权。除非获得相关的许可或法律允许，否则您不得使用与我们相关的内容。本服务条款不授予您使用我们服务中使用的任何品牌或徽标的权利。您不得删除，隐藏或更改我们服务中显示的任何法律声明。",
            link: baseUrl,
            imgUrl: "http://www.91pool.com/images/wx_logo.png",
            success: function (res) {

            },
            cancel: function (res) {

            }
        };
        // <% --分享给朋友接口--%>
        wx.onMenuShareAppMessage(shareData);
        // <% --分享到朋友圈接口--%>
        wx.onMenuShareTimeline(shareData);
    });
    //   <% --处理失败验证--%>
    wx.error(function (res) {

    });
})