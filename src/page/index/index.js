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
var util = require('util/util.js');
var mwx = require('util/wx.js');
var lang = localStorage.lang;
var json = require('util/languages/' + lang + '.json');
var calcKb = 0;
var showFlag = true;
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
        setInterval(function () {
            _this.refresh();
        }, 10000);


        $(document).on("click", ".coinType td:not(:nth-child(8),:nth-child(9))", function (e) {
            var coin = $(this).parent('tr').attr("coin");
            window.location.href = "./currency.html?coin=" + coin;
        });

        $(document).on("click", ".calculator", function (e) {
            var hashdw = $(this).attr("calcShow");
            var getdw = $(this).attr("calcDw");
            calcKb = $(this).attr("calcKb");
            $("#showHash").html(hashdw + "/s");
            $("#getdw").html(getdw + "/天").attr("title", getdw + "/天");
            $("#calculator").removeClass("hidden");
            $("#hashText").focus();
        });

        $(document).on("click", "#calculator-close", function (e) {
            $("#calculator").addClass("hidden");
            $("#showHash").html("");
            $("#getdw").html("").attr("title", "");
            $("#hashText").val("");
            $("#getText").val("");
            calcKb = 0;
        });

        $("#calculator").on('touchmove', function (event) {
            event.preventDefault();
        }, false);

        $(document).on("click", "#showHash", function (e) {
            if (showFlag) {
                $(".chooseHash").fadeIn();
                showFlag = false;
            } else {
                $(".chooseHash").fadeOut();
                showFlag = true;
            }
            e.stopPropagation();
        });

        $(document).on("click", ".chooseHash li", function (e) {
            var text = $(this).text(),
                dw = text.slice(0, 2);
            $("#showHash").html(dw + "/s");
            $("#hashText").focus().trigger("input");
        });

        $(document).on("click", function (e) {
            showFlag = true;
            $(".chooseHash").fadeOut();
        });

        $("#hashText").on("input", function () {
            var val = $(this).val();
            var hashdw = $("#showHash").html().slice(0, 2);
            var result = 0;
            if (!util.validate(val, 'require')) {
                $("#getText").val("");
                return
            }
            if(util.validate(val, 'plus')){
                switch (hashdw) {
                    case "KH":
                        result = val * calcKb;
                        break;
                    case "MH":
                        result = val * calcKb * 1000;
                        break;
                    case "GH":
                        result = val * calcKb * 1000 * 1000;
                        break;
                    case "TH":
                        result = val * calcKb * 1000 * 1000 * 1000;
                        break;
                }
                result = result.toFixed(6);
                $("#getText").val(result)
            }else{
                $("#getText").val("");
            }
        });


        $(document).on("click", ".teach", function (e) {
            var coin = $(this).parents('tr').attr("coin");
            localStorage.coinIndex = 1;
            window.location.href = "./currency.html?coin=" + coin;
        });
    },
    slider: function () {
        if ($(".swiper-slide").length > 1) {
            var param = {
                autoplay: 5000,
                loop: true,
                pagination: '.pagination',
                paginationClickable: true
            };
        } else {
            var param = {
                pagination: '.pagination',
                paginationClickable: true
            };
        }
        var mySwiper = new Swiper('.swiper-container', param);
    },
    list: function () {
        var _this = this;
        console.log(4e9)
        _coin.getCoinList(function (data) {
            $.each(data, function (i, t) {
                var imgUrl = require('images/' + t.coin + '_icon.png');
                t.imgUrl = imgUrl;
                t.hashrate = _reset.formatHashrate(t.hashrate);
                t.netHashrate = _reset.formatHashrate(t.netHashrate);
                t.netDiff = _reset.changeDiff(t.netDiff);
                t.word = lang == 'cn' ? '教程' : 'Tutorial';
                switch (t.coin) {
                    case 'etc':
                        t.fee = "1%";
                        t.upcoin = t.coin.toUpperCase();
                        t.address = "etc1.91pool.com:8008";
                        break;
                    case 'etf':
                        t.fee = "1%";
                        t.upcoin = t.coin.toUpperCase();
                        t.address = "etf1.91pool.com:9108";
                        break;
                    case 'hsr':
                        t.fee = "0%";
                        t.upcoin = t.coin.toUpperCase();
                        t.address = "hsr1.91pool.com:9009";
                        break;
                    case 'btm':
                        t.fee = "1%";
                        t.upcoin = t.coin.toUpperCase();
                        t.address = "btm.91pool.com:9221";
                        break;
                    case 'xvg-scrypt':
                        t.fee = "0%";
                        t.upcoin = t.coin.slice(0, 3).toUpperCase();
                        t.address = "xvg-scrypt.91pool.com:8110";
                        break;
                    case 'xvg-blake2s':
                        t.fee = "0%";
                        t.upcoin = t.coin.slice(0, 3).toUpperCase();
                        t.new = true;
                        t.address = "xvg-blake2s.91pool.com:9008";
                        break;
                }
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
            if (parseInt(data.data[0].rose) < 0) {
                p = '￥' + data.data[0].priceCny + '(<span class="down">' + data.data[0].rose + '</span>)'
            }
            else {
                p = '￥' + data.data[0].priceCny + '(<span class="up">' + data.data[0].rose + '</span>)'
            }
            $(".etcprice").html(p);
        });

        _coin.getPrice('etf', function (err, data) {
            if (data.data)
                var p = "";
            if (parseInt(data.data[0].rose) < 0) {
                p = '￥' + data.data[0].priceCny + '(<span class="down">' + data.data[0].rose + '</span>)'
            }
            else {
                p = '￥' + data.data[0].priceCny + '(<span class="up">' + data.data[0].rose + '</span>)'
            }
            $(".etfprice").html(p);
        });

        _coin.getPrice('hsr', function (err, data) {
            if (data.data)
                var p = "";
            if (parseInt(data.data[0].rose) < 0) {
                p = '￥' + data.data[0].priceCny + '(<span class="down">' + data.data[0].rose + '</span>)'
            }
            else {
                p = '￥' + data.data[0].priceCny + '(<span class="up">' + data.data[0].rose + '</span>)'
            }
            $(".hsrprice").html(p);
        });

        _coin.getPrice('btm', function (err, data) {
            if (data.data)
                var p = "";
            if (parseInt(data.data[0].rose) < 0) {
                p = '￥' + data.data[0].priceCny + '(<span class="down">' + data.data[0].rose + '</span>)'
            }
            else {
                p = '￥' + data.data[0].priceCny + '(<span class="up">' + data.data[0].rose + '</span>)'
            }
            $(".btmprice").html(p);
        });

        _coin.getPrice('xvg', function (err, data) {
            if (data.data)
                var p = "";
            if (parseInt(data.data[0].rose) < 0) {
                p = '￥' + data.data[0].priceCny + '(<span class="down">' + data.data[0].rose + '</span>)'
            }
            else {
                p = '￥' + data.data[0].priceCny + '(<span class="up">' + data.data[0].rose + '</span>)'
            }
            $(".xvg-scryptprice").html(p);
        });


    },
    setwx: function () {
        var baseUrl = location.href.split("#")[0];
        mwx.setWxInfo("91pool，值得信赖的矿池服务商", "专注于数字资产增值服务", baseUrl);
    },
    scroll: function () {
        var _this = this;
        _article.getList({currentPage: 1}, function (data) {
            if (data.code === 200) {
                var menuList = {
                    list: data.data.data.slice(0, 1)
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