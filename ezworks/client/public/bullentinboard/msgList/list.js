/**
 * Created by kojunghyun on 14. 12. 31..
 */
'use strict';

var myControllerModule = angular.module('listModule', [
'ngRoute',
'ngCookies',	
'myServiceModule'
]);

//-----------------------------------------------------------------------------
//controller : get paged data
myControllerModule.controller('listCtrl',
    ['$rootScope','$scope','$location','$injector','myHttpService','myGlobalDataService',
        function($rootScope,$scope, $location,$injector, myHttpService,myGlobalDataService) {

			var $cookies = $injector.get('$cookies')
			let user = $cookies.get('user') 
			$scope.viewMode = 1 
			if( user == 'star_horse@naver.com' )
				$scope.viewMode = 0 

            myGlobalDataService.pageInfo.listPerPage = 5;

            $scope.listPerPage = myGlobalDataService.pageInfo.listPerPage ; //TEST

            //console.log("listCtrl init!!");//debug
            //--------------------------------------------------------------------
            //공통사용되는 함수를 $rootScope 에 정의...
            $rootScope.GoToPage = function () {
                $location.path( '/list' );
            };

            $rootScope.GoToUrl = function (url) {
                $location.path(url);
            };

            $scope.listIndexAry=myGlobalDataService.pageInfo.listIndexAry;

            //console.log( "listCtrl  :myHttpService.getPagedList!!" ); //debug
            myHttpService.getPagedList(myGlobalDataService.pageInfo.currentPage, myGlobalDataService.pageInfo.listPerPage);
            $scope.guestMsgs = myGlobalDataService.msgDatas;

            //$scope.testStr = "listCtrl!!!"; //test
        }]);
