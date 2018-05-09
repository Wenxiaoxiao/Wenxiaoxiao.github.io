window.mainApp =angular.module('enjoy',["ui.router",'angularCSS','homePageModule','contentPageModule','usefulPageModule','suggestionPageModule','me-lazyload'])
.config(function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise('/homePage');
    $stateProvider   
})
