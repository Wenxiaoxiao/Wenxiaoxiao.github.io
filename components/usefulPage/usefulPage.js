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
}])