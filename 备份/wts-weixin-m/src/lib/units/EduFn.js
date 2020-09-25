function EduFn(token){
    this.token = token;
}
EduFn.prototype = {
    constructor:EduFn,
    init:function(options, callBack){
        this.callBack = callBack;
        this.initData = {

        };
        var token = this.token;
        console.log("token",token);
    },
    //教育金账户余额
    AccountInfo:function(){
        var startAxList = {
            type:"post",
            url:"/policy/education/api/accountInfo",
            contentType: "application/json;charset=UTF-8",
            data:JSON.stringify({}),
            success: function (result, isError) {
                console.log("result",result);
                if(result.httpCode === 401){//表示未登录
                    if($.tools().isWtsNativeApp()){
                        nativeApp.general.deviceready(function(){
                        nativeApp.general.closeWebView();
                        var url = encodeURIComponent(window.location.href);
                        nativeApp.general.router({url:"wts://web?force=1&url="+url});
                        })
                        return false;
                    }
                    else{
                        window.location.href = window.location.origin + "/m/index.html#/BDmobileHtml?type=2&redUrl=" + window.location.href;
                        return false;
                    }
                }
            }
        }
        $.ajaxPackage(startAxList);
    }
}