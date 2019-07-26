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
            d = params.data,
            childName = params.childName;

        function createChild(data) {
            function createNode(d, children) {
                var arr = [
                    '<div class="coo-tree-item">'
                ]
                //左
                arr.push([
                    '   <span class="coo-left-box">',
                    children ? '' : '<i class="icon icon-tree-bottom' + (params.open ? '' : ' icon-tree-right') + '"></i>',
                    '   </span>'
                ].join(''))
                //右
                arr.push([
                    '   <span class="coo-right-box">',
                    '   </span>'
                ].join(''));
                //中
                arr.push([
                    '   <span class="coo-middle-box">' + d.nodeName + '</span>',
                    '</div>'
                ].join(''));
                html.push(arr.join(''));
            }
            createNode(data)
            //最后一级，也就子集地址
            var node = data[childName];
            if (node[0][childName] === undefined) {
                html.push('<div class="coo-tree-node">');
                for (var i = 0, len = node.length; i < len; i++) {
                    html.push(createNode(node[i], true));
                }
                html.push('</div>');
            }
        }

        function createParent(data) {
            //创建节点
            createChild(data);
            //询问是否存在子集，如果存在，还是父级，继续循环
            var node = data[childName];
            if (node[0][childName] !== undefined) {
                for (var i = 0; i < node.length; i++) {
                    html.push('<div class="coo-tree-node">');
                    //如果还存在父节点，就一直循环下去
                    createParent(node[i]);
                    html.push('</div>');
                }
            }
        }

        //这里是父级循环
        for (var i = 0, len = d.length; i < len; i++) {
            //这里第一级父节点
            html.push('<div class="coo-tree-node">');
            createParent(d[i]);
            html.push('</div>');
        }
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