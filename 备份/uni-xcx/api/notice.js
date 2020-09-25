

/**
 * 提示与加载工具类
 */
export default {
  /**
         * 弹出提示框
         */

  msg(title, duration = 2000) {
	uni.showToast({
		icon:'none',
	    title: title,
	    duration: duration
	});
  },
  alert(message,title="我知道了") {
	uni.showModal({
	    title: '信息',
	    content: message,
		showCancel:false,
		confirmText:title,
	    success: function (res) {
	    }
	});
  },
  confirm(message, btn=['确认','取消']) {
    return new Promise((resolve, reject) => {
	  uni.showModal({
	      title: '信息',
	      content: message,
		  cancelText:btn[1],
		  confirmTitle:btn[0],
	      success: function (res) {
	          if (res.confirm) {
	              resolve(res)
	          } else if (res.cancel) {
	              reject(res)
	          }
	      }
	  });
    })
  }
}

