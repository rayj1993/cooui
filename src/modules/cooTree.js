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
            field: {
                left: {
                    title: '',
                    temple: null
                },
                middle: {
                    title: '',
                    temple: null
                },
                right: {
                    title: '',
                    temple: null
                }
            },
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
     * 创建样式
     * @return {Object} 返回当前实例对象
     */
    Tree.prototype.create = function () {

        var html = [
                '<div class="coo-tree">'
            ],
            params = this.params,
            childName = this.params.childName,
            //父级树结构遍历
            parentNode = function (node, number) {

            },
            //子级生成与内容生成方法
            childNode = function (data, number) {

            };

        /**
         * 1. 写一个方法，可以做到自己循环自己
         * 2.
         */
        function createParent() {
            for (var i = 0, len = params.data.length; i < len; i++) {
                html.push('<div class="coo-tree-node">');
                //先写入内容
                html.push([
                    '<div class="coo-tree-item">',
                    '   <span class="coo-left-box">',
                    '       <i class="icon icon-bottom"></i>',
                    '   </span>',
                    '   <span class="coo-right-box">',
                    '   </span>',
                    '   <span class="coo-middle-box">次是一个新的故事这次是一个新的故事</span>',
                    '</div>'
                ].join(""));
                if(typeof params.data[i].childName==='undefined'){
                }
                html.push('</div>');
            }
        }
        createParent();

        html.push('</div>');
        this.$el.html(html.join(''));
        //绑定事件
        this.events();
        params.done(params.data, this.$el);
        return this;
    }

    Tree.prototype.events = function () {

    }
}));