/*
* @Author: chen
* @Date:   2018/4/16
*/
'use strict';

require('common/header/index.js');
require('common/footer/index.js');
require('./index.css');
var util = require("util/util.js");
var index = {
    init : function () {
        util.isMobile();
        this.handler();
    },
    handler : function () {
        $(document).on("click",".btm-title li",function () {
            var index = $(this).index();
            $(this).addClass("active").siblings().removeClass("active");
            $(".btmTab").addClass("hidden").eq(index).removeClass("hidden");
        })
    }
};

$(function () {
    index.init();
})