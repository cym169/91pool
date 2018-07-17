/*
* @Author: chen
* @Date:   2018/4/10
*/
'use strict';

require('./index.css');
var util = require('util/util.js');
var lang = 'cn';
var coin = util.getUrlParam('coin');
var upper = coin.toUpperCase();
var json = require('util/languages/' + lang + '.json');
var teach = require('teach/' + coin + '_teach.string');

var index = {
    init: function () {
        this.default();
    },
    default: function () {
        var teachHtml = util.renderHtml(teach);
        $(".teach").html(teachHtml);
        var imgUrl = require('images/' + coin + '.png');
        var imgTempl = '<img src="' + imgUrl + '" />';
        $('.coin-logo').html(imgTempl);
        $(".coin-name").html(coin == 'xvg-scrypt' ? upper.slice(0, 3) + "<br><span style='font-size: 13px;'>scrypt</span>" : upper);
        $("#html-title").html(upper + '矿池 - 91pool');
    }
};
$(function () {
    index.init();
    i18next.init({
        lng: lang,
        resources: json
    }, function (err, t) {
        jqueryI18next.init(i18next, $);
        $(document).localize();
    });
});

