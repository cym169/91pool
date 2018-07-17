/*
* @Author: chen
* @Date:   2018/4/17
*/
'use strict';

require('./index.css');
require('common/simple/index.js');
var util = require('util/util.js');
var _service = require('util/services/v1/service.js');
var _reset = require('util/reset.js');
var index = {
    init: function () {
        this.getArticle();
    },
    getArticle: function () {
        var id = util.getUrlParam('id');
        _service.getArticle(id, function (data) {
            console.log(data);
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
    }

};

$(function () {
    index.init();
});