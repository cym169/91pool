/*
* @Author: chen
* @Date:   2018/4/17
*/
'use strict';
require("common/header/index.js");
require("common/footer/index.js");
require("./index.css");

require("lib/ueditor/ueditor.config.js");
require("lib/ueditor/ueditor.all.js");
require("lib/ueditor/lang/zh-cn/zh-cn.js");

var _article = require("util/services/article-services.js");

var util = require("util/util.js");

var id = util.getUrlParam("id");
var index = {
    init: function () {
        util.isMobile();
        this.editLogin();
    },
    handler: function () {
        $("#username,#password").on("keyup",function (e) {
            if(e.keyCode == 13&&!localStorage.username){
                $("#editLogin").trigger("click");
            }
        })
    },
    editLogin: function () {
        var _this = this;
        if(localStorage.username){
            $('body,html').removeClass("maxHeight");
            $(".edit-box").show();
            _this.default();
        }
        else{
            $(".login-box").show();
            $("#editLogin").click(function () {
                var loginName = $("#username").val(),
                    password = $("#password").val();

                if( loginName == "" || password == ""){
                    util.errorTips("用户名密码不能为空！");
                }

                var loginInfo = {
                    loginName : loginName,
                    password: md5(password)
                };

                util.request({
                    url         : 'http://www.91pool.com/api/article/admin_check',
                    type        : 'post',
                    data        : loginInfo,
                    dataType    : "json",
                    success     : function (data) {
                        if(data.code == 200){
                            localStorage.username = loginInfo.loginName;
                            $('body,html').removeClass("maxHeight");
                            $(".login-box").hide();
                            $(".edit-box").show();
                            _this.default();
                        }
                    },
                    error       : function (eorror) {

                    }
                });
            })
        }
    },
    default: function () {
        var _this = this;
        laydate.render({
            elem: '#publishTime' //指定元素
        });

        var ue = UE.getEditor('container', {
            toolbars: [
                [
                    'bold', //加粗
                    'italic', //斜体
                    'underline', //下划线
                    'blockquote', //引用
                    'horizontal', //分隔线
                    'insertorderedlist', //有序列表
                    'insertunorderedlist', //无序列表
                    'justifyleft', //居左对齐
                    'justifyright', //居右对齐
                    'justifycenter', //居中对齐
                    // 'simpleupload', //单图上传
                    'removeformat', //清除格式
                    'undo', //撤销
                    'redo', //重做
                    'source' //源代码
                ]
            ],
            initialFrameHeight: 600,
            initialFrameWidth: '100%',
            autoHeightEnabled: true
        });
        if (id) {
            $("#articleId").attr("disabled", false).val(id);
            ue.ready(function (editor) {
                _article.getArticle({id: id}, function (data) {
                    if (data.code === 200) {
                        var title = data.data.title;
                        var author = data.data.author;
                        var html = data.data.content;
                        var intro = data.data.introduction;
                        var time = new Date(data.data.createTime);
                        var year = time.getFullYear();
                        var month = time.getMonth() + 1;
                        var day = time.getDate();
                        if (parseInt(month, 10) < 10) {
                            month = "0" + month;
                        }
                        if (parseInt(day, 10) < 10) {
                            day = "0" + day;
                        }
                        var str = year+"-"+month+"-"+day;

                        $("#title").val(title);
                        $("#author").val(author);
                        $("#introduction").val(intro);
                        $("#publishTime").val(str);
                        ue.setContent(html);
                    } else {
                        util.errorTips("服务器错误，请通知管理员！");
                    }
                })
            });
        }

        $("#submit").click(function () {
            if (id) {
                _article.editArticle($('#form').serialize(), function (data) {
                    if (data.code === 200) {
                        window.location.href = "./notice.html";
                    } else {
                        util.errorTips("服务器错误，请通知管理员！");
                    }
                }, function () {
                    util.errorTips("服务器错误，请通知管理员！");
                });
            }
            else {
                _article.saveArticle($('#form').serialize(), function (data) {
                    if (data.code === 200) {
                        window.location.href = "./notice.html";
                    } else {
                        util.errorTips("服务器错误，请通知管理员！");
                    }
                }, function () {
                    util.errorTips("服务器错误，请通知管理员！");
                });
            }
        })
    }
};

$(function () {
    index.init();
});