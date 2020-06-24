$(function () {


    function helpInit() {
        return {
            init: function () {
                this.events();
                this.isiOS();
                this.shareWx();
                $.extend({

                    //中间轻提示框
                    layerMsg: function (text) {
                        layer.open({
                            content: text,
                            skin: 'msg',
                            style: 'bottom:0;',
                            time: 2 //2秒后自动关闭
                        });
                    },

                    //ios风格确认按钮弹窗
                    layerAlert: function (text, btn, yes, type) {

                        layer.open({
                            content: text,
                            skin: 'lzAlert',
                            btn: btn || '我知道了',
                            shadeClose: type ? false : true,
                            yes: function (index) {
                                layer.close(index);
                                if (typeof yes == 'function') yes(index);
                            },
                        });
                    },

                    //底部提示框
                    layerFooter: function (text, type) {
                        layer.open({
                            content: text,
                            skin: 'footer',
                            shadeClose: type ? false : true
                        });
                    },

                    //加载中
                    layerLoad: function (text) {
                        var loading = layer.open({
                            type: 2,
                            content: text,
                            shadeClose: false
                        });
                        return loading
                    },

                    /**
                     * 询问框弹窗
                     * text-文字
                     * btns-按钮文本
                     * yes-成功回调
                     * no-失败回调
                     */
                    layerinquiry: function (text, btns, yes, no) {
                        var inquiry = layer.open({
                            content: text,
                            btn: btns,
                            skin: "inquiry",
                            yes: function (index) {
                                layer.close(inquiry);
                                yes(index);
                            },
                            no: function () {
                                if ($.tools().isFn(no)) {
                                    no();
                                }
                            }
                        });
                    }
                });
            },
            events: function () {
                //qq客服
                $(".clickQidian").on("click", function () {
                    window.open('./exercise/kefu.html');
                });
            },

            //用户信息的判断函数，显示不同的字体
            isiOS: function () {
                var userAgents = $.tools();
                if (userAgents.ios || userAgents.iPhone || userAgents.iPad || $.tools().getAnbanben() >= 7) {
                    $(".body-container").eq(0).css("fontFamily", "arial")
                } else if (userAgents.android) {
                    $(".body-container").eq(0).css("fontFamily", "microsoft yahei")
                }
            },

             //判断数组长度和数组内每个数据的长度
            elementValue: function (arr) {
                if (arr.length > 3) {
                    return true;
                }
                var names = "";
                for (var k in arr) {
                    names += arr[k].name;
                }
                if (names.length > 10) {
                    return true;
                }
                return false;
            },
            shareWx: function () {
                var tools = $.tools();
                if (!tools.isWeiXin()) return;
                var shares = $.globedata.commonShare;
                if (!shares) return;
                var appId = tools.getWxId();
                var url = location.href.split('#')[0];
                var title = "梧桐树保险网—懂你，懂保险";
                var desc = "梧桐树保险网一站式保险服务平台！网上买保险推荐选择，值得信赖！";
                var shareUrl = "//" + $.domain + "/index.html";
                var img = "https://bx.wts999.com/lib/images/logo-3.jpg";

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
                                    //layer.msg('分享成功！');
                                },
                                cancel: function () {
                                    layer.msg('取消分享！');
                                },
                                fail: function (res) {
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
                                    //layer.msg('已分享！');
                                },
                                cancel: function (res) {
                                    layer.msg('已取消！');
                                },
                                fail: function (res) {
                                    layer.msg(JSON.stringify(res));
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
    }

    var helpInitFn = helpInit();
    helpInitFn.init();

    /*数字处理*/
    template.helper('numberFormat', function (value) {
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
    });
    /*默认头像*/
    template.helper('defaultIco', function (value) {
        return !!value ? value : 'http://file.dakawengu.com/pubimages/headImg.png';
    });


    /*字符串截取*/
    template.helper('subString', function (content, length) {
        if (!content) {
            return "";
        }
        content = content.trim();

        if (content.length > length) {
            var first = content.toString().substring(0, length);
            content = first + "...";
        }
        return content;
    });
    template.helper('cutString', function (content, length) {
        if (!content) {
            return "";
        }
        var _ret = $.tools().cutString(content, length);
        return _ret;
    });
    /*时间转换*/
    template.helper('trustTime', function (inHisTime, pattern) {
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
        } else if (pattern && pattern.toLowerCase() === "date") {
            //日期单独处理 显示 月-日
            return monthTime
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
    });
    /*替换地址*/
    template.helper('mp4Replace', function (content) {
        if (!content) {
            return "";
        }
        var comtentReplace = content.replace('http://media.bigname.gp58.com', 'http://file.dakawengu.com')
            .replace('/video.m3u8', '.mp4');
        return comtentReplace;
    });

    //htmlubb字符串处理
    template.helper('ubb2html', function (content) {
        // 转义 HTML 字符
        if (!content) {
            return "";
        }
        var contents = content;
        // 解析 UBB 字符
        contents
            .replace(/\[b\]([^\[]*?)\[\/b\]/igm, '<b>$1</b>')
            .replace(/\[i\]([^\[]*?)\[\/i\]/igm, '<i>$1</i>')
            .replace(/\[p\]([^\[]*?)\[\/p\]/igm, '<p>$1</p>')
            .replace(/\[span\]([^\[]*?)\[\/span\]/igm, '<span>$1</span>')
            .replace(/\[url=([^\]]*)\]([^\[]*?)\[\/url\]/igm, '<a href="$1">$2</a>')
            .replace(/\[img\]([^\[]*?)\[\/img\]/igm, '<img src="$1" />');
        console.log(contents);
        return contents;
    });
    /*首页产品导航过滤字符*/
    template.helper('typeCodeubb', function (typeCode, length) {
        var html = "",text="";
        if (!typeCode) return;
        if (typeCode.indexOf("&#60;br&#62;") != -1) {
            typeCode = typeCode.split("&#60;br&#62;");
            for (var k in typeCode) {
                if (k < 2) {
                    if (typeCode[k].length > length) {
                        text = typeCode[k].substring(0, length) + "...";
                    } else {
                        text = typeCode[k]
                    }
                    html += '<p class="article-txt">' + text + '</p>';
                }
            }
            return html;
        } else if (typeCode.indexOf("<br>") != -1) {
            typeCode = typeCode.split("<br>");
            for (var i in typeCode) {
                if (i < 2) {
                    if (typeCode[i].length > length) {
                        text = typeCode[i].substring(0, length) + "...";
                    } else {
                        text = typeCode[i]
                    }
                    html += '<p class="article-txt">' + text + '</p>';
                }
            }
            return html;
        } else {
            return typeCode.length > 35 ? typeCode.substring(0, 35) + "..." : typeCode;
        }
    });
    /*emoji表情过滤*/
    template.helper('emojiChange', function (content) {
        var html = content.trim().replace(/\n/g, '<br/>');
        html = jEmoji.softbankToUnified(html);
        html = jEmoji.googleToUnified(html);
        html = jEmoji.docomoToUnified(html);
        html = jEmoji.kddiToUnified(html);
        return jEmoji.unifiedToHTML(html);

    });
    /*保险条款过滤*/
    template.helper('clauseChange', function (content) {
        if (content) {
            var html = content.split(".")[0];
        }
        return html;
    });
    /*状态文字*/
    template.helper('statusChange', function (content) {
        if (content == -3) {
            return '<span class="hasDone">核保失败</span>'
        } else if (content == -1) {
            return '<span class="hasDone">已失效</span>'
        } else if (content == 1) {
            return '<span class="hasDone active">保障中</span>'
        } else if (content == 0) {
            return '<span class="hasDone">待付款</span>'
        } else if (content == -2) {
            return '<span class="hasDone active">核保中</span>'
        } else if (content == -4) {
            return '<span class="hasDone">扣款失败</span>'
        } else if (content == 3) {
            return '<span class="hasDone active">待审核</span>'
        } else if (content == 4) {
            return '<span class="hasDone active">扣款成功</span>'
        } else if (content == 5) {
            return '<span class="hasDone active">退款成功</span>'
        } else if (content == -6) {
            return '<span class="hasDone">已退保</span>'
        } else if (content == -7) {
            return '<span class="hasDone">已终止</span>'
        } else if (content == 99) {
            return '<span class="hasDone">人工审核</span>'
        }
    });

    /*保险天数过滤*/
    template.helper("userinfoChange", function (content) {
        var regDay = /d$/;
        var regMonth = /m$/;
        var regYear = /y$/;
        if (regDay.test(content)) {
            return parseInt(content) + "天";
        }
        if (regMonth.test(content)) {
            return parseInt(content) + "月";
        }
        if (regYear.test(content)) {
            return parseInt(content) + "年";
        }

    });

    /*内容\n换成回车*/
    template.helper("fmtContent", function (content) {
        content = content.split("\n").join("<br/>");
        return content;
    })

    /*内容\n换成回车*/
    template.helper("fmtContent_T", function (content, length) {
        content = content.split("\n").join("<br/>").replace(/【咨询保险博士】/g, "<span class=\"layer-marketing marketing-style\">咨询保险博士</span>");

        content = content.trim();
        if (content.length > length + 1) {
            var first = content.toString().substring(0, length);
            content = first + "...";
        }
        return content;
    })

    /*社区详情页图片过滤*/
    template.helper("imgContent", function (content) {
        //图片字符串过滤
        if (!content) return;
        var html = "";
        var contents = content.split(",");
        if (contents.length == 1) {
            html = '<img src="' + contents[0] + '" class="imgOne"/>';
        } else {
            for (var k in contents) {
                html += '<img src="' + contents[k] + '" class="imgTwo"/>'
            }
        }
        return html;
    })
    /*社区列表图片过滤*/
    template.helper("imgList", function (content) {
        //图片字符串过滤
        if (!content) return;
        //图片字符串过滤
        var html = "";
        content = content.split(",");
        if (content.length > 1) {
            for (var k in content) {
                if (k > 1) {
                    break;
                }
                html += '<span class="img-box-2"><img class="lazy" src="./lib/images/timg.gif" data-loaded="false" data-original="' + content[k] + '" alt=""/></span>'
            }
        } else {
            html = '<span class="img-box-1"><img class="lazy" src="./lib/images/timg.gif" data-loaded="false" data-original="' + content[0] + '" alt=""/></span>'
        }

        return html;
    })
    /*日期字数控制*/
    template.helper("timeNum", function (content, num) {
        if (!content) return;
        if (num < content.length) return content;
        return content.slice(0, num);
    })

    /*日期字数控制*/
    template.helper("typeCode_2", function (typeCode) {
        var html = "";
        typeCode = typeCode.split(",");
        for (var k in typeCode) {
            if (typeCode[k].length == 2) {
                html += typeCode[k] + ",";
            }
        }
        return html;
    })
    /*判断是否存在*/
    template.helper("isTrue", function (content) {
        if (content) {
            return true;
        } else {
            return false;
        }
    })

    template.helper('fmtHotType', function (hotType) {
        if (!hotType || hotType == "" || hotType == -1) {
            return "置&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;顶";
        } else if (hotType == 0) {
            return "产品推荐";
        } else if (hotType == 1) {
            return "投保攻略";
        } else if (hotType == 2) {
            return "理赔案例";
        } else if (hotType == 3) {
            return "限时抢购";
        } else if (hotType == 4) {
            return "产品优惠";
        } else if (hotType == 5) {
            return "投保案例";
        } else if (hotType == 6) {
            return "七夕活动";
        } else if (hotType == 7) {
            return "互动专区";
        } else if (hotType == 8) {
            return "理赔专区";
        } else if (hotType == 9) {
            return "理赔专区";
        }
    });
    //附件名称转换
    template.helper('fileType', function (Type) {
        if (Type === "0") {
            return "保险条款";
        } else if (Type === "1") {
            return "健康告知";
        } else if (Type === "2") {
            return "保险提示书";
        } else if (Type === "3") {
            return "投保须知";
        } else if (Type === "4") {
            return "产品说明书";
        } else if (Type === "5") {
            return "投保人声明";
        } else if (Type === "6") {
            return "人身保险伤残评定标准";
        } else if (Type === "7") {
            return "产品费率表";
        } else if (Type === "8") {
            return "保单样本";
        } else if (Type === "9") {
            return "投保信息确认书";
        } else if (Type === "10") {
            return "现金价值表";
        } else if (Type === "11") {
            return "电子投保告知与声明";
        } else if (Type === "12") {
            return "扣款知情同意书";
        } else if (Type === "13") {
            return "被保人健康告知";
        } else if (Type === "14") {
            return "风险保费表";
        } else if (Type === "15") {
            return "职业分类表";
        } else if (Type === "16") {
            return "人身保险投保提示书";
        } else if (Type === "17") {
            return "产品信息披露";
        } else if (Type === "18") {
            return "客户告知书";
        } else if (Type === "19") {
            return "承保地区表";
        } else if (Type === "20") {
            return "投保人、被保险人声明";
        } else if (Type === "21") {
            return "免责条款";
        } else if (Type === "22") {
            return "声明与授权";
        } else if (Type === "23") {
            return "出单模板";
        } else if (Type === "24") {
            return "理赔须知";
        }

    });
    //域名替换
    template.helper('urlType', function (url) {
        return url.replace("sq.wts9999.net", "sq.wts999.com")
    });
    //身份证过滤
    template.helper('idCard', function (card, length) {
        card = JSON.stringify(card)
        var newCard;
        if (length > 11) {
            newCard = card.replace(/(\w{10})\w{4}(\w{4})/, '$1****$2');
        } else {
            newCard = card.replace(/(\w{3})\w{4}(\w{4})/, '$1****$2');
        }
        newCard = JSON.parse(newCard)
        return newCard
    });
    //数字取整
    template.helper('parseNum', function (text) {
        if (text != null) {
            return parseInt(text)
        } else {
            return 0
        }

    });
    //保留两位小数
    template.helper('numTofixed', function (text) {
        var num = JSON.parse(text);
        num = num.toFixed(2)
        return num
    });
    //数字加1
    template.helper('addNum', function (text) {
        if (text != null) {
            return parseInt(text) + 1
        } else {
            return 1
        }
    });
    template.helper('stockNum', function (num) {
        if (parseInt(num) <= 0) {
            num = 0
        }
        return num
    });
    template.helper('substrbirthday', function (val) { //出生日期格式转换
        var oldBirthday;
        if (val && val.length != 8) {
            oldBirthday = val.substr(0, 4) + val.substr(5, 2) + val.substr(8, 2)
        } else {
            oldBirthday = val;
        }
        return oldBirthday
    });
    template.helper('istrue', function (val) { //true false转换
        if (val) {
            return 1;
        } else {
            return 0;
        }
    });
    template.helper('isSpan', function (content) { //字符串过滤
        var html = "";
        content = content.split("\n");
        if (content.length > 1) {
            for (var k in content) {
                if (k > 1) {
                    break;
                }
                html += '<span class="span1">' + content[k] + '</span>'
            }
        } else {
            html += '<span class="span1">' + content[0] + '</span>'
        }
        return html
    });

    template.helper('elementOption', function (content) { //是否必填
        var val = 0;
        if (content) {
            val = 1;
        }
        return val;

    });
    template.helper('elementOption2', function (content) { //是否必填
        var val = 0;
        if (!content) {
            val = 1;
        }
        return val;
    });
    template.helper('serviceTime', function (content) { //时间过滤
        var val = "";
        if (content) {
            val = content.substr(0, 10).replace(/-/g, ".")
        }
        return val;

    });
    template.helper('insuranceRelationship', function (content) { //受益人与被保险人关系
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

    });
    //重定向问答详情页地址
    template.helper('myZoneDetails', function (content) {
        if (!content) return;
        var base = $.globedata.environment == 1 ? "https://www.wts999.com/question/" : "https://www.wts9999.net/question/";
        return base + content + ".html"
    });
    template.helper('insurederIdentifyType', function (content) { //证件类型
        var val = "";
        switch (content) {
            case '01':
                val = "身份证";
                break;
            case "02":
                val = "护照";
                break;
            case "03":
                val = "军官证";
                break;
            case "04":
                val = "出生证";
                break;
            case "05":
                val = "台湾居民来往大陆通行证";
                break;
            case "06":
                val = "户口本";
                break;
            case "07":
                val = "港澳居民来往内地通行证";
                break;
            case "08":
                val = "港澳台通行证";
                break;
            case "09":
                val = "出生证明";
                break;
            case "99":
                val = "其它";
                break;
        }
        return val;

    });
    template.helper('guaranteeLimit', function (content) { //根据产品类型判断是否显示保障金额
        var val = "";
        if ((content.typeCode && content.typeCode.indexOf("03") > -1) || content.insuranceProductName.indexOf('重疾') > -1) {
            val = content.guaranteeLimit + "元";
        } else {
            val = "详见保障权益"
        }
        return val;
    });
    template.helper('guaranteeLimit2', function (content) { //根据产品类型判断是否显示保障金额
        var val = "";
        if ((content.typeCode && content.typeCode.indexOf("03") > -1) || content.insuranceProductName.indexOf('重疾') > -1) {
            val = content.policy.guaranteeLimit + "元";
        } else {
            val = "详见保障权益"
        }
        return val;

    });
    template.helper('stringInFirst', function (content, num) { //根据产品类型判断是否显示保障金额
        var text = "..." + content.substring(content.length - num, content.length);
        return text;

    });
    template.helper('blankId', function (id) { //根据产品类型判断是否显示保障金额
        if (!id) {
            id = "account_inform";
        }

        return id;

    });
    template.helper('checkPolicy', function (url) { //是否显示 查看保单 过滤
        var html = "";
        if (!url || url.length < 3) return html;
        if (url.indexOf("http") < 0 && url.indexOf("/") < 0) return html;
        html = '<a href="' + url + '" class="btn">查看保单</a>'

        return html;

    });
    //测算、订单页下拉框类别
    template.helper('lzDropDown', function (content) {
        var html = "";
        var values = content.elementValue;
        var elementOption = 0;
        var box1,box2;
        var downName = "",
                options = "",
                checks = "",
                defaultValue = '';
        //如果选择项较多-超过3个或总体长度超过10个字
        if (helpInitFn.elementValue(content.elementValue) || content.checkType) {
            for (var k in values) {
                var name = values[k].name.length > 10 ? values[k].name.slice(0, 10) + "..." : values[k].name;
                if (values[k].isDefault === "true" && elementOption == 0) {
                    defaultValue = values[k].value;
                    downName = '<span class="lz-drop-down-name commonicons-right" data-value="' + values[k].value + '">' + name + '</span>';
                    options += '<a href="javascript:;" class="lz-drop-down-option" data-check="true" data-value="' + values[k].value + '"><i class="lz-drop-yuan"></i>' + values[k].name + '</a>';
                    elementOption = 1;
                } else {
                    options += '<a href="javascript:;" class="lz-drop-down-option" data-value="' + values[k].value + '"><i class="lz-drop-yuan"></i>' + values[k].name + '</a>';
                }

            }
            if (elementOption == 0) {
                downName = '<span class="lz-drop-down-name commonicons-right" data-value="">请选择</span>';
            }
            box1 = '<div class="from-right lz-drop-down from-width" data-type="2" data-result="' + defaultValue + '" data-check="' + elementOption + '">';
            box2 = '</div>';
            html = box1 + downName + '<div class="popupBox"><div class="lz-drop-down-layer" data-dom="' + content.elementCode + '">' + options + '</div><div class="shadeBox"></div></div>' + box2;
        } else {
            //选择项较少时使用单选框
            for (var i in values) {
                if (values[i].isDefault === "true" && elementOption == 0) {
                    defaultValue = values[i].value;
                    checks += '<span class="lz-drop-check" data-check="true" data-value="' + values[i].value + '">' + values[i].name + '</span>';
                    elementOption = 1;
                } else {
                    checks += '<span class="lz-drop-check" data-value="' + values[i].value + '">' + values[i].name + '</span>';
                }
            }
            box1 = '<div class="from-right lz-drop-down" data-type="1" data-result="' + defaultValue + '" data-check="' + elementOption + '">';
            box2 = '</div>';
            html = box1 + '<div class="lz-drop-check-box" data-dom="' + content.elementCode + '">' + checks + '</div>' + box2;
        }

        return html;

    });
    //增值服务等级图片问题
    template.helper('imgNum', function (text) { //根据产品类型判断是否显示保障金额
        if (parseInt(text) < 1) {
            return "v" + 1
        } else if (parseInt(text) < 3) {
            return "v" + parseInt(text)
        } else {
            return "V" + parseInt(text)
        }
    });
    template.helper('changeTimeToAge', function (content) { //将生日改成年龄
        var val = "";
        if (content.indexOf("生日") > -1) {
            val = content.replace("生日", "年龄")
        }
        return val;

    });
    //增值服务等级图片问题
    template.helper('imgNum', function (text) { //根据产品类型判断是否显示保障金额
        if (parseInt(text) < 1) {
            return "v" + 1
        } else if (parseInt(text) < 3) {
            return "v" + parseInt(text)
        } else {
            return "V" + parseInt(text)
        }
    });
    /*时间字段截取*/
    template.helper('timeString', function (content, length) {
        if (!content) {
            return "";
        }
        content = content.trim();
        //content=content
        //    .replace(/\[b\]([^\[]*?)\[\/b\]/igm, '<b>$1</b>')
        //    .replace(/\[i\]([^\[]*?)\[\/i\]/igm, '<i>$1</i>')
        //    .replace(/\[span\]([^\[]*?)\[\/span\]/igm, '<span>$1</span>')
        //    .replace(/\[url=([^\]]*)\]([^\[]*?)\[\/url\]/igm, '<a href="$1">$2</a>')
        //    .replace(/\[img\]([^\[]*?)\[\/img\]/igm, '<img src="$1" />');

        if (content.length > length) {
            var first = content.toString().substring(0, length);
            content = first;
        }
        return content;
    });

    //获取video图片
    template.helper('videoImg', function (content) {
        if (!content) {
            return;
        }
        var img = content.split(',');
        return img[0];
    })
    //字母搜索器-html部分
    template.helper('initialsPicker', function (content) {
        if (!content) {
            return;
        }
        var data = content.elementValue;
        var listDom = "";
        var numDoms = ""
        var type = content.checkType;
        var checkDom = type == 1 ? "lz-radio-new" : "lz-checkbox-02"
        //遍历26字母
        for (var i = 0; i < 26; i++) {
            var code = String.fromCharCode(65 + i);
            var title = '<li class="notCheck" id="picker_' + code + '">' + code + '</li>';
            var num = 0;
            var domChilds = "";
            //生成数据
            for (var k in data) {
                if (String.fromCharCode(65 + i) == data[k].initial) {
                    num++;
                    domChilds += '<li data-name="' + data[k].name + '" data-value="' + data[k].value + '"><span class="name">' + data[k].name + '</span><span class="check ' + checkDom + '"></span></li>'
                }
            }
            if (num == 0) {
                //if-该字母没有数据
                title = ""
            } else {
                numDoms += '<a href="#picker_' + code + '">' + code + '</a>'
            }
            listDom += '<ul class="box" data-letter="' + code + '">' + title + domChilds + '</ul>';
        }
        var html =
            '<div class="initialsPicker" data-id="' + content.elementCode + '" data-type="' + type + '">' +
            '            <div class="header">' +
            '                <span class="fl cancel">取消</span>' +
            '                <span class="fr sure">确认</span>' +
            '            </div>' +
            '            <div class="mainList">' + listDom +
            '            </div>' +
            '            <div class="nums">' + numDoms +
            '            </div>' +
            '        </div>';
        return html;
    })
    //文本化数据
    template.helper('toText', function (content) {
        return JSON.stringify(content);
    })
    //首页小图标
    template.helper('mobileSmallImage', function (content) {
        var val = "";
        content = Number(content);
        switch (content) {
            case 1:
                val = '热卖';
                break;
            case 2:
                val = "新品";
                break;
            case 3:
                val = "口碑";
                break;
            case 4:
                val = "全家购";
                break;
            case 5:
                val = "儿童险";
                break;
            case 6:
                val = "老人险";
                break;
            case 7:
                val = "顶梁柱";
                break;
            case 8:
                val = "爆款";
                break;

        }
        return val;
    })
    template.helper('tagText', function (content) {
        if ($.tools().isNull(content) || content.trim() == "") return;
        content = content.replace(/\,/g, "，")
        var arr = content.split("，");
        var html = '';
        arr.forEach(function (v, i) {
            if (i > 1) return false;
            html += "<span>" + v + "</span>"
        })
        return html
    })
    //评论等级
    template.helper('levels', function (level) {
        if (!level) return;
        var l = '<span class="xx"></span>';
        var html = "";
        for (var i = 0; i < Number(level); i++) {
            html += l;
        }
        return html;
    })
    //评论等级保留一位小数点
    template.helper('levels_toFixed', function (level) {
        if (!level) return;
        return level.toFixed(1);
    })
    //默认图片
    template.helper('defaultImg', function (url, type) {
        if (!type || type == 1) {
            return url ? url : "../lib/images/person-center-03.jpg"
        } else if (type == 2) {
            return url ? url : "./lib/images/person-center-03.jpg"
        }
    })
    /*阅读量*/
    template.helper('viewsNum', function (num) {
        return num * 100 + Math.ceil(Math.random() * 10) * 10 + Math.ceil(Math.random() * 10);
    });
    template.helper('readTime', function (num) {
        if (num.toString().length <= 4) return num;
        if (num.toString().length > 4) {
            return (num / 10000).toFixed(1) + "万";
        }
    });
    template.helper('checkLeng', function (content) { //长度过滤
        var val = "";
        content = Number(content);
        if (content > 0) {
            val = "swiper-slide";
        } else {
            val = "img-one";
        }
        return val;

    });
    /*字符串截取2*/
    template.helper('subLine', function (content, length) {
        if (!content) {
            return "";
        }
        content = content.trim();
        if (content.length > length) {
            var first = content.toString().substring(0, length);
            content = first;
        }
        return content;
    });
    /*文章评论图片展示*/
    template.helper('commentImg', function (content) {
        if (!content) {
            return "";
        }
        var html = "";
        var contents = content.split(',');
        for (var k in contents) {
            if (contents[k]) html += "<span class='commentImgs'><img src='" + contents[k] + "' alt=''></span>";
        }
        return html;
    });

    template.helper('pronsHtml', function (content) {
        if (!content) {
            return "";
        }
        var list = content.split("<br>");
        var html = ""
        for (var i = 0; i < list.length; i++) {
            if (i >= 3) break;
            html += '<p><i class="iconfont icon-dianzan3"></i>' + list[i] + '</p>'
        }
        return html;
    });

    //时间带/
    template.helper('shijian', function (time) {
        var text = ''
        if (time) {
            var yue = time.substring(5, 7);
            var ri = time.substring(8, 10);
            text = yue + '/' + ri
        }
        return text
    });
})