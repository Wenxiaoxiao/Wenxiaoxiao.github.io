(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d2178fa"],{c6f7:function(t,e,n){"use strict";n.r(e);var o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"container"})},c=[],i=(n("ecb4"),n("e35a"),n("5e9f"),{data:function(){return{name:""}},methods:{login:function(){var t=this,e=this.$route.query.code,n=this.$route.query.state;this.$http({url:"/login/login",type:"GET",data:{code:e,state:n}}).then((function(e){t.$notice.msg("登录成功！");var n=sessionStorage.oldUrlName;n&&-1===n.indexOf("login")?location.replace(n):location.replace("/")}),(function(t){console.log(t)}))}},created:function(){this,this.login()}}),a=i,s=n("9ca4"),r=Object(s["a"])(a,o,c,!1,null,"ecc92070",null);e["default"]=r.exports}}]);
//# sourceMappingURL=chunk-2d2178fa.822232f9.js.map