loadJs('/lib/js/cacheHtml.js',function(){
    var urlName=location.pathname.replace('/m','').replace('/','');
    var wtsCache=getQueryString('wtsCache')
    var reCache=getQueryString('reCache')
    var cache=cacheHtml[urlName];
    var localCache=$('title').attr('name');
    if(cache && localCache && reCache && localCache!=cache && wtsCache!=cache){
        var url=delQueStr(location.href, "wtsCache");
        url=url.indexOf('?')>-1?url+'&wtsCache='+cache:url+'?wtsCache='+cache;
        location.replace(url);
    }
})

//动态加载js资源
function loadJs(url, callback) {
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    var timestamp = (new Date()).getTime();
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
    script.src = url+'?v='+timestamp;
    document.head.appendChild(script);
}

 //地址栏参数
function getQueryString(name,type) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var search=window.location.search;
    if(type){
        search=decodeURI(search);
    }
    var r = search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

//删除地址栏参数
function delQueStr(url, ref) {
    var str = "";
    if (url.indexOf('?') != -1) {
        str = url.substr(url.indexOf('?') + 1);
    }
    else {
        return url;
    }
    var arr = "";
    var returnurl = "";
    var setparam = "";
    if (str.indexOf('&') != -1) {
        arr = str.split('&');
        for (i in arr) {
            if (arr[i].split('=')[0] != ref) {
                returnurl = returnurl + arr[i].split('=')[0] + "=" + arr[i].split('=')[1] + "&";
            }
        }
        return url.substr(0, url.indexOf('?')) + "?" + returnurl.substr(0, returnurl.length - 1);
    }
    else {
        arr = str.split('=');
        if (arr[0] == ref) {
            return url.substr(0, url.indexOf('?'));
        }
        else {
            return url;
        }
    }
}

