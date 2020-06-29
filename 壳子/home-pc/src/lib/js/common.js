$(function () {


    //$(".clickQidian").css({cursor:"pointer"});

    var browser = {
        versions: function () {
            var u = navigator.userAgent;
            return {
                trident: u.indexOf('Trident') > -1, //IE内核
                presto: u.indexOf('Presto') > -1, //opera内核
                webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                gecko: u.indexOf('Firefox') > -1, //火狐内核Gecko
                mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
                ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios
                android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android
                iPhone: u.indexOf('iPhone') > -1, //iPhone
                iPad: u.indexOf('iPad') > -1, //iPad
                webApp: u.indexOf('Safari') > -1 //Safari
            };
        }()
    }

    $.extend({
        tools: tools, //工具类
        regular: regular, //正则类
        getQueryString: getQueryString, //地址栏截取
        ajaxPackage: ajaxPackage, //ajax托管
        domain: document.domain,
        environment: 0, //0-测试，1-正式，2-灰度
        getLocalUrl: function () {
            var url = location.href;
            var num = url.indexOf("?");
            if (num != -1) {
                url = url.substring(0, num);
            }
            return url;
        }, //获取基础地址弹出层
        navShow: navShow,//顶部栏导航
    });
    //工具类
    function tools() {
        return {
            android: browser.versions.android, //安卓
            trident: browser.versions.trident, //IE内核
            presto: browser.versions.presto, //opera内核
            webKit: browser.versions.webKit, //苹果、谷歌内核
            gecko: browser.versions.gecko, //火狐内核Gecko
            mobile: browser.versions.mobile, //是否为移动终端
            ios: browser.versions.ios, //ios
            iPhone: browser.versions.iPhone, //iPhone
            iPad: browser.versions.iPad, //iPad
            webApp: browser.versions.webApp, //Safari
            //微信
            isWeiXin: function () {
                var ua = window.navigator.userAgent.toLowerCase();
                console.log(ua)
                if (ua.match(/MicroMessenger/i) == 'micromessenger') {
                    return true;
                } else {
                    return false;
                }
            },
            // 获取html名称
            pageName: function () {
                var a = location.href;
                var b = a.split("/");
                var c = b.slice(b.length - 1, b.length).toString(String).split(".");
                return c.slice(0, 1);
            }
        }
    }

    //正则类
    function regular() {
        return {
            //电话号码
            isPhone: function (phone) {
                var pattern = /^1[3,4,5,7,8]\d{9}$/;
                return pattern.test(phone);
            },
            //邮件
            isEmail: function (email) {
                var pattern = /^((([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})[; ,])*(([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})))$/;
                return pattern.test(email);
            },
            //姓名
            isName: function (val) {
                var pattern = /^[\u4E00-\u9FA5]{2,10}$/;
                return pattern.test(val);
            },
            //邮编
            isZip: function (val) {
                var pattern = /^[0-9]\d{5}$/;
                return pattern.test(val);
            },
            //身份证
            issfz: function (val) {
                var pattern = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
                return pattern.test(val);
            },

        }
    }
    //截取地址栏字符串
    function getQueryString(name, type) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var search = window.location.search;
        if (type) {
            search = decodeURI(search);
        }
        var r = search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }
    //对ajax 进行统一的托管处理: 比如统一的错误码处理et...
    function ajaxPackage(paramList, num) {
        var baseUrl = "";
        if ($.environment === 1) {
            baseUrl = ''; // 默认的基础url
        } else if ($.environment === 0) {
            baseUrl = 'https://bx.wts9999.net';
        } else if ($.environment === 2) {
            baseUrl = '/pro';
        }

        // var baseUrl = 'https://bx.wts9999.net'; // 默认的基础url
        var sendNum = num | 0;
        var _httpDefaultOpts = {
            type: 'POST', // GET/DELETE/HEAD/JSONP/POST/PUT
            url: '',
            dataType: 'json',
            params: {}, // 拼接在url的参数
            contentType: 'application/x-www-form-urlencoded',
            data: {},
            isBase: true,
            beforeSend: function () { }, // ajax 执行开始 执行函数
            success: function (data, isError) { }, // ajax 执行成功 执行函数
            error: function (data) { }, // ajax 执行失败 执行函数
            complete: function (data) { } // ajax 执行结束 执行函数
        };
        if ($.isPlainObject(paramList)) {
            paramList = $.extend({}, _httpDefaultOpts, paramList);
            //把所有参数按照英文首字母升序排列得到一个字符串
            if (paramList.isBase) {
                paramList.url = baseUrl + paramList.url;
            }
            ajax();

            function ajax() {
                $.ajax({
                    type: paramList.type,
                    url: paramList.url,
                    dataType: paramList.dataType,
                    data: paramList.data,
                    contentType: paramList.contentType,
                    async: paramList.async,
                    beforeSend: function (request) {
                        paramList.beforeSend();

                        if (sendNum > 0) return false;
                    },
                    success: function (data, textStatus, jqXHR) {
                        sendNum++;
                        //paramList.success(data);
                        var isError = successError(data);
                        paramList.success(data, isError);
                    },
                    error: function (data) {
                        paramList.error(data);
                    },
                    complete: function (data) {
                        paramList.complete(data);
                    }
                });
            }
            //公共错误处理
            function successError(data) {
                //服务器出错
                if (data.httpCode && data.httpCode != 200 && data.data && data.data.errorMsg) {
                    layer.alert(data.data.errorMsg, {
                        title: '提示',
                        skin: "layer-alert",
                        closeBtn: 0,
                    })
                    return false;
                } else if (data.httpCode && data.httpCode != 200) {
                    layer.alert(data.msg, {
                        title: '提示',
                        skin: "layer-alert",
                        closeBtn: 0,
                    })
                    return false;
                }
                return true
            }
        }
    }



    function qidian() {
        //打开 起点链接
        $(".clickQidian").on("click", function () {
            window.open('http://q.url.cn/s/IaCY6Rm?_type=wpa&qidian=true');
        });
    }
    function navShow(i) {
        var nav = $('#top_nav');
        if (nav.length == 0) return;
        var n = 4 - i;
        $('#top_nav').children('li').eq(n).addClass('active').siblings().removeClass('active');
    }
    function getHtmlDocName() {
        var str = window.location.href;
        str = str.substring(str.lastIndexOf("/") + 1);
        str = str.substring(0, str.lastIndexOf("."));
        return str;
    }
    //初始化
    function init() {
           var htmlName =  getHtmlDocName()
           if(!htmlName||htmlName==='index'){
             $('.navList li').eq(0).addClass('active')
             return
           } 
           if(htmlName==='productPlan'){
            $('.navList li').eq(1).addClass('active')
            return
          } 
          if(htmlName.indexOf('insureGl')!=-1){
            $('.navList li').eq(2).addClass('active')
            return
          } 
          if(htmlName.indexOf('mediaCover')!=-1){
            $('.navList li').eq(3).addClass('active')
            return
          } 
          if(htmlName==='about'){
            $('.navList li').eq(4).addClass('active')
            return
          } 
        qidian();
    }
    init();



});