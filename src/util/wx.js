/*
* @Author: Chen
* @Date:   2018.04.08
*/

'use strict';

var mwx = {
    getWxInfo : function () {
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
    },
    setWxInfo : function (title,desc,baseUrl) {
        this.getWxInfo();
        wx.ready(function () {
            // <% --公共方法--%>
            var shareData = {
                title: title,
                desc: desc,
                link: baseUrl,
                imgUrl: "http://www.91pool.com/images/wx_logo.png",
                success: function (res) {
                },
                cancel: function (res) {
                }
            };
            // <% --分享给朋友接口--%>
            wx.onMenuShareAppMessage(shareData);
            // <% --分享到朋友圈接口--%>
            wx.onMenuShareTimeline(shareData);
        });

        wx.error(function (res) {

        });
    }
};
module.exports = mwx;