(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-69ea1928"],{"13f8":function(e,t,o){},7555:function(e,t,o){"use strict";o.r(t);var n=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"userTellLogin lz-bg-fff"},[e._m(0),o("div",{staticClass:"input-container"},[o("div",{staticClass:"userNum from-input"},[o("input",{directives:[{name:"model",rawName:"v-model",value:e.mobile,expression:"mobile"}],staticClass:"intoTell inputVals",attrs:{type:"number",onkeypress:"return event.keyCode>=48&&event.keyCode<=57",placeholder:"请输入手机号"},domProps:{value:e.mobile},on:{input:function(t){t.target.composing||(e.mobile=t.target.value)}}})]),o("div",{staticClass:"authCode from-input"},[o("input",{directives:[{name:"model",rawName:"v-model",value:e.code,expression:"code"}],staticClass:"intocaptch inputVals",attrs:{type:"number",onkeypress:"return event.keyCode>=48&&event.keyCode<=57",placeholder:"请输入验证码"},domProps:{value:e.code},on:{input:function(t){t.target.composing||(e.code=t.target.value)}}}),o("button",{staticClass:"fr getNum right",class:e.isClick?"active":"",attrs:{id:"cendcaptch"},on:{click:e.getCode}},[e._v(e._s(e.codeVal))])]),e._m(1),o("a",{staticClass:"loginBtn",attrs:{href:"javascript:;",id:"login"},on:{click:e.submit}},[e._v("登录")])])])},i=[function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"lz-logo-box"},[o("div",{staticClass:"img-c-fff"}),o("p",[e._v("桐心企业保")])])},function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"code-info"},[e._v(" 收不到验证码？请拨打客服电话 "),o("a",{attrs:{href:"tel://400-9955-788"}},[e._v("400-9955-788")])])}],l=(o("6db4"),o("1fb3"),null),s={data:function(){return{mobile:"",code:"",isClick:!1,loaded:!1,s:null,countDown:0,initcountDown:60,codeVal:"获取验证码",redUrl:""}},mounted:function(){this.$weixin.hideWxBtns(),l=this,this.loaded=!0,l.redUrl=sessionStorage.getItem("oldUrlName"),console.log("获取oldUrl:"),console.log(l.redUrl)},methods:{initCode:function(){l.countDown=l.initcountDown,l.isClick=!1,l.codeVal="获取验证码",clearInterval(l.s)},getCode:function(){if(!l.isClick){var e=l.mobile;return 0==l.$tools.trim(e).length?l.$notice.msg("请输入手机号"):l.$regulars.isPhone(e)?void l.$http({type:"get",url:"/login/checkMobile",data:{mobile:l.mobile}}).then((function(e){1===e.httpCode?(l.countDown=l.initcountDown,l.codeVal=l.countDown+"S",l.isClick=!0,l.s=setInterval((function(){1==l.countDown?l.initCode():(l.countDown--,l.codeVal=l.countDown+"S")}),1e3),l.$http({type:"get",url:"/login/code",data:{mobile:l.mobile}}).then((function(e){1===e.httpCode&&l.$notice.msg("已发送")}))):l.$notice.msg(e.msg)})):l.$notice.msg("请输入正确的手机号")}},submit:function(){var e=l.$tools.trim(l.mobile),t=l.code;if(0==e.length)return l.$notice.msg("请输入手机号");if(!l.$regulars.isPhone(e))return l.$notice.msg("请输入正确的手机号");if((l.$tools.isWeiXin()||l.$tools.isAL())&&"/uc/login/phoneRegister",0==l.code.length)return l.$notice.msg("请输入验证码");var o=l.$notice.loading("正在绑定手机号...");l.$http({url:"/login/register",type:"post",data:{mobile:e,code:t}}).then((function(e){console.log("******"),l.$notice.close(o),l.initCode(),l.$notice.msg("验证成功"),console.log("上个页面路由name:"),console.log(l.redUrl),location.href=l.redUrl}))["catch"]((function(e){10003===e.httpCode&&(location.href=l.redUrl),l.$notice.close(o)}))}}},c=s,a=(o("9d13"),o("9ca4")),r=Object(a["a"])(c,n,i,!1,null,null,null);t["default"]=r.exports},"9d13":function(e,t,o){"use strict";var n=o("13f8"),i=o.n(n);i.a}}]);
//# sourceMappingURL=chunk-69ea1928.4195757b.js.map