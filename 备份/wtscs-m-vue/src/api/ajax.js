import { log } from 'util';
import common from './common';
import popup from './popup';
import Vue from 'vue';
import {tools} from '@static/js/wtsTools.esm.min.js' //工具
// 配置API接口地址
// var root = ''
var root = common.api_root
// console.log(root)
// 引用axios
var axios = require('axios')
// 自定义判断元素类型JS
function toType(obj) {
    return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}
// 参数过滤函数
function filterNull(o) {
    for (var key in o) {
        if (o[key] === null) {
            delete o[key]
        }
        if (toType(o[key]) === 'string') {
            o[key] = o[key].trim()
        } else if (toType(o[key]) === 'object') {
            o[key] = filterNull(o[key])
        } else if (toType(o[key]) === 'array') {
            o[key] = filterNull(o[key])
        }
    }
    return o
}
/*
  接口处理函数
*/
var whiteList='/app/themes/allThemes/api/1_8,'
function apiAxios(method, url, params,success, failure) {
    if (params.data) {
        params.data = filterNull(params.data)
    }
    // console.log(Vue.$config);
    var token=common.token;
    let headers=params.headers || {};
    // if(token) headers['WTS_TOKEN_A']=token;
    axios({
        method: method,
        url: url,
        data: method === 'POST' || method === 'PUT' ? params.data : null,
        params: method === 'GET' || method === 'DELETE' ? params.data : null,
        baseURL: root,
        /**todo start */
        // baseURL: whiteList.indexOf(url)>-1?'':root,
        headers:headers,
        /**end */
        withCredentials: true
    })
        .then(function (res) {
            if (success) {
                var isError=true;
                if(!params.noErr)isError = successError(res.data);
                success(res.data,isError)
            }

        })
        .catch(function (err) {
            let res = err.response
            if (res) {
                window.alert('api error, HTTP CODE: ' + res.status)
            }else{
                popup.msg("网络异常，请稍后重试");
            }
            failure && failure();
        })
}
//公共错误处理
function successError(data) {
    if(data.httpCode == 403){
        if(tools.isWtsNativeApp()){
            popup.msg("您的账号已在其他设备登录，请您重新登录");
            nativeApp.general.deviceready(function(){
                nativeApp.user.loginOut(function(){
                    nativeApp.general.closeWebView();
                    var url = encodeURIComponent(window.location.href);
                    nativeApp.general.router({url:"wts://web?force=1&url="+url});
                },function(){
                    popup.msg("退出登录失败!");
                })

            })
            return false;
        }
    }
    if (data.httpCode != 200 && data.data) {
        setLayer(data.data.errorMsg)
        return false;
    }else if(data.httpCode != 200){
        layer.open({
            content: data.msg
            ,skin:'lzAlert'
            ,btn: '我知道了'
        });
        setLayer(data.msg)
        return false;
    }
    return true
}

function setLayer(msg){
    popup.alert(msg)
}
// 返回在vue模板中的调用接口
export default {
    get: function (url, params, success, failure) {
        return apiAxios('GET', url, params, success, failure)
    },
    post: function (url, params, success, failure) {
        return apiAxios('POST', url,params, success, failure)
    },
    put: function (url, params, success, failure) {
        return apiAxios('PUT', url, params, success, failure)
    },
    delete: function (url, params, success, failure) {
        return apiAxios('DELETE', url, params, success, failure)
    }
}
