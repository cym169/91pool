/*
* @Author: chen
* @Date:   2018/4/17
*/
'use strict';

require('./index.css');
require('common/header/index.js');
require('common/footer/index.js');
require('common/ad/index.js');
var util = require('util/util.js');
var mwx = require('util/wx.js');
var _article = require('util/services/article-services.js');
var _reset = require('util/reset.js');
var index = {
    init: function () {
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
                util.errorTips("服务器错误，请通知管理员！");
            }
        })
    },
    setwx: function () {
        var baseUrl = location.href.split("#")[0];
        mwx.setWxInfo($("#aTitle").html(), $("#aIntro").html(), baseUrl);
    }

};

$(function () {
    index.init();
});