
(function (root) {
    var ksscript = document.createElement('script');
    ksscript.type = 'text/javascript';
    ksscript.async = true;
    ksscript.src = 'https://static.yximgs.com/udata/pkg/ks-ad-trace-sdk/ks-trace.1.0.0.beta.js';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(ksscript, s);
})(window);


/**
 * 数据提交后操作 
 * @return {[type]} 如果没有 删除afterSubmit内部代码即可，不能删除afterSubmit本身
 */
function afterSubmit(){
    _ks_trace.push({event: 'form', convertId: 1145, cb: function(){
        console.log('Your callback function here!')
    }})
}
