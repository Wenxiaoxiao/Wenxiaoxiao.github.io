/**
 * 
 * @param  {[url]} 地址
 * @return {[type]}  请求方式
 */

let httpList = {
 /**
 *  获取所有疾病
 */
    'illList.getAll': {
        url: '/api/allHealths',
        type: 'get'
    },
/**
 *  登录
 */
    'login.getInfo': {
        url: '/api/login',
        type: 'get'
    },
/**
 *  userAuth
 */
    'user.userAuth': {
        url: '/api/auth',
        type: 'post'
    },
/**
 *  getRecommendProduct
 */
    'product.getRecommendProduct': {
        url: '/api/recommends',
        type: 'post'
    },
    /**
     * 小程序发送模板消息
     */
    'login.wxminiSendMessage': {
        url: '/uc/template/api/wxmini',
        type: 'post'
    },
    /**
     * 支付宝发送模板消息
     */
    'template.alimini': {
        url: '/uc/template/api/alimini',
        type: 'post'
    },
    
    /**
     * 通过微信用户信息获取token
     */
    'login.minplatAuth': {
        url: '/uc/login/thirdOauthBaseInfo',
        type: 'post'
    },
    /**
     *  通过微信用户信息 手机号绑定
     */
    'login.minplatRegister': {
        url: '/uc/login/api/minplatRegister',
        type: 'post'
    },
    /**
     *  通过支付宝用户信息 手机号绑定
     */
    'login.aliminiRegister': {
        url: '/uc/login/api/aliminiRegister',
        type: 'post'
    },
    /**
     * 获取定制活动倒计时间
     * @param key 写死
     */
    'caculate.getInfo': {
        // url: '/fsservers/activies/api/active?key=1560932021781',
        url: '/fsservers/activies/api/active',
        type: 'post'
    },
    /**
     * 获取定制活动列表
     * @param 无
     */
    'custom.plan': {
        url: '/fsservers/servers/api/list',
        // url: '/fsservers/servers/api/list?type=1',
        type: 'post'
    },

    /**
     * 订单详情
     * @param id 订单号
     */
    'custom.detail': {
        url: '/custom/personal/api/detail/:id',
        type: 'post'
    },
    /**
     * 我的定制列表
     * @param payStatus 1 写死
     * @param planType 0 写死
     */
    'custom.orders': {
        // url: '/fsservers/serversOrder/api/orders',
        url: '/fsservers/serversOrder/api/orders',
        type: 'post'
    },
}

//小程序获取签名

module.exports = httpList