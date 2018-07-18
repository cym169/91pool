/*
* @Author: chen
* @Date:   2018/4/13
*/
'use strict';

var util = require('util/util.js');
var serverHost = require('globalUrl');
var _coins = {

    getCoinList: function (resolve, reject) {
        var _this = this;
        util.request({
            url: _this.getServerUrl('/pool/stats') + "?t=" + new Date().getTime(),
            type: 'get',
            success: resolve,
            error: reject
        });
    },
    getCoins: function (type, resolve, reject) {
        var _this = this;
        util.request({
            url: _this.getServerUrl('/' + type + '/stats') + "?t=" + new Date().getTime(),
            type: 'get',
            success: resolve,
            error: reject
        });
    },
    getBlocks: function (type, resolve, reject) {
        var _this = this;
        util.request({
            url: _this.getServerUrl('/' + type + '/blocks') + "?t=" + new Date().getTime(),
            type: 'get',
            success: resolve,
            error: reject
        });
    },
    getPrice: function (type, resolve) {
        util.getJsonp({
            url: 'http://api.guower.com/coin/markets/' + type + "?t=" + new Date().getTime(),
            callback: resolve
        })
    },
    // 获取服务器地址
    getServerUrl: function (path) {
        return serverHost + path;
    }
};
module.exports = _coins;