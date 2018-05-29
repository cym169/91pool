/*
* @Author: Chen
* @Date:   2018.04.08
*/

'use strict';
var jsonp = require('jsonp');

var mwx = {
    set : function () {
        var url = encodeURIComponent(location.href.split("#")[0]);
        $.ajax({
            url: "http://www.91pool.com/api/article/wx/signature/wx4ffd9fbdf1388129?url=" +url,
            async: true,
            success: function (data) {
                wx.config({
                    debug: false,
                    appId: data.appId,
                    timestamp: data.timestamp,
                    nonceStr: data.nonce,
                    signature:data.signature,
                    jsApiList: [
                        'onMenuShareTimeline',
                        'onMenuShareAppMessage'
                    ]
                });
            }
        });
    }
};
module.exports = mwx;