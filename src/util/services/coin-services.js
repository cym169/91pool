/*
* @Author: chen
* @Date:   2018/4/13
*/
'use strict';

var util = require('util/util.js');
var serverHost = '';
var _coins = {

    getCoinList : function (resolve,reject) {
        var _this = this;
        serverHost = 'http://www.91pool.com/api';
        util.request({
            url     : _this.getServerUrl('/pool/stats'),
            type  : 'get',
            success : resolve,
            error   : reject
        });
    },
    getCoins : function(type,resolve,reject){
        var _this = this;
        serverHost = 'http://www.91pool.com/api';
        util.request({
            url     : _this.getServerUrl('/'+type+'/stats'),
            type  : 'get',
            success : resolve,
            error   : reject
        });
    },
    getBlocks : function(type,resolve,reject){
        var _this = this;
        serverHost = 'http://www.91pool.com/api';
        util.request({
            url     : _this.getServerUrl('/'+type+'/blocks'),
            type  : 'get',
            success : resolve,
            error   : reject
        });
    },
    getPrice : function (type,resolve) {
        var _this = this;
        serverHost = 'http://api.guower.com';
        util.getJsonp({
            url     : _this.getServerUrl('/coin/markets/'+type),
            callback: resolve
        })
    },
    getLCH : function (resolve,reject) {
        var _this = this;
        serverHost = 'https://block.cc/api/v1/query?str=lch&act=q';
        util.request({
            url     : serverHost,
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
module.exports = _coins;

// {
//     "code":200,
//     "msg":"成功",
//     "data":[
//         {
//             "id":"ethereum-classic",
//             "name":null,
//             "ranking":17,
//             "fullName":"ETC-以太经典",
//             "marketValueCny":"11737229945",
//             "marketValueUsd":"1867231711",
//             "marketValueBtc":"223399",
//             "priceCny":"116",
//             "priceUsd":"18.44",
//             "priceBtc":"0.002206",
//             "liquidity":"10,127万",
//             "turnoverCny":"1326548156.18233",
//             "turnoverUsd":"211035550.552492",
//             "turnoverBtc":"25235.3055984628",
//             "rose":"3.68%","updateTime":1524217238917
//         }
//             ],
//     "dateTime":1524217254772,
//     "success":true
// }