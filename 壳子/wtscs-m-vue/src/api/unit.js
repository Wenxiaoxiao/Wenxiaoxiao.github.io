const browser = {
  versions: (function () {
    var u = navigator.userAgent;
    return {
      trident: u.indexOf ('Trident') > -1, //IE内核
      presto: u.indexOf ('Presto') > -1, //opera内核
      webKit: u.indexOf ('AppleWebKit') > -1, //苹果、谷歌内核
      gecko: u.indexOf ('Firefox') > -1, //火狐内核Gecko
      mobile: !!u.match (/AppleWebKit.*Mobile.*/), //是否为移动终端
      ios: !!u.match (/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios
      android: u.indexOf ('Android') > -1 || u.indexOf ('Linux') > -1, //android
      iPhone: u.indexOf ('iPhone') > -1, //iPhone
      iPad: u.indexOf ('iPad') > -1, //iPad
      webApp: u.indexOf ('Safari') > -1, //Safari
      user: u,
    };
  }) (),
};
// 工具
var tools = {
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
  user: browser.versions.user, //Safari
  //判断是否登录
  isLogin:function(_this){
    if(!_this){
      console.log("未传入this");
      return false;
    }
    if (_this.$config.user && _this.$config.user.id) {
      return true;
    } else {
      // 跳转到绑定手机号页面
      if(_this.$tools.isWtsNativeApp()){
        nativeApp.general.deviceready(function(){
          nativeApp.general.closeWebView();
          var url = encodeURIComponent(window.location.href);
          nativeApp.general.router({url:"wts://web?force=1&url="+url});
        })
        return false;
      }
      _this.$router.replace({
        path: "/BDmobileHtml",
        query: {
          redUrl: _this.$route.fullPath,
          type: 1,
        }
      });
      return false;
    }
  },
  //微信
  isWeiXin: function () {
    var ua = window.navigator.userAgent.toLowerCase ();
    if (ua.match (/MicroMessenger/i) == 'micromessenger') {
      return true;
    } else {
      return false;
    }
  },
   //梧桐树保险网app
   isWtsNativeApp: function () {
    var ua = window.navigator.userAgent.toLowerCase ();
    return ua.match(/wtsApp/i) == 'wtsapp' ? true : false;
  },
  //支付宝环境
  isAL: function () {
    var ua = navigator.userAgent.toLowerCase ();

    if (ua.match (/Alipay/i) == 'alipay') {
      return true;
    } else {
      return false;
    }
  },

  //百度app环境
  isBaidu: function () {
    var ua = navigator.userAgent.toLowerCase ();
    if (ua.match (/Baiduboxapp/i) == 'baiduboxapp') {
      return true;
    } else {
      return false;
    }
  },

  //今日头条环境
  isNewSarticle: function () {
    var ua = navigator.userAgent.toLowerCase ();
    if (ua.match (/Newsarticle/i) == 'newsarticle') {
      return true;
    } else {
      return false;
    }
  },

  //抖音环境
  isDouYin: function () {
    var ua = navigator.userAgent.toLowerCase ();
    if (ua.match (/Aweme/i) == 'aweme') {
      return true;
    } else {
      return false;
    }
  },

  //过滤空格
  trim: function (val) {
    return val.replace (/(^\s*)|(\s*$)/g, '');
  },
  //获取安卓版本号
  getAnbanben: function () {
    var user = this.user;
    var index = user.indexOf ('Android');
    if (index > 0) {
      return parseFloat (user.slice (index + 8));
    } else {
      return null;
    }
  },
  // 获取html名称
  pageName: function () {
    var a = location.href;
    var b = a.split ('/');
    var c = b.slice (b.length - 1, b.length).toString (String).split ('.');
    return c.slice (0, 1);
  },
  //判断是数组
  isArray (o) {
    return Object.prototype.toString.call (o) == '[object Array]';
  },
  //判断null
  isNull: function (exp) {
    if (!exp && typeof exp != 'undefined' && exp != 0) {
      return true;
    } else if (exp == 'null') {
      return true;
    }
    return false;
  },
  getQueryString(name,type){
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var search=window.location.search;
    if(type){
        search=decodeURI(search);
    }
    var r = search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
  },
  //删除地址栏参数
  delQueStr: function (url, ref) {
    var str = '';
    if (url.indexOf ('?') != -1) {
      str = url.substr (url.indexOf ('?') + 1);
    } else {
      return url;
    }
    var arr = '';
    var returnurl = '';
    var setparam = '';
    if (str.indexOf ('&') != -1) {
      arr = str.split ('&');
      for (var i in arr) {
        if (arr[i].split ('=')[0] != ref) {
          returnurl =
            returnurl +
            arr[i].split ('=')[0] +
            '=' +
            arr[i].split ('=')[1] +
            '&';
        }
      }
      return (
        url.substr (0, url.indexOf ('?')) +
        '?' +
        returnurl.substr (0, returnurl.length - 1)
      );
    } else {
      arr = str.split ('=');
      if (arr[0] == ref) {
        return url.substr (0, url.indexOf ('?'));
      } else {
        return url;
      }
    }
  },
  //获取cookie
  getcookie: function (name) {
    var strcookie = document.cookie;
    var arrcookie = strcookie.split ('; ');
    for (var i = 0; i < arrcookie.length; i++) {
      var arr = arrcookie[i].split ('=');
      if (arr[0] == name) return decodeURIComponent (arr[1]);
    }
    return '';
  },
  //设置本地储存
  setLocal: function (name, value, type) {
    var curTime = new Date ().getTime ();
    if (!type || type == 2) {
      //默认设置-之前存在则使用创建时间
      var data = localStorage.getItem (name);
      if (!data || data == 'null') {
        localStorage.setItem (
          name,
          JSON.stringify ({
            data: value,
            time: curTime,
          })
        );
      } else {
        var dataObj = JSON.parse (data);
        var setTime = dataObj.time;
        localStorage.setItem (
          name,
          JSON.stringify ({
            data: value,
            time: setTime,
          })
        );
      }
    } else if (type == 1) {
      //type:1重新创建
      localStorage.setItem (
        name,
        JSON.stringify ({
          data: value,
          time: curTime,
        })
      );
    }
  },
  //获取本地储存
  getLocal: function (name, exp) {
    var data = localStorage.getItem (name);
    var dataObj = JSON.parse (data);
    if (!exp) {
      var exp = 1000 * 60 * 60 * 24 * 3;
    }
    if (dataObj && new Date ().getTime () - dataObj.time > exp) {
      localStorage.removeItem (name);
      console.log ('信息已过期');
      return null;
    } else {
      var dataObjDatatoJson = !dataObj ? null : dataObj.data;
      return dataObjDatatoJson;
    }
  },

  /*
        * 深复制
        * params
        * -destination  被赋值的新对象
        * -source  取值的对象
        * -miss  忽略的对象
        * */
  deepCopy: function (destination, source, miss) {
    for (var p in source) {
      if (_.isArray (p, miss) > -1) {
        return;
      }
      if (getType (source[p]) == 'array' || getType (source[p]) == 'object') {
        destination[p] = getType (source[p]) == 'array' ? [] : {};
        arguments.callee (destination[p], source[p]);
      } else {
        destination[p] = source[p];
      }
    }
    function getType (o) {
      var _t;
      return ((_t = typeof o) == 'object'
        ? (o == null && 'null') ||
            Object.prototype.toString.call (o).slice (8, -1)
        : _t).toLowerCase ();
    }
  },
  isDD: function () {
    //判断是不是钉钉
    var ua = navigator.userAgent.toLowerCase ();
    return ua.indexOf ('dingtalk') >= 0;
  },
  cutString: function (content, length) {
    //截取字符串  根据字符是否为圆角字符来记数
    var _ret = this.getCutValue (content, length);
    var _cutFlag = _ret.cutflag;
    var _cutStringn = _ret.cutstring;
    if (_cutFlag) {
      return _cutStringn + '...';
    } else {
      return _cutStringn;
    }
  },

  /**
   * 时间格式化
   * dateFormat("yyyy-MM-dd hh:mm:ss",crtTime);
   * @param fmt 格式
   * @param date 时间对象
   */
  dateFormat: function (fmt,date) {
    var o = {
    "M+" : date.getMonth()+1,     //月份
    "d+" : date.getDate(),     //日
    "h+" : date.getHours(),     //小时
    "m+" : date.getMinutes(),     //分
    "s+" : date.getSeconds(),     //秒
    "q+" : Math.floor((date.getMonth()+3)/3), //季度
    "S" : date.getMilliseconds()    //毫秒
    };
    if(/(y+)/.test(fmt))
    fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));
    for(var k in o)
    if(new RegExp("("+ k +")").test(fmt))
    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
    return fmt;
  },
  getCutValue: function (pStr, pLen) {
    // 原字符串长度
    var self = this;
    var _strLen = pStr.length;
    var _tmpCode;
    var _cutString;
    // 默认情况下，返回的字符串是原字符串的一部分
    var _cutFlag = true;
    var _lenCount = 0;
    var _ret = false;

    if (_strLen <= pLen / 2) {
      _cutString = pStr;
      _ret = true;
    }
    if (!_ret) {
      for (var i = 0; i < _strLen; i++) {
        if (self.isFull (pStr.charAt (i))) {
          _lenCount += 2;
        } else {
          _lenCount += 1;
        }
        if (_lenCount > pLen) {
          _cutString = pStr.substring (0, i);
          _ret = true;
          break;
        } else if (_lenCount == pLen) {
          _cutString = pStr.substring (0, i + 1);
          _ret = true;
          break;
        }
      }
    }
    if (!_ret) {
      _cutString = pStr;
      _ret = true;
    }

    if (_cutString.length == _strLen) {
      _cutFlag = false;
    }
    return {cutstring: _cutString, cutflag: _cutFlag};
  },
  isFull: function (pChar) {
    //是否全角文字
    if (pChar.charCodeAt (0) > 128) {
      return true;
    } else {
      return false;
    }
  },
  // 是否手机号
  isPhone: function (phone) {
    var pattern = /^1[3,4,5,7,8,9]\d{9}$/;
    return pattern.test (phone);
  }
};

export default tools;
