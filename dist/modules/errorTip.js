!function(e,i){"function"==typeof define&&(define.amd||define.cmd)?define(i):e.ErrorTip=i()}(this,function(e){if("function"==typeof e)e("follow");else if(!$().follow)return window.console&&window.console.error("need Follow.js"),{};var c="coo-tips",h=c+"-";$.fn.errorTip=function(e,i){return $(this).each(function(){new t($(this),e,i)})};var t=function(e,i,t){var r={unique:!0,align:"center",onShow:$.noop,onHide:$.noop},n=$.extend({},r,t||{});if($.isFunction(i)&&(i=i()),"string"!=typeof i)return this;var o,a,s,d=this,l=e;return 1==n.unique&&window.errorTip?o=window.errorTip.data("trigger",l):0==n.unique&&l.data("errorTip")?o=l.data("errorTip"):(o=$('<div class="'+h+"x "+h+'error"></div>'),a=$("<span></span>").addClass(h+"before"),s=$("<i></i>").addClass(h+"after"),$(document.body).append(o.append(a).append(s)),1==n.unique?window.errorTip=o.data("trigger",l):l.data("errorTip",o),$(document).bind({keydown:function(e){16!=e.keyCode&&17!=e.keyCode&&d.hide()},mousedown:function(e){var i=document.activeElement,t=o.data("trigger"),r=e.target;i&&t&&i==r&&i==t.get(0)&&0==t.data("focus")||d.hide()}}),$(window).bind({resize:function(){d.hide()}})),this.el={trigger:e,tips:o,before:a||o.find("span"),after:s||o.find("i")},this.callback={show:n.onShow,hide:n.onHide},this.cl=c,this.align=n.align,this.show(i),this};return t.prototype.show=function(e){var i=this.el,t=i.tips,r=i.trigger,n=i.before,o=i.after;n.html(e);var a=this.align,s=0;return"left"==a?s=-.5*n.width()+parseInt(n.css("padding-left"))||0:"right"==a?s=.5*n.width()-parseInt(n.css("padding-right"))||0:"number"==typeof a&&(s=a),o.css({left:s}),t.follow(r,{align:a,position:"5-7",edgeAdjust:!1}),t.show(),r.attr("aria-label","错误提示："+e),this.callback&&this.callback.show&&this.callback.show.call(r.addClass("error valided"),t),this},t.prototype.hide=function(){var e=this.el.tips,i=this.el.trigger;return i.removeAttr("aria-label"),"none"!=e.css("display")&&(e.hide(),this.callback&&this.callback.hide&&this.callback.hide.call((e.data("trigger")||i).removeClass("error"),e)),this},t});