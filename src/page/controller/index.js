/*
* @Author: chen
* @Date:   2018/4/16
*/
'use strict';

require('common/header/index.js');
require('common/ad/index.js');
require('common/footer/index.js');
require('./index.css');
var util = require("util/util.js");
var index = {
    init : function () {
        util.isMobile();
        this.handler();
    },
    handler : function () {

    }
};

$(function () {
    index.init();
})