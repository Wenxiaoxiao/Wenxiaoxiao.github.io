//公共方法

!(function ($) {

    //成定链接隐藏底部
    if(window.location.href.indexOf("chengding")>-1){
        $(".copyright").hide();
    }

    var fromsFn = function () {
        return {
            sendAjax: function (planCode,mobile,name,content,successMsg,callback){
                 //提交推广接口
                var self=this;
                var urls = ["/source/collect.do",'/source/txCollect.do','source/wxCollect.do'];
                var sourceUrl = location.href;
                var refererUrl = document.referrer || '';
                var userAgent = navigator.userAgent;
                var channel = $.getQueryString("c") || "";
                var send = $.getQueryString("m") || "";
                var executer = $.getQueryString("e") || "";
                var planName = $.getQueryString("p") || "";
                var clickId = $.getQueryString('qz_gdt')||"";
                var baseUrl=urls[0]
                var data;
                if(is_gdt==2){
                    //朋友圈
                    var clickId = GetQueryString('gdt_vid');
                    baseUrl=urls[2]
                    data = {
                        'mobile' : mobile,
                        'name' : name,
                        'content' : content,
                        'planCode' : planCode,
                        'sourceUrl' : sourceUrl,
                        'accountId' : $.getQueryString("a"),
                        'clickId' : clickId,
                        'refererUrl' : refererUrl,
                        'userAgent' : userAgent,
                        'channel' : channel,
                        'executer' : executer,
                        'planName' : planName
                    }
                }else if(is_gdt){
                    //广点通
                    var clickId =$.getQueryString('qz_gdt')||"";
                    baseUrl=urls[1]
                    var data = {
                        'mobile' : mobile,
                        'name' : name,
                        'content' : content,
                        'planCode' : planCode,
                        'sourceUrl' : sourceUrl,
                        'clientId' : clientId,
                        'accountId' : accountId,
                        'clickId' : clickId,
                        'actionSetId' : actionSetId,
                        'refererUrl' : refererUrl,
                        'userAgent' : userAgent,
                        'channel' : channel,
                        'executer' : executer,
                        'planName' : planName
                    }
                }else{
                    data = {
                        'mobile' : mobile,
                        'name' : name,
                        'content' : content,
                        'planCode' : planCode,
                        'sourceUrl' : sourceUrl,
                        'refererUrl' : refererUrl,
                        'userAgent' : userAgent,
                        'channel' : channel,
                        'executer' : executer,
                        'planName' : planName
                    }
                }
                $.ajax({
                    url: baseUrl,
                    data : data,
                    type : "POST",
                    dataType : 'script',
                    success : function() {
                        $(".modal-srzsbz-0114").addClass('hide');
                        if (result.success == 1) {
                            afterSubmit();
                            if(successMsg!=2){
                                self.showLayer();
                            }
                            if(callback)callback()
                        }else if(result.success == 0){
                            layer.alert('保费测算失败，请核对您输入的手机号是否正确！')
                        }
                    },
                    error : function() {
                        self.showLayer();
                        // alert("提交失败");
                    }
                })
            },
            sendAjax1: function (planCode,mobile,name,content,planName,successMsg){
                //提交推广接口
               var self=this;
               var urls = ["/source/collect.do",'/source/txCollect.do','source/wxCollect.do'];
               var sourceUrl = location.href;
               var refererUrl = document.referrer || '';
               var userAgent = navigator.userAgent;
               var channel = $.getQueryString("c") || "";
               var send = 1;
               var executer = $.getQueryString("e") || "";
               var planName = planName;
               var clickId = $.getQueryString('qz_gdt')||"";
               var baseUrl=urls[0];
               var data;
               if(is_gdt==2){
                   //朋友圈
                   var clickId = GetQueryString('gdt_vid');
                   baseUrl=urls[2]
                   data = {
                       'mobile' : mobile,
                       'name' : name,
                       'content' : content,
                       'planCode' : planCode,
                       'sourceUrl' : sourceUrl,
                       'accountId' : $.getQueryString("a"),
                       'clickId' : clickId,
                       'refererUrl' : refererUrl,
                       'userAgent' : userAgent,
                       'channel' : channel,
                       'executer' : executer,
                       'planName' : planName,
                       'send':send
                   }
               }else if(is_gdt){
                   //广点通
                   var clickId =$.getQueryString('qz_gdt')||"";
                   baseUrl=urls[1]
                   var data = {
                       'mobile' : mobile,
                       'name' : name,
                       'content' : content,
                       'planCode' : planCode,
                       'sourceUrl' : sourceUrl,
                       'clientId' : clientId,
                       'accountId' : accountId,
                       'clickId' : clickId,
                       'actionSetId' : actionSetId,
                       'refererUrl' : refererUrl,
                       'userAgent' : userAgent,
                       'channel' : channel,
                       'executer' : executer,
                       'planName' : planName,
                       'send':send
                   }
               }else{
                   data = {
                       'mobile' : mobile,
                       'name' : name,
                       'content' : content,
                       'planCode' : planCode,
                       'sourceUrl' : sourceUrl,
                       'refererUrl' : refererUrl,
                       'userAgent' : userAgent,
                       'channel' : channel,
                       'executer' : executer,
                       'planName' : planName,
                       'send':send
                   }
               }
               $.ajax({
                   url:baseUrl,
                   data : data,
                   type : "POST",
                   dataType : 'script',
                   success : function() {
                       if (result.success == 1) {
                            layer.msg('验证码已发送');
                            successMsg('开始倒计时');
                       }
                   },
                   error : function() {
                    layer.msg('出错了')
                   }
               })
           },
            setFroms:function(data,params,ele1,ele2){
                //初始化表单和校验表单
                var self=this;
                var html=template('fromHtml',{data:data});
                if(ele1){
                    $(ele1).after(html)
                }
                else{
                    $('.fromTitle').after(html)
                }
                this.getDates();
                this.cpNavScroll();
                this.initEvents();
                var clickEle = $('#getPremiums');
                if(ele2){
                    clickEle = $(ele2);
                }
                clickEle.click(function(){
                    //提交数据
                    var fromValue=[],name='',mobile='';
                    for(var k in data){
                        var type=data[k].type;
                        var id=data[k].id;
                        var value=self.getValue(data[k]);
                        if(!value){
                            return false;
                        }else{
                            if(id==='name'){
                                name=value;
                            }else if(id==='mobile'){
                                mobile=value;
                            }else{
                                fromValue.push({
                                    'key':data[k].name,
                                    'value':value
                                })
                            }
                        }
                    }
                    self.sendAjax(params.title,mobile,name,JSON.stringify(fromValue),params.msg)
                })
            },
            initEvents:function(){
                if($(".check-more").length>0){
                    $(".checkBtns").click(function(){
                        var val=$(this).text();
                        $(this).addClass('active').siblings().removeClass('active');
                        $(this).siblings('.checkInput').val('');
                        $(this).parents('.check-more').attr('data-value',val)
                    })
                    $(".checkInput").on('focus',function(){
                        $(this).addClass('active').siblings().removeClass('active');
                    })
                    $(".checkInput").on('change',function(){
                        var val=$(this).val();
                        $(this).parents('.check-more').attr('data-value',val)
                    })
                    
                    $(".check-more").each(function(){
                        var defaultValue=$(this).siblings('.hide').text();
                        if(defaultValue)$(this).attr('data-value',defaultValue)
                    })
                }
            },
            getDates:function(){
                if($('.from-time').length>0){
                    laydate.render({
                        elem: '.from-time', //指定元素
                    });
                }
            },
            getValue:function(item){
                //获取并比对表单值
                var type=item.type,value='';
                if(type===1 || type===2 || type===3 || type===5){
                    value=$('#'+item.id).val();
                }else if(type===4){
                    value=$('.radio-'+item.id+':checked').val();
                }else if(type===6){
                    value=$('#'+item.id).attr('data-value');
                }
                if(!value&&!item.notRequire){
                    layer.alert(item.name+'尚未填写')
                    return false;
                }else if(type===3){
                    if(!$.regular().isPhone(value)){
                        layer.alert('您输入的不是正确的手机号码！')
                        return false;
                    }
                }
                return value;
            },
            showLayer:function(){
                var layerHtml=
                '<div class="wts-introduce-pc">'
                +'  <img src="./lib/images/layer-pc-bac.png" alt="" class="top">'
                +'  <p class="introduce-p">梧桐树保险网—银保监会网销许可的正规平台。我们拥有5000+保险产品解读及咨询能力。我们为您节省保费，买保险不花冤枉钱！</p>'
                +'  <p class="introduce-title">梧桐树保险网—精选好产品，理赔更无忧</p>'
                +'  <div class="introduce-btns">'
                +'      <a target="_blank" href="https://bx.wts999.com/m/exercise/get-gift.html" class="introduce-btn">0元投保</a>'
                +'      <a target="_blank" href="https://bx.wts999.com/index.html" class="introduce-btn">保险超市</a>'
                +'      <a target="_blank" href="https://bx.wts999.com/m/exercise/customization_home.html" class="introduce-btn">方案定制</a>'
                +'      <a target="_blank" href="https://bx.wts999.com/m/exercise/usersLoves.html" class="introduce-btn">大家都爱买</a>'
                +'  </div>'
                +'</div>';
                layer.open({
                    title:false,
                    btn:false,
                    offset: '15%',
                    skin: 'layer-introduce-pc',
                    area: '660px', //宽高
                    content: layerHtml
                });
            },
            cpNavScroll:function(){
                //tab滚动
                var bar=$(".bars");
                if(!bar.length){
                    return;
                }
                var num=0;
                var barTop = $(bar).offset().top;
                var barFixed=false;
                $(document).scroll(function () {
                    //三个导航
                    var crolltop = $(window).scrollTop();
                    if (crolltop < barTop && barFixed==true) {
                        bar.removeClass("active");
                        barFixed=false;
                    } else if (crolltop >= barTop && barFixed==false) {
                        bar.addClass("active");
                        barFixed=true;
                    }
                });
            },
            moveShow:function(){
                //鼠标移入显示下载app二维码
                $(".move-show").hover(function(){
                    $(this).find(".flautImg").toggleClass("active");
                })
            },
            initCommonts:function(){
                var detailsPage = new ClickPages()
            ajaxs(1)
                detailsPage.init(commentss.length, pageSize, this.commontAjax)
            },
            getAges:function(start,end){
                var json=[];
                for(var k=start;k<=end;k++){
                    json.push({
                        value:k+'岁'
                    })
                }
                return json
            },
            


        }
    }
    $.extend({
        fromsFn: fromsFn
    });
})(jQuery);
