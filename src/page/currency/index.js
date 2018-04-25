/*
* @Author: chen
* @Date:   2018/4/10
*/
'use strict';

require('./index.css');
require('page/common/header/index.js');
require('page/common/footer/index.js');
var util = require('util/util.js');
var _reset = require('util/reset.js');
var _coins = require('util/services/coin-services.js');
var $ = require('jQuery');

var xTime = ['now'],
    yData = [0];

var index = {
    init: function () {
        this.default();
        this.setData();
        this.handler();
    },
    handler: function () {
        var _this = this;
        var coinName = util.getUrlParam('coin');
        $(document).on('click', '#search', function () {
            var val = $.trim($("#address").val());
            if (val == '') {
                return false;
            }
            window.location.href = './worker.html?coin=' + coinName + '&wallet='+ val;
        });

        // setInterval(_this.setData, 6000);

        // 币种导航
        $('.coin-title').on('click', 'li', function () {
            if ($(this).hasClass('active')) {
                return false;
            }
            var page = $(this).attr('page');
            $(this).addClass('active').siblings().removeClass('active');
            switch (page) {
                case 'home':
                    $(".tab").hide();
                    $('.home').show();
                    break;
                case 'teach':
                    window.location.href = './' + coinName + 'teach.html';
                    break;
                case 'information':
                    $(".tab").hide();
                    $('.information').show();
                    break;
                case 'mine':
                    $(".tab").hide();
                    $('.mine').show();
                    break;
                case 'problem':
                    $(".tab").hide();
                    $('.problem').show();
                    break;
            }
        });

        $(document).on('click', '.work-title li', function () {
            if ($(this).hasClass('active')) {
                return false;
            }
            var i = $(this).index();
            $(this).addClass('active').siblings().removeClass('active');
            $('.f-tab').hide().eq(i).show();
        });

        // 常见问题的风琴效果
        $(document).on('click', '.support li', function () {
            var h1 = $(this).children('.title').outerHeight(),
                h2 = $(this).children('.content').outerHeight(),
                h = h1 + h2;
            $(this).stop(true).animate({height: h}, 300).siblings().stop(true).animate({height: h1}, 300);
        });
    },
    setData: function () {
        var coin = util.getUrlParam('coin');
        _coins.getCoins(coin, function (data) {
            $("#workers").html(data.minersTotal);
            $("#pool_hash").html(_reset.formatHashrate(data.hashrate));
            $("#net_diff").html(_reset.changeDiff(data.nodes[0].difficulty));
            $("#last-one").html(_reset.getDateDiff(data.stats.lastBlockFound));
            $("#blocks").html(data.maturedTotal);

            if (typeof (data.poolCharts) != 'undefined' || data.poolCharts.length > 0) {
                xTime = [];
                yData = [];
                $.each(data.poolCharts, function (i, t) {
                    xTime.unshift(t.timeFormat);
                    yData.unshift(_reset.formatHashrateWithoutSuffix(t.poolHash));
                });
            }
            var w = $(".section").width();
            $('#calc-chart').css('width', w);
            var options = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: {
                            backgroundColor: '#6a7985'
                        }
                    }
                },
                title: false,
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: []
                },
                yAxis: {
                    type: 'value',
                    boundaryGap: [0, '100%'],
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    }
                },
                series: [
                    {
                        type: 'line',
                        smooth: true,
                        sampling: 'average',
                        itemStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,
                                    color: 'rgb(254, 161, 18)'
                                }, {
                                    offset: 1,
                                    color: 'rgb(255, 255, 255)'
                                }])
                            }
                        },
                        areaStyle: {},
                        data: []
                    }
                ]
            };
            options.series[0].data = yData;
            options.xAxis.data = xTime;
            var chartId = document.getElementById('calc-chart');
            var myChart = echarts.init(chartId);
            // 绘制图表
            myChart.setOption(options);
        }, function (error) {
        });

        _coins.getBlocks(coin, function (data) {
            if (data.luck == null) {
                $('#get-box').hide();
            } else {
                $("#lucky").html(_reset.num2per(data.luck[100].luck));
                $.each(data.luck, function (i, t) {
                    t.orphanRate = _reset.num2per(t.orphanRate);
                    t.luck = _reset.num2per(t.luck);
                    t.uncleRate = _reset.num2per(t.uncleRate);
                    t.number = i;
                });
                var luckList = {
                    list: data.luck
                };
                var luckHtml = template('luckList-tp', luckList);
                $('#luckList').html(luckHtml);
            }

            $(".maturedTotal-small").html(_reset.formatNumber(data.maturedTotal));
            $(".immatureTotal-small").html(_reset.formatNumber(data.immatureTotal));
            $(".candidatesTotal-small").html(_reset.formatNumber(data.candidatesTotal));
            $(".maturedTotal").html(data.maturedTotal);
            $(".immatureTotal").html(data.immatureTotal);
            $(".candidatesTotal").html(data.candidatesTotal);

            if (data.matured.length > 0) {
                $.each(data.matured, function (i, t) {
                    switch (coin) {
                        case 'etc':
                            t.myUrl = "https://gastracker.io/block/";
                            t.reward = (t.reward * 1e-18).toFixed(6);
                            break;
                        // case 'eth':
                        case 'etf':
                            t.myUrl = "#";
                            t.reward = (t.reward * 1e-18).toFixed(6);
                            break;
                        case 'hsr':
                            t.myUrl = "http://explorer.h.cash/block/";
                            break;
                        case 'lch':
                            t.myUrl = "http://explorer.litecoincash.tech/block/";
                            t.reward = (t.mint).toFixed(6);
                            break;
                        case 'btg':
                            t.reward = (t.reward).toFixed(6);
                            break;
                        default:
                            t.reward = (t.reward).toFixed(6);
                            break;
                    }
                    t.timestamp = _reset.formatDateLocale(t.timestamp);
                    t.diff = _reset.getRoundVariance(t.shares, t.difficulty);
                    t.coin = coin;
                });
                var dataList1 = {
                    list: data.matured
                };
                var html1 = template('block-one-tp', dataList1);
                $('#block-one').html(html1);
            }

            if (data.immature != null) {
                $.each(data.immature, function (i, t) {
                    switch (coin) {
                        case 'etc':
                            t.myUrl = "https://gastracker.io/block/";
                            t.reward = (t.reward * 1e-18).toFixed(6);
                            break;
                        // case 'eth':
                        case 'etf':
                            t.myUrl = "#";
                            t.reward = (t.reward * 1e-18).toFixed(6);
                            break;
                        case 'hsr':
                            t.myUrl = "http://explorer.h.cash/block/";
                            break;
                        case 'lch':
                            t.myUrl = "http://explorer.litecoincash.tech/block/";
                            t.reward = (t.mint).toFixed(6);
                            break;
                        case 'btg':
                            t.reward = (t.reward).toFixed(6);
                            break;
                        default:
                            t.reward = (t.reward).toFixed(6);
                            break;
                    }
                    t.timestamp = _reset.formatDateLocale(t.timestamp);
                    t.diff = _reset.getRoundVariance(t.shares, t.difficulty);
                    t.coin = coin;
                });
                var dataList2 = {
                    list: data.immature
                };
                var html2 = template('block-two-tp', dataList2);
                $('#block-two').html(html2);
            }
            if (data.candidates != null) {
                $.each(data.candidates, function (i, t) {
                    t.timestamp = _reset.formatDateLocale(t.timestamp);
                    t.diff = _reset.getRoundVariance(t.shares, t.difficulty);
                    t.coin = coin;
                    switch (coin) {
                        case 'etc':
                            t.myUrl = "https://gastracker.io/block/";
                            break;
                        case 'etf':
                            t.myUrl = "#";
                            break;
                        case 'hsr':
                            t.myUrl = "http://explorer.h.cash/block/";
                            break;
                        case 'lch':
                            t.myUrl = "http://explorer.litecoincash.tech/block/";
                            break;
                    }
                });
                var dataList3 = {
                    list: data.candidates
                };
                var html3 = template('block-three-tp', dataList3);
                $('#block-three').html(html3);
            }

        });

        _coins.getPrice(coin, function (error, data) {
            if (data.data)
                $("#price").html('￥' + data.data[0].priceCny + '(' + data.data[0].rose + ')');
        })

    },
    default: function () {
        var i = util.getUrlParam('i');
        var coinName = util.getUrlParam('coin');
        var upper = coinName.toUpperCase();
        var imgUrl = require('images/' + coinName + '.png');
        var imgTempl = '<img src="' + imgUrl + '" />';
        $('.coin-logo').html(imgTempl);
        $(".coin-name").html(upper);
        $("#coin-name").html(upper);
        $("#address").attr('placeholder', '请输入' + upper + '矿工地址');
        $("#html-title").html(upper + '矿池 ' + '- 91pool');
        if (coinName == 'etc') {
            $("#mPrice").html("1ETC");
            $("#payment").html("1%");
            $("#reward").html("4ETC+交易费用");
        }
        else if (coinName == 'etf') {
            $("#mPrice").html("0.1ETF");
            $("#payment").html("1%");
            $("#reward").html("3ETF+交易费用");
        }
        else if (coinName == 'hsr') {
            $("#mPrice").html("0.1HSR");
            $("#payment").html("0%");
            $("#reward").html("1.584HSR+交易费");
        }
        else if (coinName == 'lch') {
            $("#mPrice").html("0.1LCH");
            $("#payment").html("0%");
            $("#reward").html("25LCH+交易费用");
        }
        if (i) {
            $('.coin-title li:eq(' + i + ')').addClass('active');
            var page = $('.coin-title li.active').attr('page');
            $('.' + page).show();
        } else {
            $('.coin-title li:eq(0)').addClass('active');
            $('.home').show();
        }
    }
};
$(function () {
    index.init();
});

