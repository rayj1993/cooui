!function(e,t){"function"==typeof define&&(define.amd||define.cmd)?define(t):e.Pagination=t()}(this,function(){$.fn.pagination=function(e){return $(this).each(function(){$(this).data("pagination")||$(this).data("pagination",new t($(this),e))})};var t=function(s,e){s=s||$(),e=e||{};var i=this,t={length:0,current:1,every:15,mode:"long",visible:6,onClick:$.noop},r=$.extend({},t,e),a={};(this.el=a).container=s;var n={};(this.num=n).length=r.length,n.current=r.current,n.every=r.every,this.mode=r.mode,this.href=r.href,this.visible=r.visible,s.on("click","a",function(e){var t=$(this).attr("data-page");i.num.current=1*t;var a=this.className;i.show();var n=(/prev/.test(a)?s.find("coo-page-prev"):(/next/.test(a),s.find(".coo-page-current")))[0];n&&(n.focus(),!1===window.isKeyEvent&&n.blur()),r.onClick.call(n,i,t),/^javascript/.test(this.href)&&e.preventDefault()}),this.show()},w='<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><path d="M85.876,100.5l49.537-50.526c4.089-4.215,4.089-11.049,0-15.262 c-4.089-4.218-10.719-4.218-14.808,0L63.586,92.868c-4.089,4.215-4.089,11.049,0,15.264l57.018,58.156 c4.089,4.215,10.719,4.215,14.808,0c4.089-4.215,4.089-11.049,0-15.262L85.876,100.5z"/></svg>';return t.prototype.create=function(e,t){var a=(e=e||{}).length||0,n=e.current||1,s=e.every||1;t=t||"long";function i(e){return"string"==typeof r?r:"function"==typeof r?r(e):void 0}var r=this.href||"javascript:",o="coo-page",h=o+"-",l=Math.ceil(a/s)||1,c=['<div class="'+h+'box">'],p=[o,h+"prev"].join(" "),u=[o,h+"next"].join(" "),f=[o,h+"ellipsis"].join(" "),v=[o,h+"text"].join(" "),g=[o,h+"current"].join(" ");1<n?c.push('<a href="'+i(n-1)+'" class="'+p+'" data-page="'+(n-1)+'" aria-label="上一页，当前第'+n+'页">'+w+"</a>"):c.push('<span class="'+p+'">'+w+"</span>");var d=Math.max(this.visible,6);if("long"==t){function m(e){e==n?c.push('<span class="'+g+'" aria-label="第'+e+"页，共"+l+'页" aria-selected="true" role="option">'+e+"</span>"):c.push('<a href="'+i(e)+'" class="'+o+'" data-page="'+e+'" aria-label="第'+e+"页，共"+l+'页">'+e+"</a>")}if(l<=d)for(var y=1;y<=l;y++)m(y);else if(n<.5*l&&n<d-1){if(n<d-1)for(y=1;y<d;y++)m(y);c.push('<span class="'+f+'">...</span>'),m(l)}else if(.5*l<n&&l-d+2<n)for(m(1),c.push('<span class="'+f+'">...</span>'),y=l-d+2;y<=l;y++)m(y);else m(1),c.push('<span class="'+f+'">...</span>'),m(n-1),m(n),m(n+1),c.push('<span class="'+f+'">...</span>'),m(l)}else(t="short")&&c.push('<span class="'+v+'" aria-label="第'+n+"页，共"+l+'页" role="option">'+[n,l].join("/")+"</span>");return n<l?c.push('<a href="'+i(n+1)+'" class="'+u+'" data-page="'+(n+1)+'" aria-label="下一页，当前第'+n+'页">'+w+"</a>"):c.push('<span class="'+u+'">'+w+"</span>"),c.push("</div>"),c.join("")},t.prototype.show=function(){var e=this.num;e.length=Math.max(e.length,0),e.every=Math.max(e.every,1);var t=Math.ceil(e.length/e.eveny);return e.current>t&&(e.current=t),e.current=Math.max(e.current,1),this.el&&this.el.container&&this.el.container.length&&this.el.container.html(this.create(e,this.mode)),this},t});