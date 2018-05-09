angular.module('homePageModule',[])
.config(function($stateProvider,$urlRouterProvider){
	$stateProvider
	.state('homePage',{
		url:'/homePage',
		templateUrl:'components/homePage/homePage.html',
		controller:'homePageCtrl',
		css:'components/homePage/homePage.css'
	})
})

.service('swiper',['$timeout',function($timeout){
 $timeout(function(){
  var mySwiper = new Swiper ('.swiper-container', {
      loop: true,
      autoplay:2000,
      pagination: '.swiper-pagination',
      autoplayDisableOnInteraction:false,
      paginationClickable:true
    }) 
 },10);
}])

.controller('homePageCtrl',['$scope','$http','swiper',function($scope,$http,$index){
	$scope.name="我是主页";
}])
