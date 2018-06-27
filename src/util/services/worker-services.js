/*
* @Author: chen
* @Date:   2018/4/13
*/
'use strict';

var util = require('util/util.js');
var serverHost = '';
var _workers = {

    getWorkers : function(type,name,resolve,reject){
        var _this = this;
        serverHost = 'http://www.91pool.com';
        util.request({
            url     : _this.getServerUrl('/api/'+type+'/accounts/'+name+'')+"?t="+new Date().getTime(),
            type  : 'get',
            success : resolve,
            error   : reject
        });
    },
    // 获取服务器地址
    getServerUrl : function(path){
        return serverHost + path;
    }
};
module.exports = _workers;