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

        // ETF
        // $.get("/currencies/ethereumfog",function (data) {
        //     var text = $(data).find('.coinprice').html();
        //     console.log(text)
        // });
        //
        // // ETC
        // $.get("/currencies/ethereum-classic",function (data) {
        //     var text = $(data).find('.coinprice').html();
        //     console.log(text)
        // });
        //
        // // ETH
        // $.get("/currencies/ethereum",function (data) {
        //     var text = $(data).find('.coinprice').html();
        //     console.log(text)
        // });
        //
        // // HSR
        // $.get("/currencies/hshare",function (data) {
        //     var text = $(data).find('.coinprice').html();
        //     console.log(text)
        // });
        //
        // // BTM
        // $.get("/currencies/bytom",function (data) {
        //     var text = $(data).find('.coinprice').html();
        //     console.log(text)
        // });
        //
        // // XDAG
        // $.get("/currencies/dagger",function (data) {
        //     var text = $(data).find('.coinprice').html();
        //     console.log(text)
        // });
    }
};

$(function () {
    index.init();
})