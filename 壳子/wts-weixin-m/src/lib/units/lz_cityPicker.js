/**
 * Created by Administrator on 2017/12/25.
 * 郝兴来
 */
function CityPicker() {
}
CityPicker.prototype = {
    constructor: CityPicker,
    init: function (options, callBack) {
        var self=this;
        this.callBack = callBack;
        this.initData = {//初始参数
            intoDom: "#cityIntoDom",//结果输入dom
            dom:"#cityPicker",//弹出层id
            cityData: {},//城市数据
            templateId: "",
            itemNum: 3,//选择数量
            symbol: " ",//间隔符
            subtring: 20,//字符截取
        };
        this.initData = $.extend({}, this.initData, options);
        this.result = [];//结果
        this.items = {
            id: "",
            thisDom: {}
        }; //其他相关
        this.state = 0;//状态
        this.clickNum = 0;
        var dom = this.initData.dom;

        //点击开始
        $(self.initData.intoDom).on("click", function () {
            if($.isEmptyObject(self.initData.cityData)){
                return layer.msg("没有获取到地区数据");
            }
            self.items.thisDom = $(this);
            if ($(dom).length > 0 && self.state == 1) {
                self.close(); //关闭
            }
            else {
                self.htmlIn(); //注入html
                if (self.state == 0) {
                    self.events();//事件
                }
            }
        })
        
        
    },
    //事件绑定
    events: function () {
        var self = this;

        var options = this.initData;
        var dom = options.dom;

        //取消
        $(dom).on("click", ".cancel", function () {
            self.close();//关闭
        })
        //选择城市
        $(dom).on("click", ".domCheck >a", function () {
            if (self.clickNum > 0)return;
            self.clickNum++;
            var value=this.dataset;
            
            $(this).addClass("active").siblings().removeClass("active");
            var istrue = self.choice(value.level, value);
            if (istrue) {
                self.clickNum = 0;
            }
        })

    },
    //注入html
    htmlIn: function () {
        var self = this;
        var options = this.initData;
        var dom = options.dom;
        this.clickNum = 0;
        if (self.state == 2) {
            self.state = 1;
            $(dom).fadeIn();
            return;
        }

        var cityData = options.cityData;
        var privinceH = "";
        var zip;
        for (var k in cityData) {
            zip=cityData[k].zip || "";
            privinceH += '<a href="javascript:;" data-level="1" data-zip="'+zip+'" data-value="' + cityData[k].value + '" data-name="'+cityData[k].text+'">' + cityData[k].text + '</a>'
        }

        var html = '<div class="lz-cityPicker num-' + options.itemNum + '" id="'+dom.substring(1,dom.length)+'">' +
            '    <div class="content">' +
            '    <div class="cancel"></div>' +
            '    <ul class="pickerName">' +
            '    <li id="privince" class="active">省份</li>' +
            '    <li id="city">城市</li>' +
            '    <li id="district">区县</li>' +
            '    </ul>' +
            '    <div class="privinceBox domCheck active">' +
            privinceH +
            '    </div>' +
            '    <div class="cityBox domCheck"></div>'+
            '    <div class="districtBox domCheck"></div>'+
            '    </div>' +
            '    </div>';
        $("body").append(html);
    },
    //选择后判断
    choice: function (level, value) {
        var self = this;
        var options = this.initData;
        var mainDom = options.dom;
        var cityData = options.cityData;
        var cityH = "", districtH = "";
        level = Number(level);
        //赋值 ，切换
        self.result[level - 1] = value;

        $(".pickerName li").eq(level - 1).html(value.name);

        //最后一级选择
        if (level == options.itemNum) {
            self.clickNum = 5;
            self.innerValue();//赋值
            self.close();//关闭
            self.callBack(self.result, self.items);
            $(".domCheck").eq(level).addClass("active").siblings().removeClass("active");
            return false;
        }

        self.reset(level);//重置数据
        var cityDatas;
        //选择完省份
        if (level == 1) {
            for (var i in cityData) {
                if (cityData[i].value == value.value) {
                    cityDatas = cityData[i].children;
                    if(!cityDatas || cityDatas.length==0){
                        self.clickNum = 5;
                        self.innerValue();//赋值
                        self.close();
                        self.callBack(self.result, self.items);
                        return false;
                    }
                    cityH = self.getHtml(level + 1, cityDatas);//获得html
                    $(mainDom + " .cityBox").html(cityH);
                    $(mainDom + " .districtBox").html("");
                }
            }
            $(".pickerName li").eq(1).html("城市");
            $(".pickerName li").eq(2).html("区县");
        } else if (level == 2) {
            //选择完城市
            var flrstCode = self.result[0].value;
            self.result.length=2;
            for (var k in cityData) {
                if (cityData[k].value == flrstCode) {
                    cityDatas = cityData[k].children;
                    for (var j in cityDatas) {
                        if (cityDatas[j].value == value.value) {
                            var districtDatas = cityDatas[j].children;
                            //如果没有第三级
                            if (!districtDatas || districtDatas.length==0) {
                                self.clickNum = 5;
                                self.innerValue();//赋值
                                $(mainDom + " .districtBox").html("");
                                self.close();
                                self.result.length=2;
                                self.callBack(self.result, self.items);
                                return false;
                            }
                            districtH = self.getHtml(level + 1, districtDatas);//获得html
                        }
                    }
                }
            }
            setTimeout(function(){
                $(mainDom + " .districtBox").html(districtH);
            },200)
            $(".pickerName li").eq(2).html("区县");
        }
        $(".domCheck").eq(level).addClass("active").siblings().removeClass("active");
        $(".pickerName li").eq(level).addClass("active").siblings().removeClass("active");
        return true;
    },
    //新增子城市dom
    close: function () {
        var options = this.initData;
        var dom = options.dom;
        $(dom).fadeOut();
        this.state = 2;
    },
    //重置数据
    reset: function (level) {
        this.result.length = level;
        if (level === "1") {
            $(".pickerName li").eq(1).html("城市");
            $(".pickerName li").eq(2).html("区县");
            $(".districtBox").html("");
        } else if (level === "2") {
            $(".pickerName li").eq(2).html("区县");
        }

    },
    //子数据
    getHtml: function (level, data) {
        var html = "";
        var zip;
        for (var j in data) {
            zip=data[j].zip || "";
            html += '<a href="javascript:;" data-zip="'+zip+'" data-level="' + level + '" data-value="' + data[j].value + '" data-name="'+data[j].text+'">' + data[j].text + '</a>';
        }
        return html;
    },
    //赋值
    innerValue: function () {
        var result=this.result;
        var options=this.initData;
        var self=this;
        var text;
        for (var k in result) {//取值
            if (k == 0) {
                text = result[k].name;
            } else {
                text += options.symbol + result[k].name;
            }
        }
        if (text.length > options.subtring) {
            text = text.slice(0, options.subtring) + "..."
        }
        $(self.items.thisDom).html(text);
    }

}