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
}])