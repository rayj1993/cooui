!function(t,e){"function"==typeof define&&(define.amd||define.cmd)?define(e):t.Range=e()}(this,function(t){if("function"==typeof t)t("tips");else if(!$().tips)return window.console&&window.console.error("need tips.js"),{};var v="coo-range",h=v+"-";$.fn.range=function(t){return $(this).each(function(){$(this).data("range")||$(this).data("range",new e($(this),t))})};var e=function(a,t){var n=this,i=$.extend({},{reverse:!1,tips:function(t){return t}},t||{}),s=a.attr("min")||0,r=a.attr("max")||100,o=a.attr("step")||1,l=$("<div></div>").attr("class",a.attr("class")).addClass(v),e=$("<div></div>").addClass(h+"track"),u=$("<a></a>").addClass(h+"thumb").attr({href:"javascript:","aria-valuenow":a.val(),"aria-valuemax":r,"aria-valuemin":s,role:"slider",draggable:"false"});a.before(l),0==l.width()&&l.width(a.width()),e.append(u),l.append(e),l.click(function(t){var e=t&&t.target;if(e&&e!=u.get(0)){var i=t.clientX-(u.offset().left-$(window).scrollLeft())-u.width()/2;n.value(1*a.val()+(r-s)*i/$(this).width())}}),u.on("keydown",function(t){var e=1*a.val();37!=t.keyCode&&39!=t.keyCode||(t.preventDefault(),37==t.keyCode?e=Math.max(s,e-o):39==t.keyCode&&(e=Math.min(r,e+1*o)),n.value(e))});var d={};return u.mousedown(function(t){d.x=t.clientX,d.value=1*a.val(),$.isFunction(i.tips)&&(n.tips?n.tips.show(i.tips.call(a,d.value)):(u.tips({eventType:"null",content:i.tips(d.value)}),n.tips=u.data("tips"))),$(this).addClass("active")}),i.reverse&&u.addClass("reverse"),$(document).mousemove(function(t){if("number"==typeof d.x){var e=t.clientX-d.x;n.value(d.value+(r-s)*e/l.width()),n.tips&&n.tips.show(i.tips.call(a,a.val())),t.preventDefault()}}),$(document).mouseup(function(){d.x=null,d.value=null,u.removeClass("active"),n.tips&&n.tips.hide()}),this.num={min:+s,max:+r,step:+o},this.el={input:a,container:l,track:e,thumb:u},this.obj={},this.value(),this};return e.prototype.value=function(t){var e=this.el.input,i=e.val(),a=this.num.max,n=this.num.min,s=this.num.step;return t||0===t||(i=t,t=$.trim(e.val())),t=a<t||a-t<s/2?a:""==t||t<n||t-n<s/2?n:n+Math.round((t-n)/s)*s,e.val(t),this.position(),t!=i&&e.trigger("change"),this},e.prototype.position=function(){var t=this.el.input.val(),e=this.num.max,i=this.num.min;return this.el.track.css("borderLeftWidth",this.el.container.width()*(t-i)/(e-i)),this.el.thumb.attr("aria-valuenow",t),this},e});