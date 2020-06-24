
    function ProductFn() { }
    ProductFn.prototype = {
        constructor: ProductFn,
        data: {
            fromvalue: {},//表单填充数据
            baseUrl: "/bus/core/order/",
            mainData: {},//初始数据
            submitNum: 1,//下一步-提交防抖
            httpError: true,//错误返回
            errorMsg: '',//重新填写-错误信息
            process: '',//流程
            id: $.getQueryString('id'),
            key: $.getQueryString('key'),
            info: null,//详情页携带参数
        },
        setData() {
            var self = this;
            var data = this.data;
            for (var k in data) {
                self[k] = data[k]
            }
        },
        init: function (user) {
            this.user = user;
            this.setData();//初始化变量
            this.getClause();
            this.getInfo();//初始化信息
        },
        getInfo() {
            var premiumMultiplex = sessionStorage.getItem('premiumMultiplex');
            premiumMultiplex ? this.getStoragePremium(JSON.parse(premiumMultiplex)) : this.startAjax(); //存在本地缓存则调用缓存，否则重新获取数据
        },
        startAjax() {
            //默认测算值
            var self = this;
            var url = this.baseUrl + this.id;
            var startAxList = {
                type: "post",
                url: url,
                data:'{}',
                contentType: "application/json;charset=UTF-8",
                dataType: 'json',
                processData: false,
                success: function (ajaxData, isError) {
                    console.log(ajaxData);
                    self.submitNum = 0;
                    if (!isError) {
                        return;
                    }
                    self.fromvalue = ajaxData.data.fromvalue; //处理保费
                    self.fromvalue.premium = ajaxData.data.premium; //处理保费
                    self.mainData = ajaxData.data;
                    self.setEvents(ajaxData)
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    console.log(textStatus);
                    console.log(XMLHttpRequest);
                }
            }
           $.ajaxPackage(startAxList);

        },
        getStoragePremium: function (data) {
            if (data.proCode != this.id) {
                sessionStorage.removeItem('premiumMultiplex')
                return this.startAjax()
            };
            this.submitNum = 0;
            this.fromvalue = data.fromvalue; //处理保费
            this.mainData = data;
            this.setEvents({ data: data })
        },
        setEvents: function (data) {
            var self = this;
            var html = template("tem_forms", data);
            $(".premium-from").html(html);
            $(".lz-readys").remove();
            self.initEvents();
            if ($(".placeCheck").length > 0) {
                self.setCitys(".placeCheck", self.process.code.idCode) //城市选择
            }
            self.dropDown(dropCallback) //下拉框
            self.getoccupa(self.id); //职业选择
            self.events(); //事件监控
            self.setTime_date(); //日期选择
            self.addInsures() //新增被保险人按钮
            self.setMoney(); //设置金额
            self.nextPage()//下一页按钮
            this.scrollTo();//立即领取滑动
            function dropCallback(value) {
                //下拉框回调
                if (value.name.length > 10) {
                    value.name = value.name.slice(0, 10) + "...";
                };
                $("#" + value.id).find(".lz-drop-down-name").html(value.name);
                self.modifyData(value.id, value.value);
                self.ajaxDate();
            }
        },
        /*
        * 修改价格
        * */
        setMoney: function () {
            //    通用
            var self = this;
            var fromvalue = this.fromvalue;
            var onActivity = fromvalue.onActivity || "";
            if (onActivity) {
                $("#resultMoney").html(onActivity);
                return;
            }
            if (!this.mainData.premiumToAmount) {
                $("#resultMoney").html(fromvalue.premium);
            } else {
                $("#resultMoney").html(fromvalue.amount);
                return;
            }
            if (fromvalue.paymentPeriod == 1) {
                if (fromvalue.paymentType && fromvalue.paymentType == "M") return $(".btn-bottom .unit").html("元/月");
                return $(".btn-bottom .unit").html("元");
            } else {
                $(".btn-bottom .unit").html("元/年");
            }
            if (fromvalue.paymentType) {
                if (fromvalue.paymentType == "M") {
                    $(".btn-bottom .unit").html("元/月");
                } else if (fromvalue.paymentType == "Y") {
                    $(".btn-bottom .unit").html("元/年");
                } else if (fromvalue.paymentType == "D") {
                    $(".btn-bottom .unit").html("元/天");
                } else if (fromvalue.paymentType == "N") {
                    $(".btn-bottom .unit").html("元");
                } else if (fromvalue.paymentType == "G") {
                    $(".btn-bottom .unit").html("元/季");
                } else if (fromvalue.paymentType == "B") {
                    $(".btn-bottom .unit").html("元/半年");
                }
            }
        },
        setCitys: function (dom, id) {
            var self = this;
            if (!dom) return;
            var tag = $(dom).eq(0).parents(".items").attr("data-tag") || 3;
            $(dom).click(function () {
                $.layerMsg("城市数据正在请求，请稍等几秒再试！")
            })
            var citysAjax = {
                type: "post",
                url: '/policy/insuranceProduct/api/getAreaBlackList',
                data: { productId: self.process.code.idCode },
                dataType: 'json',
                success: function (data, isError) {
                    console.log(data);
                    if (!isError) {
                        return;
                    }
                    $(dom).unbind("click");
                    //插件初始化
                    new CityPicker().init({
                        cityData: JSON.parse(data.data),
                        intoDom: dom,
                        templateId: "city_templates",
                        itemNum: tag,
                        symbol: " ",
                        subtring: 12
                    }, function (value, item) {
                        citydatas(value, $(item.thisDom).parents(".items").attr("id"), tag);
                    });
                },
            }
           $.ajaxPackage(citysAjax);

            function citydatas(items, domid, num) {
                var citys = {};
                var province = {
                    name: items[0].name,
                    code: items[0].value
                }
                var city = {
                    name: items[1].name,
                    code: items[1].value
                }
                if (num == 2 || items.length == 2) {
                    // 当只有省市的数据时候不仅要 区的数据要传空值过去，可能存在后台要求为三级 但只有两级数据的情况
                    citys = {
                        province: province,
                        city: city,
                        district: {
                            name: "",
                            code: ""
                        }
                    }

                } else {
                    var district = {
                        name: items[2].name,
                        code: items[2].value
                    }
                    citys = {
                        province: province,
                        city: city,
                        district: district
                    }
                }
                if (citys.city) {
                    $("#" + domid).find(".from-right").attr("data-check", 1);
                    self.fromvalue[domid] = citys; //将数据保存到全局变量
                    self.ajaxDate()
                }
            }
        },
        /*
        *  职业选择接口
        * */
        getoccupa(id) {
            var self = this;
            if ($(".occupaCheck").length < 1) return;
            treemenu(id,function(needEvent){
                if(needEvent){
                    occupaEvents()
                }
                $("#occupationScroll .treemenu").find(".hide").removeClass("hide");
                $("#searchTree").val("");
                $("#occupationScroll").addClass("active");
            });
            function treemenu(code,callback) {
                $(".body-container").on('click','.occupaCheck',function() {
                    var id = $(this).parents(".items").attr("id");
                    var itemId=$("#occupationScroll").attr("data-id");
                    if(itemId==id){
                        if(callback)callback(false);
                        return;
                    }
                    var limit = $(this).attr("data-limit");
                    var occupaList = {
                        type: "post",
                        url: "/policy/jobType/api/jobWriteList",
                        data: {
                            productCode: code,
                            jobTypeArray:limit
                        },
                        async: true,
                         success: function(data, isError) {
                            console.log(data);
                            if (!isError) {
                                return;
                            }
                            self.occuData=JSON.stringify(data.data);
                            //职业树
                            var treeHtml = template("occupa_box", data);
                            $(".layer-06 .tree").html(treeHtml).treemenu({ delay: 300 }).openActive();
                            $("#occupationScroll").attr("data-id", id);
                            if(callback)callback(true);
                        },
                        error: function(xhr, type, errorThrown) {
                            //异常处理；
                            console.log(type);
                        }
                    }
                   $.ajaxPackage(occupaList);
                    
                })
            }
            //职业树事件
            function occupaEvents(){
                $(".treemenu").on("click",'.click-tree-a', function() {
                    //if ($(this).next("ul").length > 0)return;
                    var nameArr = "";
                    var code = $(this).parent("li").attr("data-code");
                    var name = $(this).html();
                    var type = $(this).parent("li").attr("data-type")
                        // var id = $(this).parents(".layui-layer-wrap").attr("data-id");
                    var id = $("#occupationScroll").attr("data-id");
                    $("#" + id + " .from-right").attr("data-check", 1);
                    console.log(code);
                    if (name.length > 8) {
                        nameArr = name.slice(0, 8) + "...";
                        $("#" + id + " .occupaCheck").html(nameArr);
                    } else {
                        $("#" + id + " .occupaCheck").html(name);
                    }

                    var opaItems = { name: name, code: code, type: type, id:id};
                    $("#occupationScroll").removeClass("active");
                    self.modifyData(opaItems.id, opaItems);
                    self.ajaxDate();
                })
                    //职业搜索
                $("#searchTree").on("change", function() {
                    var datas=JSON.parse(self.occuData);
                    var value = $(this).val().trim();
                    //清除搜索
                    if (value == "") {
                        var treeHtml = template("occupa_box", {data:datas});
                        $(".layer-06 .tree").html(treeHtml).treemenu({ delay: 300 }).openActive();
                        return;
                    }
                    var result=_.filter(datas,function(o){
                        var fiter_1=false;
                        var result_1=_.filter(o.child,function(n){
                            var fiter_2=false;
                            var result_2=_.filter(n.child,function(m){
                                if(m.name.indexOf(value)>-1){
                                    fiter_2=true;
                                    fiter_1=true;
                                    return m
                                }
                            })
                            if(fiter_2 && result_2 && result_2.length>0){
                                n.child=result_2;
                                return n;
                            }
                        })
                        if(fiter_1 && result_1 && result_1.length>0){
                            o.child=result_1;
                            return o
                        }
                    });
                    if(result && result.length>0){
                        var treeHtml = template("occupa_box", {data:result});
                        $(".layer-06 .tree").html(treeHtml).treemenu({ delay: 300 }).openActive();
                    }else{
                        $(".layer-06 .tree").html('')
                        $.layerMsg('查询不到相关职业')
                    }
                })
                $("#occupationScroll .shadeBox").click(function() {
                    $("#occupationScroll").removeClass("active");
                })
            }
        },
        /*
        * 监听内容改变的状态
        * step
        *  监听页面上所有有changes类名的dom节点
        *  每当内容发生改变，即不为空时则改变他的状态值
        * */
        events:function() {
            var self = this;
            $(document).on("change", ".changes", function () {
                if ($(this) == undefined) return;
                var names = $(this).parents(".items").attr("id"); //获取祖先节点.items的id
                var titles = $(this).parents(".items").find(".lables").html(); //获取祖先元素.items下的.lables
                var value = $(this).val(); //获取当前节点的value值
                value = value ? value.trim() : '';
                var type = $(this).parents(".items").attr("data-type"); //获取当前定义的类型
                if (type === "3" || type === "9" || type === "10") { //输入框
                    if (value) {
                        $(this).parents(".from-right").attr("data-check", 1);
                    } else {
                        $.layerMsg('您填写的内容为空！')
                        $(this).parents(".from-right").attr("data-check", 2);
                        return;
                    }
                }
                self.isFailed = false;
                self.modifyData(names, value);
                self.ajaxDate();

            })
            $("#insuredRelationship").on("change", "input", function () {
                $(this).val() == "1" ? $(this).parents(".items").siblings(".items").hide() : $(this).parents(".items").siblings(".items").show();
            })
        },
        ajaxDate:function() {
            var self = this;
            var url = this.baseUrl + this.id;
            this.submitNum = 1;
            var ajaxDataList = {
                type: "post",
                url: url,
                data: "{json:" + JSON.stringify(this.fromvalue) + "}",
                contentType: "application/json;charset=UTF-8",
                async: false,
                dataType: 'json',
                success: function (data, isError) {
                    console.log(data)
                    self.submitNum = 0;
                    if (!isError) {
                        if (data.httpCode == 205) {
                            self.errorMsg = data.data.errorMsg;
                        }
                        self.httpError = false;
                        return
                    }
                    self.httpError = true;
                    self.fromvalue = data.data.fromvalue;
                    self.fromvalue.premium = data.data.premium; //处理保费
                    self.mainData = data.data;
                    var html = template("tem_forms", data);
                    $(".premium-from").html(html);
                    self.getoccupa(self.id); //职业选择
                    self.setTime_date(); //日期选择
                    self.addInsures() //新增被保险人按钮
                    self.setMoney(self.fromvalue); //设置金额
                    // if (_.get(data, 'data.fromvalue', false)){
                    //     var mitiData=_.get(data, 'data', {});
                    //     // mitiData['proCode']=self.id;
                    //     sessionStorage.setItem('premiumMultiplex', JSON.stringify(data));
                    // }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    console.log(textStatus);
                }
            }
           $.ajaxPackage(ajaxDataList);
        },
        /*
        * 时间选择 jquery-data.js插件
        * step
        * 1.将保存到全局变量self.fromvalue中的投保人与被保险人的投保时间上线与下线获取
        * 2.首先判断当前页面是否存在时间选择dom
        * */
        setTime_date:function() {
            var self = this;
            if ($(".beginTime").length > 0) {
                $(".beginTime").click(function () {
                    var begin = $(this).attr("data-begin") || "1950-01-01";
                    var end = $(this).attr("data-end") || "2030-12-31";
                    var name = $(this).parents(".items").find(".lables").text();
                    $(this).date("beginTime", {
                        beginyear: begin.split("-")[0],
                        endyear: end.split("-")[0]
                    }, function (time, dom) { //time 当前时间
                        var id = $(dom).parents(".items").attr("id")
                        if (begin && end) {
                            //将时间格式转换 并做对比
                            if (!self.timeCompare2(begin, end, time, self.mainData)) {
                                //如果返回false说明年龄错误
                                self.timeAlert2(begin, end, name); //给出相应提示
                                $(dom).parents(".from-right").attr("data-check", 2);
                                return
                            }
                        }
                        $(dom).parents(".from-right").attr("data-check", 1);
                        self.modifyData(id, time); //数据替换
                        //时间请求
                        self.ajaxDate()
                    })
                })

            }
        },
        /*
        * 数据替换
        * */
        modifyData:function(name, value) {
            var fromvalue = this.fromvalue;
            var self = this;
            for (var k in fromvalue) {
                if (k == name) {
                    self.fromvalue[k] = value;
                    break;
                }
            }
        },
        /**
         * 页面渲染需要先处理的其他数据或事件
         */
        initEvents:function() {
            var data = this.mainData;
            if (data.premiumToAmount) {
                //保费和保额互换时将 金额改成 保障额度
                const premiumToAmount = data.premiumToAmount == 1 ? "保障额度" : data.premiumToAmount;
                $(".btn-bottom .left-title").html(premiumToAmount + ":");
                $(".btn-bottom .unit").html("元");
            }
            if ($("#amount").length > 0) {
                $("#amount .from-right-price").html("元");
                $("#amount .from-right-price").css("margin-left", "10px")
            }
            var errorCode = $.getQueryString('errorCode');
            if (errorCode == 1) {
                $.layerAlert('非常遗憾，被保险人无法投保该险种，您可返回首页，选择其他产品！');
            }
        },
        /**
         * 多被保险人，多受益人问题
         */
        addInsures:function() {
            var self = this;
            if ($("#addInsure").length > 0) {
                var limit = self.fromvalue.allowedinsurederAmount;
                var reg = /([^-\s]+)-([^-\s]+)/;
                var this_limit = reg.exec(limit);
                console.log(this_limit[1]);
                $("#addInsure").on("click", function () {
                    var bottomNum = self.mainData.insureButtons;
                    if (this_limit[2] == bottomNum) {
                        $.layerMsg("最多支持" + this_limit[2] + "个被保险人")
                        return
                    }
                    bottomNum++;
                    self.modifyData("insureButtons", bottomNum);
                    self.ajaxDate();
                })
                $("#reduceInsure").on("click", function () {
                    var bottomNum = self.mainData.insureButtons;
                    if (this_limit[1] == bottomNum) {
                        $.layerMsg("最少需要" + this_limit[1] + "个被保险人")
                        return
                    }
                    bottomNum--;
                    self.modifyData("insureButtons", bottomNum);
                    self.ajaxDate();
                })
            }
        },
        /**
         * 点击下一页
         */
        nextPage:function() {
            var self = this;
            $(".btn-next").on("click", function () {
                if (self.submitNum > 0) return;
                self.submitNum++;
                if (self.checkAll() == false) {
                    self.submitNum = 0;
                    return;
                } else if (self.httpError == false) {
                    self.submitNum = 0;
                    $.layerMsg(self.errorMsg)
                    return
                }
                var start_processing = self.fromvalue.start_processing;
                //开始订单前判断是否需要到保险公司进行身份证校验
                if (start_processing) {
                    $.layerinquiry(start_processing, ['确认', '取消'], function () {
                        self.nexthtml();
                    }, function () {
                        self.submitNum = 0;
                    });
                    return;
                }
                self.nexthtml();
            })
        },
        /*
            * 测算页点击下一步验证通过后的接口
            * */
        nexthtml:function() {
            var self = this;
            var productProcess = self.process; //流程
            console.log(productProcess);
            if (self.isFailed == true) return;
            var url = '/bus/core/startPolicy/' + this.id
            var premiumNext = {
                type: "post",
                url: url,
                data: JSON.stringify(self.fromvalue),
                contentType: "application/json;charset=UTF-8",
                dataType: 'json',
                success: function (data, isError) {
                    console.log(data);
                    if (!isError) {
                        self.submitNum = 0;
                        return;
                    }
                    data.data.fromvalue.prod_id = self.id;
                    self.setInform(data.data); //储存数据到服务器

                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    console.log(textStatus);
                    console.log(XMLHttpRequest);
                    if (textStatus == "error") {
                        $.layerMsg('未联网，请先检查网络')
                        self.submitNum = 0;
                    }
                }
            }
           $.ajaxPackage(premiumNext);
        },
        checkAll: function() {
            var items = $(".items");
            var isTrue = true;
            items.each(function() {
                var name = $(this).find(".lables").text();
                var title = $(this).parents(".box").attr('name');
                var type = $(this).attr("data-type");
                var id = $(this).attr("id");
                var form = $(this).children(".from-right");
                var errorMsg = $(form).attr("data-errorMsg");
                if ($(this).hasClass("hide")) return; //元素隐藏时
                if (type === "5") return; //下拉和默认不需要验证
                var checks = $(this).find(".from-right").attr("data-check");
                if (checks === "0") {
                    if (type === "11" || type == "21") {
                        $.layerMsg('您还有资料未上传')
                        isTrue = false;
                        return false;
                    }
                    $.layerMsg(title+'_'+name + "还没有填写")
                    isTrue = false;
                    return false;
                } else if (checks === "2") {
                    $.layerFooter(errorMsg?errorMsg:"请正确填写" + title+'_'+name)
                    isTrue = false;
                    return false;
                }
                isTrue = true;

            })
            return isTrue;
        },
        /*
        * 将时间转换成年月日的形式
        * */
       timeCompare2: function(min, max, time) {
            if (moment(time) >= moment(min) && moment(time) <= moment(max)) {
                return true;
            } else {
                return false;
            }
        },
        timeAlert2: function(min, max, name) {
            name = name || "";
            if (min.indexOf("d") > -1) {
                min = min.replace("d", "");
                $.layerMsg(name + '不符合要求(' + min + '至' + max + ')')
            } else if (min.indexOf("m") > -1) {
                min = min.replace("m", "");
                $.layerMsg(name + '不符合要求(' + min + '至' + max + ')')
            } else {
                $.layerMsg(name + '不符合要求(' + min + '至' + max + ')')
            }
        },
        /*
        * 下拉框
        * param
        * callback（value）-回调 value=返回值
        * */
       dropDown: function(callback,deleteBack) {
            $(".body-container").on("click", ".lz-drop-down-name", function() {
                $(this).siblings(".popupBox").addClass("active");
            })
            $("body").on("click", ".lz-drop-down-option", function() {
                if($(this).attr("data-check") == "true")return $(this).parents(".popupBox").removeClass("active");;
                $(this).attr("data-check", true).siblings().attr("data-check", false);
                var value = {};
                var that = this;
                value.name = $(this).text();
                value.value = $(this).attr("data-value");
                value.id = $(this).parents(".lz-drop-down-layer").attr("data-dom");
                setTimeout(function() {
                    $(that).parents(".popupBox").removeClass("active");
                    if($.tools().isFn(callback))callback(value);
                }, 200)
                
            })
            $("body").on("click", ".shadeBox", function() {
                $(this).parents(".popupBox").removeClass("active");
            })
            $(".body-container").on("click", ".lz-drop-check", function() {
                var value = {};
                value.name = $(this).text();
                value.value = $(this).attr("data-value");
                value.id = $(this).parents(".lz-drop-check-box").attr("data-dom");
                if($(this).siblings().length>0){
                    $(this).attr("data-check", true).siblings().attr("data-check", false);
                    setTimeout(function() {
                        if($.tools().isFn(callback))callback(value);
                    }, 200)
                }else{
                    var check=$(this).attr("data-check");
                    $(this).attr("data-check",!check||check=='false'?'true':'false');
                    if(!check||check=='false'){
                        if(typeof callback === "function"){
                            setTimeout(function() {
                                if($.tools().isFn(callback))callback(value);
                            }, 200)
                        }
                    }else{
                        if($.tools().isFn(deleteBack))deleteBack(value)
                    }
                    return;
                }
            })
        },
        scrollTo:function(){
            var height=$('.premium-from').offset().top;
            $('.btn-get').click(function(){
                window.scrollTo({ 
                    top: height, 
                    behavior: "smooth" 
                });
            })
            
        },
        /**
         * 保险条款
         * 
         */
        getClause:function(){
            //设置全部确认附件提示
            var htmls=[];
            //获取全部附件信息
            var getClause = {
                type: "post",
                url: '/policy/insuranceProduct/api/getClause/'+this.id,
                contentType: "application/json;charset=UTF-8",
                data: '{}',
                dataType: 'json',
                success: function(data, isError) {
                    console.log(data);
                    if (!isError) {
                        return;
                    }
                    var fileDatas=data.data;
                    console.log(fileDatas);
                    for(var k=0;k<fileDatas.length;k++){
                        patternFn(fileDatas[k])
                    }
                    var html = template("productNotices", {data:htmls});
                    $(".clause-box").html(html)
                    checkbox_notice(); //投保确认
                    
                },
            }
            $.ajaxPackage(getClause); 
            function patternFn(fileDatas){
                //正则递归 匹配#?#,符合则遍历插入相关附件
                var pattern='\#.*?\#';
                var t=fileDatas.message.match(pattern);
                if(!t){
                    htmls.push({
                        txt:fileDatas.message,
                        type:fileDatas.type
                    });
                    return;
                };
                var pattername=t[0];
                var filetml=getFiletml(fileDatas[pattername.replace('#','').replace('#','')])
                fileDatas.message=fileDatas.message.replace(pattername,filetml)
                patternFn(fileDatas);
            }
            function getFiletml(file){
                //遍历得到附件html
                var html=''
                for(var i=0;i<file.length;i++){
                    if(!file[i].file || !file[i].fileName)continue;
                    var icon=i>0?',':'';
                    var url=file[i].file;
                    if(url.length==1){
                        html+=icon+'<a href="'+url[0].url+'" class="clause-title">《'+file[i].fileName+'》</a>';
                    }else{
                        html+=icon+"<a class='clause-title clause-tk' data-files='"+JSON.stringify(file[i])+"'>《"+file[i].fileName+"》</a>";
                    }
                }
                return html;
            }
            function checkbox_notice() {//附件选择框事件
                $('#productAccessories').on('click','.check-box',function(){
                    $(this).toggleClass("checkLi");
                })
                $(".clause-tk").click(function () {
                    var data = $(this).attr("data-files");
                    data=JSON.parse(data);
                    var html = template("clauses", data);
                    layer.open({
                        type: 1,
                        content: html,
                        anim: 'up',
                        style: 'position:fixed; top:15%; left:0; width: 100%;height:50%;overflow-y:scroll; border:none;background-color: transparent;'
                    });
                })
            }
        }

    }