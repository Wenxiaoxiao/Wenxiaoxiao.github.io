import ajax from './ajax.js'
import qs from 'qs'  //ajax请求
import 'url-search-params-polyfill' // 解决URLSearchParams ios10.3以下版本的兼容性
//获取URL查询字符串值
function getURLSearchParams(params){
    if(!isArray(params)) return;
    let param=new URLSearchParams();
    for(let i=0,len=params.length;i<len;i++){
        param.append(params[i].name,params[i].val)
    }
    return param
}
//判断是数组
function isArray(o){
    return Object.prototype.toString.call(o)=='[object Array]';
}

/* =============================================
 * 				 ajax请求列表
 *
 *		将需要用到的API进行整合， 通过axios来执行XMLhttprequest数据获取，
 *		最后通过 getAjax 方法导出统一的接口
 * =============================================  */


let apiList = {
    // login
    login_wxoauthappid: {//获取微信公众号加密
		url: '/uc/login/wxoauthappid',
        params: {key: 'oauth.wx.mp.appid'},
        type: "get"
    },
    login_wxmplogin: {//服务器登录接口
        url: '/uc/login/wxmplogin',
        type: "get"
    },
    login_autoLogin: {//获取用户信息
		url: '/uc/ucUser/autoLogin',
        type: "post",
    },
    // wx
    wx_getJssdk: {//微信签名
		url: '/tools/wechat/api/getJssdk',
        type: "post"
    },


     //获取支付宝用户信息
    aliOauthBaseInfo: {
		url: '/uc/login/thirdOauthBaseInfo',
        type: "post",
        noErr:true,
    },

       //获取验证码
    getCodeNumber: {
        url:'/captcha/send/captext',
        type: "post"
    },

    //绑定手机号
    bindingMobile: {
        url: 'uc/login/phoneRegister',
        type: "post"
    },

	//首页列表
    /* 首页 start */
	//列表
	indexList: {
		url: '/app/themes/allThemes/api/1_8',
        params: {}
    },
    //大数据
    Index_statistic:{
        url: '/policy/statistic/api/app',
        params: {},
        type: "get"
    },
    /* 首页 end */

    /* 超市 start */
    //产品列表数据
    Product_dataList:{
        url: '/policy/productRelationType/api/product/list',
        params: {},
    },
    //产品banner
    Product_banner:{
        url: '/app/banner/api/query',
        params: {},
    },
    //热门搜索
    Product_hot:{
        url: '/policy/solr/topSearch',
        params: {},
    },
    //产品搜索
    Product_search:{
        url: '/policy/solr/search',
        params: {},
    },
    //保险公司
    Product_company:{
        url: '/policy/insuranceCompany/api/getAllCompany',
        params: {},
    },
    /* 超市 end */

    /*攻略 start*/
     //顶部banner
    Share_bannerList:{
        url: '/app/banner/api/query',
        params: {},
    },
     // 导航数据
    Share_bodyNav:{
        url: '/app/columntype/api/list/1_8',
        params: {},
    },
    //文章列表数据
    Share_bodyList:{
        url: '/app/articleCategory/api/article/list',
        params: {},
    },
    //文章列表数据
    Share_proList:{
        url: '/app/articleProduct/api/byProductId',
        params: {},
    },

    /* 攻略 end */

    // 问答
// 问答
	//问答-顶部tap
	C_topList: {
		url: '/app/common/api/dic?type=sqPostType',
        params: {},
        type: "get"
    },
	//超市文章列表
	C_mainpost: {
		url: '/app/sq/mainpost/api/type',
        params: {},
        type: "get"
    },
    //点赞
    C_postUp:{
        url:'/app/sq/mainpost/api/postUp',
        type: "get"
    },
    //我的发表
    C_myPub:{
        url:'/app/sq/mainpost/api/myPub',
    },
    //我的评论
    C_myReply:{
        url:'/app/sq/mainpost/api/myReply',
    },
    //专题公共接口
    getInfoByCode:{
        url:'/app/infoConfig/api/getInfoByCode',
        params: {code:'claimInfo'},
    },
    //图片上传
    o_upload:{
        url:'/app/resmgr/upload',
    },
    //问答发帖
    C_Pub:{
        url:'/app/sq/mainpost/api/pub',
    },
    //获取 公益首页数据
    get_benefit:{
        url:'/app/infoConfig/api/getInfoByPrefix'
    },
    //获取 理赔首页数据
    get_claim:{
        url:'/app/infoConfig/api/getInfoByPrefix'
    },
    //守护平凡
    claim_video:{
        url:'/app/infoConfig/api/getInfoByCode'
    },
    //守护平凡视频接口
    guard_video:{
        url:'/app/articleCategory/api/article/list',
        type:'post'
    },
    //理赔统计
    claim_total:{
        url:'/policy/claimSettle/api/claimStatistic',
        type:'post'
    },
    //理赔案例
    claim_case:{
        url:'/policy/claimSettle/api/claimCase',
        type:'post'
    },
    //获取 公益基金介绍
    publicfundIntroduce:{
        url:'/app/infoConfig/api/getInfo/publicfundIntroduce',
        type:"get"
    },

    //获取 申请公益基金
    publicfundApply:{
        url:'/app/infoConfig/api/getInfo/publicfundApply',
        type:"get"
    },
    //获取 无忧理赔介绍页面
    claimBigdata:{
        url:'/app/infoConfig/api/getInfo/claimBigdata',
        type:"get"
    },

    //获取 保险百科列表
    bk_typeList:{
        url:'/app/insuranceBaike/api/typeList',
        type:"get"
    },
    //获取 保险百科详情
    getInfoByKeyword:{
        url:'/app/insuranceBaike/api/getInfoByKeyword',
        type:"post"
    },
// 个人中心 start
    //个人中心--保单列表
    P_myPolicy:{
        url:'/policy/policy/api/status/myPolicy',
    },

    //个人中心保单列表新接口
    P_centerPolicy:{
        url:'/policy/policy/api/centerPolicy',
        type:'post'
    },

    //绑定投保人关系
    P_buildMember:{
        url:'/uc/ucUser/relations/build',
        type:'post'
    },

    //个人中心--订单列表
    P_myorder:{
        url:'/policy/order/api/status/myOrder',
    },

    //个人中心--理赔进度
    P_myClaim:{
        url:'/policy/claimSettle/api/myClaim',
        params:{
            pageSize:50,
            pageNum:1
        }
    },
    //个人中心 保障权益
    P_interest:{
        url:'/policy/policyInterest/api/list',
    },
    //个人中心--理赔详情
    P_claimDetail:{
        url:'/policy/claimSettle/api/claimDetail',
    },
    //个人中心--卡券
    P_getCardList:{
        url:'/policy/cardStock/api/getCardListByUserId',
        type:'put'
    },

     //个人中心--修改用户昵称
    P_saveUser:{
        url:'/uc/ucUser/api/saveUser',
    },
    // 个人中心 保单详情
     //个人中心--保单详情
     P_policyDetail:{
        url:'/policy/policy/api/policyDetail',
    },
    P_claimsDetail:{
        url:'/policy/policy/api/policyDetailByPolicyNo',
    },

    // 保单中心 保单详情
    P_wtPolicyDetail:{
        url:'/policy/wtPolicys/api/detail',
    },
    P_orderDetail:{
        url:'/policy/order/api/orderDetail',
    },
    //保障权益-订单
    P_orderInterest:{
        url:'/policy/orderInterest/api/list',
    },
    //保障权益-保单
    P_policyInterest:{
        url:'/policy/wtPolicys/api/queryGuaratees',
    },
    //加保保单-保障权益
    P_addPolicyGuaratees:{
        url:'/policy/wtPolicys/api/addPolicyGuaratees',
    },
    //个人中心--新增理赔
    P_addClaim:{
        url:'/policy/claimSettle/api/addClaim',
    },
    //个人中心--获取手机号验证码
    P_captext:{
        url:'/captcha/send/captext',
    },
    //个人中心--绑定保单
    P_bind_policy:{
        url:'/policy/policy/api/policy',
    },
     //查询成员接口新
     P_bind_newRelations:{
        url:'/uc/ucUser/api/relations',
    },
    //保单中心 保单列表
    P_policyList:{
        url:'/policy/V4_4/api/list'
    },
    //分享保单
    P_policyShare:{
        url:'/policy/wtPolicys/api/policyShare'
    },
    //查询分享用户
    P_policyQuery:{
        url:'/policy/wtPolicys/api/queryShareUser'
    },
    //查询我邀请的用户
    P_policyIsSared:{
        url:'/policy/wtPolicys/api/iShared'
    },
    //删除分享用户
    P_removePolicyShare:{
        url:'/policy/wtPolicys/api/removePolicyShare'
    },
    //保单统计
    P_policyCount:{
        url:'/policy/wtPolicys/api/policyCount'
    },
    //保险种类保单查询
    P_classifyPolicy:{
        url:'/policy/V4_4/api/classifyPolicy'
    },
    //获取被保人成员信息
    P_queryInsureders:{
        url:'/policy/wtPolicys/api/queryInsureders'
    },
    //保险种类保单统计
    P_classifyPolicyCount:{
        url:'/policy/wtPolicys/api/classifyPolicyCount'
    },
    //下载电子保单
    P_verifyBdurlExist:{
        url:'/tools/bdurl/api/verifyBdurlExist',
    },
     //修改手机号验证码
     P_sendSms:{
        url:'/uc/ucUser/api/sendSms',
    },
    //修改手机号
    P_updateUserMobile:{
        url:'/uc/ucUser/api/updateUserMobile',
    },
    // 个人中心 end
    //
    //专题相关接口 start
    //经纪人查询
    Exe_person:{
        url:'/app/appPerson/api/person',
    },
    //提交预约
    Exe_sendDing:{
        url:"/app/common/api/sendDing"
    },
    //优质方案
    Exe_getInfo:{
        url:"/app/infoConfig/api/getInfoByCode"
    },
    //经纪人列表
    Exe_agentsList:{
        url:"/wt/policyAgents/api/list",
        type:"put"
    },
    //经纪人详情  参数 经纪人id  {id:} put请求 + json
    Exe_agentsDetail:{
        url:"/wt/policyAgents/api/detail",
        type:"put"
    },
    //发表经纪人评论  {agentId:经纪人id，commentContent：评论内容}  登录状态
    Exe_agentComments:{
        url:"/wt/policyAgentComments/api/comment"
    },
    //查询经纪人评论     登录状态
    Exe_AgentShowComments:{
        url:"/wt/policyAgentComments/api/showComments",
        type:"post"
    },
    // 经纪人预约  ｛agentId：经纪人ID，mobile:经纪人手机号，name：预约人姓名｝
    Exe_agentOrder:{
        url:"/wt/wtAgentOrder/appointment",
        type:"post"
    },
    // 保险专家  put请求 + json
    Exe_expertsList:{
        url:"/wt/policyExperts/api/list",
        type:"put"
    },
    // 保险专家详情  put请求 + json
    Exe_expertsDetail:{
        url:"/wt/policyExperts/api/detail",
        type:"put"
    },
    // 核保专家列表 put请求 + json
    Exe_underExpersList:{
        url:"/wt/policyUnderwriteExperts/api/list",
        type:"put"
    },
    //  核保专家详情 put请求 + json
    Exe_underExpersDetail:{
        url:"/wt/policyUnderwriteExperts/api/detail",
        type:"put"
    },
    //  客服列表 put请求 + json
    Exe_customsList:{
        url:"/wt/customs/api/list",
        type:"put"
    },
    //   客服详情   put请求 + json
    Exe_customsDetail:{
        url:"/wt/customs/api/detail",
        type:"put"
    },
    //   预约核保专家 参数 {name:'预约人姓名',content:'关注内容',mobile:'联系手机号'}
    Exe_underwriteOrder:{
        url:"/wt/underwriteOrder/appointment",
    },
    // 生日礼物
    Exe_birthdayRecent:{
        url:"/jdweigo/integral/api/birthday/list",
    },
    // 领取生日礼物  参数 {id:'id'}
    Exe_birthdayReceive:{
        url:"/jdweigo/integral/api/birthday/receive",
    },
    //判断礼物是否领取或是否到领取时间
    Exe_isGetbirthdayGoods:{
        url:"/policy/birthdayActivity/api/verifyCanReceive",
    },
    //获取生日积分
    get_birthdayJf:{
        url:"/jdweigo/integral/api/birthday/receive",
    },
    //积分商城
    //积分商城 跳转京东页面
    jdweigo:{
        url:"/jdweigo/api/autoLogin",
        type: "get"
    },
    //积分商城 获取我的当前积分
    jdweigo_myIntegral:{
        url:"/jdweigo/integral/api/myIntegral",
        type: "get"
    },
    //积分商城 商品列表
    jdweigo_hotGoods:{
        url: "/jdweigo/integral/api/hotGoods/list",
        type: "post"
    },
    //积分商城 获取下单数据
    jdweigo_orderInfo:{
        url:"/jdweigo/order/api/info",
        type: "get"
    },
    //积分商城 下单
    jdweigo_orderSubmit:{
        url:"/jdweigo/order/api/submit",
    },
    //积分商城 积分记录
    jdweigo_integralHistory:{
        url:"/jdweigo/integral/api/integralHistory",
    },
    //积分商城 积分等级详情
    policy_userLevel:{
        url:"/policy/wtPolicys/api/userLevel",
    },
    //增值服务
    //增值服务 产品列表
    upmarketServer:{
        url:"/addedservices/upmarketServer/api/real/list"
    },
    //增值服务 获取服务详情
    addedservices_queryServerInfo:{
        url:"/addedservices/upmarketServer/api/queryServerInfo"
    },
    //增值服务 订单列表
    addedservices_orderList:{
        url:"/addedservices/serverOrders/api/read/list"
    },
    //增值服务 验证保单号
    addedservices_serverOrders:{
        url:"/addedservices/serverOrders/api/policyInfo"
    },
    //增值服务 下单
    addedservices_createServerOrder:{
        url:"/addedservices/serverOrders/api/createServerOrder"
    },
    //健康体检 下单
    addedservices_createPhysExamServerOrder:{
        url:"/addedservices/serverOrders/api/createPhysExamServerOrder"
    },

    // 专题 end
    //微信支付
    wechat_jsapi:{
      url:"/pay/wechat/jsapi",
      type: "get"
    },
    //微信 获取openid
    wechat_getOpenid:{
      url:"/uc/login/api/getOpenid"
    },
    // 存取数据接口 start
    setInfoAjax:{
        url:"/tools/caculate/api/save"
    },
    // 存取数据接口 end


    //个人有效保单总数
     p_validPolicy:{
         url:'/policy/wtPolicys/api/validPolicy',
    },

    //个人三个月待支付保单
     p_needPayPolicy:{
         url:'/policy/wtPolicys/api/needPayPolicy',
    },

    //今年家庭总保单数
     p_yearPayPolicy:{
         url:'/policy/wtPolicys/api/yearPayPolicyUnion',
    },

    //获取全部保单
    get_allPolicy:{
         url:'/policy/V4_4/api/unionlist',
    },

    //获取个人中心数据统计相关接口
    getStatistics:{
        url:'/policy/V4_4/api/policyCount',
        type:"post"
    },
    //个人中心配置
    getPersonalData:{
        url:'/app/infoConfig/api/getInfoByPrefix',
        type:"post"
    },
    //获取客服电话
    getKeFuNum:{
        url:'/app/infoConfig/api/getInfoByCode',
        type:"post"
    },

    //待续保保单查询
    P_needRenewalPolicy:{
        url:'/policy/V4_4/api/needRenewalPolicy'
    },
    wx_appPay: {//微信支付
        url: '/pay/wechat/app',
        type: "get"
    },
    ali_appPay: {//支付宝支付
            url: '/pay/alipay/app',
        type: "get"
    },
    //获取积分详细数据
    jdweigoList:{
        url:'/jdweigo/integral/api/activity/list2'
    },

     //领取积分
     getIntegral:{
        url:'/jdweigo/integral/api/task/receive'
    },

    //获取推荐有奖相关活动配置项
    getTjyjInfo:{
        url:'/jdweigo/integral/api/activity/detail'
    },

    //开启用户轨迹相关
    startUserAnction:{
        url:'/jdweigo/integral/api/activity/start'
    },
    // 新增
    // 保障分析
    // 保单分析家庭成员
    i_Analysis: {
        url: '/policy/keeper/list/relations',
        type: 'post'
    },
    // 保单分析成员保单情况
    i_insure: {
        url: '/policy/keeper/api/insuredSummary',
        type: 'post'
    },
    // 保单分析成员保额情况
    i_detail: {
        url: '/policy/keeper/api/analysis',
        type: 'post'
    },
    // 绑定保单
    b_bindPolicy: {
        url: '/policy/keeper/api/bindPolicy'
    },
    // 保单验真
    v_policy: {
        url: '/policy/insuranceCompany/api/getAllCompany'
    },

    // 账户价值
    v_cashValue: {
        url: '/bus/core/policyValueQuery/ht'
    },
    // 单独传入url
    none: {
        url: ''
    },
    // 单独传入url
    p_receiveCard: {
        url: '/policy/cardRecord/api/receiveCard'
    },
    //转介绍客户积分数量
    p_introduction:{
        url:'/jdweigo/introduce/api/count',
        type:'get'
    },
    //转介绍客户积分记录
    p_intro_record:{
        url:'/jdweigo/introduce/api/records',
        type:'post'
    },
    //查询活动主题内容
    p_ambassador_theme:{
        url:'/policy/ambassador/api/getThemeContents',
        type:'post'
    },
    //保险大使查询用户活动账户
    p_ambassador_useraccount:{
        url:'/policy/ambassador/api/userAccount',
        type:'post'
    },
    //保险大使用户申请提现
    p_ambassador_withdrawal:{
        url:'/policy/ambassador/api/applyCash',
        type:'post'
    },
    //个人累计有效总保费查询
    p_ambassador_total:{
        url:'/policy/wtPolicys/api/userPremiumCount',
        type:'post'
    },
    //保险大使查询用户奖励记录
    p_ambassador_history:{
        url:'/policy/ambassador/api/getAwardLogByUser',
        type:'post'
    },
    //中意e路保签约状态
    p_contract_status:{
        url:'/bus/core/signConfirm/zy/',
        type:'post'
    },
    //梧桐树门诊报销金接口
    //查询账户余额
    r_reimbursement_amount:{
        url:'/policy/medical/medical/amount',
        type:'get'
    },
    //查询活动
    r_reimbursement_activities:{
        url:'/policy/medical/activities',
        type:'post'
    },
    //查询用户可领取门诊金列表
    r_reimbursement_availableList:{
        url:'/policy/medical/medical/availableList',
        type:'get'
    },
    //申请理赔
    r_reimbursement_claim:{
        url:'/policy/medical/claim/apply',
        type:'post'
    },
    //领取门诊金
    r_reimbursement_receive:{
        url:'/policy/medical/medical/receive',
        type:'get'
    },
    //门诊金领取记录
    r_reimbursement_receivelog:{
        url:'/policy/medical/medical/receive/logs',
        type:'get'
    },
    //门诊金报销记录
    r_reimbursement_claimlog:{
        url:'/policy/medical/medical/claim/logs',
        type:'get'
    },
    //门诊金报销详情
    r_reimbursement_detail:{
        url:'/policy/medical/medical/claim/detail',
        type:'get'
    },
    //家庭成员列表
    r_reimbursement_memberlist:{
        url:'/policy/medical/relations',
        type:'get'
    },
    //家庭成员信息
    r_reimbursement_memberdetail:{
        url:'/policy/medical/relations/detail',
        type:'get'
    },
    //保存家庭成员关系
    r_reimbursement_membersave:{
        url:'/policy/medical/relations/save',
        type:'post'
    },
    //解绑家庭成员关系
    r_reimbursement_memberdelete:{
        url:'/policy/medical/relations/del',
        type:'put'
    },
    //门诊金报销统计及记录
    r_reimbursement_claimhistory:{
        url:'/policy/medical/medical/claim/history',
        type:'get'
    },
    //开通账户
    r_reimbursement_open:{
        url:'/policy/medical/medical/open',
        type:'post'
    },
    //邀请统计
    r_reimbursement_invitelog:{
        url:'/policy/medical/invite/logs',
        type:'get'
    },
    //计算用户可报销金额
    r_reimbursement_realCalim:{
        url:'/policy/medical/claim/calc',
        type:'get'
    },
    //保存图片
    r_reimbursement_saveImg:{
        url:'/prospectus/api/saveImage',
        type:'post'
    },
    //获取今日领取相关参数配置
    a_themes_themeCfg:{
        url:'app/themes/api/themeCfg'
    },
    //领取今日福利
    p_cardRecord_receiveById:{
        url:'/policy/cardRecord/api/receiveById'
    },
    //领取今日送险
    p_spikeActivity_receive:{
        url:'/spike/spikeActivity/api/receive'
    },
    orders_proceed:{
        url:'/policy/policyProcess/orders/proceed',
        type:'get',
    },
    orders_detail:{
        url:'/policy/policyProcess/orders/detail',
        type:'get',
    }
};

//获取AJAX请求 数据
function getHttp(param,success,failure){
    let data=apiList[param.name];
    var params=param;
    var url = data.url;
    if(!data){
        alert("未找到此对象")
        return
    }
    if (param.header == 2 && param.params){
        params.data = getURLSearchParams(param.params)
    }
    else if (param.header == 2){
        params.data = getURLSearchParams(data.params)
    }else if(param.params){
        params.data=param.params
    }else{
        params.data=data.params;
    }

    if(param.url){
        url = param.url
    }

    if(param.code){
        url = url+param.code
    }


    if(!data.type || data.type=="post"){
        ajax.post(url,params,success,failure);
    }else if(data.type=="get"){
        ajax.get(url,params,success,failure);
    }
    else if(data.type=="put"){
        ajax.put(url,params,success,failure);
    }
}

export default {
    getHttp
}
