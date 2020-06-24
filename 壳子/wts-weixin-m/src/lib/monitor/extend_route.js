/**
 * 全部推广链接 对应 监控文件地址
 * @type {Array}
 *
 * url-页面链接，不要给?后面的参数,不要跟http/https协议，不要给空格
 * js-链接对应的跟踪代码文件名
 */
 var extend_route={
    '/m/products/1-ks01.html':'baidu_B_fxzj_04.js',
    '/m/products/1-jrtt02.html':'zg_jrttln_02.js',
    '/m/products/1-dy04.html':'zg_dyml_01.js',
};
var is_gdt=false;
doUrl()
function doUrl() {
    //匹配地址和关联跟踪代码
    var url = location.pathname; 
    if(extend_route[url]){
        loadJs("/m/lib/monitor/"+extend_route[url],function(){
            console.log('success to listen in');
        });
    }else{
        loadJs("/m/lib/monitor/default_submit.js",function(){
            console.log('success to listen in default')
        });
    }
    console.log(url);
}



function loadJs(url, callback) {
    //动态加载js资源
    var script = document.createElement('script');
    script.type = "text/javascript";
    if (typeof (callback) != "undefined") {
        if (script.readyState) {
            script.onreadystatechange = function () {
                if (script.readyState == "loaded" || script.readyState == "complete") {
                    script.onreadystatechange = null;
                    callback();
                }
            }
        } else {
            script.onload = function () {
                callback()
            }
        }
    }
    script.src = url;
    document.head.appendChild(script);
}
