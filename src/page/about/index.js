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
            title: "关于91pool团队",
            desc: "91pool是91团队为广大矿工朋友提供相关的挖矿服务的相关平台。91pool以提供相关矿池服务为起点，在区块链应用等领域具有深厚的技术积累，并在此基础上推出多个有影响力的数字货币矿池。",
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