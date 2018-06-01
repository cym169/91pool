/*
* @Author: chen
* @Date:   2018/4/17
*/
'use strict';

require('./index.css');
require('common/header/index.js');
require('common/footer/index.js');

var util = require('util/util.js');
var mwx = require('util/wx.js');
var _article = require('util/services/article-services.js');
var menuList = {
    list: []
};
var page = {
    currentPage: 1
};
var index = {
    init: function () {
        mwx.getWxInfo();
        this.setwx();
        this.defaultMenu();
        this.handler();
    },
    handler: function () {
        var _this = this;

    },
    defaultMenu: function () {
        _article.getList(page, function (data) {
            if (data.code === 200) {
                $.each(data.data.data, function (i, t) {
                    var time = new Date(t.createTime);
                    var month = time.getMonth() + 1;
                    var day = time.getDate();
                    if (parseInt(day, 10) < 10) {
                        day = "0" + day;
                    }
                    t.day = day;
                    t.month = util.setMonth(month);
                });
                menuList.list = data.data.data;
                var html = template('notice-title-tp', menuList);
                $("#notice-title").html(html);
            }
        });
    },
    setwx: function () {
        var baseUrl = location.href.split("#")[0];
        wx.ready(function () {
            // <% --公共方法--%>
            var shareData = {
                title: "91pool最近动向，尽在掌握",
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
    }
};

$(function () {
    index.init();
});