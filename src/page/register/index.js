/*
* @Author: chen
* @Date:   2018/4/10
*/
'use strict';

require('common/simple/index.js');
require('./index.css');

var index = {
    chooseFlag : true,
    init: function () {
        util.isMobile();
        this.sliderBar();
        this.handler();
    },
    handler: function () {
        var _this = this;
        $(".area-code").click(function (e) {
            e.stopPropagation();
            if (_this.chooseFlag) {
                $('.area-choose').fadeIn();
                _this.chooseFlag = false;
            } else {
                _this.chooseFlag = true;
                $('.area-choose').fadeOut();
            }
        });

        $(document).on('click', function (e) {
            _this.chooseFlag = true;
            $('.area-choose').fadeOut();
        });

        $(document).on('click',".area-choose li",function () {
            var text = $(this).text();
            $("#areaNumber").html(text)
        })
    },
    sliderBar: function () {
        var _this = this;
        var box = $('.slider-bar-drag'),//容器
            bg = $('.slider-bar-bg'),//绿色背景
            text = $('.slider-bar-text'),//文字
            btn = $('.slider-bar-btn'),//拖动按钮
            code = $('.code-box'),
            done = false;//是否通过验证

        btn.mousedown(function (e) {
            var old_left = e.pageX;
            var old_position_left = $(this).position().left;
            btn.mousemove(function (e) {
                var new_left = e.pageX;
                var changeX = new_left - old_left;
                var new_position_left = old_position_left + changeX;
                var w = box.width() - btn.width();

                if(changeX < 0 ){
                    changeX = 0;
                }
                $(this).css("left",changeX);
                bg.css("width",new_position_left).html(parseInt(new_position_left/w*100)+"%");

                // 通过验证
                if (new_position_left >= w) {
                    done = true;
                    btn.off("mousedown");
                    btn.off("mousemove");
                    bg.html('通过验证');
                    setTimeout(function () {
                        box.hide();
                        code.show();
                        _this.sliderReset();
                    },500)
                }
            });
        });

        $(document).mouseup(function () {
            btn.off("mousemove");
            if (done) return;
            btn.css("left",0);
            bg.css("width",0);
        });

        text.mousedown(function () {
            return false;
        })
    },
    sliderReset : function () {
        var box = $('.slider-bar-drag'),//容器
            bg = $('.slider-bar-bg'),//绿色背景
            text = $('.slider-bar-text'),//文字
            btn = $('.slider-bar-btn'),//拖动按钮
            done = false;//是否通过验证

        btn.css("left",0);
        bg.css("width",0);

        this.sliderBar();
    }
};

$(function () {
    index.init();
})