/**um
 * 评论的分页部分
 */
function ClickPages() {};

ClickPages.prototype = {
	constructor: ClickPages,
	init: function(totalData, showData,ajax) {
		this.i = 0;//当前页数
		this.totalData = totalData;//数据总条数
		this.showData = showData;//每页展示数据量
		this.len= Math.ceil(totalData/showData);//总页数
		if(this.len<2)return;
		this.center=2;//中心位置
		this.ajax = ajax;
		console.log(this.len);
		this.creatDom(this.len);
		this.binding(this.len);
	},
	binding: function(len) {
		//事件绑定
		var lisT, previous, next, pagebtn, i = this.i,ajax = this.ajax
			self = this, len=len;

		lisT = $(".paging .pageline").children();
 		pagebtn = $(".paging .pagebtn");
		previous = $(".Previous"); //上一页
		next = $(".Next"); //下一页
		//页码
		$(lisT).on("click", function() {
			i = $(this).index();
			self.jumpAni(lisT,i);
			self.judge(i, len);
			self.scrollleft($(this));
			ajax(i+1,false)
		});
		//上一页
		$(previous).on("click", function() {
			if(i > 0) {
				i--;
				if(!self.judge(i, len))return;
				self.jumpAni(lisT,i);
				ajax(i+1,false)
			}
		});
		//下一页
		$(next).on("click", function() {
			if(i < lisT.length - 1) {
				i++;
				if(!self.judge(i, len))return;
				self.jumpAni(lisT,i);
				ajax(i+1,false)
			};
		});
		//GO按钮
		$(pagebtn).on("click", function() {
			i = $(".paging .pagetext").val();
			 $(".paging .pagetext").val("")
			i--;
			if(i >= 0 && i <= len - 1) {
				self.jumpAni(lisT,i);
				ajax(i+1,false)
			}
		});
	},
	judge: function(i, len) {
		var isTrue = true
		//判断是否到达边缘隐藏
		if(i < 0) {
			isTrue = false
		}else if(i > len - 1){
			isTrue = false
		}
		return isTrue
	},
	creatDom: function(num) {
		//创建dom元素
		var num=num;
		var baseDom=
			'<nav class="Page clearfix">'+
                '<a href="javascript:;" class="Previous">'+
                    '<span>上一页</span>'+
                '</a>'+
                '<div class="pageNum">'+
                	'<div class="pageline clearfix">'+
					'</div>'+
                '</div>'+
                '<a href="javascript:;" class="Next">'+
                    '<span>下一页</span>'+
                '</a>'+
                '<div class="jump">'+
                 	'跳转至 <input type="text" class="pagetext" placeholder="共'+this.len+'页"/>页 <input type="button" class="pagebtn" value="GO"/>'+
                '</div>'+
            '</nav>';
		$(".paging").html(baseDom);
		for (var i = 1; i < num+1; i++) {
			$(".paging .pageline").append('<a href="javascript:;">'+i+'</a>');
		}
		$(".paging .pageline a").eq(0).addClass("active")
		var width = ($(".paging .pageline a").width()+6)*$(".paging .pageline a").length +10;
		//console.log(width);
		$(".pageline").css("width",width+"px")
	},
	jumpAni:function(eles,i){
		//跳到指定位置动画
		$(eles).eq(i).addClass("active").siblings().removeClass("active");
		var center=this.center,
		$pageline=$(".pageline"),
		len=this.len;
		if(i + 2 > 2 && i + 5 <= len){
			center=i-2;
			$pageline.animate({
				left: "-"+34*center+"px"
			})
		}else if( i <= 2 ){
			$pageline.css("left","0")
		}else if( i + 5 > len){
			$pageline.css("left","-"+34*(len-5)+"px")
		}
	},
	scrollleft:function(ele){
		//获取相对偏移量
		var left=$(ele).offset().left;
		console.log(left);
	}
}