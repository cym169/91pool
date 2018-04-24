/*
* @Author: chen
* @Date:   2018/4/8
*/
'use strict';
var $ = require('jQuery');
require('./index.css');
var lang = localStorage.lang;
var index = {
    init: function () {
        this.handler();
    },
    handler: function () {

        $(".language-nav li[lang=" + lang + "]").addClass("active");

        // $(".language-nav").on("click", "li", function () {
        //     var language = $(this).attr("lang");
        //     $(this).addClass("active").siblings("li").removeClass("active");
        //     localStorage.lang = language;
        //     window.location.reload();
        // });

        $(document).on("click", ".footer-nav li", function () {
            var html = $(this).attr("html");
            window.location.href = "./" + html + ".html";
        });
    }
};

$(function () {
    index.init();
});