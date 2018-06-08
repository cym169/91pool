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
var menuList = {
    list: []
};
var page = {
    currentPage: 1
};
var index = {
    init: function () {
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
        mwx.setWxInfo("91pool最近动向，尽在掌握","专注于数字资产增值服务",baseUrl);
    }
};

$(function () {
    index.init();
});