/*
* @Author: chen
* @Date:   2018/4/8
*/
'use strict';

var $ = require('jQuery');
var util = require('util/util.js');
require('./index.css');
var lang = localStorage.lang;
var json = require('util/languages/' + lang + '.json');
var index = {
    flag: true,
    langFlag: true,
    phoneFlag: true,
    init: function () {
        this.setLang();
        this.handler();
    },
    handler: function () {
        var _this = this;
        $("#login").click(function () {
            util.doLogin();
        });

        // 注册点击事件
        $('#register').click(function () {
            window.location.href = './register.html';
        });

        $(document).on('click', '.dropdown', function (e) {
            e.stopPropagation();
            if (_this.flag) {
                $('.dropdown-menu').fadeIn();
                _this.flag = false;
            } else {
                _this.flag = true;
                $('.dropdown-menu').fadeOut();
            }
        });

        $(".phone-help").on('click', function (e) {
            e.stopPropagation();
            if (_this.phoneFlag) {
                $('.phone-menu').fadeIn();
                _this.phoneFlag = false;
            } else {
                _this.phoneFlag = true;
                $('.phone-menu').fadeOut();
            }
        });

        // $(document).on('click', '.lang', function (e) {
        //     e.stopPropagation();
        //     if (_this.langFlag) {
        //         $('.chooseLang').fadeIn();
        //         _this.langFlag = false;
        //     } else {
        //         _this.langFlag = true;
        //         $('.chooseLang').fadeOut();
        //     }
        // });

        $(document).on('click', '.phone-menu a', function () {
            var type = $(this).attr('type');
            window.location.href = './currency.html?coin=' + type + '&i=0';
        });

        $(document).on('click', '.dropdown-menu li', function () {
            var type = $(this).attr('type');
            window.location.href = './currency.html?coin=' + type + '&i=0';
        });

        $(document).on('click', '.chooseLang li', function () {
            var language = $(this).attr('lang');
            localStorage.lang = language;
            window.location.reload();
        });

        if($(window).width() <= 700){
            $("body>*").on('click', function (e) {
                _this.flag = true;
                _this.langFlag = true;
                _this.phoneFlag = true;
                $('.dropdown-menu').fadeOut();
                $('.chooseLang').fadeOut();
                $('.phone-menu').fadeOut();
            });
        }else{
            $(document).on('click', function (e) {
                _this.flag = true;
                _this.langFlag = true;
                _this.phoneFlag = true;
                $('.dropdown-menu').fadeOut();
                $('.chooseLang').fadeOut();
                $('.phone-menu').fadeOut();
            });
        }

        i18next.init({
            lng: lang,
            resources: json
        }, function (err, t) {
            jqueryI18next.init(i18next, $);
            $(document).localize();
        });
    },
    setLang: function () {
        var html = "";
        if (lang === "cn") {
            html = "中文";
        }
        else if (lang === "en") {
            html = "English";
        }
        else if (lang === "ru") {
            html = "Русский";
        }
        $(".lang").html(html);
    }
};

$(function () {
    index.init();
});