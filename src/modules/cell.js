/**
 * @func cooCell
 * @author wenjielei
 * @version 1.0.0 
 * @desc 树结构生成插件例子
 */

(function (global, factory) {
    if (typeof define === 'function' && (define.amd || define.cmd)) {
        define(factory);
    } else {
        factory();
    }
}(this, function () {
    $.fn.cell = function (options) {
        return new Cell($(this), options);
    };

    var Cell = function ($el, options) {
        var defaults = {
            //字符串
            url: '',
            //数据源 数组对象
            data: [],
            //布尔值
            //设定字段名
            field: {},
            //成功的回调
            done: function () {}
        };

        var params = $.extend({}, defaults, options || {});
        this.params = params;
        this.$el = $el;
        //如果数据为空，就return
        if (!params.data) {
            return;
        }
        this.create();
    };
    /**
     * @desc 初始化列表
     */
    Cell.prototype.create = function () {
        var $temp = $('<ul class="coo-cell"></ul>');
        this.cell($temp);
        console.log($temp[0]);
        this.$el.html($temp);
    };
    Cell.prototype.cell = function ($elem) {
        var _self = this,
            options = _self.params,
            field = options.field,
            template = function (t, d) {
                var
                    fragment = '',
                    key,
                    reg;
                //遍历该数据项下所有的属性，将该属性作为key值来查找标签，然后替换
                for (key in d) {
                    reg = new RegExp('{{' + key + '}}', 'ig');
                    fragment = (fragment || t).replace(reg, d[key]);
                }
                return fragment;
            };
        $(options.data).each(function (index, item) {
            var $listDiv = $([
                '<li class="coo-cell-item">',
                // 左 支持templet 支持string就可以了，至于click，也支持
                (function () {
                    if (typeof field.left === 'object') {
                        if (typeof field.left.templet === 'function') {
                            var str = field.left.templet(item);
                            return '<span class="coo-left-box">' + str + '</span>';
                        } else {
                            return template('<span class="coo-left-box">' + field.left.templet + '</span>', item);
                        }
                    } else {
                        return '<span class="coo-left-box"></span>'
                    }
                })(),
                // 右 眼睛提供，为了公司 其他与左一样
                (function () {
                    if (typeof field.right === 'object') {
                        if (typeof field.right.templet === 'function') {
                            var str = field.right.templet(item);
                            return '<span class="coo-right-box">' + str + '</span>';
                        } else {
                            return template('<span class="coo-right-box">' + field.right.templet + '</span>', item);
                        }
                    } else {
                        return '<span class="coo-right-box"></span>'
                    }
                })(),
                // 中与左一样
                (function () {
                    if (typeof field.middle === 'object') {
                        if (typeof field.middle.templet === 'function') {
                            var str = field.middle.templet(item);
                            return '<span class="coo-middle-box">' + str + '</span>';
                        } else {
                            return template('<span class="coo-middle-box">' + field.middle.templet + '</span>', item);
                        }
                    } else {
                        return '<span class="coo-middle-box"></span>'
                    }
                })(),
                '</li>'
            ].join(''));
            $elem.append($listDiv);
            _self.events($listDiv, item);
        })
    };
    Cell.prototype.events = function ($elem, item) {
        var _self = this;
        var field = _self.params.field;
        if (field.left && typeof field.left.click === 'function') {
            $elem.children('.coo-left-box').on('click', function () {
                field.left.click(item, $(this));
            });
        }

        if (field.right && typeof field.right.click === 'function') {
            $elem.children('.coo-right-box').on('click', function () {
                field.right.click(item, $(this));
            });
        }

        if (field.middle && typeof field.middle.click === 'function') {
            $elem.children('.coo-middle-box').on('click', function () {
                field.middle.click(item, $(this));
            });
        }

    };
    Cell.prototype.reload = function () {};
}));