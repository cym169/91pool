/*
* @Author: chen
* @Date:   2018/4/8
*/

require('./index.css');
require('page/common/header/index.js');
require('page/common/footer/index.js');

var $ = require('jQuery');
var _article = require('util/services/article-services.js');
var _coin = require('util/services/coin-services.js');
var _reset = require('util/reset.js');
var index = {
    init: function () {
        this.handler();
        this.slider();
        this.list();
        this.scroll();
    },
    handler: function () {
        var _this = this;
        setInterval(_this.refresh, 6000);
    },
    slider: function () {
        var param = {
            autoplay: 5000,
            loop: true,
            pagination: '.pagination',
            paginationClickable: true
        };
        var height = $(".sliderImg").height();
        $(".swiper-container").css("height", height);
        var mySwiper = new Swiper('.swiper-container', param);
    },
    list: function () {
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
            _coin.getLCH(function (data) {
                if (data.data){
                    var LCHprice = data.data.data[0].price;
                    LCHprice = LCHprice.toFixed(4);
                    var p = "";
                    if( data.data.data[0].change1d < 0 ){
                        p = '￥' + LCHprice + '(<span class="down">' + data.data.data[0].change1d + '%</span>)'
                    }
                    else{
                        p = '￥' + LCHprice + '(<span class="up">' + data.data.data[0].change1d + '%</span>)'
                    }
                    $(".lchprice").html(p);
                }
            });
        });
    },
    refresh: function () {
        _coin.getCoinList(function (data) {
            $.each(data, function (i, t) {
                $(".hashrate" + i).html(_reset.formatHashrate(t.hashrate));
                $(".netHashrate" + i).html(_reset.formatHashrate(t.netHashrate));
                $(".netDiff" + i).html(_reset.changeDiff(t.netDiff));
                $(".profit" + i).html(t.profit);
            });
        });
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
        _coin.getLCH(function (data) {
            if (data.data){
                var LCHprice = data.data.data[0].price;
                LCHprice = LCHprice.toFixed(4);
                var p = "";
                if( data.data.data[0].change1d < 0 ){
                    p = '￥' + LCHprice + '(<span class="down">' + data.data.data[0].change1d + '%</span>)'
                }
                else{
                    p = '￥' + LCHprice + '(<span class="up">' + data.data.data[0].change1d + '%</span>)'
                }
                $(".lchprice").html(p);
            }
        });

    },
    scroll: function () {
        var _this = this;
        _article.getList({currentPage: 1}, function (data) {
            if (data.code === 200) {
                $(".notice").show();
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
});