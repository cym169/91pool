/*
* @Author: chen
* @Date:   2018/4/16
*/
'use strict';

require('common/header/index.js');
require('common/footer/index.js');
require('./index.css');
var util = require('util/util.js');
var coin = util.getUrlParam('coin');
var index = {
    init    : function () {
        this.handler();
    },
    handler : function () {
        if(coin){
            console.log(coin);
        }
    }

};
$(function () {
    index.init();
});