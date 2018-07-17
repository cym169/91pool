/*
* @Author: chen
* @Date:   2018/4/13
*/
'use strict';

var util = require('util/util.js');
var serverHost = '';
var _coins = {

    getCoinList: function (resolve, reject) {
        var _this = this;
        serverHost = 'http://www.91pool.com/api';
        util.request({
            url: _this.getServerUrl('/pool/stats') + "?t=" + new Date().getTime(),
            type: 'get',
            success: resolve,
            error: reject
        });
    },
    getCoins: function (type, resolve, reject) {
        var _this = this;
        serverHost = 'http://www.91pool.com/api';
        util.request({
            url: _this.getServerUrl('/' + type + '/stats') + "?t=" + new Date().getTime(),
            type: 'get',
            success: resolve,
            error: reject
        });
    },
    getBlocks: function (type, resolve, reject) {
        var _this = this;
        serverHost = 'http://www.91pool.com/api';
        util.request({
            url: _this.getServerUrl('/' + type + '/blocks') + "?t=" + new Date().getTime(),
            type: 'get',
            success: resolve,
            error: reject
        });
    },
    getPrice: function (type, resolve) {
        var _this = this;
        serverHost = 'http://api.guower.com';
        util.getJsonp({
            url: _this.getServerUrl('/coin/markets/' + type) + "?t=" + new Date().getTime(),
            callback: resolve
        })
    },
    // 获取服务器地址
    getServerUrl: function (path) {
        return serverHost + path;
    }
};
module.exports = _coins;