/*
* @Author: chen
* @Date:   2018/4/13
*/
'use strict';

var zharr = ["秒之前", "分钟之前", "小时之前", "未爆块"];
var enarr = ["s ago", "mins ago", "hours ago", "no block"];
var ruarr = ["секунду назад", "минуту назад", "час назад", "не берут"];

var _reset = {

    // 单位换算，btm，xvg除外
    formatBalance: function (value, coin) {
        if (coin == "etc" || coin == "eth" || coin == "etf") {
            value = value * 0.000000001;
        }
        if (coin == 'hsr') {
            value = value * 0.00000001;
        }
        if (isNaN(value)) {
            value = 0;
        }
        return parseFloat(value).toFixed(8);
    },
    // 时间换算，这里默认输入的ts是没有后面000的
    formatDateLocale: function (ts) {
        var a = new Date(ts * 1000);
        var month = a.getMonth() + 1;
        if (parseInt(month, 10) < 10) {
            month = "0" + month;
        }
        var day = a.getDate();
        if (parseInt(day, 10) < 10) {
            day = "0" + day;
        }
        var hours = a.getHours();
        if (parseInt(hours, 10) < 10) {
            hours = "0" + hours;
        }
        var min = a.getMinutes();
        if (parseInt(min, 10) < 10) {
            min = "0" + min;
        }
        var sec = a.getSeconds();
        if (parseInt(sec, 10) < 10) {
            sec = "0" + sec;
        }
        return a.getFullYear() + "-" + month + "-" + day + " " + hours + ":" + min + ":" + sec;
    },
    // 时间换算，这里默认输入的ts是有后面000的
    formatDate: function (ts) {
        var a = new Date(ts);
        var month = a.getMonth() + 1;
        if (parseInt(month, 10) < 10) {
            month = "0" + month;
        }
        var day = a.getDate();
        if (parseInt(day, 10) < 10) {
            day = "0" + day;
        }
        var hours = a.getHours();
        if (parseInt(hours, 10) < 10) {
            hours = "0" + hours;
        }
        var min = a.getMinutes();
        if (parseInt(min, 10) < 10) {
            min = "0" + min;
        }
        var sec = a.getSeconds();
        if (parseInt(sec, 10) < 10) {
            sec = "0" + sec;
        }
        return a.getFullYear() + "-" + month + "-" + day + " " + hours + ":" + min + ":" + sec;
    },
    // 时间换算，这里默认输入的ts是有后面000的,输出没有小时,分钟
    formatDateWithoutS: function (ts) {
        var a = new Date(ts);
        var month = a.getMonth() + 1;
        if (parseInt(month, 10) < 10) {
            month = "0" + month;
        }
        var day = a.getDate();
        if (parseInt(day, 10) < 10) {
            day = "0" + day;
        }
        return a.getFullYear() + "-" + month + "-" + day;
    },
    // 算了换算,有单位
    formatHashrate: function (value) {
        var hashrate = value;
        var i = 0;
        var units = ['H', 'KH', 'MH', 'GH', 'TH', 'PH'];
        while (hashrate > 1000) {
            hashrate = hashrate / 1000;
            i++;
        }
        return hashrate.toFixed(2) + ' ' + units[i];
    },
    // 算力换算,只取单位
    formatSuffix: function (value) {
        var hashrate = parseInt(value);
        var i = 0;
        var units = ['H', 'KH', 'MH', 'GH', 'TH', 'PH'];
        while (hashrate > 1000) {
            hashrate = hashrate / 1000;
            i++;
        }
        return units[i];
    },
    // 算力换算,只取值
    formatHashrateWithoutSuffix: function (value) {
        var hash = value;
        var i = 0;
        while (hash > 1000) {
            hash = hash / 1000;
            i++;
        }
        return hash.toFixed(2) * 1;
    },
    // 网络难度换算
    changeDiff: function (diff) {
        var n = diff;
        if (n < 1000) {
            return parseFloat(n).toFixed(3);
        }
        var i = 0;
        var units = ['K', 'M', 'G', 'T', 'P'];
        while (n > 1000) {
            n = n / 1000;
            i++;
        }
        return n.toFixed(3) + ' ' + units[i - 1];
    },
    // 区块信息,困难度换算
    getRoundVariance: function (roundShares, difficulty) {
        var res = roundShares / difficulty * 100;
        if (isNaN(res)) {
            return "0%"
        }
        return res.toFixed(0) + "%"
    },
    // 区块发现时间换算,输出多少分钟之前,
    getDateDiff: function (value) {
        var la = localStorage.lang;
        if (la == null) {
            la = "cn";
        }
        var arr;
        if (la == "en") {
            arr = enarr;
        } else if (la == "ru") {
            arr = ruarr;
        } else {
            arr = zharr;
        }

        if (value == null || value == "") {
            return arr[3];
        }

        var n = new Date().getTime();
        var total = (n - value * 1000) / 1000;
        if (total < 0) {
            total = 0;
        }
        if (total < 60) {
            return (total).toFixed(0) + arr[0];
            //return diff.toString() +"" + arr[0];
        } else if (total > 60 && total < 3600) {
            return (total / 60).toFixed(0) + arr[1];
            //diff = parseInt(total/60);
            //return diff.toString() + arr[1];
        } else {
            return (total / (60 * 60)).toFixed(0) + arr[2];
            //diff = parseInt(total/(60*60));
            //return diff.toString() + arr[2];
        }
    },
    // 隐藏交易hash的中间部分
    formatTx: function (value) {
        return value.substring(0, 24) + "..." + value.substring(42);
    },
    formatAddr: function (value) {
        return value.substring(0, 8) + "..." + value.substring(32);
    },
    // 幸运值换算
    num2per: function (value) {
        return Math.round(value * 100, 2) + "%";
    },
    randomMinerName: function () {
        var name = "";
        var arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

        var range = Math.round(Math.random() * (8 - 4)) + 4;
        for (var i = 0; i < range; i++) {
            name += arr[Math.round(Math.random() * (arr.length - 1))];
        }

        return name;
    },
    formatReject: function (total, reject) {
        return (parseFloat(reject) / total).toFixed(2) + "%";
    },
    // 区块数字简化
    formatNumber: function (number) {
        var len = number.toString().length;
        var newNumber = 0;

        if (len <= 3) {
            newNumber = number;
        }
        else if (len > 3 && len <= 4) {
            newNumber = Math.floor(number / 1000) + "k+";
        }
        else if (len > 4) {
            newNumber = Math.floor(number / 10000) + "w+";
        }
        return newNumber;
    },
    resetChart: function (dw, array) {
        var Array = array;
        if (dw == 'H') {
            for (var i = 0; i < Array.length; i++) {
                if (Array[i].indexOf(' KH') > 0) {
                    Array[i] = parseFloat(Array[i]) * 1000 + " H";
                }
                if (Array[i].indexOf(' MH') > 0) {
                    Array[i] = parseFloat(Array[i]) * 1000 * 1000 + " H";
                }
                if (Array[i].indexOf(' GH') > 0) {
                    Array[i] = parseFloat(Array[i]) * 1000 * 1000 * 1000 + " H";
                }
                Array[i] = parseFloat(Array[i])
            }
        }
        else if (dw == 'KH') {
            for (var i = 0; i < Array.length; i++) {
                if (Array[i].indexOf(' H') > 0) {
                    Array[i] = parseFloat(Array[i]) / 1000 + " KH";
                }
                if (Array[i].indexOf(' MH') > 0) {
                    Array[i] = parseFloat(Array[i]) * 1000 + " KH";
                }
                if (Array[i].indexOf(' GH') > 0) {
                    Array[i] = parseFloat(Array[i]) * 1000 * 1000 + " KH";
                }
                Array[i] = parseFloat(Array[i])
            }
        }
        else if (dw == 'MH') {
            for (var i = 0; i < Array.length; i++) {
                if (Array[i].indexOf(' H') > 0) {
                    Array[i] = parseFloat(Array[i]) / 1000 / 1000 + " MH";
                }
                if (Array[i].indexOf(' KH') > 0) {
                    Array[i] = parseFloat(Array[i]) / 1000 + " MH";
                }
                if (Array[i].indexOf(' GH') > 0) {
                    Array[i] = parseFloat(Array[i]) * 1000 + " MH";
                }
                if (Array[i].indexOf(' TH') > 0) {
                    Array[i] = parseFloat(Array[i]) * 1000 * 1000 + " MH";
                }
                if (Array[i].indexOf(' PH') > 0) {
                    Array[i] = parseFloat(Array[i]) * 1000 * 1000 * 1000 + " MH";
                }
                Array[i] = parseFloat(Array[i])
            }

        }
        else if (dw == 'GH') {
            for (var i = 0; i < Array.length; i++) {
                if (Array[i].indexOf(' KH') > 0) {
                    Array[i] = parseFloat(Array[i]) / 1000 / 1000 + " GH";
                }
                if (Array[i].indexOf(' MH') > 0) {
                    Array[i] = parseFloat(Array[i]) / 1000 + " GH";
                }
                if (Array[i].indexOf(' TH') > 0) {
                    Array[i] = parseFloat(Array[i]) * 1000 + " GH";
                }
                if (Array[i].indexOf(' PH') > 0) {
                    Array[i] = parseFloat(Array[i]) * 1000 * 1000 + " GH";
                }
                Array[i] = parseFloat(Array[i])
            }
        }
        else if (dw == 'TH') {
            for (var i = 0; i < Array.length; i++) {
                if (Array[i].indexOf(' MH') > 0) {
                    Array[i] = parseFloat(Array[i]) / 1000 / 1000 + " TH";
                }
                if (Array[i].indexOf(' GH') > 0) {
                    Array[i] = parseFloat(Array[i]) / 1000 + " TH";
                }
                if (Array[i].indexOf(' PH') > 0) {
                    Array[i] = parseFloat(Array[i]) * 1000 + " TH";
                }
                Array[i] = parseFloat(Array[i])
            }
        }
        else if (dw == 'PH') {
            for (var i = 0; i < Array.length; i++) {
                if (Array[i].indexOf(' GH') > 0) {
                    Array[i] = parseFloat(Array[i]) / 1000 / 1000 + " PH";
                }
                if (Array[i].indexOf(' TH') > 0) {
                    Array[i] = parseFloat(Array[i]) / 1000 + " PH";
                }
                Array[i] = parseFloat(Array[i])
            }
        }
        return Array
    },
    getDw: function (array) {
        var _this = this;
        var H = [], KH = [], MH = [], GH = [], TH = [], PH = [];
        var dw = "";
        var units = ['H', 'KH', 'MH', 'GH', 'TH', 'PH'];
        for (var i = 0; i < array.length; i++) {
            if (array[i] == units[0]) {
                H.push(array[i])
            }
            else if (array[i] == units[1]) {
                KH.push(array[i])
            }
            else if (array[i] == units[2]) {
                MH.push(array[i])
            }
            else if (array[i] == units[3]) {
                GH.push(array[i])
            }
            else if (array[i] == units[4]) {
                TH.push(array[i])
            }
            else if (array[i] == units[5]) {
                PH.push(array[i])
            }
        }

        if (H.length > KH.length && H.length > MH.length) {
            dw = units[0];
        }
        else if (KH.length > H.length && KH.length > MH.length && KH.length > GH.length) {
            dw = units[1];
        }
        else if (MH.length > H.length && MH.length > KH.length && MH.length > GH.length) {
            dw = units[2];
        }
        else if (GH.length > H.length && GH.length > KH.length && GH.length > MH.length && GH.length > TH.length) {
            dw = units[3];
        }
        else if (TH.length > MH.length && TH.length > GH.length && TH.length > PH.length) {
            dw = units[4];
        }
        else if (PH.length > GH.length && PH.length > TH.length) {
            dw = units[5];
        }
        return dw;
    }
};

module.exports = _reset;