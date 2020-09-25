
import httpList from './httpList';
import notice from './notice';
import common from './common';

function wxRequest(params){
    return new Promise((resolve, reject) => {
		request(params, function(res, isErr) {
		    if (isErr) {
		        console.log("isErr", res);
		        reject(res);
		    } else {
		        resolve(res)
		    }
		}, function(err) {
		    if (reject) reject(err)
		})

    });
};

function request(params, success, error) {
	let header=params.header||{};
    if(params.method=="POST" && params.contentType=="from"){
    	header['content-type']="application/x-www-form-urlencoded";
    }else if(params.method=="POST"){
    	header['content-type']="application/json";
    }
    let session = uni.getStorageSync('session');
    header['session']=session;
    uni.request({
        url: common.base+(params.url || httpList[params.name].url),
        method: params.method || (httpList[params.name] && httpList[params.name].type) || "POST",
        data: params.data || {},
        header: header,
    }).then(res => {
		let data=res[1].data;
        var isErr = successError(data, params.hideAlert);
        success(data, isErr)
    }, err => {
        if (error) error(err)
    });
}
//公共错误处理
function successError(data, hideAlert) {
    //服务器出错
    if (data.httpCode != 1 && data.data && data.data.errorMsg) {
        !hideAlert && notice.alert(data.data.errorMsg)
        return true;
    } else if (data.httpCode != 1) {
        // !hideAlert && notice.alert(data.msg)
        return true;
    }
    return false;
}

module.exports = {
	wxRequest
}