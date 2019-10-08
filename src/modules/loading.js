/**
 * @func loading
 * @author wenjielei
 * @version 1.0.0 
 * @desc 加载中
 */

 (function (global, factory){
    if(typeof define === 'function' && (define.amd || define.cmd)){
        define(factory);
    }else{
        global.Loading = factory();
    }
 }(this,function(){
    var joiner = '-';
    var CL = 'ui-loading';
    
 }))