/*
* @Author: chen
* @Date:   2018/4/16
*/
'use strict';

require('common/header/index.js');
require('common/footer/index.js');
require('common/ad/index.js');
require('./index.css');
var mwx = require('util/wx.js');
$(function () {

    // 常见问题的风琴效果
    $(document).on('click', '.support li', function () {
        var h1 = $(this).children('.title').outerHeight(),
            h2 = $(this).children('.content').outerHeight(),
            h = h1 + h2;
        $(this).css('height',h).siblings().css('height',h1);
    });

    var baseUrl = location.href.split("#")[0];

    mwx.setWxInfo("91pool常见问题","专注于数字资产增值服务",baseUrl);

});
