/**
 * Created by YZTC on 2017/3/23.
 */
// window.onload=function() {
    $(function () {
        $.getJSON("json/banner.json",function(res){
            initData(res)
        });
        function initData(arr){
            var ary=arr;
            for(var i=0; i<ary.length;i++){
                var divs=$("<div class='swiper-slide'><img src='"+ary[i].imgUrl+"'></div>");
                $(".swiper-wrapper").append(divs);
            }
            var mySwiper = new Swiper ('.swiper-container', {
                //direction: 'vertical',
                 loop: true,
                autoplay:1000,
                // 如果需要分页器
                pagination: '.swiper-pagination',
                // 如果需要前进后退按钮
                nextButton: '.swiper-button-next',
                prevButton: '.swiper-button-prev',
                // 如果需要滚动条
                scrollbar: '.swiper-scrollbar'
            });
        }
        $.getJSON("json/menu.json",function(res){
            initData1(res)
        });
        function initData1(data) {
            var arr=data;
            for(var i=0;i<arr.length;i++){
                var areaList=$("<li><h4></h4><p></p></li>");
                areaList.find("h4").text(arr[i].title);
                (function (k) {
                    for(var j=0;j<arr[k].mainCity.length;j++){
                        var as=$("<a href=''>"+arr[k].mainCity[j]+"</a>");
                        areaList.find("p").append(as);
                    }
                })(i);
                var moreCitys=arr[i].moreCity;
                var contentBox=$("<div class='contenBox'></div>");
                for(var n of moreCitys ){
                    if(n.cityName!=="主题推荐"){
                        var d1=$("<div><h3></h3><p></p></div>");
                        d1.find("h3").text(n.cityName);
                        var n1=n.items;
                        for( var m in n1){
                            var as=$("<a href=''>"+n1[m]+"</a>");
                            d1.find("p").append(as);
                        }
                    }else {
                        var d1=$("<div><h3></h3></div>");
                        d1.find("h3").text(n.cityName);
                        var n1=n.items;
                        for( var m of n1){
                            var imgs=$("<img src='"+m+"'>");
                            d1.append(imgs);
                        }
                    }
                    contentBox.append(d1);
                }
                arr[i].moreCityImg?contentBox.append($("<img src='"+arr[i].moreCityImg+"'>")):null;
                areaList.append(contentBox);
                $(".citys").append(areaList);
            }
            var $areaTravel=$(".citys >li");
            //console.log($areaTravel);
            $areaTravel.each(function(index,ele){
                //console.log(ele);
                $(ele).css("background","url(img/ii"+(index+1)+".png) no-repeat 18px 10px,url(img/ico3.png) no-repeat 257px 21px");
            });
            $areaTravel.hover(function () {
                $(this).addClass("addbg");
                $(this).find(".contenBox").css("display","block");
               // console.log($(this));
            },
            function () {
                $(this).removeClass("addbg");
                $(this).find(".contenBox").css("display","none");
            })
        }
        $("header>input:eq(0)").hover(function () {
            $("header>input:eq(1)").show();
            $("header>input:eq(1)").animate({width:"170px"},300);
            $(this).css("backgroundColor","#fff");
            //console.log($("header>input:eq(0)"))
        },function () {
            $("header>input:eq(1)").hide();
            $(this).css("backgroundColor","#323232");
            $("header>input:eq(1)").animate({width:"90px"},300);
        });
        $(".main .sold p a").hover(function () {
           $(this).find("img").attr("src","img/chang2.png")
        },function () {
            $(this).find("img").attr("src","img/chang1.png")
        });
        $.getJSON("json/freeWalk.json",function(res){
            initData2(res);
        });
        function initData2(data){
            var ary=data;
            for(var i=0;i<ary.length;i++){
                var lis=$("<li><a href='#'>"+ary[i].title+"</a></li>");
                $(".hotel:eq(0) .hotelLists").append(lis);
                var plane=ary[i].data;
                //console.log(plane);
                var inner=$("<div class='innerInfo'></div>");
                for(var j=0;j<plane.length;j++){
                    if(plane[j].time){
                        var divs=$("<div><img src='"+plane[j].imgUrl+"'><p>机+酒<span><b>"+plane[j].price+"</b>元起</span></p>" +
                            "<p>"+plane[j].title+"</p><p>"+plane[j].time+"</p></div>")
                    }else {
                        var divs=$("<div><img src='"+plane[j].imgUrl+"'><p>机+酒<span><b>"+plane[j].price+"</b>元起</span></p>" +
                            "<p>"+plane[j].title+"</p></div>")
                    }
                    var last=$("<div><p>查看更多<br/>机酒自由行产品</p><span><img src='img/sign.jpg'></span><p>" +
                        "<a href='#'>机票</a><a href='#'>酒店</a><a href='#'>机+酒</a><a href='#'>邮轮</a> </p></div>")
                    inner.append(divs);
                    $(".tab_hotel:eq(0)").append(inner);
                }
                inner.append(last);
            }
            $(".tab_hotel:eq(0) .innerInfo").eq(0).css("z-index",9);

            $(".hotelLists:eq(0) >li").hover(function () {
                $(".tab_hotel:eq(0) .innerInfo").css("z-index",1);

                $(".tab_hotel:eq(0) .innerInfo").eq($(this).index()).css("z-index",999);
                $(".tab_hotel:eq(0) .innerInfo").eq($(this).index()).find("p").css("z-index",9999);
            });
        }
        $.getJSON("json/recommend.json",function(res){
            initData3(res);
            initData4(res);

        });
        function initData3(data){
            var ary=data;
            console.log(ary.length);
            for(var i=0;i<ary.length;i++){
                var lis=$("<li><a href='#'>"+ary[i].title+"</a></li>");
                $(".hotel:eq(2) .hotelLists").append(lis);
                var plane=ary[i].data;
                console.log(plane);
                var inner=$("<div class='innerInfo'></div>");
                for(var j=0;j<plane.length;j++){
                    if(plane[j].time){
                        var divs=$("<div><img src='"+plane[j].imgUrl+"'><p><span><b>"+plane[j].price+"</b>元起</span></p>" +
                            "<p>"+plane[j].title+"</p></div>")
                    }else {
                        var divs=$("<div><img src='"+plane[j].imgUrl+"'><p><span><b>"+plane[j].price+"</b>元起</span></p>" +
                            "<p>"+plane[j].title+"</p></div>")
                    }
                    var last=$("<div id='lastInfo'><p>查看更多<br/>主题推荐产品</p><span><img src='img/sign1.jpg'></span><p>" +
                        "<a href='#'>亲子</a><a href='#'>情侣</a><a href='#'>海岛游</a><a href='#'>购物</a> </p></div>")
                    inner.append(divs);
                    $(".tab_hotel:eq(2)").append(inner);
                }
                var titles=$("<p class='titleMarkers'>"+ary[i].title+"</p>");
                inner.append(titles);
                inner.append(last);
            }
            $(".tab_hotel:eq(2) .innerInfo").css("z-index",1);
            $(".tab_hotel:eq(2) .innerInfo").eq(0).css("z-index",2);

            $(".hotelLists:eq(2) >li").hover(function () {
                $(".tab_hotel:eq(2) .innerInfo").css("z-index",1);
                $(".tab_hotel:eq(2) .innerInfo").eq($(this).index()).css("z-index",999);
                $(".tab_hotel:eq(2) .innerInfo").eq($(this).index()).find("p").css("z-index",9999);
                $(".tab_hotel:eq(2) .innerInfo").eq($(this).index()).find(".titles").css("z-index",9999);

            });
        }
        function initData4(data){
            var ary=data;
            console.log(ary.length)
            for(var i=0;i<ary.length;i++){
                var lis=$("<li><a href='#'>"+ary[i].title+"</a></li>");
                $(".hotel:eq(1) .hotelLists").append(lis);
                var plane=ary[i].data;
                console.log(plane);
                var inner=$("<div class='innerInfo'></div>");
                for(var j=0;j<plane.length;j++){
                    if(plane[j].time){
                        var divs=$("<div><img src='"+plane[j].imgUrl+"'><p>机+酒<span><b>"+plane[j].price+"</b>元起</span></p>" +
                            "<p>"+plane[j].title+"</p><p>"+plane[j].time+"</p></div>")
                    }else {
                        var divs=$("<div><img src='"+plane[j].imgUrl+"'><p>机+酒<span><b>"+plane[j].price+"</b>元起</span></p>" +
                            "<p>"+plane[j].title+"</p></div>")
                    }
                    var last=$("<div id='lastInfo1'><p>查看更多<br/>城市玩乐产品</p><span><!--<img src='img/jian.png'>--></span><p>" +
                        "<a href='#'>WiFi/电话卡</a><a href='#'>交通票券</a><a href='#'>景点门票</a><a href='#'>特色体验</a> </p></div>")
                    inner.append(divs);
                    $(".tab_hotel:eq(1)").append(inner);
                }
                inner.append(last);
            }
            $(".hotelLists:eq(1) >li").hover(function () {
                $(".tab_hotel:eq(1) .innerInfo").css("z-index",1);
                $(".tab_hotel:eq(1) .innerInfo").eq($(this).index()).css("z-index",999);
                $(".tab_hotel:eq(1) .innerInfo").eq($(this).index()).find("p").css("z-index",9999);
            });
        }
        $(window).on("scroll",function () {
            var scrollTop = $(document.body).scrollTop();
            if (scrollTop>=200){
                $(".side").css("display","block")

            }else {
                $(".side").css("display","none")
            }
            if (scrollTop>=600){
                $(".box3").css("display","block")

            }else {
                $(".box3").css("display","none")
            }

        });
       /* if(document.body.scrollTop>=50){
            $(".side").css("display","block")
        }else {
            $(".side").css("display","none")
        }*/
    });

// };
