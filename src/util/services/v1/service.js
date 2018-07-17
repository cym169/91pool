/*
* @Author: wang
* @Date:   2018/7/13
*/
'use strict';

var util = require('util/util.js');


// var serverHost = 'http://www.91pool.com/api';
var serverHost = "http://172.16.2.12:8099";

var _service = {
    getArticle: function (id, resolve, reject) {
        var _this = this;
        util.request({
            url: _this.getServerUrl('/news/info/')+ id + "?t=" + new Date().getTime(),
            type: 'get',
            success: resolve,
            error: reject
        });
    },
    // 获取服务器地址
    getServerUrl: function (path) {
        return serverHost + path;
    }
};

module.exports = _service;

