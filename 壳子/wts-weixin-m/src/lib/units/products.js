function ProductFn () {}
ProductFn.prototype = {
    constructor: ProductFn,
    data: {
        H5Pay:{},
        scrollTop:0,
        isSubmit: false,
        baseUrl: "/bus/core/brief/messure/",
        httpError: true,
        mainData: {}, //初始数据
        productProcess:"",
        errorMsg: '', //重新填写-错误信息
        id: '',
        sessionKey:"",
    },
    setData:function () {
        var self = this;
        var data = this.data;
        for (var k in data) {
            self[k] = data[k];
        }
    },
    init: function (params) {
        var self = this;
        if(params.needPay==2)self.needPay=2;
        this.data.id = params.id;
        this.data.sessionKey = "products-"+params.id;
        $(".check-box").removeClass("active");
        this.setData(); //初始化变量
        this.getInfo(); //初始化信息
        this.bind(); //组件初始化及事件绑定
        // 职业的数据
        this.jobWriteList("insurederOccupation",function(){
            self.occupaEvents();
        });
        // 获取流程
        wts_set_process({
            productFlow:[{value: "17"}]
        },function(process){
            if(!process)return popJs.alert('产品流程异常！');
            console.log("process",process)
            self.productProcess = process;
        });
        if(!$.tools().mobile){
            $("input[type=number]").attr("type","text");//避免PC端验证出错
        }
        if($.tools().user.indexOf("wtsbxwApp")>-1) {
            var ver = $.tools().user.match(/wtsbxwApp\/(\S*)/)[1];
            if(($.tools().android && ver >= "4.7.1") || ($.tools().ios && ver >= "4.4.1")) {
                $("#kefuBtn").attr("href","https://bx.wts999.com/app.html?goto=hxkefu");
            }
        }
    },
    bind: function () {
        this.verification(); //验证码
        this.getoccupa(this.id); //职业选择
        this.file();
        this.bindFunction();
    },
    
    checkVerification:function(callback){
        var self = this;
        var tell=$(".input_phone:visible").val();
        var yzm=$(".input-yzm:visible").val();
        $.ajaxPackage({
            type: "post",
            url: '/bus/core/brief/valid',
            data: {phone:tell,captch:yzm},
            success: function(data, isError) {
                console.log(data);
                if (!isError) {
                    callback(false);
                    return false;
                }
                if(!data.data){
                    $.layerMsg('您的手机验证码错误或已失效，请重新获取');
                    callback(false);
                    self.move($(".input_phone:visible"));
                    return;
                }
                callback(tell);
            },
        })
    },
    getInfo: function () {
        var premiumMultiplex = localStorage.getItem(this.sessionKey);
        //存在本地缓存则调用缓存，否则重新获取数据
        if(premiumMultiplex){
            var data = JSON.parse(premiumMultiplex);
            this.mainData = data;
            this.ajaxDate();
            this.setMoney(); //设置金额
            data = this.mainData.fromvalue;
            $(".form-input").each(function(){
                var id = $(this).attr("id");
                var type = $(this).attr("data-type");
                var val = data[id];
                if(!val) {
                    return true;
                }
                if(type == 1){
                    $(this).val(val);
                }else if(type == 2){
                    $(this).find("li").removeClass("active");
                    $(this).find("li[data="+val+"]").addClass("active");
                    if(id == "insuredRelationship" && (val == 2 || val == 3 || val == 4)){
                        $(".holder").removeClass("hide").find("input").removeClass("hide");
                        $(".holder-hide").addClass("hide");
                    }
                }else if(type == 3) {
                    var name = val.name;
                    if (name.length > 14) {
                        name = name.slice(0, 14) + "...";
                    }
                    $(this).val(val.name);
                }
            });
            $(".input_phone:visible").val(data.phone||'');
        }else{
            $(".list").find("li:eq(0)").addClass("active");
            this.startAjax();
        }
    },
    setSession: function (id, value) {
        var session = localStorage.getItem(this.sessionKey);
        if (session) {
            session = JSON.parse(session);
            session.fromvalue[id] = value;
            localStorage.setItem(this.sessionKey, JSON.stringify(session));
        } else {
            localStorage.setItem(this.sessionKey, JSON.stringify(this.mainData));
        }
    },
    /*
    * 数据替换
    * */
    modifyData: function (name, value) {
        this.mainData.fromvalue[name] = value;
        console.log(this.mainData);
    },
    startAjax: function () {
        //默认测算值
        var self = this;
        var url = this.baseUrl + this.id;
        self.isSubmit = true;
        var startAxList = {
            type: "post",
            url: url,
            data: '{}',
            contentType: "application/json;charset=UTF-8",
            dataType: 'json',
            processData: false,
            success: function (ajaxData, isError) {
                console.log(ajaxData);
                self.isSubmit = false;
                if (!isError) {
                    return;
                }
                self.mainData = ajaxData.data;
                self.setMoney(); //设置金额
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log(textStatus);
                console.log(XMLHttpRequest);
            }
        }
        $.ajaxPackage(startAxList);
    },
    // 验证码
    verification: function () {
        var self = this;
        $(".getYZM").on('click', function () {
            if($(this).hasClass("disabled")){
                return;
            }
            var tell = $.trim($(".input_phone:visible").val());
            if (!tell) {
                $.layerMsg('您的手机号尚未填写！')
                return;
            }
            if (!$.regular().isPhone(tell)) {
                $.layerMsg('您的手机号填写有误！')
                return;
            }
            self.mainData.fromvalue.phone = tell;
            $.ajaxPackage({
                type: "post",
                url: '/bus/core/brief/send/captext',
                contentType: "application/json;charset=UTF-8",
                data: "{json:" + JSON.stringify(self.mainData) + "}",
                dataType: 'json',
                success: function (data, isError) {
                    console.log(data);
                    if (!isError) {
                        return;
                    }
                    intervals(59);
                },
            });
        });
        var timer;

        function intervals(count) {
            var dom = $(".getYZM");
            var countdown = count;
            dom.addClass("disabled");
            $(dom).html(countdown + "S");
            timer = setInterval(function () {
                countdown--;
                if (countdown < 1) {
                    $(dom).attr("disabled", false)
                    $(dom).html("获取验证码");
                    clearInterval(timer);
                    dom.removeClass("disabled");
                } else {
                    $(dom).attr("disabled", true);
                    $(dom).html(countdown + "S");
                }
            }, 1000);
        }
    },
    jobWriteList:function(id, callback, limit) {
        
        var self = this;
        // var occupaList = {
        //     type: "post",
        //     url: "/policy/jobType/api/jobWriteList",
        //     data: {
        //         productCode: self.id,
        //         jobTypeArray: limit
        //     },
        //     async: true,
        //     success: function (data, isError) {
        //         console.log(data);
        //         if (!isError) {
        //             return;
        //         }
        //         self.occuData = JSON.stringify(data.data);
        //         //职业树
        //         var treeHtml = template("occupa_box", data);
        //         $(".layer-06 .tree").html(treeHtml).treemenu({
        //             delay: 0
        //         }).openActive();
        //         $("#occupationScroll").attr("data-id", id);
        //         if (callback) callback(true);
        //     },
        //     error: function (xhr, type, errorThrown) {
        //         //异常处理；
        //         console.log(type);
        //     }
        // }
        // $.ajaxPackage(occupaList);

        self.occuData = JSON.stringify(jobList);
        //职业树
        var treeHtml = template("occupa_box", {data:jobList});
        $(".layer-06 .tree").html(treeHtml).treemenu({
            delay: 0
        }).openActive();
        $("#occupationScroll").attr("data-id", id);
        if (callback) callback(true);
    },
    /*
    *  职业选择接口
    * */
    getoccupa: function (id) {
        var self = this;
        if ($(".occupaCheck").length < 1) return;
        treemenu(id, function (needEvent) {
            if (needEvent) {
                self.occupaEvents()
            }
            $("#occupationScroll .treemenu").find(".hide").removeClass("hide");
            $("#searchTree").val("");
            $("#occupationScroll").addClass("active");
        });

        function treemenu(code, callback) {
            $(".body-container").on('click', '.occupaCheck', function () {
                var id = $(this).find("input").attr("id");
                var itemId = $("#occupationScroll").attr("data-id");
                console.log(itemId , id);
                if (itemId == id) {
                    if (callback) callback(false);
                    return;
                }
                var limit = $(this).attr("data-limit");
                self.jobWriteList(id, callback, limit);
            })
        }
        //职业树事件
    },
    occupaEvents: function() {
        var self = this;
        $(".treemenu").on("click", '.click-tree-a', function () {
            //if ($(this).next("ul").length > 0)return;
            var nameArr = "";
            var code = $(this).parent("li").attr("data-code");
            var name = $(this).html();
            var type = $(this).parent("li").attr("data-type")
            // var id = $(this).parents(".layui-layer-wrap").attr("data-id");
            var id = $("#occupationScroll").attr("data-id");
            $("#" + id + " .from-right").attr("data-check", 1);
            if (name.length > 14) {
                nameArr = name.slice(0, 14) + "...";
                $("#" + id).val(nameArr);
            } else {
                $("#" + id).val(name);
            }
            var opaItems = {
                name: name,
                code: code,
                type: type,
                id: id
            };
            $("#occupationScroll").removeClass("active");
            self.modifyData(opaItems.id, opaItems);
            self.setSession(opaItems.id, opaItems);
            return false;
        })
        //职业搜索
        $("#searchTree").on("change", function () {
            var datas = JSON.parse(self.occuData);
            var value = $(this).val().trim();
            //清除搜索
            if (value == "") {
                var treeHtml = template("occupa_box", {
                    data: datas
                });
                $(".layer-06 .tree").html(treeHtml).treemenu({
                    delay: 300
                }).openActive();
                return;
            }
            var result = _.filter(datas, function (o) {
                var fiter1 = false;
                var result1 = _.filter(o.child, function (n) {
                    var fiter2 = false;
                    var result2 = _.filter(n.child, function (m) {
                        if (m.name.indexOf(value) > -1) {
                            fiter2 = true;
                            fiter1 = true;
                            return m
                        }
                    })
                    if (fiter2 && result2 && result2.length > 0) {
                        n.child = result2;
                        return n;
                    }
                })
                if (fiter1 && result1 && result1.length > 0) {
                    o.child = result1;
                    return o
                }
            });
            if (result && result.length > 0) {
                var treeHtml = template("occupa_box", {
                    data: result
                });
                $(".layer-06 .tree").html(treeHtml).treemenu({
                    delay: 300
                }).openActive();
            } else {
                $(".layer-06 .tree").html('')
                $.layerMsg('查询不到相关职业')
            }
        })
        $("#occupationScroll .shadeBox").click(function () {
            $("#occupationScroll").removeClass("active");
        })
    },
    /*
        * 修改价格
        * */
    setMoney: function () {
        //    通用
        var fromvalue = this.mainData.fromvalue;
        var price = fromvalue.premium;
        var activePrice = fromvalue.disPremium;
        var paymentType = '月'
        if (!fromvalue.paymentType) {
            return;
        }
        if(fromvalue.paymentType == "Y"){
            paymentType = '年';
            $('#money_info1').hide();
            $('#money_info2').hide();
            $('#money_info3').html( price + '元').show();
            $('#original_price').html(price + '元');
        }else{
            $('#original_price').html(price + '元/' + paymentType);
            $('#money_info1').html('首月' + activePrice + '元').show();
            $('#money_info2').html('次月起' + price + '元/月').show();
            $('.money_info1').text(activePrice);
            $('.money_info2').text(price);
            $('#money_info3').hide();
        }
        $("#curMoney").html(activePrice + "元");
        $('#activitys').html('-' + (price - activePrice) + '元');
        $('#activitys_name').html('首' + paymentType + '立减');
        
        if(price == activePrice) {
            $(".activitysLine").hide();
        }else{
            $(".activitysLine").show();
        }
    },
    ajaxDate: function () {
        var self = this;
        var url = this.baseUrl + this.id;
        self.isSubmit = true;
        var ajaxDataList = {
            type: "post",
            url: url,
            data: "{json:" + JSON.stringify(this.mainData.fromvalue) + "}",
            contentType: "application/json;charset=UTF-8",
            async: false,
            dataType: 'json',
            success: function (data, isError) {
                console.log(data)
                self.isSubmit = false;
                if (!isError) {
                    if (data.httpCode == 205) {
                        self.errorMsg = data.data.errorMsg;
                    }
                    self.httpError = false;
                    return
                }
                self.httpError = true;
                self.mainData = data.data;
                self.getoccupa(self.id); //职业选择
                self.setMoney(self.mainData.fromvalue); //设置金额
                if (_.get(data, 'data.fromvalue', false)) {
                    var mitiData = _.get(data, 'data', {});
                    mitiData.proCode = self.id;
                    mitiData.fromvalue.phone = $.trim($(".input_phone:visible").val());//接口不会返回phone字段
                    localStorage.setItem(self.sessionKey, JSON.stringify(mitiData));
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log(textStatus);
            }
        }
        window.setTimeout(function(){
            $.ajaxPackage(ajaxDataList);
        },1)
    },
    checkAll: function () {
        var self = this;
        var fromvalue = $.extend({},this.mainData.fromvalue);
        var state = true;
        $(".form-input").each(function(){
            var id = $(this).attr("id");
            var name = $(this).attr("data-name");
            var value = $.trim($(this).val());
            var type = $(this).attr("data-type");
            if(type == 2){
                value = $(this).find(".active").attr("data");
            }
            if($(this).hasClass("hide") || !id) {
                return true;
            }
            if(value){
                if(type == 1 || type == 2) {
                    fromvalue[id] = value;
                }
            }else{
                var msg = '请填写';
                if(type == 3 || type == 2){
                    msg = '请选择';
                }
                $.layerMsg(msg + name);
                state = false;
                self.move($(this));
                return false;
            }
        });
        if(!state){
            return;
        }
        var tell=$.trim($(".input_phone:visible").val());
        var yzm=$.trim($(".input-yzm:visible").val());
        var insurederIdCard=$.trim($("#insurederIdCard").val());
        var holderIdCard=$.trim($("#holderIdCard").val());
        var holderEmail = $.trim($("#holderEmail").val());
        if(!$.regular().issfz(insurederIdCard)){
            $.layerMsg('您的身份证填写有误！');
            self.move($("#insurederIdCard"));
            state = false;
            return;
        }
        if ($("#holderEmail").length>0 && !$.regular().isEmail(holderEmail)) {
            $.layerMsg("邮箱输入有误，请修改后提交！")
            self.move($("#holderEmail"));
            state = false;
            return;
        }
        if($("#holderIdCard:visible").length && !$.regular().issfz(holderIdCard)){
            $.layerMsg('您的家人身份证填写有误！');
            self.move($("#holderIdCard"));
            state = false;
            return;
        }
        if(!tell){
            $.layerMsg('您的手机号尚未填写！');
            self.move($(".input_phone:visible"));
            state = false;
            return;
        }
        if(!$.regular().isPhone(tell)){
            $.layerMsg('您的手机号填写有误！');
            self.move($(".input_phone:visible"));
            state = false;
            return;
        }
        if(!yzm){
            $.layerMsg('您的手机验证码尚未填写！');
            self.move($(".input_phone:visible"));
            state = false;
            return;
        }
        if(!$(".check-box").hasClass("active")){
            $.layerMsg("请阅读并同意相关条款");
            self.move($(".file-box"));
            state = false;
            return false;
        }
        if(state){
            this.mainData.fromvalue = fromvalue;
        }
        return state;
    },
    /*
    * 获取
    * */
    getQueryString:function(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]); return null;
    },
    
    /*
    * 测算页点击下一步验证通过后的接口
    * */
    nexthtml:function() {
        var self = this;
        var url = '/bus/core/brief/check/' + this.id;
        self.mainData.process = self.productProcess;
        var partnerTag = self.getQueryString('partnerTag');
        //console.log('partnerTag',partnerTag);
        if(partnerTag){
            self.mainData.partnerTag = partnerTag.split(',')[1];
            self.mainData.fromvalue.partnerTag = partnerTag.split(',')[1];
        }
        console.log(self.mainData);
        var loading = $.layerLoad();
        var premiumNext = {
            type: "post",
            url: url,
            data: "{json:" + JSON.stringify(self.mainData) + "}",
            contentType: "application/json;charset=UTF-8",
            dataType: 'json',
            success: function (data, isError) {
                layer.close(loading);
                data = data.data;
                self.isSubmit = false;
                if (!isError || data.success != "true") {
                    return;
                }
                afterSubmit();
                if(self.needPay==2){
                    if($.tools().isWeiXin()){
                        location.replace(data.jsApipayUrl);
                    }
                    else if($.tools().mobile){
                        location.replace(data.H5payUrl);
                    }
                    else{
                        location.replace(data.PCpayUrl);
                    }
                }
                else{
                    if($.tools().isWeiXin()){//微信
                        new H5Pay().init({
                            orderId: data.policyNo,
                            payWay: 1,
                            orderType: '',
                            paySuccessUrl: './payStatus.html?t='+new Date().getTime()
                        }, function(r) {
                            // 取消或者支付失败跳转收银台
                            if(r.code == 0 && r.msg == '取消支付'){
                                location.replace(data.jsApipayUrl);
                                return;
                            }
                            if (!r.code) {
                                $.layerMsg(r.msg);
                            }
                        })
                    }else if($.tools().mobile){//手机浏览器
                        location.replace(data.H5payUrl);
                    }else{//PC浏览器
                        location.replace(data.PCpayUrl);
                    }
                } 
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                layer.close(loading);
                console.log(textStatus);
                console.log(XMLHttpRequest);
                self.isSubmit = false;
                if (textStatus == "error") {
                    $.layerMsg('未联网，请先检查网络')
                }
            }
        }
        $.ajaxPackage(premiumNext);
    },
    move: function ($this){
        var top = $this.offset().top-50;
        var self = this;
        $('body,html').animate({scrollTop:top},1000,function(){
            self.setFloatDiaplay();
        });
    },
    disabledScroll:function(state){
        if(state){
            this.scrollTop = $(window).scrollTop();
            $("body").css({overflow:"hidden",position:"fixed",height:"100%",bottom:0});
            $(".body-container").css({position:"absolute",top: -this.scrollTop});
        }else{
            $("body").css({overflow:"",position:"",height:""});
            $(".body-container").css({position:"",top:""});
            $(window).scrollTop(this.scrollTop);
        }
    },
    file: function () {
        var self = this;
        $(".file-box a").click(function () {
            console.log("this",$(this).hasClass('dataURL'));
            var urlFlag = $(this).hasClass('dataURL');
            if(urlFlag)return;
            var url = $.globedata.baseUrl + "/m/lib/data/"+self.id+"/#name#.html";
            var name = $(this).attr("data");
            url = url.replace("#name#", name);
            console.log(url);
            $("#fileModal .text").html('');
            $("#fileModal").show();
            $("#fileModal").find(".title span").text(name);
            $.get(url).then(function (res) {
                $("#fileModal").find(".text").html(res);
                self.disabledScroll(true);
            });
        });
        $(".close").click(function () {
            $(".modal").removeClass("showBtn").hide();
            self.disabledScroll(false);
        });
        $("#showTable").click(function(){
            self.disabledScroll(true);
            $("#tableModal").show();
        });
        $("#tableModal .button").click(function(){
            var data = $(this).attr("data");
            $(this).addClass("active").siblings().removeClass("active");
            if(data == 1){
                $(".img1").removeClass("hide");
                $(".img2").addClass("hide");
            }else{
                $(".img1").addClass("hide");
                $(".img2").removeClass("hide");
            }
        });
    },
    bindFunction: function (){
        var self = this;
        // 单选点击
        $(".list li").click(function(){
            $(this).addClass("active").siblings().removeClass("active");
            var id = $(this).parent().attr("id");
            var data = $(this).attr("data");
            self.mainData.fromvalue[id] = data;
            if(id == "insuredRelationship"){
                var value = $(this).attr("data");
                if(value == 2 || value == 3 || value == 4){
                    $(".holder").removeClass("hide");
                    $(".holder").find(".form-input").removeClass("hide");
                    $(".holder-hide").addClass("hide");
                }else{
                    $(".holder").addClass("hide");
                    $(".holder").find(".form-input").addClass("hide");
                    $(".holder input").val('');
                    $(".holder-hide").removeClass("hide");
                }
            }
            self.ajaxDate()
        });
        // 协议选中
        $(".check-box").click(function(){
            $(this).toggleClass("active");
        });
        // 监听数据测算
        $(".changes").change(function(){
            var id = $(this).attr("id");
            var data = $.trim($(this).val());
            self.mainData.fromvalue[id] = data;
            self.ajaxDate();
        });
        // 查看更多
        $(".show-btn").click(function(){
            $("#showBox").find(".hide").removeClass("hide");
            $(this).addClass("hide");
        });
        // 提交
        $("#immediately").on("click", function () {
            var fromvalue = $.extend({},self.mainData.fromvalue);
            if (!self.checkAll()) {
                return;
            } else if (self.httpError == false) {
                $.layerMsg(self.errorMsg);
                return;
            }
            else if((fromvalue.premium-fromvalue.disPremium)>0 && fromvalue.paymentType === 'M'){//排除 0元直购 无优惠 和 一次性付清
                //premium  disPremium paymentType (M 12 Y 1)
                var showtxt = '<div style="text-align:left;">请您知晓以下重要事项：<br/>1.您本月保费'+fromvalue.disPremium+'元，已优惠'+Number(fromvalue.premium-fromvalue.disPremium)+'元。<br/>2.下月起您的保费是'+fromvalue.premium+'元/月，将通过微信自动续费11个月。<br/>3.您也可以联系我们客服协助您关闭自动续费，但是您同时将失去保障。</div>';
                $.layerinquiry(showtxt, ['我已知晓','取消投保'], function () {
                    // 显示健康告知
                    $("#fileModal").addClass("showBtn");
                    $("#formAlert").click();
                }, function () {
                    
                });
                return
            }
            //没有健康告知的情况
            console.log('formAlert',$("#formAlert"));
            // 显示健康告知
            $("#fileModal").addClass("showBtn");
            if($("#formAlert").length>0){
                $("#formAlert").click();
            }
            else{
                if (self.isSubmit) return;
                self.isSubmit = true;
                // self.mainData.fromvalue.phone=$(".input_phone:visible").val();
                // self.nexthtml();
                self.checkVerification(function(e){
                    if(!e){
                        self.isSubmit = false;
                        return;
                    }
                    self.mainData.fromvalue.phone=e;
                    self.nexthtml();
                });
            }
        });
        $(".error-btn").on("click", function () {
            self.isSubmit = false;
            $.layerAlert("您不满足健康要求，暂时无法购买此产品。稍后保险顾问会联系您，安排核保老师免费为您提供专业健康核保，根据您的健康情况推荐其他产品。如有疑问，联系24小时客服热线：400-9955-788");
            $(".close").click();
        });
        $(".ok-btn").on("click", function () {
            if (self.isSubmit) return;
            self.isSubmit = true;
            // self.mainData.fromvalue.phone=$(".input_phone:visible").val();
            // self.nexthtml();
            self.checkVerification(function(e){
                if(!e){
                    self.isSubmit = false;
                    return;
                }
                self.mainData.fromvalue.phone=e;
                self.nexthtml();
            });
        });
        // 滚动指定位置
        $("body").on("click",".move",function(){
            var key = $(this).attr("data");
            self.move($(key));
        });

        $(".service").click(function(){
            self.disabledScroll(true);
            $("#kefuModal").show();
        });
        $("body").on("click",".firstNav",function(){
            var top = $(".firstNav").offset().top;
            $('body,html').animate({scrollTop:top},800);
        });
        // $("body").on("click", ".navMove", function(){
            
        // });
        var timer;
        $(document).scroll(function(e){
            var scrollTop = $(document).scrollTop();
            window.clearTimeout(timer);
            if(scrollTop%5 == 0) {
                self.setFloatDiaplay();
            }else{
                timer = window.setTimeout(self.setFloatDiaplay,1);
            }
        });
        window.setTimeout(self.setFloatDiaplay,1);
    },
    setFloatDiaplay:function(){
        var navH = $(".nav").offset().top;
        var nav2 = $("#panel6").offset().top;
        var formH = $(".bottom0").offset().top-300;
        var scrollTop = $(document).scrollTop();
        if(scrollTop < navH) {
            $(".float-box").addClass("hide");
            $(".fixed-btn").addClass("hide");
        }else if(scrollTop > navH && scrollTop < formH) {
            $(".float-box").removeClass("hide");
            $(".fixed-btn").addClass("hide");
        }else if(scrollTop > formH){
            $(".float-box").addClass("hide");
            $(".fixed-btn").removeClass("hide");
        }
        $(".nav").find(".active").removeClass("active");
        if(scrollTop < navH) {
            $(".nav").css({position:""});
            if($(".nav").length > 1){
                $(".nav:eq(1)").remove();
            }
            $(".nav").find("div:eq(0)").addClass("active");
        }else{
            if($(".nav").length == 1){
                $(".nav").after($(".nav").clone());
            }
            $(".nav:eq(1)").css({position:"fixed"});
            if(scrollTop > navH && scrollTop < nav2-100){
                $(".nav").find("div:eq(0)").addClass("active");
            }else if(scrollTop > nav2-100 && scrollTop < formH-100){
                $(".nav").find("div:eq(1)").addClass("active");
            }else if (scrollTop > formH-100){
                $(".nav").find("div:eq(2)").addClass("active");
            }
        }
    },
    historyPush:function(url,img){
        //拦截用户第一次返回，弹出推广图片
        var self=this;
        if(!$.tools().mobile)return;
        if($.tools().isWeiXin())return;
        if($.tools().isWtsNativeApp())return;
        $(document).ready(function () {
            if(sessionStorage.popstates)return;
            setHistory();
        });
        setTimeout(function () {
            window.addEventListener("popstate", function (e) {
                if(sessionStorage.popstates)return;
                if(!location.hash || location.hash=='#h'){
                    self.showSignOut(url,img);
                    sessionStorage.popstates=1;
                    setHistory(1);
                    return false;
                }
            });
        }, 300);

        /**
         * 操作history，替换当前锚点
         * @param {*} type 为true则使用替换replaceState
         */
        function setHistory(type) {
            var state = {
                title: "title",
                url: "#"
            };
            if(type){
                window.history.replaceState(state, "title", "#");
            }else{
                window.history.pushState(state, "title", "#");
            }
        }
    },
    /**
     * 显示返回弹窗
     * @param {*} url 链接
     * @param {*} img 图片地址
     */
    showSignOut:function(url,img){
        var html='    <div class="sign-main" style="position:absolute;top:15%;left:50%;width:90%;transform:translateX(-50%);">'+
        '        <a href="'+url+'" style="display:block;">'+
        '            <img src="'+img+'" style="width:100%;">'+
        '        </a>'+
        '        <img src="https://bx.wts999.com/m/lib/images/products/close.png" style="position:absolute;bottom:-100px;left:50%;margin-left:-40px;width:80px;opacity:1;" class="close">'+
        '    </div>';
        var layerHistory=layer.open({
            type: 1
            ,content: html
            ,anim: 'up'
            ,style: "position:fixed; bottom:0; left:0; width: 100%; height: 100vh; padding:0; border:none;background-color:rgba(0,0,0,0.5);"
        });
        setTimeout(function(){
            $(".sign-main .close").click(function(){
                layer.close(layerHistory)
            })
        },10)
        
    }
    
}