angular.module('contentPageModule',[])
.config(function($stateProvider,$urlRouterProvider){
	$stateProvider
	.state('contentPage',{
		url:'/contentPage',
		templateUrl:'components/contentPage/contentPage.html',
		controller:'contentPageCtrl',
		css:'components/contentPage/contentPage.css'
	})
})

.controller('contentPageCtrl',['$scope',function($scope){
	var option = {
	    xAxis: {
	        type: 'category',
	        name:'星期',
	        nameTextStyle:{color:'red'},
	        boundaryGap: false,
	        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周天']
	    },
	    yAxis: {
	        type: 'value',
	        name:'℃',
	        nameTextStyle:{color:'red'},
	    },
	    grid:{
	    	top:'40px',
	    	bottom:'40px',
	    	left:'40px',
	    	right:'40px'
	    },
	    color:'#ccc',
	    series: [{
	        data: [26, 32,28,18,12,6,30],
	        type: 'line',
	        areaStyle: {
	        	
	        },
	        itemStyle:{
	        	normal:{
	        		areaStyle:{type:'default'},
	        		lineStyle:{color:'#ade6ad'}
	        	}
	        },
	        smooth:true
	    }]
	};
	var myChart = echarts.init(document.getElementById('chart01'));
	myChart.setOption(option);
	
	function getPathD (ringData, persent) { 
     var path = "M"+ringData.x+" "+(ringData.y-ringData.maxR); 
  
                 //得到外圈的圆弧 
     path += "A"+ringData.maxR+" " + ringData.maxR + " 0 "; 
     if(persent > 0.5) {//大圆 
         path += " 1 "; 
     } else { //小圆 
         path += " 0 "; 
     } 
     path += " 1 "; 
     //计算终点位置 
     path += (ringData.x + ringData.maxR*Math.sin(2*Math.PI*persent)); 
     path += " " + (ringData.y-ringData.maxR*Math.cos(2*Math.PI*persent)); 
  
                 var tinyCircleR = (ringData.maxR - ringData.minR)/2; 
                 path += "A" + tinyCircleR + " " + tinyCircleR + " 0 0 1 "; 
     path += (ringData.x + ringData.minR*Math.sin(2*Math.PI*persent)); 
     path += " " + (ringData.y-ringData.minR*Math.cos(2*Math.PI*persent)); 
  
                 //将之后的部分分成200个小段，依次计算其坐标 
     for(var i = 1; i<= 200; i++) { 
         var changeR = ringData.minR + (ringData.maxR-ringData.minR)*i/200; 
         var rate = persent*(1-i/200); 
         var changeX = (ringData.x + changeR*Math.sin(2*Math.PI*rate)); 
         var changeY = (ringData.y-changeR*Math.cos(2*Math.PI*rate)); 
         path += " L " + changeX + " " + changeY; 
     } 
     return path+"Z"; 
 } 
 var path = getPathD({ 
     x:40, 
     y:40, 
     minR:30, 
     maxR:40 
 }, 0.5); 
/* console.log(document.getElementById("testPath"));*/
 document.getElementById("testPath").setAttribute("d", path); 
	/*动态的圆环*/
	getDeviceCircleEcharts('90');
    function getDeviceCircleEcharts(value){
        var options = {
            ringColor: 'rgba(0,0,0,0.2)',
            textColor: '#edebe8',
            fillColorGradient: '98-#EE474A-#E9CA76:100',
            hoverColorGradient: '98-#E9CA76-#EE474A:100',
            fillColor: '#EE474A',
            hoverColor: '#E9CA76',
            r:54,
            R:64,
            onAnimationComplete: $.noop
        };
        //清空之前的圆环图
        $("#resourceProportion").empty();
        var title = $('<div></div>').addClass('title').html('');
        $("#resourceProportion").append(title);
        var defectChart = new UCD.InspireCircle('#resourceProportion', $.extend({
            value:value,
            growing: true,
            growingPosition: .5,
            onLabelUpdated: function($label, value) {
                var str = value+'';
                $label.html('<div class="cDiv"><label>'+str.substring(0,5) + '</label><span>%</span><br>实时占用率</div>');
            },
        }, options));
        defectChart.init();
    }

/*画箭头*/
function colorArrow(line,color){
  if(color=="#FAC97D"){
   line.setAttribute("marker-end","url(#markerArrowYellow)");
  }
  else if(color=="#83C1FC"){
   line.setAttribute("marker-end","url(#markerArrowBlue)");
  }
  else if(color=="#5EEAE9"){
   line.setAttribute("marker-end","url(#markerArrowLightBlue)");
  }
  else if(color=="#CCCCCC"){
   line.setAttribute("marker-end","url(#markerArrowGray)");
  }
  else if(color=="#AFAAFA"){
   line.setAttribute("marker-end","url(#markerArrowPurple)");
  }
 }
 
 var data=[
  {
   x1:'0',
   y1:'10',
   x2:'100',
   y2:'10',
   color:'#FAC97D'
  },
  {
   x1:'0',
   y1:'50',
   x2:'100',
   y2:'50',
   color:'#83C1FC'
  },
  {
   x1:'0',
   y1:'90',
   x2:'100',
   y2:'90',
   color:'#5EEAE9'
  },
  {
   x1:'0',
   y1:'130',
   x2:'100',
   y2:'130',
   color:'#CCCCCC'
  },
  {
   x1:'0',
   y1:'170',
   x2:'100',
   y2:'170',
   color:'#AFAAFA'
  }
 ]
 console.log(data);
 var obj = document.getElementById('oVersion');
 for(var i=0;i<data.length;i++){
  console.log(data[0]);
  var color=data[i].color;
  var x1=data[i].x1+'px';
  var x2=data[i].x2+'px';
  var y1=data[i].y1+'px';
  var y2=data[i].y2+'px';
  var line = document.createElementNS("http://www.w3.org/2000/svg","line");
  line.setAttribute("x1",x1);
  line.setAttribute("y1",y1);
  line.setAttribute("x2",x2);
  line.setAttribute("y2",y2);
  line.setAttribute("style",'stroke:'+color+';stroke-width: 1px;stroke-dasharray: 3 2;');
  /*给线添加箭头*/
  colorArrow(line,color);
  /*obj.append(line);对象不支持append属性或方法:因为用的document.getElementById,所以不能用jQuery的append*/
  obj.appendChild(line);
 }
}])