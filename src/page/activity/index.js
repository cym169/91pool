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
        this.getArticle();
    },
    getArticle: function () {
        var id = util.getUrlParam('id');
        _article.getArticle({id: id}, function (data) {
            if (data.code === 200) {
                var title = data.data.title;
                var time = _reset.formatDateWithoutS(data.data.createTime);
                var author = data.data.author;
                var html = data.data.content;
                $("#aTitle").html(title);
                $("#aTime").html("发布时间：" + time + "&nbsp;&nbsp;&nbsp;&nbsp;来源：" + author);
                $("#aContent").html(html);
            }
            else {
                alert("服务器错误，请通知管理员！");
            }
        })
    }

};

$(function () {
    index.init();
});