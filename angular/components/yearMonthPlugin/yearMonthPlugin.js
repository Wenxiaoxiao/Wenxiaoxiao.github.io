window.mainApp
.directive("yearMonthPlugin",function ($http) {
 return {
  scope:{},
  templateUrl:"components/yearMonthPlugin/yearMonthPlugin.html",
  link:yearMonthPlugin
 }
})
function  yearMonthPlugin ($scope, $http) {
 //点击空白处隐藏
 /*置灰2018-03*/
 $scope.items=['01','02','03','04','05','06','07','08','09','10','11','12'];
 /*这里传进来需要置灰的年月的数组*/
 $scope.liYear=[2018,2017,2016];
 $scope.liMonth=[1,2,3];
 $scope.isMonthGree = function (year, month) {
  for(var i = 0; i< $scope.liYear.length; i++) {
   if(year == $scope.liYear[i] && parseInt(month) == $scope.liMonth[i]) {
    return true;
   }
  }
  return false;
 }
 $('.mydatepicker').on('click',function(){
  if($(this).siblings()[0].style.display=="block"){
   $(this).siblings()[0].style.display="none";
  }else{
   $(this).siblings()[0].style.display="block";
  }
 })
 var data=new Date();
 $scope.getYear=data.getFullYear();
 $scope.toPreYear=function(){
  $scope.getYear--;
 }
 $scope.toNextYear=function(){
  $scope.getYear++;
 }
 
 $scope.getRightMonth=function(){
 var monthYear=$scope.getYear+"-"+$(this)[0].item;
 $('.mydatepicker')[0].append(monthYear+',');
}
 
 $('.makeSureBtn').on('click',function(){
  $scope.msgBoxText=$(this).parent().parent().siblings()[0].innerText;
  alert('你选择了\n'+'    '+$scope.msgBoxText);
  $(this).parent().parent()[0].style.display="none";
 })
 $('.cancelBtn').on('click',function(){
  $(this).parent().parent()[0].style.display="none";
 })

}