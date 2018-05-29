/*
* @Author: chen
* @Date:   2018/4/16
*/
'use strict';

require('page/common/header/index.js');
require('page/common/footer/index.js');
require('./index.css');
var util = require('util/util.js');
$(function () {

    $(document).on('click', '#search', function () {
        var val = $.trim($("#address").val());
        if (val == '') {
            return false;
        }
        localStorage.name = val;
        window.location.href = './worker.html?coin=etc&wallet='+ val;
    });

    util.getWxInfo();

    var baseUrl = location.href.split("#")[0];
    wx.ready(function () {
        // <% --公共方法--%>
        var shareData = {
            title: "ETC挖矿教程",
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
