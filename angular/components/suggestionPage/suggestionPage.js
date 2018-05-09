angular.module('suggestionPageModule',[])
.config(function($stateProvider,$urlRouterProvider){
	$stateProvider
	.state('suggestionPage',{
		url:'/suggestionPage',
		templateUrl:'components/suggestionPage/suggestionPage.html',
		controller:'suggestionPageCtrl',
		css:'components/suggestionPage/suggestionPage.css'
	})
})

.controller('suggestionPageCtrl',['$scope',function($scope){
	$scope.name="我是suggestionPage";
}])