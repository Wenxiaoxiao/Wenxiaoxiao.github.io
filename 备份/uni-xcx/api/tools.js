import http from './http';
import common from './common';

// 工具
var tools = {
    //判断是数组
    isArray(o) {
        return Object.prototype.toString.call(o) == '[object Array]';
    },

    //判断null
    isNull: function(exp) {
        if (!exp && typeof exp != 'undefined' && exp != 0) {
            return true;
        } else if (exp == 'null') {
            return true;
        }
        return false;
    },

    /*
     * 深复制
     * params
     * -destination  被赋值的新对象
     * -source  取值的对象
     * -miss  忽略的对象
     * */
    deepCopy: function(data) {
        return JSON.parse(JSON.stringify(data));
    },

    trim(str) {
        return str.replace(/(^\s*)|(\s*$)/g, "");
    },
    
    getAppUserinfo() {
        return new Promise(function(resolve, reject) {
			uni.getSystemInfo({
			    success: function (res) {
					resolve(res);
			    }
			});
        });
    },
	getRecentVersion(){
		const updateManager = uni.getUpdateManager();
		
		updateManager.onCheckForUpdate(function (res) {
		  // 请求完新版本信息的回调
		  console.log("请求完新版本信息的回调",res.hasUpdate);
		});
		
		updateManager.onUpdateReady(function (res) {
		  uni.showModal({
		    title: '更新提示',
		    content: '新版本已经准备好，是否重启应用？',
		    success(res) {
		      if (res.confirm) {
		        // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
		        updateManager.applyUpdate();
		      }
		    }
		  });
		
		});
		
		updateManager.onUpdateFailed(function (res) {
			console.log("新的版本下载失败");
		  // 新的版本下载失败
		});
	}
    
};

export default tools