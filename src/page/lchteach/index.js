/*
* @Author: chen
* @Date:   2018/4/16
*/
'use strict';

require('page/common/header/index.js');
require('page/common/footer/index.js');
require('./index.css');
var $ = require('jQuery');

$(function () {

    $(document).on('click', '#search', function () {
        var val = $.trim($("#address").val());
        if (val == '') {
            return false;
        }
        localStorage.name = val;
        window.location.href = './worker.html?coin=lch&redirect=' + encodeURIComponent(window.location.href);
    });
});