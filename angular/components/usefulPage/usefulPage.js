angular.module('usefulPageModule',[])
.config(function($stateProvider,$urlRouterProvider){
 $stateProvider
 .state('usefulPage',{
  url:'/usefulPage',
  templateUrl:'components/usefulPage/usefulPage.html',
  controller:'usefulPageCtrl',
  css:'components/usefulPage/usefulPage.css'
 })
})
.controller('usefulPageCtrl',['$scope',function($scope){
 $scope.showFlag = false;
 //点击复选框是否展示开发分支
 $scope.selectBranch = function(){
  $scope.showFlag = !$scope.showFlag;
  if($scope.showFlag){
   //选择展示所有分支的时候
  }else{
   //不展示开发分支的时候
  }
 }
 
 /*这是一个神奇的网站*/
var zi = "这是个神奇的网站！marquee";
var i = 0;
var divObj; //全局变量
function init() {
    divObj = document.getElementById("divId");
    setInterval(show, 200); //每个指定的毫秒执行一次函数
}init();

function show() {
    i++;
    var jzi = zi.substring(0, i); //截取字符串，每次截取一个
    divObj.innerHTML = jzi; //往div设置内容
    if (i == zi.length) { //当字符串写完后，重新开始执行
        i = 0;
    }
}

$(function(){
    $('#filterName').keyup(function(){
     $('tbody>tr').hide().filter(":contains('"+ ($(this).val()) +"')").show();
    }).keyup()
   })

$(function(){
  $('#filter').keyup(function(){
   $('.content').hide().filter(":contains('"+ ($(this).val()) +"')").show();
  })
 })

$('#add').on('click',function(){
	$('#ul').append('<li>菜单666<span>删除</span></li>')  
})
$('#onadd').on('click',function(){
	$('#ul').append('<li>on菜单666<span>删除</span></li>') 
})
/*$('#ul>li>span').on('click',function(){
	$(this).parent().remove();
}) */
$(document).on('click','#ul li span',function(){  
    $(this).parent().remove();  
    /*console.log('on');*/  
});
}])