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
        var ww = $(window).width();
        var wechatFlag = true;
        if( ww <= 700){
            $(document).on("click", ".wechat", function (e) {
                e.preventDefault();
                if(wechatFlag){
                    $(".wechat-img").fadeIn();
                    wechatFlag = false;
                }else{
                    wechatFlag = true;
                    $(".wechat-img").fadeOut()
                }
            });

            $("body>*").on("click",function (e) {
                wechatFlag = true;
                var _con = $(".wechat");
                if(!_con.is(e.target) && _con.has(e.target).length === 0){
                    $(".wechat-img").fadeOut();
                }
            });
        }else{
            $(".wechat").hover(function (e) {
                $(this).children(".wechat-img").show();
            },function () {
                $(this).children(".wechat-img").hide();
            })
        }


        $(document).on("click", ".footer-nav li", function () {
            var html = $(this).attr("html");
            window.location.href = "./" + html + ".html";
        });
    }
};

$(function () {
    index.init();
});