import {tools} from '@static/js/wtsTools.esm.min.js' //工具
const filter = {
  // 字符串截取
  subString(value, length) {
    if (!value) {
      return "";
    }
    value = value.trim();
    if (value.length > length) {
      var first = value.toString().substring(0, length);
      value = first + "...";
    }
    return value;
  },
  // 字符串截取
  cutString(value, length) {
    if (!value) {
      return "";
    }
    let val=tools.cutString(value, length);
    return val;
  },
  subStringEmoji(value, length) {
    if (!value) {
      return "";
    }
    value = value.trim();
    if (value.length > length) {
      var first = value.toString().substring(0, length);
      value = first + "...";
    }
    value=emojiFn(value)
    console.log(value);
    return value;
  },
  // 数字处理
  numberFormat(value) {
    value = parseInt(value);
    if (isNaN(value)) {
      return 0;
    }

    if (value >= 10000) {
      value = value + "";
      var len = value.length;
      value = value.slice(0, len - 3);
      return parseFloat(value / 10) + "万";
    } else {
      return value
    }
  },
  // 时间处理
  trustTime(inHisTime, pattern) {
    if (!inHisTime) {
      return;
    }
    inHisTime =
      inHisTime = inHisTime.toString().trim().replace(/-/gm, "/");
    var date = null,
      now = new Date();
    if (inHisTime.indexOf("/") != -1) { //yyyy-mm-dd HH:mm:ss
      date = new Date(inHisTime);
    } else {
      date = new Date(Number(inHisTime)); // long 整型
    }
    var year = date.getFullYear(),
      month = date.getMonth() + 1,
      day = date.getDate(),
      hours = date.getHours(),
      minute = date.getMinutes();
    var minuteTime = (hours < 10 ? "0" + hours : hours) + ":" + (minute < 10 ? "0" + minute : minute),
      monthTime = (month < 10 ? "0" + month : month) + "-" + (day < 10 ? "0" + day : day);
    if (pattern && pattern.toLowerCase() === "time") {
      return minuteTime;
    } else if (now.toLocaleDateString() === date.toLocaleDateString()) {
      //当天 只显示时间
      return minuteTime;
    } else if (year === now.getFullYear()) {
      //当年 显示 月-日 时间
      return monthTime + " " + minuteTime;
    } else {
      //不是当年
      return year + "-" + monthTime + " " + minuteTime;
    }
  },

  // 时间处理(只显示年月日)
  trustTime01(inHisTime,pattern) {
    if (!inHisTime) {
      return;
    }
    inHisTime =
      inHisTime = inHisTime.toString().trim().replace(/-/gm, "/");
    var date = null,
      now = new Date();
    if (inHisTime.indexOf("/") != -1) { //yyyy-mm-dd HH:mm:ss
      date = new Date(inHisTime);
    } else {
      date = new Date(Number(inHisTime)); // long 整型
    }
    var year = date.getFullYear(),
      month = date.getMonth() + 1,
      day = date.getDate(),
      hours = date.getHours(),
      minute = date.getMinutes();
      monthTime =year+"年"+(month < 10 ? "0" + month : month) + "月" + (day < 10 ? "0" + day : day)+"日";
      if(pattern){
        var minuteTime = (hours < 10 ? "0" + hours : hours) + ":" + (minute < 10 ? "0" + minute : minute),
        monthTime =monthTime + " " + minuteTime;
      }
      return monthTime;
    
  },
  // 内容\n换成回车
  fmtContent(value) {
    if (!value) return;
    value = value.split("\n").join("<br/>");
    value=emojiFn(value);
    return value;
  },
  //根据产品类型判断是否显示保障金额
  guaranteeLimit(content) {
    var val = "";
    if ((content.typeCode && content.typeCode.indexOf("03") > -1 ) || content.insuranceProductName.indexOf('重疾')>-1) {
        val = content.guaranteeLimit + "元";
    } else {
        val = "详见保障权益"
    }
    return val;
  },
  // 日期字数控制
  timeNum(content, num) {
    if (!content) return;
    if (num < content.length) return content;
    return content.slice(0, num);
  },
  //小数设置为百分比
  setPercent(content){
    if(!content){
      return 0;
    }
    content = parseFloat(content).toFixed(2);
    return content*100+"%";
  },
  // 证件类型 过滤
  identifyType(val) {
    var value = "";
    if(!val)return '';
    val=Number(val);
    switch (val) {
      case 1:
				value = '身份证';
				break;
			case 2:
				value = '护照';
				break;
			case 3:
				value = '军人证';
				break;
			case 4:
				value = '出生证';
				break;
			case 5:
				value = '港澳台同胞证';
				break;
			case 6:
				value = '户口本';
				break;
			case 7:
				value = '港澳居民来往内地通行证';
				break;
			case 8:
				value = '港澳台通行证';
				break;
			case 9:
				value = '出生证明';
				break;
			case 10:
				value = '企业三合一证';
				break;
			case 11:
				value = "组织机构代码"
				break;
			case 12:
				value = "工商注册号"
				break;
			case 13:
				value = "统一社会信用代码"
				break;
			case 14:
				value = "港澳居民居住证"
				break;
			case 15:
				value = "台湾居民居住证"
				break;
			case 16:
				value = "台湾居民来往内地通行证"
				break;
			case 17:
				value = "港澳台居民居住证"
				break;
			case 99:
				value = '其它';
				break;
    }
    return value;
  },
  // 与投保人关系
  relationship(val) {
    var value = "";
    console.log(val);
    val = Number(val);
    switch (val) {
      case 1:
        value = "本人"
        break;
      case 2:
        value = "父母"
        break;
      case 3:
        value = "子女"
        break;
      case 4:
        value = "配偶"
        break;
      case 5:
        value = "兄弟姐妹"
        break;
      case 6:
        value = "祖父母，外祖父母"
        break;
      case 7:
        value = "祖孙，外祖孙"
        break;
      case 8:
        value = "其它"
        break;
      case 9:
        value = "丈夫"
        break;
      case 10:
        value = "妻子"
        break;
      case 11:
        value = "父亲"
        break;
      case 12:
        value = "母亲"
        break;
      case 13:
        value = "儿子"
        break;
      case 14:
        value = "女儿"
        break;
        case 15:
        value = "孙子"
        break;
      case 16:
        value = "孙女"
        break;
      case 17:
        value = "外孙"
        break;
        case 18:
        value = "外孙女"
        break;
    }
    return value;
  },
  /*内容\n换成回车*/
  fmtContent_T(content) {
    if (!content) return;
    content = content.trim();
    if (content.length > length + 1) {
      var first = content.toString().substring(0, length);
      content = first + "...";
    }
    return content;
  },
  //保单状态
  policyStatus(value) {
    if (value == "0") {
      return "待付款"
    } else if (value == "1") {
      return "保障中";
    }else if (value == "-1") {
      return "已失效";
    }else if (value == "-2") {
      return "核保中";
    }else if (value == "3") {
      return "待审核";
    }else if (value == "-3") {
      return "核保失败";
    }else if (value == "4") {
      return "扣款成功";
    }else if (value == "-4") {
      return "扣款失败";
    }else if (value == "-6") {
      return "已退保";
    }else if (value == "-7") {
      return "已终止";
    }else if (value == "99") {
      return "人工核保";
    }
  },

  //状态描述
  policyStatusDesc(value,status) {
    if (status == "0") {
      return "您有待支付订单，请继续支付"
    } else if (status == "1") {
      return "恭喜您成功获得保障";
    }else if (status == "-1") {
      if (value) {
      return value
    } 
      return "您的订单已失效，请重新投保";
    }else if (status == "-2") {
      return "您的订单正在核保中，请您耐心等待";
    }else if (status == "3") {
      return "您的订单正在审核中，请您耐心等待";
    }else if (status == "-3") {
      if (value) {
      return value
    } 
      return "订单核保失败，请联系客服处理";
    }else if (status == "4") {
      return "扣款成功，您的保单正在生成中，请稍后";
    }else if (status == "-4") {
      if (value) {
      return value
    } 
      return "订单扣款失败，请联系客服处理";
    }else if (status == "-6") {
      return "您的保单已退保，请悉知";
    }else if (status == "-7") {
      return "您的保单已终止，您可重新投保";
    }else if (status == "99") {
      return "您的人工核保已提交审核，请您耐心等待";
    }
  },
  //保单状态
  statusIcon(value) {
    if (value == "0" || value == "-2" || value == "3" || value == "99") {
      return "icon-shijian1"
    } else if (value == "-4" || value == "-3" || value == "-1" || value == "-6" || value == "-7") {
      return "icon-gantanhao11-copy"
    }else if (value == "1" || value == "4") {
      return "icon-baocun"
    }
  },
  //订单状态
  orderStatusIcon(value)
  {
    if(typeof value !== "number") value = Number(value);
    let imgUrl;
    switch(value){
      case -6:
        //已退保
        imgUrl = 'ytb@2x';
        break;
      case 0:
        //待付款
        imgUrl = 'dfk@2x';
        break;
      case 1:
        //保障中
        imgUrl = 'bzz@2x';
        break;
      case -1:
        //已失效
        imgUrl = 'ysx@2x';
        break;
      case -3:
        //核保失败
        imgUrl = 'shsb@2x';
        break;
      case -4:
        //扣款失败
        imgUrl = 'ysx@2x';
        break;
      case 4:
        //扣款成功
        imgUrl = 'kkcg';
        break;
      case -2:
        //核保中
        imgUrl = 'rghb@2x';
        break;
      case -7:
        //已终止
        imgUrl = 'ysx@2x';
        break;
      case 3:
        //待审核
        imgUrl = 'rghb@2x';
        break;
      case 99:
        //人工核保
        imgUrl = 'rghb@2x';
        break;
    }
    return imgUrl ? `static/images/order-my/${imgUrl}.png`: '';
  },
  //理赔状态
  settleStatusDesc(value) {
    if (value == 0) {
      return "您的理赔申请正在受理中！"
    } else if (value == 1) {
      return "您的理赔申请正在审核中！"
    } else if (value == 2) {
      return "您的理赔申请已审核通过！"
    } else if (value == 3) {
      return "您的理赔申请正在打款中！"
    } else {
      return "您的理赔申请已完成！";
    }
  },

   //理赔状态
   settleStatus(value) {
    if (value < 4) {
      return "受理中"
    } else {
      return "已完成";
    }
  },
  
  tagText(content) {
    if (!content || content.trim() == "" || content == "null") return;
    content = content.replace(/\,/g, "，")
    var arr = content.split("，");
    var html = '';
    arr.forEach(function (v, i) {
        if (i > 1) return false;
        html += "<span>" + v + "</span>"
    })
    return html
  },
  readTime(num) {
    if(!num)return 0
    if (num.toString().length <= 4) return num;
    if (num.toString().length > 4) {
        return (num / 10000).toFixed(1) + "万";
    }
  },
  payProice(value) {
    if (!value) return
    if (value.split(".")[1] > 0) {
      return value
    } else {
      return value.split(".")[0]
    }
  },
  guaranteeLimit2(content) { //根据产品类型判断是否显示保障金额
    var val = "";
    if(!content)return
    if ((content.typeCode && content.typeCode.indexOf("03") > -1) || (content.insuranceProductName && content.insuranceProductName.indexOf('重疾') > -1)) {
      val = content.policy.guaranteeLimit + "元";
    } else {
      val = "详见保障权益"
    }
    return val;
  },
  timeString(content, length) { //截取时间
    if (!content) {
      return "";
    }
    content = content.trim();
    if (content.length > length) {
        var first = content.toString().substring(0, length);
        content = first;
    }
    return content;
  },
     substrbirthday(val) { //出生日期格式转换
        if (val && val.length != 8) {
            var oldBirthday = val.substr(0, 4) + val.substr(5, 2) + val.substr(8, 2)
        } else {
            var oldBirthday = val;
        }
        return oldBirthday
    },
   //评论等级
  levels(level) {
    if (!level) return;
    var l = '<span class="xx"></span>';
    var html = "";
    for (var i = 0; i < Number(level); i++) {
        html += l;
    }
    return html;
  },
   //emoji表情过滤
   emoji(content) {
    if(!content)return;
    var html=content;
    html = jEmoji.softbankToUnified(html);
    html = jEmoji.googleToUnified(html);
    html = jEmoji.docomoToUnified(html);
    html = jEmoji.kddiToUnified(html);
    return jEmoji.unifiedToHTML(html);
  },
  insuranceRelationship(content) { //受益人与被保险人关系
    var val = "";
    content = Number(content);
    switch (content) {
        case 1:
            val = "本人";
            break;
        case 2:
            val = "父母";
            break;
        case 3:
            val = "子女";
            break;
        case 4:
            val = "配偶";
            break;
        case 5:
            val = "兄弟姐妹";
            break;
        case 6:
            val = "祖父母，外祖父母";
            break;
        case 7:
            val = "祖孙，外祖孙";
            break;
        case 8:
            val = "其他";
            break;
        case 9:
            val = "丈夫";
            break;
        case 10:
            val = "妻子";
            break;
        case 11:
            val = "父亲";
            break;
        case 12:
            val = "母亲";
            break;
        case 13:
            val = "儿子";
            break;
        case 14:
            val = "女儿";
            break;
    }
    return val;
  },
  paymentType(data) { //受益人与被保险人关系
    var val = "";
    var method={
      'Y':'年缴',
      'M':'月缴',
      'G':'季缴',
      'B':'半年缴',
    }
    if(data.paymentType=='D'){
      val='趸交';
    }else if(data.paymentType=='Y'){
      val=data.paymentPeriod+'年，'+method[data.paymentMethod];
    }else if(data.paymentType=='A'){
      val='缴至'+data.paymentPeriod+'岁，'+method[data.paymentMethod];
    }
    return val;
  },
  /**保单中心相关过滤 start */
  //根据产品类型判断是否显示保障金额
  policyLimit(content) {
    var val = "";
    if ((content.typeCode && content.typeCode.indexOf("03") > -1 ) || content.policyName.indexOf('重疾')>-1) {
        val = content.guaranteeQuota + "元";
    } else {
        val = "详见保障权益"
    }
    return val;
  },
  //受益人与被保险人关系
  paymentMyType(data) { 
    var val = "";
    var method={
      '2':'年缴',
      '4':'月缴',
      '3':'季缴',
      '6':'半年缴',
    }
    if(data.paymentType=='1'){
      val='趸交';
    }else if(data.paymentType=='5'){
      val='几日缴';
    }else if(data.paymentType=='2' || data.paymentType=='3' || data.paymentType=='4' || data.paymentType=='6'){
      val=data.paymentPeriod+'年，'+method[data.paymentType];
    }else if(data.paymentType=='7'){
      val='缴至'+data.paymentPeriod+'岁，年缴';
    }else if(data.paymentType=='8'){
      val='缴至'+data.paymentPeriod+'岁';
    }
    return val;
  },
  // 与投保人关系
  relationship(val) {
    var value = "";
    console.log(val);
    val = Number(val);
    switch (val) {
      case 1:
        value = "本人"
        break;
      case 2:
        value = "父母"
        break;
      case 3:
        value = "儿女"
        break;
      case 4:
        value = "配偶"
        break;
      case 5:
        value = "兄弟姐妹"
        break;
      case 6:
        value = "祖父母，外祖父母"
        break;
      case 7:
        value = "祖孙，外祖孙"
        break;
      case 8:
        value = "其它"
        break;
      case 9:
        value = "丈夫"
        break;
      case 10:
        value = "妻子"
        break;
      case 11:
        value = "父亲"
        break;
      case 12:
        value = "母亲"
        break;
      case 13:
        value = "儿子"
        break;
      case 14:
        value = "女儿"
        break;
        case 15:
        value = "孙子"
        break;
      case 16:
        value = "孙女"
        break;
      case 17:
        value = "外孙"
        break;
      case 18:
        value = "外孙女"
        break;
      default:
        value = "其他"
    }
    return value;
  },
  //保单状态
  policyMyStatus(value){
    if (value == "-1") {
      return "已终止";
    }else if (value == "0") {
      return "待保障"
    }else if (value == "1") {
      return "保障中";
    }else if (value == "-2") {
      return "已退保";
    }
  },
    // -1：失效（保单过期） 0：待保障 1：保障中 ,-2 :退保
  policyMyStatusDesc(status){
    if (status == "-1") {
      return "您的保单已终止，您可重新投保";
    }else if (status == "0") {
      return "您有待支付订单，请继续支付"
    }else if (status == "1") {
      return "恭喜您成功获得保障";
    }else if (status == "-2") {
      return "您的保单已退保，请悉知";
    }
  },
  /**保单中心相关过滤 end */
   // 设置生日专区显示文案
   setintegral(time){
    function formatDuring(mss){
      var hours = parseInt(mss / (1000 * 60 * 60));
      var minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = (mss % (1000 * 60)) / 1000;
      hours = hours < 10 ? "0" + hours : hours;
      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;
      return hours + ":" + minutes + ":" + seconds + "后可领取";
    }
    if(time){
      return formatDuring(time);
    }
    return "立即领取";
  }
}

function emojiFn(content){
    if(!content)return;
    var html=content;
    html = jEmoji.softbankToUnified(html);
    html = jEmoji.googleToUnified(html);
    html = jEmoji.docomoToUnified(html);
    html = jEmoji.kddiToUnified(html);
    return jEmoji.unifiedToHTML(html);
}







export default filter
