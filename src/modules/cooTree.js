/**
 * @func cooTree
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
    $.fn.cooTree = function (options) {
        return new Tree($(this), options);
    };

    var Tree = function ($el, options) {
        var defaults = {
            //字符串
            url: '',
            //数据源 数组对象
            data: [],
            childName: 'children',
            //布尔值
            open: true,
            //设定字段名
            field: {},
            //成功的回调
            done: function () {

            }
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
     * @desc 初始化一棵树
     */
    Tree.prototype.create = function () {
        var _self = this;
        var $temp = $('<div class="coo-tree-node"></div>');
        this.tree($temp);
        var $html = $('<div class="coo-tree"></div>').append($temp);
        this.$el.html($html);
        _self.params.done(_self.params.data, $html);
    }
    /**
     * @desc 生成树html代码
     */
    Tree.prototype.tree = function ($elem, children) {
        var _self = this,
            options = _self.params,
            data = children || options.data,
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
        $(data).each(function (index, item) {
            var hasChild = item.children && item.children.length >= 0,
                packDiv = $('<div class="coo-tree-node" ' + (options.open ? '' : 'style = "display: none;"') + '></div>'),
                entryDiv = $([
                    '<div class="coo-tree-set">',
                    '   <div class="coo-tree-item">',
                    // 左侧箭头
                    (function () {
                        if (hasChild) {
                            return '<span class="coo-left-box"><i class="icon icon-tree-bottom ' + (options.open ? '' : 'icon-tree-right') + '"></i></span>';
                        } else {
                            return '<span class="coo-left-box"></span>';
                        }
                    })(),
                    // 右侧节点操作图标
                    (function () {
                        //如果值不存在
                        if (!field.right) {
                            return
                        }
                        if (typeof field.right.templet === 'string' || typeof field.right.templet === 'function') {
                            if (typeof field.right.templet === 'function') {
                                var str = field.right.templet(item);
                                return '<span class="coo-right-box">' + str + '</span>';
                            } else {
                                return template('<span class="coo-right-box">' + field.right.templet + '</span>', item);
                            }
                        } else {
                            var editIcon = {
                                    eye: '<i class="icon icon-tree-close"></i>',
                                },
                                arr = ['<span class="coo-right-box">'];
                            $(field.right.edit).each(function (index, item) {
                                arr.push(editIcon[item]);
                            })
                            arr.push('</span>');
                        }
                        return arr.join('');
                    })(),
                    // 中间显示内容
                    (function () {
                        var title = '';
                        if (typeof field.middle.title === 'function') {
                            title = field.middle.title(item);
                        } else {
                            title = template(field.middle.title, item);
                        }
                        if (typeof field.middle.templet === 'function') {
                            var str = field.middle.templet(item);
                            return '<span class="coo-middle-box" ' + (title ? "title=" + title : "") + '>' + str + '</span>';
                        } else {
                            return template('<span class="coo-middle-box" title="' + title + '">' + field.middle.templet + '</span>', item);
                        }
                    })(),
                    '</div></div>'
                ].join(''));
            if (hasChild) {
                //他的之后，其实就是一个纯粹的之后
                entryDiv.append(packDiv);
                _self.tree(packDiv, item.children);
            };
            //眼睛
            if (field.right) {
                _self.setEditEyeEvent(entryDiv, item);
            }
            $elem.append(entryDiv);
            _self.events(entryDiv, item);
        });
    };
    /**
     * @desc 为html代码绑定事件
     */
    Tree.prototype.events = function (elem, item) {
        var _self = this;
        var field = _self.params.field;

        elem.children().children('.coo-middle-box').on('click', function () {
            $(this).siblings('.coo-left-box').children('.icon-tree-bottom').toggleClass('icon-tree-right').parent().parent().next('.coo-tree-node').toggle();
            field.middle.click(item, $(this));
        });

        elem.children().children('.coo-left-box').on('click', function () {
            $(this).children('.icon-tree-bottom').toggleClass('icon-tree-right').parents('.coo-tree-item').next('.coo-tree-node').toggle();
            if (field.left && typeof field.left.click === 'function') {
                field.left.click(item, $(this));
            }
        });
    }
    /**
     * @desc 计算眼睛显隐状态
     */
    Tree.prototype.setEditEyeEvent = function (elem, item) {
        var _self = this;
        var field = _self.params.field;
        elem.children().children('.coo-right-box').on('click', '.icon-tree-close', function () {
            /**
             * 1. 将自己的所有子元素，显示或隐藏
             */
            $(this).toggleClass('icon-tree-open');
            if (field.right.click) {
                field.right.click(item, $(this));
            }

            // 同步子节点选中状态
            if ($(this).hasClass('icon-tree-open')) {
                $(this).parents('.coo-tree-item').next().find('.icon-tree-close').each(function () {
                    if (!$(this).hasClass('icon-tree-open')) {
                        $(this).click();
                    }
                })
            } else {
                $(this).parents('.coo-tree-item').next().find('.icon-tree-close').each(function () {
                    // 因为上面或者自己的影响，导致了重复点击
                    // 将显示的关闭
                    if ($(this).hasClass('icon-tree-open')) {
                        $(this).click();
                    }
                })
            }

            // 同步父节点选中状态
            $(this).parents('.coo-tree-node').prev().each(function () {
                var close = $(this).next().find('.icon-tree-close').length;
                var open = $(this).next().find('.icon-tree-open').length;
                if (close === open) {
                    $(this).children('.coo-right-box').children().addClass('icon-tree-open')
                } else {
                    $(this).children('.coo-right-box').children().removeClass('icon-tree-open')
                }
            })
        });
    }
    Tree.prototype.reload = function () {}
}));