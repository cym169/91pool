/*
* @Author: chen
* @Date:   2018/4/12
*/
'use strict';

require('./index.css');
require('common/header/index.js');
require('common/footer/index.js');
var util = require('util/util.js');
var mwx = require('util/wx.js');
var _reset = require('util/reset.js');
var _coins = require('util/services/coin-services.js');
var _workers = require('util/services/worker-services.js');
var coin = util.getUrlParam('coin');
var upper = coin.toUpperCase();
var redirect = util.getUrlParam('redirect');
var name = util.getUrlParam('wallet');
var totalShare = 0;
var timer;
var xTime = ['now'],
    yData = [0],
    minerList = [];
if(coin == 'xvg-scrypt'){
    upper = upper.slice(0,3)
}
var index = {
    init: function () {
        mwx.getWxInfo();
        this.setwx();
        this.setData();
        this.handler();
    },
    handler: function () {
        var _this = this;
        timer = setInterval(_this.setData, 10000);

        $(document).on('click', '.work-title li', function () {
            if ($(this).hasClass('active')) {
                return false;
            }
            var i = $(this).index();
            $(this).addClass('active').siblings().removeClass('active');
            $('.f-tab').hide().eq(i).show();
        });
        $(window).unload(function () {
            localStorage.removeItem('name');
        });
    },
    setData: function () {
        var mPrice;
        switch (coin) {
            case 'etc':
                mPrice = "1ETC";
                break;
            case 'etf':
                mPrice = "0.1ETF";
                break;
            case 'hsr':
                mPrice = "0.1HSR";
                break;
            case 'btm':
                mPrice = "1BTM";
                break;
            case 'xvg-scrypt':
            case 'xvg-blake2s':
                mPrice = "1XVG";
                break;
        }
        $("#minPrice").html(mPrice);
        _coins.getCoins(coin, function (data) {
            totalShare = data.stats.roundShares;

            _workers.getWorkers(coin, name, function (data) {

                var percents = 0;
                var immature = _reset.formatBalance(data.stats.immature, coin);
                var balance = _reset.formatBalance(data.stats.balance, coin);
                var pending = _reset.formatBalance(data.stats.pending, coin);
                var paid = _reset.formatBalance(data.stats.paid, coin);
                var currentHashrate = _reset.formatHashrate(data.currentHashrate);
                var hashrate = _reset.formatHashrate(data.hashrate);
                var lastShare = _reset.getDateDiff(data.stats.lastShare);
                if (data.roundShares != "" && totalShare != "") {
                    percents = (data.roundShares / totalShare * 100).toFixed(6) + '%';
                }
                $("#immature").html(immature <= 0 ? 0 : immature);
                $("#balance").html(balance <= 0 ? 0 : balance);
                $("#pending").html(pending <= 0 ? 0 : pending);
                $("#paid").html(paid);
                $(".priceUnit").html(upper);
                $("#currentHashrate").html(currentHashrate);
                $("#hashrate").html(hashrate);
                $("#lastShare").html(lastShare);
                $("#percents").html(percents);
                $("#blocksFound").html(data.stats.blocksFound);
                $("#paymentsTotal").html(data.paymentsTotal);
                $(".workersOnline").html(data.workersOnline);
                $(".workersOffline").html(data.workersOffline);

                if (data.minerCharts != null && data.minerCharts.length > 0) {
                    xTime = [];
                    yData = [];
                    minerList = data.minerCharts.slice(0, 50);

                    $.each(minerList, function (i, t) {
                        xTime.unshift(t.timeFormat.replace(/_/, ':'));
                        yData.unshift(_reset.formatHashrate(t.minerHash));
                    });
                    var dw = _reset.getDw(yData);
                    yData = _reset.resetChart(dw, yData);
                    var w = $(window).width();
                    var interval, left;
                    if (w <= 700) {
                        interval = 5;
                        left = "20%";
                    } else {
                        interval = 2;
                        left = "11%"
                    }
                    var options = {
                        tooltip: {
                            trigger: 'axis',
                            axisPointer: {
                                type: 'line',
                                label: {
                                    backgroundColor: '#6a7985'
                                }
                            },
                            position: function (pt) {
                                return [pt[0], '10%'];
                            },
                            formatter: "{c}" + dw + "<br>{b}",
                            confine: true
                        },
                        title: false,
                        xAxis: {
                            type: 'category',
                            boundaryGap: false,
                            axisLabel: {
                                interval: interval,
                                rotate: 60
                            },
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
                            },
                            axisLabel: {
                                formatter: '{value}' + dw
                            }
                        },
                        grid: {
                            left: left,
                            bottom: 100,
                            right: "5%"
                        },
                        series: [
                            {
                                type: 'line',
                                smooth: true,
                                sampling: 'average',
                                itemStyle: {
                                    normal: {
                                        color: 'rgb(254, 161, 18)'
                                    }
                                },
                                areaStyle: {
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
                                data: []
                            }
                        ]
                    };
                    options.series[0].data = yData;
                    options.xAxis.data = xTime;
                    var chartId = document.getElementById('chart');
                    var myChart = echarts.init(chartId);
                    // 绘制图表
                    myChart.setOption(options);
                }

                $.each(data.workers, function (i, t) {
                    t.hr = _reset.formatHashrate(t.hr);
                    t.hr2 = _reset.formatHashrate(t.hr2);
                    t.lastBeat = _reset.getDateDiff(t.lastBeat);
                    t.name = i;
                });
                var dataList = {
                    list: data.workers
                };
                var Onhtml = template('workerOnline-tp', dataList);
                var Offhtml = template('workerOffline-tp', dataList);
                $("#workerOnline").html(Onhtml);
                $("#workerOffline").html(Offhtml);

                if (data.payments) {
                    $.each(data.payments, function (i, t) {
                        t.timestamp = _reset.formatDateLocale(t.timestamp);
                        t.text = _reset.formatTx(t.tx);
                        t.amount = _reset.formatBalance(t.amount, coin);
                        t.dw = upper;
                        switch (coin) {
                            case 'etc':
                                t.myUrl = "https://gastracker.io/tx/";
                                break;
                            case 'etf':
                                t.myUrl = "#";
                                break;
                            case 'hsr':
                                t.myUrl = "#";
                                break;
                            case 'btm':
                                t.myUrl = "http://blockmeta.com/tx/";
                                break;
                            case 'xvg-scrypt':
                            case 'xvg-blake2s':
                                t.myUrl = "https://verge-blockchain.info/tx/";
                                break;
                        }
                    });
                    var payList = {
                        list: data.payments
                    };
                    var payHtml = template('payList-tp', payList);
                    $("#payList").html(payHtml);
                }
            }, function (error) {
                clearInterval(timer);
                util.errorTips("没有找到您设置的矿工地址的数据，请确保矿工地址配置正确！", function () {
                    window.location.href = './currency.html?coin=' + coin;
                });
            });
        });
    },
    setwx: function () {
        var baseUrl = location.href.split("#")[0];
        mwx.setWxInfo("个人钱包中心，您的资料，一手掌握。", "专注于数字资产增值服务", baseUrl);
    }
};

$(function () {
    index.init();
});