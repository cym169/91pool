/*
* @Author: chen
* @Date:   2018/4/8
*/

require('./index.css');
require('common/header/index.js');
require('common/footer/index.js');

var _article = require('util/services/article-services.js');
var _coin = require('util/services/coin-services.js');
var _reset = require('util/reset.js');
// var util = require('util/util.js');
var mwx = require('util/wx.js');
var lang = localStorage.lang;
var json = require('util/languages/' + lang + '.json');
var index = {
    init: function () {

        this.setwx();
        this.handler();
        this.slider();
        this.list();
        this.scroll();
    },
    handler: function () {
        var _this = this;
        setInterval(function(){
            _this.refresh();
        }, 5000);
        
        $(document).on("click",".coinType",function () {
            var coin = $(this).attr("coin");
            window.location.href = "./currency.html?coin="+coin;
        });
    },
    slider: function () {
        if($(".swiper-slide").length > 1){
            var param = {
                autoplay: 5000,
                loop: true,
                pagination: '.pagination',
                paginationClickable: true
            };
        }else{
            var param = {
                pagination: '.pagination',
                paginationClickable: true
            };
        }
        var mySwiper = new Swiper('.swiper-container', param);
    },
    list: function () {
        var _this = this;
        _coin.getCoinList(function (data) {
            $.each(data, function (i, t) {
                var imgUrl = require('images/' + t.coin + '_icon.png');
                t.imgUrl = imgUrl;
                t.upcoin = t.coin.toUpperCase();
                t.hashrate = _reset.formatHashrate(t.hashrate);
                t.netHashrate = _reset.formatHashrate(t.netHashrate);
                t.netDiff = _reset.changeDiff(t.netDiff);
            });
            var coinList = {
                list: data
            };
            var html = template('coinList-tp', coinList);
            $("#coinList").html(html);
            _this.getAllPrice();
        });
    },
    refresh: function () {
        var _this = this;
        _coin.getCoinList(function (data) {
            $.each(data, function (i, t) {
                $(".hashrate" + i).html(_reset.formatHashrate(t.hashrate));
                $(".netHashrate" + i).html(_reset.formatHashrate(t.netHashrate));
                $(".netDiff" + i).html(_reset.changeDiff(t.netDiff));
                $(".profit" + i).html(t.profit);
            });
        });
        _this.getAllPrice();
    },
    getAllPrice: function () {
        _coin.getPrice('etc', function (err, data) {
            if (data.data)
                var p = "";
            if( parseInt(data.data[0].rose) < 0 ){
                p = '￥' + data.data[0].priceCny + '(<span class="down">' + data.data[0].rose + '</span>)'
            }
            else{
                p = '￥' + data.data[0].priceCny + '(<span class="up">' + data.data[0].rose + '</span>)'
            }
            $(".etcprice").html(p);
        });

        _coin.getPrice('etf', function (err, data) {
            if (data.data)
                var p = "";
            if( parseInt(data.data[0].rose) < 0 ){
                p = '￥' + data.data[0].priceCny + '(<span class="down">' + data.data[0].rose + '</span>)'
            }
            else{
                p = '￥' + data.data[0].priceCny + '(<span class="up">' + data.data[0].rose + '</span>)'
            }
            $(".etfprice").html(p);
        });

        _coin.getPrice('hsr', function (err, data) {
            if (data.data)
                var p = "";
            if( parseInt(data.data[0].rose) < 0 ){
                p = '￥' + data.data[0].priceCny + '(<span class="down">' + data.data[0].rose + '</span>)'
            }
            else{
                p = '￥' + data.data[0].priceCny + '(<span class="up">' + data.data[0].rose + '</span>)'
            }
            $(".hsrprice").html(p);
        });

        _coin.getPrice('btm', function (err, data) {
            if (data.data)
                var p = "";
            if( parseInt(data.data[0].rose) < 0 ){
                p = '￥' + data.data[0].priceCny + '(<span class="down">' + data.data[0].rose + '</span>)'
            }
            else{
                p = '￥' + data.data[0].priceCny + '(<span class="up">' + data.data[0].rose + '</span>)'
            }
            $(".btmprice").html(p);
        });
    },
    setwx: function () {
        var baseUrl = location.href.split("#")[0];
        mwx.setWxInfo("91pool，值得信赖的矿池服务商","专注于数字资产增值服务",baseUrl);
    },
    scroll: function () {
        var _this = this;
        _article.getList({currentPage: 1}, function (data) {
            if (data.code === 200) {
                var menuList = {
                    list: data.data.data.slice(0, 3)
                };
                var html = template('scroll-tp', menuList);
                $("#scroll").html(html);
                _this.goleft();
            }
        });
    },
    goleft: function () {
        var l = $(".scroll li").length;
        var w = 0;
        var sw = $(".notice .section").width();
        var mr = parseInt($(".scroll li").css("marginRight"));
        $(".scroll li").each(function () {
            var ww = $(this).outerWidth() + mr;
            w += ww;
        });

        $(".scroll").css('width', w);
        if (l > 0) {
            var num = sw;
            var time = 15;

            function left() {
                if (num <= -w) {
                    num = sw
                }
                num -= 1;
                $(".scroll").css('left', num);
            }

            var timer = setInterval(left, time);
            $('.notice .section').hover(function () {
                clearInterval(timer);
            }, function () {
                timer = setInterval(left, time);
            })
        }
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