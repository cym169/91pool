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
var _article = require('util/services/article-services.js');
var _reset = require('util/reset.js');
var index = {
    init: function () {
        util.getWxInfo();
        this.getArticle();
        this.setwx();
    },
    getArticle: function () {
        var id = util.getUrlParam('id');
        _article.getArticle({id: id}, function (data) {
            if (data.code === 200) {
                var title = data.data.title;
                var intro = data.data.introduction;
                var time = _reset.formatDateWithoutS(data.data.createTime);
                var author = data.data.author;
                var html = data.data.content;
                $("#aTitle").html(title);
                $("#aIntro").html(intro);
                $("#aTime").html("发布时间：" + time + "&nbsp;&nbsp;&nbsp;&nbsp;来源：" + author);
                $("#aContent").html(html);
            }
            else {
                alert("服务器错误，请通知管理员！");
            }
        })
    },
    setwx: function () {
        var baseUrl = location.href.split("#")[0];
        wx.ready(function () {
            // <% --公共方法--%>
            var shareData = {
                title: $("#aTitle").html(),
                desc:$("#aIntro").html(),
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