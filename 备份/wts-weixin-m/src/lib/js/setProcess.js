/**
 * 产品页面设置流程
 * @param {*} data 产品详情数据
 * @param {*} callback 回调
 */
window.wts_set_process=function(data,callback,params){
    if (!data){
        if(callback) return callback(false);
        return false;
    };
    //1.创建流程变量
    var productProcess = { //流程变量
        health: 0,//健康告知
        premium: 0,//测算
        inform: 1,//核保
        payType: 1,//支付
        orderPage: 0,//订单
        isActive: 0,//隐藏流程
        payReturn:0,//在线回访
        isMake:0,//预约
        needNotice:0,//投保须知
        intelligent:0,//智能核保
        renewal:params&&params.type==1?1:0,//是否续保
    };
      //2.根据服务器流程productFlow-转换为前端流程信息
    if (data.productType == 3) { //外链
        productProcess.inform = 3;
        if(callback)callback(productProcess)
        return;
    } else if (data.productType == 4) { //预约
        productProcess.isMake = 4;
    }
    productProcess.code = {
        proCode:data.code, //产品code
        idCode:data.id, //产品code
    };
    productProcess.company = data.insuranceCompanyId || ''; //保险公司id
    var productFlow;
    if(params&&params.type==1){
        productFlow = data.productRenewalFlow?data.productRenewalFlow:data.productFlow;
        productProcess.policyNo = params.policyNo//订单no
    }else{
        productFlow=data.productFlow;
    }
        //遍历流程
    for (var i = 0; i < productFlow.length; i++) {
        switch (productFlow[i].value) {
            case "3": //核保-支付
                productProcess.inform = 1;
                break;
            case "4": //核保-出单
                productProcess.inform = 5;
                break;
            case "5": //核保-代扣
                productProcess.inform = 2;
                break;
            case "8": //支付-线上
                productProcess.payType = 1;
                break;
            case "6": //支付-储存-没有支付
                productProcess.payType = 2;
                break;
            case "7": //支付-银行
                productProcess.payType = 3;
                break;
            case "9": //聚合支付
                productProcess.payType = 4;
                break;
            case "1": //测算
                productProcess.premium = 1;
                break;
            case "10": //测算-2.0
                productProcess.premium = 2;
                break;
            case "11": //订单页-2.0
                productProcess.orderPage = 1;
                break;
            case "12": //支付银行-2.0
                productProcess.payType = 5;
                break;
            case "13": //支付银行-3.0
                productProcess.payType = 6;
                break;
            case "14": //支付银行-4.0
                productProcess.payType = 7;
                break;
            case "15": //计划书测算
                // productProcess.premium = 3;
                break;
            case "16": //风险测评
                productProcess.health = 2;
                break;
            case "17": //第三方收银台
                productProcess.payType = 8;
                break;
            case "18": //隐藏产品
                productProcess.isActive = 1;
                break;
            case "19": //健康告知-智能核保-复兴
                productProcess.intelligent = 1;
                break;
            case "20": //健康告知-智能核保-信泰
                productProcess.intelligent = 2;
                break;
            case "21": //在线回访
                productProcess.payReturn = 1;
                break;
            case "26": //投保须知
                productProcess.needNotice = 1;
                break;
            case "27": //健康告知-智能核保-平安
                productProcess.intelligent = 3;
                break;
            case "28": //订单3.0
                productProcess.orderPage = 2;
                break;
            case "29": //梧桐树智能核保
                productProcess.intelligent = 4;
                break;
            case "30": //中信宝
                productProcess.intelligent = 5;
                break;
            case "31": //温馨提示
                productProcess.payReturn = 2;
                break;
            case "32": //投被保告知都有智能核保
                productProcess.intelligent = 6;
                break;
            case "33": //投被保告知都有智能核保
                productProcess.payReturn = 3;
                break;
            case "34": //多啦A保 智能核保
                productProcess.intelligent = 7;
                break;
            case "35": //瑞泰 智能核保
                productProcess.payReturn = 4;
                break;
            case "36": //全部数据返回 智能核保
                productProcess.intelligent = 8;
                break;
            case "39": //全部数据返回 智能核保
                productProcess.intelligent = 9;
                break;
            case "2": //健康告知
                productProcess.health = 1;
                break;
        }
    }
    if(callback)callback(productProcess)
}