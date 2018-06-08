/*
* @Author: chen
* @Date:   2018/4/17
*/
'use strict';

require('./index.css');
require('common/header/index.js');
require('common/ad/index.js');
require('common/footer/index.js');

var mwx = require('util/wx.js');
$(function () {

    var baseUrl = location.href.split("#")[0];
    mwx.setWxInfo("关于91pool团队","91pool是91团队为广大矿工朋友提供相关的挖矿服务的相关平台。91pool以提供相关矿池服务为起点，在区块链应用等领域具有深厚的技术积累，并在此基础上推出多个有影响力的数字货币矿池。",baseUrl);

})