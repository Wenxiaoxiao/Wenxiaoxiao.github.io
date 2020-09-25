//公共方法
//测试服务器缓存
!(function ($) {
    //storage储存名称
    var storages = {
        isRead: "isRead", //消息中心会话;
        under_policy_data: "under_policy_data", //核保数据
        saveDatas: "saveDatas", //社区列表页数据
        WTS_USER_3: "WTS_USER_3", //微信用户数据
        planid: "planid", //计划书id数据
        policyid: "policyid", //计划书保存id
        formdatas: "formdatas",
        pay_datas: "pay_datas", //支付信息
        bus_url: "bus_url", // 业务url
        planlist: "planlist", //计划书 条款详情
        goodsdata: "goodsdata", //主贴点赞
        goodsdata_reply: "goodsdata_reply", // 回帖点赞
        veriTime: "veriTime" // 短信验证码时间

    };
    var detail_variable = { //详情页数据
        needInform: true,
        baseUrl: "",
        id: "",
        guaranteeTerm: {},
        isgrages: false,
        code: "",
        isMeasure: false,
        data_bus: {} //档次数据
    };
    var writeInformDatas = { //填写订单页数据
        file: [], //图片数组
        formvalue: {},
        UploadNum: 0,
        mainData: {},
        pay_datas: {}, //pay页面订单信息
        form_name: /^[\u4E00-\u9FA5]{2,10}$/, //姓名验证
        form_tel: /^1[3,5,7,8]\d{9}$/, //电话号码
        form_email: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/, //邮箱
        form_zip: /[1-9]\d{5}(?!\d)/, //邮编
        underNum: 0, //核保次数
        minT_t: "", //投保人最低年龄
        maxT_t: "", //投保人最高年龄
        minT_b: "", //被保人最低年龄
        maxT_b: "", //被保人最高年龄
    };
    var premiumDate = { //测算页数据
        formvalue: {}, //测算页formvalue
        mainData: {},
        submitNum: 0, //提交次数
        submitNum2: 0, //提交次数
        httpError: true,
        errorMsg: "", //错误提示
        minT_t: "", //投保人最低年龄
        maxT_t: "", //投保人最高年龄
        minT_b: "", //被保人最低年龄
        maxT_b: "", //被保人最高年龄
        isFailed: false, //页面错误判断，防止跨函数错误继续传递
    };
    var lz_tools = $.tools();
    var veri; //验证码
    var timerTen; //10分钟有效
    var csAnimates = function () {

        return {
            login: function () {

            },
            //设置用户信息
            setUser: function (user) {
                var self = this;
                if (user) {
                    user.headimgurl == "" || user.headimgurl == "/0" || !user.headimgurl ? $("#auther_img").attr("src", "./lib/images/person-center-03.jpg") : $("#auther_img").attr("src", user.headimgurl);
                    var name = user.nickname.length > 10 ? user.nickname.substring(0, 10) + "..." : user.nickname;
                    $(".myName").html(name); //设置用户名称
                    self.emojiCheck(".emojiCheck"); //emoji过滤;
                } else {
                    $(".myName").html("游客"); //设置用户名称
                }
            },
            settime: function (val) {
                var self = this;
                var phone = /^1[3|4|5|7|8][0-9]\d{4,8}$/; //验证手机号条件
                var timer;
                myPhone = $(".mobile").val();
                if (phone.test(myPhone)) {
                    //验证合格发送验证码
                    var paramList = {
                        url: "/api/cms/sendsms.jspx",
                        data: {
                            "mobile": myPhone
                        },
                        async: true,
                        success: function (data, isError) {
                            console.log(data);
                            if (!isError) {
                                return;
                            }
                            if (!isError) {
                                return;
                            }
                            veri = data.data;
                            console.log(veri);
                            Data = data.data;
                            var countdown = 60;
                            val.value = countdown + "S";
                            timer = setInterval(function () {
                                countdown--;
                                if (countdown < 0) {
                                    val.removeAttribute("disabled");
                                    val.value = "发送验证码";
                                    clearInterval(timer);
                                } else {
                                    val.setAttribute("disabled", true);
                                    val.value = countdown + "S";
                                }
                            }, 1000);
                            var numTen = 600;
                            timerTen = setInterval(function () {
                                console.log(numTen)
                                numTen--;
                                if (numTen < 0) {
                                    veri = "11";
                                    clearInterval(timerTen); //超过十分钟后清除计时器
                                    console.log(veri + "60秒后")
                                }
                            }, 1000)
                        }
                    }
                    $.ajaxPackage(paramList);
                } else {
                    $.layerMsg("手机号不对或为空");
                }
            },
            myClaimsDone: function () {
                // 理赔进度页js
                $("#myClaimsDone_01").removeClass("hide");
                // 理赔进度ajax
                var paramList = {
                    url: "/policy/claimSettle/api/myClaim",
                    data: {
                        pageSize: 200
                    },
                    async: true,
                    success: function (data, isError) {
                        console.log(data);
                        if (!isError) {
                            return;
                        }
                        if (!isError) {
                            return;
                        }
                        var Data = data.data;
                        var Data1 = []; // 进行中
                        var Data2 = []; // 已完成
                        if (Data == "{}") {
                            $(".body-container").css({
                                "min-height": "100vh",
                                "background-color": "#fff"
                            })
                        } else {

                            for (var i = 0; i < Data.length; i++) {
                                if (Data[i].settleStatus == 4) {
                                    Data[i].settleStatus = "已完成";
                                    Data2.push(Data[i]);
                                } else if (Data[i].settleStatus == 0) {
                                    Data[i].settleStatus = "受理中";
                                    Data1.push(Data[i])
                                } else if (Data[i].settleStatus == 1) {
                                    Data[i].settleStatus = "审核中";
                                    Data1.push(Data[i])
                                } else if (Data[i].settleStatus == 2) {
                                    Data[i].settleStatus = "审核通过";
                                    Data1.push(Data[i])
                                } else if (Data[i].settleStatus == 3) {
                                    Data[i].settleStatus = "打款中";
                                    Data1.push(Data[i])
                                }
                            }
                        }


                        // 选项卡切换
                        $(".claimsLine-02 li").on("click", function () {
                            var index = $(this).index();
                            if (index == 0) {
                                // 数据
                                var data = {
                                    isAdmin: true,
                                    list: Data1
                                };
                                var html = template('test', data);
                                document.getElementById('myClaimsDone').innerHTML = html;
                                $(".find-text").html("您目前没有正在理赔的保单");
                            } else {
                                var data = {
                                    isAdmin: true,
                                    list: Data2
                                };
                                var html = template('test', data);
                                document.getElementById('myClaimsDone').innerHTML = html;
                                $(".find-text").html("您目前没有理赔完成的保单");
                            }

                            $(this).addClass("active").siblings().removeClass("active");
                            // 展示
                            console.log(data);


                        });
                        // 第一个是进行中
                        $(".claimsLine-02 li").eq(0).click();
                        $(".lz-readys").remove(); //去掉加载动画
                    }
                }
                $.ajaxPackage(paramList);

            },
            myClaims: function () {
                // 我要理赔页面js
                $("#myClaims_01").removeClass("hide");
                // 注释参数orderBy: "y.create_time"
                var paramList = {
                    url: "/policy/policy/api/myEffectivedPolicy",
                    data: {
                        effectiveStatus: 1,
                        asc: false,
                        pageSize: 200
                    },
                    async: true,
                    success: function (data, isError) {
                        console.log(data);
                        if (!isError) {
                            return;
                        }
                        var retData = data.data;
                        var Data = new Array();
                        $.each(retData, function (k, v) {
                            if (v.effectiveStatus == 1) {
                                Data.push(v);
                            }
                        });
                        if (Data == "{}" || Data.length == 0) {
                            $(".headerPoint").css({
                                "display": "block"
                            });
                            $("#listclaims").css({
                                "display": "none"
                            });
                        } else {
                            $(".headerPoint").css({
                                "display": "none"
                            });
                            $("#listclaims").css({
                                "display": "block"
                            });
                            var data = {
                                isAdmin: true,
                                list: Data
                            };
                            var html = template('claimsPolicy', data);
                            document.getElementById('listclaims').innerHTML = html;
                        }
                        $(".lz-readys").remove(); //去掉加载动画
                    }
                }
                $.ajaxPackage(paramList);

            },
            img_big: function (id, type) {
                //图片放大
                if (type) {
                    $(id).viewer({
                        url: "data-original",
                        title: false,
                        toolbar: false,
                        navbar: false
                    });
                } else {
                    $(id).viewer({
                        title: false,
                        toolbar: false,
                        navbar: false
                    });
                }

            },
            myZoneDetails: function () {
                var self = this;
                var isloading = false;
                var num = 1;
                var submitNum = 0;
                var pages;
                var textHeight = 1;
                var idNum = $.getQueryString('id');
                var saveDatas = $.tools().getLocal(storages.saveDatas);
                saveDatas = JSON.parse(saveDatas);
                var u = navigator.userAgent,
                    app = navigator.appVersion;
                var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
                if (isiOS) {
                    $('.inp1').focus(function () {
                        window.setTimeout('scrollBottom()', 500);
                    });
                }

                function scrollBottom() {
                    window.scrollTo(0, $('body').height());
                }

                detailsAjax(num, true);

                function detailsAjax(num, isTrue) {

                    var paramList = {
                        type: 'GET',
                        url: "/app/sq/mainpost/api/detail",
                        data: {
                            id: idNum,
                            pageNo: num,
                            pageSize: "10",
                            isTemp: "123"
                        },
                        dataType: 'json',
                        async: true,
                        success: function (data, isError) {
                            console.log(data);
                            if (!isError) {
                                return;
                            }
                            if (isTrue) {
                                var comments = commentsNum(data.data.replys);
                                var html = template("test", data);
                                $(".layer_img").before(html);
                                if (comments == 0) {
                                    $(".detailsContent >dt").hide()
                                }
                                if (comments == data.data.replys.length && data.data.replys.length > 0) {
                                    $(".contentTitle").hide();
                                }
                                self.dianzan_click(); //点赞
                                self.hasgoods(); //点赞去重
                            } else {
                                var list = template("appendTemplate", data);
                                $("#detailsContent.ddBox").append(list);
                            }
                            zoneShare(data.data.title || data.data.content)
                            console.log(vedioUrl)
                            var vedioUrl = data.data.vedioUrl
                            self.img_big("#imgBox") //图片放大
                            self.emojiCheck(".emojiCheck");
                            saveDatas.postId = data.data.id;
                            self.dianzan_reply_click();
                            self.hasgoodsReply();
                            inputMore("#textareas") //文字输入换行
                            $(document).on("click", ".layer-marketing", function () {
                                self.layer_ewcode();
                            })
                            if (isTrue) {
                                pages = Math.floor(data.data.commentNum / 10) + 1;
                                if (pages == 1) return;
                            }
                            if (pages <= num) {
                                $(".lz-morecontent").text("没有更多了");
                                isloading = false;
                                return $(window).unbind("scroll");
                            }
                            scroll(); //滑动加载更多
                            //clickLoadMore(data) 点击加载更多
                        }
                    };
                    $.ajaxPackage(paramList);

                    function zoneShare(desc) {
                        var tools = $.tools();
                        var appId = tools.getWxId();
                        var url = location.href.split('#')[0];
                        var title = "梧桐树保险网保险问答";
                        var desc = desc || "保民投保交流平台，个人及家庭保险配置方案分享，保险常见问题咨询";

                        var shareUrl = url;

                        var img = "http://" + $.domain + "/lib/images/logo-3.jpg";


                        // 调用服务器获取签名
                        $.ajax({
                            type: "POST",
                            url: "/tools/wechat/api/getJssdk",
                            data: {
                                appid: appId,
                                url: url
                            },
                            async: false,
                            dataType: 'json',
                            success: function (data) {
                                wx.config({
                                    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                                    appId: appId, // 必填，公众号的唯一标识
                                    timestamp: data.data.timeStamp, // 必填，生成签名的时间戳
                                    nonceStr: data.data.nonceStr, // 必填，生成签名的随机串
                                    signature: data.data.signature, // 必填，签名，见附录1
                                    jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                                });
                                wx.ready(function () {
                                    //分享到朋友圈
                                    wx.onMenuShareTimeline({
                                        title: title,
                                        desc: desc,
                                        link: shareUrl,
                                        imgUrl: img,
                                        success: function () {
                                            //$.layerMsg('分享成功！');
                                        },
                                        cancel: function () {
                                            $.layerMsg('取消分享！');
                                        },
                                        fail: function (res) {
                                            alert(JSON.stringify(res));
                                        }
                                    });
                                    //分享给朋友
                                    wx.onMenuShareAppMessage({
                                        title: title,
                                        desc: desc,
                                        link: shareUrl,
                                        imgUrl: img,
                                        trigger: function (res) {
                                            // 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回
                                            //alert('发送成功');
                                        },
                                        success: function (res) {
                                            //$.layerMsg('已分享！');
                                        },
                                        cancel: function (res) {
                                            $.layerMsg('已取消！');
                                        },
                                        fail: function (res) {
                                            alert(JSON.stringify(res));
                                        }
                                    });
                                    //alert('已注册获取“发送给朋友”状态事件');

                                });

                                wx.error(function (res) {
                                    console.log(res);
                                });

                            }
                        });
                    }
                }

                /*
                 * 文字输入自动换行
                 * dom-元素
                 * */
                function inputMore(dom) {
                    $(dom).on("keyup", function () {
                        var text = $(this).val();
                        var count = $(this).siblings(".textCount")
                        count.text(text);
                        var width = count.width(); //文字长度
                        var thisWidth = $(this).width(); //容器长度
                        console.log(width);
                        console.log(thisWidth);
                        if (width > thisWidth - 50 && width < thisWidth - 10) { //一行
                            textHeight = 1;
                            $(this).attr("rows", textHeight);
                        } else if (width > thisWidth - 10 && width < thisWidth * 2 - 10) { //两行
                            textHeight = 2;
                            $(this).attr("rows", textHeight);
                        } else if (width > thisWidth * 2 - 10 && width < thisWidth * 3 - 10) { //三行
                            textHeight = 3;
                            $(this).attr("rows", textHeight);
                        }

                    })
                }

                function commentsNum(data) {
                    //最佳评论数量
                    var bestNum = 0;
                    for (var k in data) {
                        if (data[k].isBest == "true") {
                            bestNum++;
                        }
                    }
                    return bestNum;
                }

                function scroll() {
                    $(".isLoadShow").hide()
                    //下拉到底部显示更多评论
                    $(window).bind("scroll", function () {
                        if ($(document).scrollTop() + $(window).height() >
                            $(document).height() - 50 && !isloading) {
                            num++;
                            detailsAjax(num, false);
                            $(".isLoadShow").show()
                        }
                    });
                }

                function getMore(num) {
                    //获取更多评论
                    var paramList = {
                        url: "/app/sq/mainpost/api/detail",
                        data: {
                            id: idNum,
                            pageNo: num,
                            pageSize: "10",
                            isTemp: "123"
                        },
                        dataType: 'json',
                        async: true,
                        success: function (data, isError) {
                            console.log(data);
                            if (!isError) {
                                return;
                            }
                            var list = template("appendTemplate", data);
                            $("#detailsContent.ddBox").append(list);
                            self.emojiCheck(".emojiCheck");
                            if (pages <= num) {
                                $(".lz-morecontent").text("没有更多了");
                                isloading = false;
                                return $(window).unbind("scroll");
                            }
                        }
                    }
                    $.ajaxPackage(paramList);
                }

                //发送事件
                $(document).on("click", ".sent", function () {
                    if (saveDatas.userid == '-1') {
                        self.layersActives();
                        return;
                    }

                    if (submitNum > 0) return;
                    submitNum++;
                    setTimeout(function () {
                        submitNum = 0;
                    }, 2000)
                    var content = $(".inp1").val().trim();
                    if (!content) {
                        submitNum = 0;
                        return $.layerMsg('您输入的内容为空！');
                    }
                    saveDatas.content = content;
                    console.log(saveDatas)
                    var sentList = {
                        url: "/app/sq/mainpost/api/reply",
                        contentType: 'application/json;charset=utf-8',
                        data: JSON.stringify(saveDatas),
                        dataType: 'json',
                        async: true,
                        success: function (data, isError) {
                            console.log(data);
                            if (!isError) {
                                return;
                            }
                            $(".inp1").val("");
                            $.layerMsg('您的留言已上传，飞速审核中！');
                        }
                    }
                    $.ajaxPackage(sentList);
                });
                //点击加载更多
                function clickLoadMore(data) {
                    $(".icon-shuaxin").show()
                    $(".isLoadShow").hide()
                    if (data.data.replys.length < 10) {
                        $(".lz-morecontent .icon-shuaxin").hide();
                        $(".lz-morecontent span").text("没有更多了");
                        $(".lz-morecontent").unbind("click")
                        return;
                    }

                    $(".lz-morecontent").on("click", function () {
                        num++;
                        detailsAjax(num, false);
                        $(".icon-shuaxin").hide()
                        $(".isLoadShow").show()
                    })
                }

            },
            textmore: function (dom) {
                //文字收起
                //当文字高度大于75时，显示展开文字按钮
                if (dom.length == 1) {
                    var text = dom.text();
                    var height = $(dom).height();
                    if (height > 75) {
                        dom.siblings(".stop").text("展开").addClass("stop-after");
                        $(this).addClass("active");
                        dom.siblings(".stop").on("click", function () {
                            if ($(this).text() == "展开") {
                                $(this).prev().removeClass("active");
                                $(this).text("收起").addClass("stop-active")
                            } else {
                                $(this).prev().addClass("active");
                                $(this).text("展开")
                                $(this).text("展开").removeClass("stop-active")
                            }
                        })
                    }
                } else {
                    dom.each(function () {
                        var that = this;
                        var text = $(this).text();
                        var height = $(this).height();
                        if (height > 75) {
                            $(this).parents("a").siblings(".stop").text("展开").addClass("stop-after");
                            $(this).addClass("active");
                            $(this).parents("a").siblings(".stop").on("click", function () {
                                if ($(this).text() == "展开") {
                                    $(that).removeClass("active");
                                    $(this).text("收起").addClass("stop-active")
                                } else {
                                    $(that).addClass("active");
                                    $(this).text("展开").removeClass("stop-active")
                                }
                            })
                        }
                    })
                }

            },
            img_check: function (dom) {
                //图片字符串过滤
                if (dom.length == 1) {
                    var content = dom.html();
                    if (content.trim() == "") return;
                    content = content.split(",");
                    var html = "";
                    if (content.length > 1) {
                        for (var k in content) {
                            if (k > 1) {
                                break;
                            }
                            html += '<span style="background-image: url(' + content[k] + ')" class="imgTwo"><img src="' + content[k] + '" class="img-hidden"/></span>'
                        }
                    } else {
                        html = '<span style="background-image: url(' + content[0] + ')" class="imgOne"><img src="' + content[0] + '" class="img-hidden"/></span>'
                    }
                    return dom.html(html);
                } else {
                    dom.each(function () {
                        var content = $(this).html();
                        if (content.trim() == "" || content.indexOf("img") != -1) return;
                        content = content.split(",");
                        var html = "";
                        if (content.length > 1) {
                            for (var k in content) {
                                if (k > 1) {
                                    break;
                                }
                                html += '<span style="background-image: url(' + content[k] + ')" class="imgTwo"><img src="' + content[k] + '" class="img-hidden"/></span>'
                            }
                        } else {
                            html = '<span style="background-image: url(' + content[0] + ')" class="imgOne"><img src="' + content[0] + '" class="img-hidden"/></span>'
                        }
                        $(this).html(html);
                    })
                }

            },
            layer_ewcode: function () {
                //二维码弹出框
                layer.open({
                    type: 1,
                    closeBtn: 0, //不显示关闭按钮
                    anim: 2,
                    title: false,
                    shadeClose: true, //开启遮罩关闭
                    content: $(".layer_img"),
                    skin: "layer_img-box"
                });
            },
            layersActives: function () {
                var html =
                    '<div class="layers-actives">' +
                    '    <img src="https://bx.wts999.com/lib/images/activity-mobile.png" alt=""/>' +
                    '</div>';

                layer.open({
                    type: 1,
                    content: html,
                    anim: 'up',
                    style: 'position:fixed; top:30%; left:0; width: 100%; padding:10px 0; border:none;background-color: transparent;'
                });
            },
            imgenter: function (url) {
                //插入图像
                if (!url) {
                    $(".myPhoto").attr("src", './lib/images/default_auther.png');
                    return
                }
                $(".myPhoto").attr("src", url);
            },
            /*
             * 下拉刷新
             * */
            downLoaded: function (downCallback) {
                var thisY;
                var useDown = true;
                this.mescroll = new MeScroll("mescroll", {
                    //第一个参数"mescroll"对应上面布局结构div的id
                    down: {
                        callback: downCallback, //下拉刷新的回调,别写成downCallback(),多了括号就自动执行方法了
                        use: useDown,
                        auto: true,
                        isBoth: false,
                        offset: 80, //下拉长度
                        minAngle: 45,
                        mustToTop: true,
                        outOffsetRate: 0.2,
                        hardwareClass: "mescroll-hardware",
                        warpClass: "mescroll-downwarp",
                        htmlContent: '<p class="downwarp-progress"></p> <p class="downwarp-tip">下拉刷新</p>' //下拉出现dom
                    },
                    up: {
                        use: false,
                        scrollbar: {
                            use: false
                        },
                        warpClass: "",
                        onScroll: function (mescroll, y) {
                            if (y < thisY) {
                                mescroll.optUp.toTop = {
                                    src: "./lib/images/sq_go_top.png",
                                    offset: 2000,
                                    warpClass: "mescroll-totop",
                                    showClass: "mescroll-fade-in",
                                    hideClass: "mescroll-fade-out",
                                    duration: 200
                                };
                            } else {
                                mescroll.hideTopBtn();
                            }
                            thisY = y;
                        }
                    }
                });
                return this.mescroll;
            },
            myZone: function () {
                var self = this;
                self.zoneAjax1();
                self.zoneNav_changes();
            },
            zoneAjax1: function () {
                //我的发表ajax
                $(window).unbind("scroll");
                var isloading = false;
                var num = 1;
                var self = this;
                getZones();
                $(window).bind("scroll", function () {
                    if ($(document).scrollTop() + $(window).height() >
                        $(document).height() - 50 && !isloading) {
                        isloading = true;
                        getZones();
                    }
                });
                /*
                 * 获取帖子
                 * */
                function getZones() {
                    var paramList = {
                        url: "/app/sq/mainpost/api/myPub",
                        dataType: "json",
                        data: {
                            pageNo: num,
                            pageSize: "5"
                        },
                        async: true,
                        success: function (data, isError) {
                            console.log(data)
                            if (!isError) {
                                return;
                            }
                            if (data.data.length == 0) {
                                var html = '<i class="iconfont icon-fabiaowenzhang"></i>' +
                                    '<p class="lz-fs-32 text_inputs t-align-c">您还没有帖子发出，快去踊跃参与吧！</p>'
                                return $(".mainContent-left").html(html);
                            }
                            if (num == 1) {
                                $(".mainContent-left").html("");
                            }
                            var html = template('test', data);
                            $(".mainContent-left").append(html);
                            self.img_check($(".imgBox"));
                            self.img_big(".imgBox"); //图片放大
                            self.textmore($(".text2")); //文字更多
                            self.emojiCheck($(".emojiCheck")); //表情过滤
                            if (data.current == data.pages) {
                                var html2 = '<a href="javascript:;" class="lz-morecontent"><i class="iconfont icon-shuaxin"></i>没有更多了</a>';
                                $(".mainContent-left").append(html2);
                                return;
                            }
                            isloading = false;
                            num++;
                        }
                    };
                    $.ajaxPackage(paramList);

                }
            },
            /*
             * 我的评论
             * 滚动到底部自动刷出新帖
             * */
            zoneAjax2: function () {
                //我的评论ajax
                $(window).unbind("scroll");
                var self = this;
                var isloading = false;
                var num = 1;
                getZones();

                $(window).bind("scroll", function () {
                    if ($(document).scrollTop() + $(window).height() >
                        $(document).height() - 50 && !isloading) {
                        isloading = true;
                        getZones();
                    }
                });

                function getZones() {
                    var paramList = {
                        url: "/app/sq/mainpost/api/myReply",
                        dataType: "json",
                        data: {
                            pageNo: num,
                            pageSize: "5"
                        },
                        async: true,
                        success: function (data, isError) {
                            console.log(data)
                            if (!isError) {
                                return;
                            }
                            if (data.data.length == 0) {
                                var html = '<i class="iconfont icon-fabiaowenzhang"></i>' +
                                    '<p class="lz-fs-32 text_inputs t-align-c">您尚未发表过评论，快去参与讨论吧！</p>'
                                return $(".mainContent-right").html(html);
                            }
                            if (num == 1) {
                                $(".mainContent-right").html("");
                            }
                            var html = template('test', data);
                            $(".mainContent-right").append(html);
                            self.img_check($(".imgBox"));
                            self.img_big(".imgBox"); //图片放大
                            self.textmore($(".text2")); //文字更多
                            self.emojiCheck($(".emojiCheck")); //表情过滤
                            if (data.current == data.pages) {
                                var html2 = '<a href="javascript:;" class="lz-morecontent"><i class="iconfont icon-shuaxin"></i>没有更多了</a>';
                                $(".mainContent-right").append(html2);
                                return;
                            }
                            isloading = false;
                            num++;
                        }
                    }
                    $.ajaxPackage(paramList);
                }
            },
            /*
             * 我的帖子列表-导航栏切换
             * */
            zoneNav_changes: function () {
                //导航切换
                var self = this;
                $(".claimsLine2").on("click", "li", function () {
                    var index = $(this).index();
                    $(this).addClass("active").siblings().removeClass("active");
                    $(".claimsLine2").siblings(".contents").children("ul").eq(index).addClass("active").siblings().removeClass("active");
                    index === 0 ? self.zoneAjax1() : self.zoneAjax2();
                })
            },
            /*
             * 表情处理-过滤服务器传的emoji表情
             * */
            emojiCheck: function (dom) {
                $(dom).each(function () {
                    var html = $(this).html().trim();
                    html = jEmoji.softbankToUnified(html);
                    html = jEmoji.googleToUnified(html);
                    html = jEmoji.docomoToUnified(html);
                    html = jEmoji.kddiToUnified(html);
                    $(this).html(jEmoji.unifiedToHTML(html));
                })

            },
            insuranceInfor: function (dom) {
                //详情页保险信息导航
                $(dom).on("click", function () {
                    var _this = $(this);
                    var index = _this.index();
                    _this.addClass("active").siblings().removeClass("active");
                    _this.parents().siblings(".ul-content").children(".ul-contents").eq(index).addClass("active").siblings().removeClass("active");
                })
            },
            /*
             *<!-- 轮播图  盒子，导航-->
             * dom-节点
             * pig-分页class
             * */
            swiper_banner: function (dom, pig) {
                //轮播图ajax请求，获取图片跟url地址
                var bannerList = {
                    type: "get",
                    url: "/api/cms/superm/banner.jspx",
                    contentType: "application/json;charset=UTF-8",
                    data: {
                        type: "mobile"
                    },
                    dataType: 'json',
                    success: function (ajaxData, isError) {
                        console.log(ajaxData);
                        if (!isError) {
                            return;
                        }
                        var list = template("index_banner", ajaxData);
                        $(".swiper-container").append(list)
                        //banner轮播
                        if (ajaxData.data.length > 1) { // 首页-轮播,大于一张图片才轮播
                            var mySwiper = new Swiper(dom, {
                                autoplay: {
                                    delay: 2000, //可选选项，自动滑动
                                    disableOnInteraction: false,
                                },
                                lazy: {
                                    // 图片懒加载
                                    loadPrevNext: true,
                                    loadOnTransitionStart: true //过渡一开始就加载
                                },
                                loop: true,
                                loopAdditionalSlides: 1,
                                pagination: {
                                    el: pig,
                                }
                            })
                        }
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        //console.log(textStatus);
                    }
                }
                $.ajaxPackage(bannerList);
            },
            /*
             * 首页热点新闻-轮播
             * */
            index_headlines: function () {
                var headlinesList = {
                    type: "get",
                    url: "/api/cms/superm/hot.jspx",
                    data: {
                        pageNo: 1,
                        pageSize: 5
                    },
                    dataType: 'json',
                    success: function (ajaxData, isError) {
                        console.log(ajaxData);
                        if (!isError) {
                            return;
                        }
                        var list = template("headlines", ajaxData);
                        $(".hot-swiper").html(list);

                        // //轮播
                        var mySwipers = new Swiper('.swiper-container-tt', {
                            autoplay: {
                                delay: 3000,
                                disableOnInteraction: false,
                            }, //自动滑动
                            loop: true,
                            loopAdditionalSlides: 1,
                            direction: 'vertical'
                        })

                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        console.log(textStatus);
                    }
                }
                $.ajaxPackage(headlinesList);
            },
            index_reads: function () {
                //首页本地阅读
                var reads = {};
                var read_text = storages.isRead;
                if (window.localStorage) {
                    var newread = {
                        myNews: [],
                        activeNews: []
                    }
                    reads = $.tools().getLocal(read_text);
                    reads = JSON.parse(reads);
                    /*
                     * 本地储存的消息是否存在，且判断是否阅读过
                     * */
                    if (!reads) {
                        $.tools().setLocal(read_text,JSON.stringify(newread));
                    } else {
                        if (checkRead(reads)) {
                            $(".headBarConnet .left-text").addClass("active");
                        } else {
                            $(".headBarConnet .left-text").removeClass("active");
                        }
                    }
                }
                //检测消息是否阅读
                function checkRead(data) {
                    var one = false;
                    var two = false;
                    if (data.myNews == [] && data.activeNews == []) {
                        return false;
                    }
                    if (data.myNews != []) {
                        for (var k in data.myNews) {
                            if (data.myNews[k] == "true") {
                                one = true;
                                break;
                            }
                        }
                    } else {
                        one = false;
                    }
                    if (data.activeNews != []) {
                        for (var k in data.activeNews) {
                            if (data.activeNews[k] == "true") {
                                two = true;
                                break;
                            }
                        }
                    } else {
                        two = false;
                    }
                    if (one == false && two == false) {
                        return false;
                    } else {
                        return true;
                    }
                }
            },
            /**
             * 攻略分享详情
             */
            To_shaerDetails: function (user, isVideo) {
                var self = this;
                var id = $.getQueryString("id");
                var pageNum = 1; //开始的索引
                var pageSize = 10; //评论数据条目
                var isloading = true;
                var parentId = "",
                    sendNum = 0;
                console.log(id)
                shareAjaxDls(id); //文章详情接口
                /**
                 * 获取详情数据
                 */
                function shareAjaxDls(id) {
                    var paramList = {
                        type: "post",
                        url: "/app/article/api/detail",
                        contentType: "application/json",
                        data: "{id:" + id + "}",
                        async: false,
                        success: function (data, isError) {
                            console.log(data);
                            if (!isError) {
                                return;
                            }
                            var list = template("topTxtCont", data);
                            $(".top-box").html(list)
                            $(".lz-readys").remove();
                            self.productSwiper(data.data.articleProductList); //产品轮播
                            if (isVideo) jpLayerPay(data.data); //视频播放插件功能
                            dianzanClass(id); //点赞校验 存在改ID设置active
                            scrollPageCmt(); //评论分页
                            commentListFn(); //评论列表接口
                            inputCommentFn(id) //评论弹窗
                            shareText(data.data) //分享

                            $(".click-like").click(function () {
                                // 点赞点击+1
                                if (!self.shareDianzan(data.data.id)) return;
                                $(this).addClass("active");
                                var num = $(this).find(".link-num").attr("data-readTime") - 0 + 1;
                                $(this).find(".link-num").attr("data-readTime", num);
                                num = num < 10000 ? num : (num / 10000).toFixed(1) + "万";
                                $(this).find(".link-num").html(num);
                                dianzanAjax(id)
                            })
                        }
                    };
                    $.ajaxPackage(paramList);
                }

                function shareText(data) {
                    self.shareWx(data.articleTitle, "https://" + $.domain + "/lib/images/logo-3.jpg", data.articleDesc, lz_tools.getWxId()); //微信分享
                }
                /**
                 * 点赞接口 调玩数据自动加1
                 */
                function dianzanAjax(id) {
                    var paramList = {
                        type: "get",
                        url: "/app/article/api/laud/" + id + "?userId=",
                        async: false,
                        success: function (data, isError) {
                            console.log(data);
                            if (!isError) {
                                return;
                            }
                        }
                    };
                    $.ajaxPackage(paramList);
                }
                //滑动分页
                function scrollPageCmt() {
                    $(window).bind("scroll", function () {
                        if (
                            $(window).scrollTop() + $(window).height() >=
                            $(document).height() - 50 &&
                            !isloading
                        ) {
                            // 当滑出距离大度页面高度
                            isloading = true;
                            pageNum++; //下一页
                            commentListFn(); //再次请求
                        }
                    });
                }
                //点击留言评论--回复 --- 查看更多
                function inputCommentFn(id) {
                    //评论
                    $(".comment-container").on("click", ".massage>a", function () {
                        // if(!$.tools().isWeiXin()){
                        //     return $.layerAlert("请在微信浏览器打开")
                        // }
                        $(".comment-bg-box").show().find("#sendMsg").attr("data-type", 1);
                        parentId = "";
                    })
                    //回复
                    $(".comment-container").on("click", ".sendRecomment", function () {
                        if (!$.tools().isWeiXin()) {
                            return $.layerAlert("请在微信浏览器打开")
                        }
                        parentId = $(this).attr("data-id");
                        $(".comment-bg-box").show().find("#sendMsg").attr("data-type", 2);
                    })
                    $("#sendMsg").click(function () {
                        if (sendNum > 0) return;
                        sendNum++;
                        var type = $(this).attr("data-type");
                        var content = $(".c_user_text").val().trim().toString();
                        console.log(content)
                        if (!content || content == "") {
                            $.layerMsg('您还没有输入评论内容');
                            sendNum = 0;
                            return
                        }
                        if (content.length > 100) {
                            sendNum = 0;
                            return $.layerMsg('回复字数请在100字以内！');
                        }
                        addCommentFn(id, user, content, type); //提交评论接口
                    })
                    $(".bac-close").click(function () {
                        $(".comment-bg-box").hide();
                    })
                    self.uploadImg = [];
                    self.detailUpload();
                }

                function addCommentFn(id, indexDate, content, type) {
                    var imgArr = self.uploadImg;
                    var imgs = '';
                    for (var k in imgArr) {
                        imgs += imgArr[k].url + ',';
                    }
                    var data = {
                        userId: indexDate.id,
                        userName: indexDate.nickname,
                        imgUrl: indexDate.headimgurl,
                        articleId: id,
                        content: content,
                        parentId: parentId,
                        commentImgs: imgs
                    }
                    var paramList = {
                        type: "post",
                        url: "/app/articlecomment/api/addComment",
                        contentType: "application/json",
                        data: JSON.stringify(data),
                        async: false,
                        success: function (data, isError) {
                            console.log(data);
                            sendNum = 0;
                            if (!isError) {
                                return;
                            }
                            $(".comment-bg-box").hide().find(".c_user_text").val("");
                            self.uploadImg.length = 0;
                            if (self.uploader) {
                                self.uploader.reset()
                                $('.uploader-list').html('');
                            }

                            setTimeout(function () {
                                $.layerMsg('您的评论已提交成功！');
                                setNewRecomed(type == 1 ? data.data.id : parentId, indexDate, type, content)
                            }, 200)
                        },
                        error: function (data, isError) {
                            sendNum = 0;
                        }
                    };
                    $.ajaxPackage(paramList);
                }
                /**
                 * 评论后展示页面
                 * @param {*} id 文章id
                 * @param {*} user 用户信息
                 * @param {*} type  1-评论 2-回复
                 * @param {*} content  内容
                 */
                function setNewRecomed(id, user, type, content) {
                    var imgArr = self.uploadImg;
                    var imgs = '';
                    for (var k in imgArr) {
                        imgs += imgArr[k].url + ',';
                    }
                    var data = {
                        id: id,
                        type: type,
                        userName: user.nickname,
                        img: user.headimgurl,
                        createTime: moment().format("YYYY-MM-DD HH:mm:ss"),
                        content: content,
                        commentImgs: imgs
                    }

                    var html = template("commentLi", data);
                    if (type == 1) {
                        $(".comment-list").prepend(html);
                        $(".comment_null").remove();
                    } else if (type == 2) {
                        $(".comment-list >li").each(function () {
                            var id = $(this).attr("data-id");
                        })
                        if ($("#txt_" + id).find(".recommentBox").length > 0) {
                            $("#txt_" + id).find(".recommentBox").prepend(html);
                        } else {
                            var doms = '<div class="recommentBox">' + html + '</div>';
                            $("#txt_" + id).find(".c_content-box").append(doms)
                        }
                    }
                }
                /**
                 * 
                 * @param {主题id} id
                 * 评论列表接口 
                 */
                function commentListFn() {
                    var userId = user ? user.id : "''";
                    var paramList = {
                        type: "post",
                        url: "/app/articlecomment/api/query/1_8",
                        contentType: "application/json",
                        data: "{articleId:" + id + ",pageSize:" + pageSize + ",pageNum:" + pageNum + ",userId:" + userId + "}",
                        async: false,
                        success: function (data, isError) {
                            isloading = false;
                            console.log(data);
                            if (!isError) {
                                return;
                            }

                            if (data.data.length < pageSize || Math.ceil(data.total / pageSize) == pageNum) isloading = true;
                            var html = template("commentTml", data);
                            $(".comment-container .comment-list").append(html)
                            // if(pageNum == 1){
                            // textMoreFn() //评论收起与更多
                            // }  
                            $("img.lazy").lazyload({
                                effect: "fadeIn",
                                threshold: 1000,
                            }); //图片懒加载
                            self.img_big(".commentImgs", 2); //图片放大
                        }
                    };
                    $.ajaxPackage(paramList);
                }
                /**
                 * 评论收起与更多
                 */
                function textMoreFn() {
                    $(".comment-container").on("click", ".userContent .more", function () {
                        var txt = $(this).attr("data-text");
                        var type = $(this).attr("data-type");
                        if (type == "1") {
                            $(this).parent(".userContent").find("p").text(txt);
                            $(this).attr("data-type", "2").find("span").text("收起").next("i").addClass("hide")
                        } else {
                            txt = txt.substring(0, 53) + "...";
                            $(this).parent(".userContent").find("p").text(txt);
                            $(this).attr("data-type", "1").find("span").text("更多").next("i").removeClass("hide")
                        }
                    })
                }
                //点赞动画
                function dianzanClass(id) {
                    var datas = $.tools().getLocal(storages.shareGoodsdata);
                    if (datas != null && datas.indexOf(id) > -1) {
                        $(".click-like").addClass("active")
                    }
                }
                //视频播放
                function jpLayerPay(data) {
                    if ($(".video-pay-box").length == 0) {
                        //音频播放
                        audiojs.events.ready(function () {
                            var as = audiojs.createAll();
                        });
                        return
                    };
                    // 视频播放
                    var videoHeight = $(window).width() / (16 / 9) + "px";
                    $(".video-pay-box").height(videoHeight)
                    var player = new Aliplayer({
                        "id": "AliPlay",
                        "source": data.videoUrl.url,
                        "width": "100%",
                        "height": videoHeight,
                        "autoplay": false,
                        "isLive": false,
                        "cover": data.videoImg,
                        "rePlay": false,
                        "playsinline": false,
                        "preload": false,
                        "controlBarVisibility": "click",
                        "showBarTime": 5000,
                        "useH5Prism": true,
                        "x5_type": "h5",
                        "x5_fullscreen": false,
                        "components": [{
                            "name": 'MemoryPlayComponent',
                            "type": AliPlayerComponent.MemoryPlayComponent,
                        }],
                        "skinLayout": [{
                            "name": "bigPlayButton",
                            "align": "blabs",
                            "x": $(window).width() / 2 - 32,
                            "y": 80
                        },
                        {
                            "name": "H5Loading",
                            "align": "cc"
                        },
                        {
                            "name": "errorDisplay",
                            "align": "tlabs",
                            "x": 0,
                            "y": 0
                        },
                        {
                            "name": "infoDisplay"
                        },
                        {
                            "name": "tooltip",
                            "align": "blabs",
                            "x": 0,
                            "y": 56
                        },
                        {
                            "name": "thumbnail"
                        },
                        {
                            "name": "controlBar",
                            "align": "blabs",
                            "x": 0,
                            "y": 0,
                            "children": [{
                                "name": "progress",
                                "align": "blabs",
                                "x": 0,
                                "y": 44
                            },
                            {
                                "name": "playButton",
                                "align": "tl",
                                "x": 15,
                                "y": 12
                            },
                            {
                                "name": "timeDisplay",
                                "align": "tl",
                                "x": 10,
                                "y": 7
                            },
                            ]
                        }
                        ]
                    }, function (player) {
                        console.log("播放器创建了。");
                    });

                    var setLayout = function (type) {
                        //设置播放器容器的高度
                        if (type == 2) {
                            player.el().style.height = videoHeight
                        } else {
                            player.el().style.height = "100%";
                        }
                    }
                    window.onresize = function () {
                        setLayout();
                    }
                    player.on("requestFullScreen", function () {
                        setLayout();
                    });
                    // player.on("x5cancelFullScreen", function(n) {
                    //     setLayout(2);
                    // })
                }
            },
            detailUpload: function () {
                //文章详情页图片上传
                var self = this;
                var uploader = WebUploader.create({
                    auto: true,
                    server: 'https://bx.wts9999.net/app/resmgr/upload',
                    pick: '#filePicker',
                    duplicate: true,
                    fileSingleSizeLimit: 10242880,
                    thumb: {
                        width: 60,
                        height: 60,
                        allowMagnify: false,
                        // 是否允许裁剪。
                        crop: false,
                        type: 'image/jpeg'
                    },
                    fileNumLimit: 3,
                    accept: {
                        title: 'Images',
                        extensions: 'gif,jpg,jpeg,bmp,png',
                        mimeTypes: 'image/*'
                    }
                });
                self.uploader = uploader;
                //图片上传控制
                uploader.on('fileQueued', function (file) {
                    var $li = $(
                        '<div id="' + file.id + '" class="file-item thumbnail">' +
                        '<img>' + '<i class="iconfont icon-chuyidong delet"></i>' +
                        '</div>'
                    ),
                        $img = $li.find('img');
                    if (getCount() < 4) {
                        $("#fileList").append($li);
                        uploader.makeThumb(file, function (error, src) {
                            if (error) {
                                return $img.replaceWith('<span>不能预览</span>');
                            }
                            $img.attr('src', src);
                        }, 100, 100);
                    }
                });

                uploader.on("beforeFileQueued", function (handler) {
                    if (getCount() > 2) $.layerMsg('抱歉！您最多只能发三张图片！');
                })

                $("#uploader").on("click", '.delet', function () {
                    var removeID = $(this).parent().attr("id");
                    uploader.removeFile(removeID);
                    $(this).parent().remove()
                    var imgs = self.uploadImg;
                    for (var k in imgs) {
                        if (imgs[k].id == removeID) {
                            self.uploadImg.splice(k, 1)
                        }
                    }
                })

                uploader.on("fileQueued", function (file) {
                    $("#picture").hide();
                });
                //上传成功回调
                uploader.on("uploadSuccess", function (file, response) {
                    console.log(response)
                    var files;
                    if (response.httpCode == 200) {
                        var img = {
                            id: response.sourceParams.id,
                            url: response.data[0].wwwurl
                        }
                        self.uploadImg.push(img)
                    } else {
                        $.layerMsg(response.sourceParams.name + '上传失败')
                        return
                    }
                    console.log(self.uploadImg);

                })
                //返回队列图片个数
                function getCount() {
                    var files = uploader.getFiles('complete', 'queued', 'progress', 'inited');
                    console.log(files.length);
                    return files.length;
                }
            },
            productSwiper: function (data) {
                if (data.length > 1) {
                    new Swiper('.product-swiper', {
                        freeMode: true,
                        slidesPerView: 'auto',
                        freeModeMomentum: false
                    });
                }
            },
            /**
             * 攻略分享点赞去重
             */
            shareDianzan: function (id) {
                var isTrue = true;
                var datas = $.tools().getLocal(storages.shareGoodsdata)
                if (datas != null) {
                    if (datas.indexOf(id) > -1) {
                        isTrue = false;
                        return isTrue;
                    } else {
                        datas = datas + id + ",";
                        $.tools().setLocal(storages.shareGoodsdata,datas)
                    }
                    isTrue = true;
                } else {
                    var data = "";
                    data += id + ",";
                    $.tools().setLocal(storages.shareGoodsdata,data)
                }
                return isTrue;
            },
            ckEvtNum: function (user, id) {
                //阅读数
                var realData = $.tools().getLocal("realData") || "";
                if (user) {
                    send();
                } else if (realData.indexOf(id) > -1) {
                    return;
                } else {
                    send()
                    realData = id + "," + realData;
                    $.tools().setLocal("realData",realData);
                }

                function send() {
                    var userId = user ? user.id : "";
                    var paramList = {
                        type: "get",
                        url: "/app/article/api/read/" + id + "?userId=" + userId,
                        async: true,
                        success: function (data, isError) { }
                    };
                    $.ajaxPackage(paramList);
                }
            },
            /*
             * 社区点赞
             * 点击空大拇指执行点赞动画，将点赞数据保存到本地且提交到服务器
             * */
            dianzan_click: function () {
                var self = this;
                $("[data-postid]").on("click", function () {
                    if ($(this).find(".dianzan").length == 0) return;
                    var postId = $(this).attr("data-postId");
                    if (self.goodsremoval(postId) == false) return;
                    $(this).find(".dianzan").addClass("active");
                    var num = $(this).find(".dz-num").html();
                    $(this).find(".dz-num").html(1 + Number(num))
                    dianzanAjax(postId);
                })

                function dianzanAjax(postId) {
                    var dianzanList = {
                        type: "get",
                        url: "/app/sq/mainpost/api/postUp",
                        data: {
                            postId: postId
                        },
                        dataType: 'json',
                        success: function (data) {

                        },
                        error: function (xhr, type, errorThrown) {
                            //异常处理；
                            console.log(type);
                        }
                    }
                    //点赞ajax
                    $.ajaxPackage(dianzanList);

                }
            },
            /*
             * 回帖点赞
             * */
            dianzan_reply_click: function () {
                var self = this;
                $("[data-replyId]").on("click", function () {
                    if ($(this).find(".dianzan").length == 0) return;
                    var replyId = $(this).attr("data-replyId");
                    if (self.goodsReplyRemoval(replyId) == false) return;
                    $(this).find(".dianzan").addClass("active");
                    var num = $(this).find(".problemname").html();
                    $(this).find(".problemname").html(1 + Number(num))
                    dianzanAjax(replyId);
                })

                function dianzanAjax(replyId) {
                    //点赞ajax
                    var paramList = {
                        type: "get",
                        url: "/app/sq/mainpost/api/replyUp",
                        data: {
                            replyId: replyId
                        },
                        dataType: 'json',
                        success: function (data, isError) {
                            if (!isError) {
                                return;
                            }
                        },
                        error: function (xhr, type, errorThrown) {
                            //异常处理；
                            console.log(type);
                        }
                    }
                    $.ajaxPackage(paramList);
                }
            },
            goodsremoval: function (id) {
                //点赞去重
                var hasgoods = true;
                var datas = $.tools().getLocal(storages.goodsdata);
                if (datas != null) {
                    if (datas.indexOf(id) > -1) {
                        hasgoods = false;
                        return hasgoods;
                    } else {
                        datas = datas + id + ",";
                        $.tools().setLocal(storages.goodsdata, datas);
                    }
                    hasgoods = true;
                } else {
                    var data = "";
                    data += id + ",";
                    $.tools().setLocal(storages.goodsdata, data);
                }

                return hasgoods;

                //storages.goodsdata
            },
            goodsReplyRemoval: function (id) {
                //回帖点赞去重
                var hasgoods = true;
                var datas = $.tools().getLocal(storages.goodsdata_reply);
                if (datas != null) {
                    if (datas.indexOf(id) > -1) {
                        hasgoods = false;
                        return hasgoods;
                    } else {
                        datas = datas + id + ",";
                        $.tools().setLocal(storages.goodsdata_reply, datas);
                    }
                    hasgoods = true;
                } else {
                    var data = "";
                    data += id + ",";
                    $.tools().setLocal(storages.goodsdata_reply, data);
                }
                return hasgoods;
            },
            hasgoods: function () {
                //判断是否有历史点赞
                var datas = $.tools().getLocal(storages.goodsdata);
                if (datas != null) {
                    $("[data-postId]").each(function () {
                        var id = $(this).attr("data-postId");
                        if (datas.indexOf(id) > -1) {
                            $(this).find(".dianzan").removeClass("dianzan").addClass("hasdianzan");
                        }
                    })
                }
            },
            hasgoodsReply: function () {
                //判断回帖是否有历史点赞
                var datas = $.tools().getLocal(storages.goodsdata_reply);
                if (datas != null) {
                    $("[data-replyId]").each(function () {
                        var id = $(this).attr("data-replyId");
                        if (datas.indexOf(id) > -1) {
                            $(this).find(".dianzan").removeClass("dianzan").addClass("hasdianzan");
                        }
                    })
                }
            },
            SnappedUp: function () { // 抢购页面AJAX

                stateAjax()
                /*
                 * 获取数据数据接口
                 * */
                function stateAjax() {
                    var paramList = {
                        url: "/policy/activity/api/activity",
                        dataType: "json",
                        success: function (data) {
                            console.log(data)
                            $(".limit-top-time .limit-num").html(data.activitiyCount);
                            if (data.data.length == 0) { //没有活动时的操作
                                $(".limit-left .limit-top-time").html("已结束").addClass("limit-top-active");
                                $(".limit-time .Jump-qianggou").prop("href", "javascript:;");
                                $(".timescolls .act-tip").css("visibility", "hidden");
                                $(".timescolls .time-box").find(".timeing").css("display", "none").end().find(".overText").css("display", "block");
                                return;
                            }
                            isEndTime(data, data.data[0])
                        }
                    }
                    $.ajaxPackage(paramList);
                }

                /*
                 *有活动，计算活动时间是否开始，显示不同状态
                 * */
                function isEndTime(data, dataTime) {
                    var startTime = dataTime.startTime; // 开始时间
                    var endTime = dataTime.endTime; //结束时间
                    var thisTime = data.timestamp; //当前时间
                    thisTime = getLocTime(thisTime); //时间戳
                    var timeelse;

                    if ($(".teambuy_bg").length > 0) {
                        var html = template("team_buy", dataTime);
                        $(".teambuy_bg").append(html);
                    }

                    if (startTime > thisTime) {

                        timeelse = moment(startTime) - moment(thisTime); //距离活动开始时间
                        if (timeelse / 1000 > 86400) {
                            $(".limit-left .limit-top-time").html("未开始");
                        }
                        console.log(timeelse / 1000);
                        $(".timescolls .act-tip h3").html("距离活动开始还要");
                        timer(timeelse / 1000, timeCode); //倒计时
                    } else {
                        timeelse = moment(endTime) - moment(thisTime); //活动正在进行时间
                        if (timeelse / 1000 > 86400 || timeelse / 1000 < 0) {
                            $(".limit-left .limit-top-time").html("已结束").addClass("limit-top-active");
                        }
                        console.log(timeelse / 1000);
                        $(".timescolls .act-tip h3").html("活动正在进行中");
                        var timeCode = 1;
                        timer(timeelse / 1000, timeCode); //倒计时
                    }

                }

                function timer(intDiff) {
                    //时间倒计时
                    var timer = window.setInterval(function () {
                        if (intDiff == 0) {
                            clearInterval(timer);
                            stateAjax()
                        }
                        var day = 0,
                            hour = 0,
                            minute = 0,
                            second = 0; //时间默认值
                        if (intDiff > 0) {
                            day = Math.floor(intDiff / (60 * 60 * 24));
                            hour = Math.floor(intDiff / (60 * 60)) - (day * 24);
                            minute = Math.floor(intDiff / 60) - (day * 24 * 60) - (hour * 60);
                            second = Math.floor(intDiff) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
                        }
                        if (minute <= 9) minute = '0' + minute;
                        if (second <= 9) second = '0' + second;
                        if (hour <= 9) hour = '0' + hour;
                        $('#hour_show').html(hour);
                        $('#minute_show').html(minute);
                        $('#second_show').html(second);
                        intDiff--;
                    }, 1000);

                }

                function getLocTime(nS) {
                    //将时间戳转换为 年月日 时分秒
                    var time = new Date(parseInt(nS));
                    var y = time.getFullYear();
                    var m = time.getMonth() + 1;
                    var d = time.getDate();
                    var h = time.getHours();
                    var mm = time.getMinutes();
                    var s = time.getSeconds();

                    //时间补齐0
                    m = add0(m);
                    d = add0(d);
                    h = add0(h);
                    mm = add0(mm);
                    s = add0(s);
                    return y + "-" + m + "-" + d + " " + h + ":" + mm + ":" + s;
                }

                function add0(n) {
                    //时间补齐0
                    var n = n + "";
                    if (n.length == 1) {
                        n = "0" + n;
                    }
                    return n;
                }
            },
            expression: function () { //destail.html 表情框

                $(function () {
                    $.fn.smohanfacebox = function (options) {
                        var defaults = {
                            Event: "click", //响应事件
                            divid: "Smohan_FaceBox", //表单ID（textarea外层ID）
                            textid: "TextArea" //文本框ID
                        };
                        var options = $.extend(defaults, options);
                        var $btn = $(this); //取得触发事件的ID

                        //创建表情框
                        var faceimg = '';
                        for (i = 0; i < 60; i++) { //通过循环创建60个表情，可扩展
                            faceimg += '<li><a href="javascript:void(0)"><img src="./lib/images/face/' + (i + 1) + '.gif" face="<emt>' + (i + 1) + '</emt>"/></a></li>';
                        };
                        $("#" + options.divid).prepend("<div id='SmohanFaceBox'><span class='Corner'></span><div class='Content'><h3><span>常用表情</span><a class='close' title='关闭'></a></h3><ul>" + faceimg + "</ul></div></div>");
                        $('#SmohanFaceBox').css("display", 'none'); //创建完成后先将其隐藏
                        //创建表情框结束

                        var $facepic = $("#SmohanFaceBox li img");
                        //BTN触发事件，显示或隐藏表情层
                        $btn.live(options.Event, function (e) {
                            if ($('#SmohanFaceBox').is(":hidden")) {
                                $('#SmohanFaceBox').show(360);
                                $btn.addClass('in');
                            } else {
                                $('#SmohanFaceBox').hide(360);
                                $btn.removeClass('in');
                            }
                        });
                        //插入表情
                        $facepic.die().click(function () {
                            $('#SmohanFaceBox').hide(360);
                            //$("#"+options.textid).focus();
                            //$("#"+options.textid).val($("#"+options.textid).val()+$(this).attr("face"));
                            $("#" + options.textid).die().insertContent($(this).attr("face"));
                            $btn.removeClass('in');
                        });
                        //关闭表情层
                        $('#SmohanFaceBox h3 a.close').click(function () {
                            $('#SmohanFaceBox').hide(360);
                            $btn.removeClass('in');
                        });
                        //当鼠标移开时，隐藏表情层，如果不需要，可注释掉
                        $('#SmohanFaceBox').mouseleave(function () {
                            $('#SmohanFaceBox').hide(560);
                            $btn.removeClass('in');
                        });

                    };

                    // 【漫画】 光标定位插件
                    //$.fn.extend({
                    //    insertContent : function(myValue, t) {
                    //        var $t = $(this)[0];
                    //        if (document.selection) {
                    //            this.focus();
                    //            var sel = document.selection.createRange();
                    //            sel.text = myValue;
                    //            this.focus();
                    //            sel.moveStart('character', -l);
                    //            var wee = sel.text.length;
                    //            if (arguments.length == 2) {
                    //                var l = $t.value.length;
                    //                sel.moveEnd("character", wee + t);
                    //                t <= 0 ? sel.moveStart("character", wee - 2 * t	- myValue.length) : sel.moveStart("character", wee - t - myValue.length);
                    //                sel.select();
                    //            }
                    //        } else if ($t.selectionStart || $t.selectionStart == '0') {
                    //            var startPos = $t.selectionStart;
                    //            var endPos = $t.selectionEnd;
                    //            var scrollTop = $t.scrollTop;
                    //            $t.value = $t.value.substring(0, startPos) + myValue + $t.value.substring(endPos,$t.value.length);
                    //            this.focus();
                    //            $t.selectionStart = startPos + myValue.length;
                    //            $t.selectionEnd = startPos + myValue.length;
                    //            $t.scrollTop = scrollTop;
                    //            if (arguments.length == 2) {
                    //                $t.setSelectionRange(startPos - t,$t.selectionEnd + t);
                    //                this.focus();
                    //            }
                    //        } else {
                    //            this.value += myValue;
                    //            this.focus();
                    //        }
                    //    }
                    //});

                    //表情解析
                    $.fn.extend({
                        replaceface: function (faces) {
                            for (i = 0; i < 60; i++) {
                                faces = faces.replace('<emt>' + (i + 1) + '</emt>', '<img src="./lib/images/face/' + (i + 1) + '.gif">');
                            }
                            $(this).html(faces);
                        }
                    });


                });

                //$(function (){
                //    $("a.face").smohanfacebox({
                //        Event : "click",	//触发事件
                //        divid : "Smohan_FaceBox", //外层DIV ID
                //        textid : "Smohan_text" //文本框 ID
                //    });
                //    //解析表情  $('#Zones').replaceface($('#Zones').html());
                //});
                ////Demo测试
                //$('#Smohan_Showface').click(function() {
                //    $('#Zones').fadeIn(360);
                //    $('#Zones').html($('#Smohan_text').val());
                //    $('#Zones').replaceface($('#Zones').html());//替换表情
                //});

            },
            setNav: function (num) {
                //设置导航
                $(".nav a:eq(" + num + ")").addClass("active");
            },
            TClassroom: function () { //T博士课堂
                var count = 15; //单次请求数量
                var index = 0; //序列
                var pages = 0; //页数
                banner();
                knowledge(count, pages, index);
                $(".ul-type li").click(function () {
                    index = $(this).index();
                    $(".ul-js:eq(" + index + ")").addClass("active").siblings().removeClass("active");
                    var pages = $(this).attr("data-page");
                    $(this).addClass("active").siblings("li").removeClass("active");
                    if (pages > 0) return;
                    knowledge(count, pages, index); //保险知识数据接口

                })
                $(".click-more").click(function () {
                    index = $(this).parents(".ul-js").index();
                    var pages = $(".type-item:eq(" + index + ")").attr("data-page");
                    knowledge(count, pages, index); //保险知识数据接口
                })

                //banner图轮播
                function banner() {
                    var bannerList = {
                        type: "get",
                        url: "/api/cms/superm/banner.jspx",
                        data: {
                            type: "mobileClass"
                        },
                        dataType: 'json',
                        success: function (ajaxData, isError) {
                            console.log(ajaxData);
                            if (!isError) {
                                return;
                            }
                            var list = template("_banner", ajaxData);
                            $(".swiper-container").html(list)
                            //banner轮播
                            if (ajaxData.data.length > 1) { // 首页-轮播,大于一张图片才轮播
                                var mySwiper = new Swiper(".swiper-container", {
                                    lazyLoading: true, //图片懒加载
                                    lazyLoadingOnTransitionStart: true, //过渡一开始就加载
                                    autoplay: 2000, //可选选项，自动滑动
                                    loop: true,
                                    loopAdditionalSlides: 1,
                                    pagination: '.swiper-pagination',
                                    autoplayDisableOnInteraction: false
                                })
                            }
                        },
                        error: function (XMLHttpRequest, textStatus, errorThrown) {
                            //console.log(textStatus);
                        }
                    }
                    $.ajaxPackage(bannerList);
                }
                /*
                 * 保险知识数据接口
                 *
                 * step
                 * 1.根据页面id区别栏目id
                 * 2.发送ajax请求
                 * 3.判断获取数据长度，小于count条则取消加载更多事件
                 *
                 * params
                 * count-请求数量
                 * page-页数
                 * id-栏目id
                 *
                 * ajax-params
                 * channelIds-栏目id
                 * channelOption-固定1
                 * count-请求数量
                 * orderBy-排序规则 4：固定级别降序，发布时间降序 5：固定级别降序，发布时间升序 6：日访问降序（推荐）7：周访问降序 8：月访问降序 9：总访问降序
                 * first-页数-当页手帖序列
                 * */
                function knowledge(count, page, id) {
                    page = Number(page);
                    var userid;
                    //1.根据页面id区别栏目id
                    if ($.globedata.environment == 1) {
                        userid = id == 1 ? "184" : "173,174,175"
                    } else {
                        userid = id == 1 ? "171" : "173,174,175"
                    };
                    var paramList = {
                        type: "get",
                        url: "/api/content/list.jspx?channelIds=" + userid + "&channelOption=1&count=" + count + "&orderBy=4&first=" + page + "",
                        async: false,
                        success: function (data, isError) {
                            console.log(data)
                            if (!isError) {
                                return;
                            }
                            var ajaxdata = {}
                            ajaxdata.data = data;
                            var list4 = template("tab_list_1", ajaxdata)
                            $(".ul-js:eq(" + id + ")").append(list4);
                            // $(".lz-readys").remove();
                            page += count;
                            $(".ul-type li:eq(" + id + ")").attr("data-page", page)
                            $("img.lazy").lazyload({
                                effect: "fadeIn",
                                threshold: 1000
                            }); //图片懒加载
                            //3.判断获取数据长度，小于count条则取消加载更多事件
                            if (data.length < count) {
                                $(".ul-js:eq(" + id + ") .click-more").html("没有更多内容了").unbind("click");
                            }
                        }
                    };
                    $.ajaxPackage(paramList);
                }
            },
            /*
             * T博士课堂详情页
             * */
            t_detail: function () {
                var id = $.getQueryString('id');
                var paramList = {
                    type: "get",
                    url: "/api/content/get.jspx",
                    data: {
                        id: id
                    },
                    async: false,
                    success: function (data, isError) {
                        console.log(data)
                        if (!isError) {
                            return;
                        }
                        var ajaxdata = {}
                        ajaxdata.data = data;
                        var html = template("tab_detail", data)
                        $(".video-details .box").html(html)
                        if (data.mediaPath && data.mediaPath != "") jpLayerPay(data)
                    }
                };
                $.ajaxPackage(paramList);

                function jpLayerPay(data) {
                    $("#jquery_jplayer_1").jPlayer({
                        ready: function () {
                            $(this).jPlayer("setMedia", {
                                // title: "视频名称",
                                m4v: data.mediaPath,
                                poster: data.typeImg.split(",")[0]
                            });
                        },
                        // swfPath: "../../dist/jplayer",
                        supplied: "webmv, ogv, m4v",
                        size: {
                            width: "100%",
                            // height: "360px",
                            cssClass: "jp-video-360"
                        },
                        useStateClassSkin: true,
                        autoBlur: false,
                        smoothPlayBar: true,
                        keyEnabled: true,
                        remainingDuration: true,
                        toggleDuration: true
                    });
                }
            },
            //解决ios返回不刷新问题
            reloadIos: function () {
                var isPageHide = false;
                window.addEventListener('pageshow', function () {
                    if (isPageHide) {
                        window.location.reload();
                    }
                });
                window.addEventListener('pagehide', function () {
                    isPageHide = true;
                });
            },
            setPremium: function () {
                var self = this;
                var layer_html; //弹出层
                var sendNum = 0; //节流阀
                setTimeout(function () {
                    layer_premium();
                }, 2000)

                function premium1() {
                    //移动端测算1
                    $("#btn_send_pre").click(function () {
                        if (sendNum > 0) return;
                        sendNum++;
                        var name = $("#customer").val();
                        var mobile = $("#customerMobile").val();
                        var sex = $(".sex-radio[data-check='true']").attr("data-value");
                        var time = $("#orderTime").val();
                        if (!name) {
                            $.layerMsg("姓名尚未填写")
                            sendNum = 0;
                            return;
                        }
                        if (!mobile) {
                            $.layerMsg('手机号尚未填写')
                            sendNum = 0;
                            return;
                        }
                        var content = [{
                            'key': "您的称呼",
                            'value': name
                        },
                        {
                            'key': "您的电话",
                            'value': mobile
                        },
                        {
                            'key': "性别",
                            'value': sex
                        },
                        {
                            'key': "预约时间",
                            'value': time
                        }
                        ]
                        postAjax(name, mobile, JSON.stringify(content))
                    })


                }

                function postAjax(name, mobile, content) {
                    //发送请求
                    var url = "https://weixin.wts999.com/source/collect.do"
                    var sourceUrl = location.href;
                    var refererUrl = document.referrer || "";
                    var userAgent = navigator.userAgent;
                    var channel = $.getQueryString('c');
                    var send = $.getQueryString('m') || 0;
                    var executer = $.getQueryString('e');
                    var planName = $.getQueryString('p');
                    var plan = "官网移动端"
                    var data = {
                        'mobile': mobile,
                        'name': name,
                        'content': content,
                        'planCode': plan,
                        'sourceUrl': sourceUrl,
                        'refererUrl': refererUrl,
                        'userAgent': userAgent,
                        'channel': channel,
                        'executer': executer,
                        'planName': planName,
                        'send': send
                    }
                    $.ajax({
                        url: url,
                        data: data,
                        type: "POST",
                        dataType: 'script',
                        success: function () {
                            sendNum = 0;
                            if (result.success == 1) {
                                $(".m-premium-bottom-bg").hide()
                                layerFroDx();
                                return;
                            }
                        },
                        error: function () {
                            alert("提交失败");
                        }
                    })

                }

                function layerFroDx() {
                    //提交成功
                    layer.close(layer_html);
                    var html = '<img src="../lib/images/tan_bg.png" style="width:90%;display:block;margin:0 auto" alt="">';
                    var index = layer.open({
                        type: 1,
                        content: html,
                        anim: 'up',
                        style: 'position:fixed; top:20%; left:0; width: 100%; height: 200px; padding:10px 0; border:none;background-color:transparent;'
                    });
                    $(".lz-mask-close").click(function () {
                        layer.close(index);
                    })
                }

                function layer_premium() {
                    $("#reservation").bind("click", function () {
                        $(".m-premium-bottom-bg").show()
                        setTimeout(function () {
                            premium1()
                        }, 200)
                    })
                    // 关闭遮罩
                    $(".keepUp").click(function (e) {
                        $(".m-premium-bottom-bg").hide();
                        return false
                    });
                    $(".sex-radio[name='sex']").click(function () {
                        var check = $(this).attr("data-check");
                        if (check == true) return;
                        $(this).siblings().attr("data-check", '').end().attr("data-check", true)
                    })
                }
            },
            allSearch: function () {
                var _btn = $("#searchIng"),
                    _input = $("#setSearch"),
                    _contentBox = $("#searchWrapper .results"),
                    _tab = $(".searchContent .tab span"),
                    _setUp = $("#productSearch"),
                    _close = $("#searchClose"),
                    _searchContent = $(".searchContent"),
                    myScroll, allSearch = [],
                    searchNum = 0;
                pageSize = 10;
                _setUp.click(function () { //弹出搜索栏
                    _searchContent.slideDown()
                    setScrolleight()
                    myScroll = new IScroll('#searchWrapper', { //开启页面滑动
                        mouseWheel: true,
                        scrollbars: false,
                        click: true
                    });
                    document.addEventListener('touchmove', function (e) {
                        e.preventDefault();
                    }, false);

                    $("#setSearch").focus(); //搜索框聚焦
                })
                _tab.click(function () { //弹出搜索栏
                    var index = $(this).index();
                    $(this).addClass("active").siblings().removeClass("active");
                    // _contentBox.children().eq(index).addClass("active").siblings().removeClass("active");
                })
                _close.click(function () { //关闭搜索
                    _searchContent.slideUp();
                })
                _btn.click(function () { //点击按钮搜索
                    var name = _input.val();
                    var pageNum = $(this).attr("data-pageNum");
                    if (!name) return $.layerMsg("请先输入搜索内容");
                    getProducts(name, 1, true)
                    getArticles(name, 0, true)
                    getAnswers(name, 0, true)
                })

                function setScrolleight() { //动态监听滑动栏高度
                    var scrollHeight = $(document.body).height() - $(".searchContent .search").height() - $(".searchContent .tab").height()
                    $("#searchWrapper").css({
                        "height": scrollHeight
                    })
                }
                /**
                 * 
                 * @param {*} num 检测搜索次数
                 * @param {*} first 是否第一次搜索
                 * @param {*} showType 展现类型-产品，文章，帖子 1/2/3
                 */
                function setResult(num, first, showType) { //设置搜索结果
                    var list, type;
                    if (first) {
                        if (num < 3) return;
                        type = 1;
                        if (allSearch[0].length == 0) {
                            type = 2
                        }
                        if (allSearch[1].length == 0) {
                            type = 3
                        }
                        if (allSearch[2].length == 0) {
                            type = 0
                        }
                    }

                    list = template("searchList", {
                        allSearch: allSearch,
                        type: showType - 1
                    });
                }
                //产品搜索
                function getProducts(name, pageNum, first) {
                    var paramList = {
                        type: "post",
                        url: "/policy/insuranceProduct/product/index",
                        data: "{pageSize:" + pageSize + ",status:1,name:'" + name + "',pageNo:" + pageNum + "}",
                        contentType: "application/json;charset=UTF-8",
                        success: function (ajaxData, isError) {
                            if (!isError) {
                                return;
                            }
                            searchNum++;
                            console.log(ajaxData);
                            allSearch[0] = ajaxData.data;
                            setResult(searchNum, first, 1)
                            var list = template("searchProducts", ajaxData);
                            _contentBox.children(".lis").eq(0).append(list);
                        }
                    };
                    $.ajaxPackage(paramList);
                }
                //文章搜索
                function getArticles(name, pageNum) {
                    var paramList = {
                        type: "post",
                        url: "/api/content/searchs.jspx",
                        data: {
                            key: name,
                            pageNo: pageNum,
                            pageSize: pageSize
                        },
                        // data: "{q:'"+name+"',first:"+(pageSize*(pageNum-1))+",count:"+pageNum+"}",
                        // contentType: "application/json;charset=UTF-8",
                        success: function (ajaxData, isError) {
                            if (!isError) {
                                return;
                            }
                            console.log(ajaxData);

                            var list = template("searchArticles", ajaxData);
                            _contentBox.children(".lis").eq(1).append(list);
                        }
                    };
                    $.ajaxPackage(paramList);
                }
                //帖子搜索
                function getAnswers(name, pageNum) {
                    var paramList = {
                        type: "post",
                        url: "/api/cms/post/search.jspx",
                        data: {
                            q: name,
                            pageNo: pageNum,
                            pageSize: pageSize
                        },
                        // data: "{q:'"+name+"',first:"+(pageSize*(pageNum-1))+",count:"+pageNum+"}",
                        // contentType: "application/json;charset=UTF-8",
                        success: function (ajaxData, isError) {
                            if (!isError) {
                                return;
                            }
                            console.log(ajaxData);

                            var list = template("searchArticles", ajaxData);
                            _contentBox.children(".lis").eq(1).append(list);
                        }
                    };
                    $.ajaxPackage(paramList);
                }
            },
            /*
             * 微信分享监听
             * params
             * title-标题
             * img-图片地址
             * desc-描述
             * appId-appId
             * */
            shareWx: function (params) {
                var img = params.img || "https://" + $.domain + "/lib/images/logo-3.jpg";
                var appId = $.tools().getWxId();
                var title = params.title;
                var url = location.href.split('#')[0];
                var link = params.link || url;
                // 调用服务器获取签名
                $.ajax({
                    type: "POST",
                    url: "/tools/wechat/api/getJssdk",
                    data: {
                        appid: appId,
                        url: url
                    },
                    async: false,
                    dataType: 'json',
                    success: function (data, isError) {
                        //微信config授权
                        if (!isError) {
                            return;
                        }
                        wx.config({
                            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                            appId: appId, // 必填，公众号的唯一标识
                            timestamp: data.data.timeStamp, // 必填，生成签名的时间戳
                            nonceStr: data.data.nonceStr, // 必填，生成签名的随机串
                            signature: data.data.signature, // 必填，签名，见附录1
                            jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                        });
                        wx.ready(function () {
                            //分享到朋友圈
                            wx.onMenuShareTimeline({
                                title: params.title,
                                desc: params.desc,
                                link: link,
                                imgUrl: img,
                                success: function () {
                                    //layer.msg('分享成功！');
                                },
                                cancel: function () {
                                    $.layerMsg('取消分享！')
                                },
                                fail: function (res) {
                                    alert(JSON.stringify(res));
                                }
                            });
                            //分享给朋友
                            wx.onMenuShareAppMessage({
                                title: params.title,
                                desc: params.desc,
                                link: link,
                                imgUrl: img,
                                trigger: function (res) {
                                    // 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回
                                    //alert('发送成功');
                                },
                                success: function (res) {
                                    //layer.msg('已分享！');
                                },
                                cancel: function (res) {
                                    $.layerMsg('已取消！')
                                },
                                fail: function (res) {
                                    alert(JSON.stringify(res));
                                }
                            });
                            //alert('已注册获取“发送给朋友”状态事件');

                        });

                        wx.error(function (res) {
                            console.log(res);
                        });

                    }
                });

            },
            addService: function (user, cardType) { //增值服务
                var indexDate = user //获取用户信息
                if(!indexDate.id){
                    window.location.href= window.location.origin + "/m/index.html#/BDmobileHtml?type=2&redUrl="+ window.location.href;
					return;
                }
                addressAjax(indexDate) //ajax请求
                dropDown() //下拉框
                var flag = true;
                var underloading; //激活动画
                $(".activeBtn").click(function () { //卡号激活
                    getreg(); //验证
                })
                //输入框验证
                $(".imgLef").click(function () {
                    $(".activeBox,.lz-bg").show();
                })
                $(".lz-bg").click(function () {
                    $(".activeBox,.lz-bg,.serRoot").hide();
                })
                $(".imgRig").click(function () {
                    $(".serRoot,.lz-bg").show();
                })

                function getreg() {
                    var myPhone = $.trim($(".activePhone").val());
                    var myName = $.trim($(".activeName").val());
                    var activeCard = $.trim($(".activeCard").val());
                    var activeProvide = $.trim($(".activeProvide").val());
                    var activeIdentification = $.trim($(".activeIdentification").attr("data-value"));
                    var activeIdentificationNum = $.trim($(".activeIdentificationNum").val());
                    var activepolicy = $.trim($(".activepolicy").val());
                    var regular = $.regular();
                    if (!regular.isName(myName)) { //姓名验证
                        return $.layerMsg("名字不对或为空");
                    } else if (!regular.isPhone(myPhone)) { //手机号验证
                        return $.layerMsg("手机号不对或为空");
                    } else if (activeIdentification == "") { //证件类型
                        return $.layerMsg("证件类型不能为空");
                    } else if (activeIdentificationNum == "") { //姓名验证
                        return $.layerMsg("证件号不能为空");
                    } else if (!regular.isNum(activeCard)) { //卡号验证
                        return $.layerMsg("卡号不对或为空");
                    } else if (!regular.isNum(activeProvide)) { //密码验证
                        return $.layerMsg("密码不对或为空");
                    } else if (!regular.isNum(activepolicy) && cardType == "critical") { //保单号
                        return $.layerMsg("请输入正确的保单号");

                    } else { //验证都通过时ajax请求
                        var datas = {
                            "cardNo": activeCard, //卡号
                            "cardVerify": activeProvide, //密码
                            "name": myName, //姓名
                            "mobile": myPhone, //手机号
                            "idCardType": activeIdentification, //证件类型
                            "idCardNo": activeIdentificationNum, //证件号
                            "cardType": $(".activeTitle .active").attr("data-value"),
                            "policyNo": activepolicy,
                            "cardType": cardType,
                            "userId": user.id,
                        }
                        if (flag) {
                            flag = false;
                            underloading = $.layerLoad('正在激活...')
                            address(datas) //请求ajax函数
                        }
                    }
                }

                /*
                 * 卡号激活ajax
                 * */
                function address(datas) {
                    console.log(datas);
                    var paramList = {
                        type: "post",
                        url: "/policy/customerCard/api/activate/card",
                        contentType: "application/json",
                        data: JSON.stringify(datas),
                        async: true,
                        success: function (data, isError) {
                            console.log(data);
                            layer.close(underloading);
                            flag = true;
                            if (data.httpCode == 200) {
                                $.layerMsg(data.data.msg)
                                if (data.data.code == 1) {
                                    setTimeout(function () {
                                        location.reload(); //激活跳转
                                    }, 200)
                                }
                            } else {
                                // $.layerMsg(data.data)
                            }
                        }
                    };
                    $.ajaxPackage(paramList);
                }

                function addressAjax(datas) { //服务请求
                    console.log(datas)
                    var paramList = {
                        type: "put",
                        url: "/policy/customerCard/api/query/service", //增值服务接口地址
                        contentType: "application/json",
                        data: JSON.stringify({
                            "activateStatus": "1",
                            "cardType": cardType,
                        }),
                        async: true,
                        success: function (data, isError) {
                            console.log(data);
                            var datas = []
                            var dataobj = {}; //模板渲染空对象
                            for (var i = 0; i < data.data.length; i++) { //删选activateStatus为1时的数据，有激活服务
                                if (data.data[i].activateStatus == 1) {
                                    datas.push(data.data[i])
                                }
                            }
                            dataobj.data = datas
                            var list = template("text", dataobj) //模板渲染
                            $(".serCont").html(list);
                        }
                    };
                    $.ajaxPackage(paramList);
                }

                function dropDown() { //下拉框选择弹出层
                    $(".body-container").on("click", ".lz-drop-down-name", function () {
                        $(".popupBox").addClass("active");
                        $(".shadeBox1").show();
                    })
                    $(".body-container").on("click", ".lz-drop-down-option", function () { //下拉框选择
                        $(this).attr("data-check", true).siblings().attr("data-check", false);
                        $(".lz-drop-down-name").html($(this).html()).attr("data-value", $(this).attr(
                            "data-value"))
                        setTimeout(function () {
                            $(".popupBox").removeClass("active");
                            $(".shadeBox1").hide();
                        }, 200)
                    })
                    $(".shadeBox1").click(function () {
                        $(this).parents(".popupBox").removeClass("active");
                        $(".shadeBox1").hide();
                    })
                    $(".popupBox").click(function () {
                        $(".popupBox").removeClass("active");
                        $(".shadeBox1").hide();
                    })
                }
            },
            /**
             * typNum 文章列表类型 2分享 3理赔快讯
             * addTrue 理赔加载分页 
             */
            shareBodyHtml: function (typNum) {
                var self = this;
                var pageNum = 1; //页数
                var pageSize = 20; //数据条目
                var isloading = false; //是否加载分页
                var isNavTapNum = 0; //频繁点击
                //分享页正常加载
                bodyNavFn()
                // 分享页顶部banner
                function bodyNavFn() {
                    var paramList = {
                        type: "POST",
                        url: "/app/columntype/api/list/1_8",
                        data: '{"type":"' + typNum + '"}',
                        contentType: "application/json;charset=UTF-8",
                        async: true,
                        success: function (data, isError) {
                            if (!isError) {
                                return;
                            }
                            console.log(data)
                            var nav = template('bodyNavTml', data)
                            $(".ul-nav-box").html(nav)
                            self.code = data.data[0].code;
                            self.type = data.data[0].type;
                            $("img.lazy").lazyload({ //图片懒加载
                                effect: "fadeIn",
                                threshold: 800
                            });
                            navBodyList(self.code, self.type) //文章列表渲染
                            evtActive() //文章tap切换
                        }
                    }
                    $.ajaxPackage(paramList);
                }
                /*文章tap切换*/
                function evtActive() {
                    $(".ul-nav-box").on("click", ".swiper-slide", function () {
                        if (isNavTapNum > 0) return;
                        isNavTapNum++
                        var isTrue = $(this).hasClass("active");
                        if (isTrue) return;
                        $(".ul-js-box").css("visibility", "hidden");
                        $(this).siblings().removeClass("active").end().addClass("active");
                        self.code = $(this).attr("data-code");
                        self.type = $(this).attr("data-type");
                        pageNum = 1;
                        var _top = $(window).scrollTop()
                        if (_top > $(".shareListBanner").height()) $(window).scrollTop($(".shareListBanner").height());
                        navBodyList(self.code, self.type)
                        // mescroll.triggerDownScroll()
                    })
                    var mySwiper = new Swiper('.ul-nav-box', {
                        slidesPerView: "auto"
                    })
                    $('.ul-nav-box .next_btn').click(function () {
                        mySwiper.slideNext();
                    })
                }
                /*分页功能*/
                function pageNumScroll() {
                    $(window).unbind("scroll").on("scroll", function () {
                        if ($(this).scrollTop() >= $(".shareListBanner").height()) {
                            $(".ul-nav-box").removeClass("isFixed");
                            $(".isPadding").addClass("content-box")
                        } else {
                            $(".ul-nav-box").addClass("isFixed");
                            $(".isPadding").removeClass("content-box")
                        }
                        if (
                            $(this).scrollTop() + $(this).height() + 100 >
                            $(document).height() &&
                            !isloading
                        ) {
                            $(".reload").show();
                            // 当滑出距离大度页面高度
                            isloading = true;
                            pageNum++; //开始的索引变完结束之后的第一个
                            navBodyList(self.code, self.type, true); //再次请求
                        }
                    });
                }
                /*文章列表渲染*/
                function navBodyList(code, type, isAdd) {
                    // var shareData =  $.tools().setLocal("share"+code)
                    // if(shareData && pageNum == "0"){
                    //   var list = template("bodyListTml", datas);
                    //   $(".ul-js-box .ul-js").html(list);
                    // }else{
                    var data = {
                        code: code,
                        pageSize: pageSize,
                        pageNum: pageNum,
                        type: type
                    }
                    var bodyList = {
                        type: "POST",
                        url: "/app/articleCategory/api/article/list",
                        contentType: "application/json;charset=UTF-8",
                        data: JSON.stringify(data),
                        async: true,
                        success: function (data, isError) {
                            if (!isError) {
                                isNavTapNum = 0;
                                pageNum = 1;
                                isloading = false;
                                return;
                            }
                            console.log(data)
                            var datas = data.data;
                            var list = template("bodyListTml", datas);
                            isNavTapNum = 0; //频繁点击控制
                            $.tools().setLocal("share" + code, datas)
                            $(".ul-js-box").css("visibility", "inherit"); //切换时内容显示
                            $(".ul-js-box").show();
                            if (!isAdd) {
                                $(".ul-js-box .ul-js").html(list);
                            } else {
                                $(".reload").hide()
                                $(".ul-js-box .ul-js").append(list);
                            }
                            pageNumScroll(typNum) //分页
                            $(".lz-readys").remove(); //loding 关闭
                            $("img.lazy").lazyload({ //图片懒加载
                                effect: "fadeIn",
                                threshold: 800
                            });
                            if (datas.list.length < pageSize) {
                                isloading = true;
                                $(".ul-js").append("<div class='no_more_list'>没有更多内容了</div>")
                            } else {
                                isloading = false;
                            }
                            // setTimeout(function(){
                            //     mescroll.endSuccess();
                            // },500) 
                        }
                    }
                    $.ajaxPackage(bodyList);
                    // }
                }
            },
            downLoadApp: function (type) {
                if (!$.tools().isWeiXin()) {
                    var html = '<div class="layer-app" style="overflow: hidden;">' +
                        '<img src="/lib/images/app-download.png" alt="" class="downloadImg">' +
                        '<p>长按扫一扫下载app</p>' +
                        '<p>获取更多服务</p>' +
                        '</div>';
                    layer.open({
                        type: 1,
                        content: html,
                        anim: 'up',
                        shadeClose: type ? true : false,
                        style: 'position:fixed; top:20%; left:50%;margin-left:-110px; border:none;background-color: transparent;'
                    });
                    return false;
                } else {
                    return true;
                }
            },
        }
    }
    $.extend({
        csAnimates: csAnimates,
        storages: storages
    });
})(jQuery);