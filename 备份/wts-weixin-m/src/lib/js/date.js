/* 
 * 日期插件
 * 滑动选取日期（年，月，日）
 * V1.1
 */
(function ($, undefined) {
    $.fn.date = function (clickId,options,Ycallback,Ncallback) {
        //插件默认选项
        var that;  //当前点击dom
        var docType = $(this).is('input');
        var datetime = false;
        var reg_china = new RegExp("[\\u4E00-\\u9FFF]+","g");
        var nowdate = new Date();
        var indexY=1,indexM=1,indexD=1;
        var indexH=1,indexI=1,indexS=0;
        var initY=nowdate.getFullYear();
        var initM=nowdate.getMonth()+1;
        var initD=nowdate.getDate();
        var initH=nowdate.getHours();
        var initI=nowdate.getMinutes();
        var initS=nowdate.getSeconds();
        var yearScroll=null,monthScroll=null,dayScroll=null;
        var HourScroll=null,MinuteScroll=null,SecondScroll=null;
        var initYFlag = false, initMFlag = false;
        var itemHeight = 40;
        $.fn.date.defaultOptions = {
            beginyear:1930,                 //日期--年--份开始
            endyear:2050,                   //日期--年--份结束
            beginmonth:1,                   //日期--月--份结束
            endmonth:12,                    //日期--月--份结束
            beginday:1,                     //日期--日--份结束
            endday:31,                      //日期--日--份结束
            beginhour:1,
            endhour:12,
            beginminute:'00',
            endminute:59,
            curdate:false,                   //打开日期是否定位到当前日期
            theme:"date",                    //控件样式（1：日期，2：日期+时间）
            mode:null,                       //操作模式（滑动模式）
            event:"click",                    //打开日期插件默认方式为点击后后弹出日期 
            show:true,
            dateFormatType:0
        }
        //用户选项覆盖插件默认选项   
        var opts = $.extend( true, {}, $.fn.date.defaultOptions, options );
        $.fn.date.opts = opts;
        if(opts.theme === "datetime"){datetime = true;}
        if(!opts.show){
            that.unbind('click');
        } else {
            //绑定事件（默认事件为获取焦点）
            $("."+clickId).bind(opts.event,function () {
                that = $(this)
                if(that.attr("readonly") == "readonly"){
                    return;
                }
                createUL();      //动态生成控件显示的日期
                extendOptions(); //显示控件
                init_iScrll();   //初始化iscrll
                that.blur();
                if(datetime){
                    showdatetime();
                    refreshTime();
                }
                bindButton();
            })
        };
        function refreshTime(){
            HourScroll.refresh();
            MinuteScroll.refresh();
            SecondScroll.refresh();
            if(initH>12){    //判断当前时间是上午还是下午
                SecondScroll.scrollTo(0, (initD-1)*itemHeight, 100, true);   //显示“下午”
                initH=initH-12-1;
            }
            HourScroll.scrollTo(0, initH*itemHeight, 100, true);
            MinuteScroll.scrollTo(0, initI*itemHeight, 100, true);
            initH=parseInt(nowdate.getHours());
        }
        function resetIndex(){
            indexY=1;
            indexM=1;
            indexD=1;
        }
        function bindButton(){
            resetIndex();
            $("#dateconfirm").unbind('click').click(function () {
                var datestr = $("#yearwrapper ul li:eq("+indexY+")").html().substr(0,$("#yearwrapper ul li:eq("+indexY+")").html().length-1)+"-"+
                    $("#monthwrapper ul li:eq("+indexM+")").html().substr(0,$("#monthwrapper ul li:eq("+indexM+")").html().length-1)+"-"+
                    $("#daywrapper ul li:eq("+Math.round(indexD)+")").html().substr(0,$("#daywrapper ul li:eq("+Math.round(indexD)+")").html().length-1);
                if(datetime){
                    if(Math.round(indexS)===1){//下午
                        $("#Hourwrapper ul li:eq("+indexH+")").html(parseInt($("#Hourwrapper ul li:eq("+indexH+")").html().substr(0,$("#Hourwrapper ul li:eq("+indexH+")").html().length-1))+12)
                    }else{
                        $("#Hourwrapper ul li:eq("+indexH+")").html(parseInt($("#Hourwrapper ul li:eq("+indexH+")").html().substr(0,$("#Hourwrapper ul li:eq("+indexH+")").html().length-1)))
                    }
                    datestr+=" "+$("#Hourwrapper ul li:eq("+indexH+")").html().substr(0,$("#Minutewrapper ul li:eq("+indexH+")").html().length-1)+":"+
                        $("#Minutewrapper ul li:eq("+indexI+")").html().substr(0,$("#Minutewrapper ul li:eq("+indexI+")").html().length-1);
                    indexS=0;
                }
                if(Ycallback===undefined){
                    if(docType){that.val(datestr);}else{that.html(datestr);}
                    $("#datePage").hide();
                    $("#dateshadow").hide();
                    cancelPreventMove();
                }else{
                    ret = Ycallback(datestr,that);
                    if (ret !== false){
                        if($.fn.date.opts.dateFormatType == 1){
                            datestr = datestr.replace(/年/g, ".");
                            datestr = datestr.replace(/月/g, ".");
                            datestr = datestr.replace(/日/g, "");
                        }
                        if(docType){that.val(datestr);}else{that.html(datestr);}
                        $("#datePage").hide();
                        $("#dateshadow").hide();
                        cancelPreventMove();
                    }

                }
            });
            $("#datecancle").click(function () {
                $("#datePage").hide();
                $("#dateshadow").hide();
                cancelPreventMove();
                //Ncallback(false);
            });
        }
        function extendOptions(){
            $("#datePage").show();
            $("#dateshadow").show();
            preventMove();
            if($("#yearwrapper ul li").length> 1) itemHeight = $("#yearwrapper ul li:eq(1)").height();
        }
        //日期滑动
        function init_iScrll() {
            var strY = $("#yearwrapper ul li:eq("+indexY+")").html().substr(0,$("#yearwrapper ul li:eq("+indexY+")").html().length-1);
            var strM = $("#monthwrapper ul li:eq("+indexM+")").html().substr(0,$("#monthwrapper ul li:eq("+indexM+")").html().length-1);

            if(!opts.curdate && that.html() !=="" && that.html() !=="请选择" && !reg_china.test(that.html())){
                initY = parseInt(that.html().substr(0,4));
                initM = parseInt(that.html().substr(5,2));
                initD = parseInt(that.html().substr(8,2));
            }

            yearScroll = new iScroll("yearwrapper",{snap:"li",vScrollbar:false,
                onScrollEnd:function () {
                    indexY = Math.round((this.y/itemHeight))*(-1)+1;
                    strY = $("#yearwrapper ul li:eq("+indexY+")").html().substr(0,$("#yearwrapper ul li:eq("+indexY+")").html().length-1);
                    opts.endday = checkdays(strY,strM);
                    $("#daywrapper ul").html(createDAY_UL());
                    dayScroll.refresh();
                    if(!initYFlag) {
                        initYFlag = true;
                        monthScroll.scrollTo(0, (initM-1)*itemHeight, 10, true);
                        //monthScroll.scrollToElement("#monthwrapper ul li:nth-child("+initM+")", 10);
                    }
                }
            });
            monthScroll = new iScroll("monthwrapper",{snap:"li",vScrollbar:false,
                onScrollEnd:function (){
                    indexM = Math.round((this.y/itemHeight))*(-1)+1;
                    strM = $("#monthwrapper ul li:eq("+indexM+")").html().substr(0,$("#monthwrapper ul li:eq("+indexM+")").html().length-1);
                    opts.endday = checkdays(strY,strM);
                    $("#daywrapper ul").html(createDAY_UL());
                    dayScroll.refresh();
                    if(!initMFlag) {
                        initMFlag = true;
                        dayScroll.scrollTo(0, (initD-1)*itemHeight, 10, true);
                        //dayScroll.scrollToElement("#daywrapper ul li:nth-child("+initD+")", 10);
                    }
                }
            });
            dayScroll = new iScroll("daywrapper",{snap:"li",vScrollbar:false,
                onScrollEnd:function () {
                    indexD = Math.round((this.y/itemHeight))*(-1)+1;
                }
            });
            yearScroll.scrollTo(0, (initY-opts.beginyear)*itemHeight, 10, true);
            //yearScroll.scrollToElement("#yearwrapper ul li:nth-child("+(initY-opts.beginyear+1)+")", 10);
        }
        function showdatetime(){
            init_iScroll_datetime();
            addTimeStyle();
            $("#datescroll_datetime").show();
            $("#Hourwrapper ul").html(createHOURS_UL());
            $("#Minutewrapper ul").html(createMINUTE_UL());
            $("#Secondwrapper ul").html(createSECOND_UL());
        }

        //日期+时间滑动
        function init_iScroll_datetime(){
            HourScroll = new iScroll("Hourwrapper",{snap:"li",vScrollbar:false,
                onScrollEnd:function () {
                    indexH = Math.round((this.y/itemHeight)*(-1))+1;
                    HourScroll.refresh();
                }})
            MinuteScroll = new iScroll("Minutewrapper",{snap:"li",vScrollbar:false,
                onScrollEnd:function () {
                    indexI = Math.round((this.y/itemHeight)*(-1))+1;
                    HourScroll.refresh();
                }})
            SecondScroll = new iScroll("Secondwrapper",{snap:"li",vScrollbar:false,
                onScrollEnd:function () {
                    indexS = Math.round((this.y/itemHeight)*(-1));
                    HourScroll.refresh();
                }})
        }
        function checkdays (year,month){
            var new_year = year;    //取当前的年份        
            var new_month = month++;//取下一个月的第一天，方便计算（最后一天不固定）        
            if(month>12)            //如果当前大于12月，则年份转到下一年        
            {
                new_month -=12;        //月份减        
                new_year++;            //年份增        
            }
            var new_date = new Date(new_year,new_month,1);                //取当年当月中的第一天        
            return (new Date(new_date.getTime()-1000*60*60*24)).getDate();//获取当月最后一天日期    
        }
        function  createUL(){
            initYFlag = false;
            initMFlag = false;
            CreateDateUI();
            $("#yearwrapper ul").html(createYEAR_UL());
            $("#monthwrapper ul").html(createMONTH_UL());
            $("#daywrapper ul").html(createDAY_UL());
        }
        function CreateDateUI(){
            var str = ''+
                '<div id="dateshadow" style="z-index:450"></div>'+
                '<div id="datePage" class="page" style="z-index:450;overflow:hidden;">'+
                '<section>'+
                '<div id="datetitle"><h2>请选择日期</h2></div>'+
                '<div id="datemark"><a id="markyear"></a><a id="markmonth"></a><a id="markday"></a></div>'+
                '<div id="timemark"><a id="markhour"></a><a id="markminut"></a><a id="marksecond"></a></div>'+
                '<div id="datescroll">'+
                '<div id="yearwrapper">'+
                '<ul></ul>'+
                '</div>'+
                '<div id="monthwrapper">'+
                '<ul></ul>'+
                '</div>'+
                '<div id="daywrapper">'+
                '<ul></ul>'+
                '</div>'+
                '</div>'+
                '<div id="datescroll_datetime">'+
                '<div id="Hourwrapper">'+
                '<ul></ul>'+
                '</div>'+
                '<div id="Minutewrapper">'+
                '<ul></ul>'+
                '</div>'+
                '<div id="Secondwrapper">'+
                '<ul></ul>'+
                '</div>'+
                '</div>'+
                '</section>'+
                '<footer id="dateFooter">'+
                '<div id="setcancle">'+
                '<ul>'+
                '<li id="dateconfirm">确定</li>'+
                '<li id="datecancle">取消</li>'+
                '</ul>'+
                '</div>'+
                '</footer>'+
                '</div>'
            $("#datePlugin").html(str);
        }
        function addTimeStyle(){
            $("#datePage").css("height","380px");
            $("#datePage").css("top","60px");
            $("#yearwrapper").css("position","absolute");
            $("#yearwrapper").css("bottom","200px");
            $("#monthwrapper").css("position","absolute");
            $("#monthwrapper").css("bottom","200px");
            $("#daywrapper").css("position","absolute");
            $("#daywrapper").css("bottom","200px");
        }
        //创建 --年-- 列表
        function createYEAR_UL(){
            var str="<li>&nbsp;</li>";
            for(var i=opts.beginyear; i<=opts.endyear;i++){
                str+='<li>'+i+'年</li>'
            }
            return str+"<li>&nbsp;</li>";;
        }
        //创建 --月-- 列表
        function createMONTH_UL(){
            var str="<li>&nbsp;</li>";
            for(var i=opts.beginmonth;i<=opts.endmonth;i++){
                if(i<10){
                    i="0"+i
                }
                str+='<li>'+i+'月</li>'
            }
            return str+"<li>&nbsp;</li>";;
        }
        //创建 --日-- 列表
        function createDAY_UL(){
            $("#daywrapper ul").html("");
            var str="<li>&nbsp;</li>";
            for(var i=opts.beginday;i<=opts.endday;i++){
                if(i<10){
                    i="0"+i
                }
                str+='<li>'+i+'日</li>'
            }
            return str+"<li>&nbsp;</li>";;
        }
        //创建 --时-- 列表
        function createHOURS_UL(){
            var str="<li>&nbsp;</li>";
            for(var i=opts.beginhour;i<=opts.endhour;i++){
                str+='<li>'+i+'时</li>'
            }
            return str+"<li>&nbsp;</li>";;
        }
        //创建 --分-- 列表
        function createMINUTE_UL(){
            var str="<li>&nbsp;</li>";
            for(var i=opts.beginminute;i<=opts.endminute;i++){
                if(i<10){
                    i="0"+i
                }
                str+='<li>'+i+'分</li>'
            }
            return str+"<li>&nbsp;</li>";;
        }
        //创建 --分-- 列表
        function createSECOND_UL(){
            var str="<li>&nbsp;</li>";
            str+="<li>上午</li><li>下午</li>"
            return str+"<li>&nbsp;</li>";;
        }

        function preventMove() {
            $("html, body, #dateshadow, #datePage").on('touchmove',function(event){
                event.preventDefault();
                event.stopPropagation();
            });
        }

        function cancelPreventMove() {
            $("html, body, #dateshadow, #datePage").off('touchmove');
        }
    }
})(jQuery);  
