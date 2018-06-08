/*
* @Author: chen
* @Date:   2018/4/17
*/
'use strict';

require('./index.css');
require('common/header/index.js');
require('common/footer/index.js');
require('common/ad/index.js');
var $ = require('jQuery');
var mwx = require('util/wx.js');
$(function () {

    var baseUrl = location.href.split("#")[0];
    mwx.setWxInfo("91pool服务条款","使用我们的服务不会赋予您对我们服务中的任何知识产权或您访问的内容的所有权。除非获得相关的许可或法律允许，否则您不得使用与我们相关的内容。本服务条款不授予您使用我们服务中使用的任何品牌或徽标的权利。您不得删除，隐藏或更改我们服务中显示的任何法律声明。",baseUrl);
})