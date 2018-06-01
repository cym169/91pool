/*
* @Author: chen
* @Date:   2018/4/16
*/
'use strict';

require('common/header/index.js');
require('common/footer/index.js');
require('./index.css');
var mwx = require('util/wx.js');
$(function () {

    // 常见问题的风琴效果
    $(document).on('click', '.support li', function () {
        var h1 = $(this).children('.title').outerHeight(),
            h2 = $(this).children('.content').outerHeight(),
            h = h1 + h2;
        $(this).stop(true).animate({height: h}, 300).siblings().stop(true).animate({height: h1}, 300);
    });

    mwx.getWxInfo();

    var baseUrl = location.href.split("#")[0];
    wx.ready(function () {
        // <% --公共方法--%>
        var shareData = {
            title: "91pool常见问题",
            desc: "专注于数字资产增值服务",
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
});
