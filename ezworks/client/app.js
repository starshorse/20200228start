angular.module('ezworks',[
	'ui.router',
//	'ui.bootstrap',
	'ngCookies',
	'myLogin.login',
	'myLogin.register',
	'myMain_0Header',
	'myDomodal',
	'login_ctrl'
])
.config( function( $stateProvider, $urlRouterProvider){
	var login ={
		name:'login',
		url:'/login',
		templateUrl:'/parts/admin/login/login.parts.html', 
		resolve:{
			users: async function($http){
				let users = await $http.get('/Hades/dba_editor/web_users') 
	        	return users.data.DATA  		
			},
			companies: async function($http){
                let companies = await  $http.get('/Jupiter/db_edit/jupiter/server_list'); 
				return companies.data.DATA 
			}
		},
		controller:'loginCtrl'
	}
	var companies_list = {
		name:'companies_list',
		url:'/companies_list/{ myParam: json }',
		params: { myParam: null },
		templateUrl:'/parts/admin/mainGate/mainGate.parts.html',
		controller:'companies_listCtrl' 
	}
	var main_page = {
		name: 'main_page',
		url:'/main_page',
		templateUrl:'/parts/mainPage/main/main.parts.html',
	    controller:'main_pageCtrl'
	}
	var main_sub0 = {
		name: 'main_page.sub0',
		url:'/sub0',
		templateUrl:'/parts/mainPage/main/sub0.parts.html',
	    controller:'main_sub0Ctrl'
	}
	var main_sub1 = {
		name: 'main_page.sub1',
		url:'/sub1',
		templateUrl:'/parts/mainPage/main/sub1.parts.html',
	    controller:'main_sub1Ctrl'
	}
	$stateProvider.state(login) 
	$stateProvider.state(companies_list ) 
	$stateProvider.state(main_page ).state( main_sub0 ).state( main_sub1 ) 
	$urlRouterProvider.otherwise('/login') 
})
.controller('ezworksCtrl', ['$scope', function($scope){
	   $scope.click=( modal_info )=>{
		   $scope.modal = modal_info  
		   $scope.$broadcast('doModal')
	   }
}])
.controller('main_pageCtrl',['$scope','$injector','$stateParams',function( $scope, $injector, $stateParams  ){
	 var $state = $injector.get('$state')
	 $state.go('main_page.sub0') 
}])
.controller('main_sub0Ctrl',['$scope','$injector', function( $scope, $injector ){
}])
.controller('main_sub1Ctrl',['$scope','$injector', function( $scope, $injector ){
	var $state = $injector.get('$state')
	var $controller = $injector.get('$controller') 
	var $cookies = $injector.get('$cookies') 
	var $http = $injector.get('$http') 
	$scope.password = { new: "", confirm:"" }
	const err_01 = { title:'입력오류', content:'새로운 패스워드를 입력하세요', callback:()=>{} }
	const err_02 = { title:'입력오류', content:'확인된 패스워드가 일치하지 않습니다.', callback:()=>{} }
	const err_03 = { title:'Session만료', content:'새로 로그인 하세요 !', callback:()=>{} }
	let err_04 = { title:'Database오류', content:'Error !', callback:()=>{} }

	$scope.modal ={ title:'변경 완료되었습니다.', content:' 새로운 패스워드로 로그인 하세요' , callback: ()=>{} }
//	var ModalDemoCtrl = $controller('ModalDemoCtrl', { $scope: $scope }) 
    $scope.changePw = async ()=>{
		let user = $cookies.get('user') 
		if( user == undefined ){
			$scope.click( err_03 );
		    return 
		}
		if( $scope.password.new == "" ){
			$scope.click( err_01 );
		    return 
		}	
		if( $scope.password.new !== $scope.password.confirm ){
			$scope.click( err_02 );
		    return 
		}	
		let result = await $http({ method:'POST', data:{ passcode: $scope.password.new } , url:`/Hades/dba_editor/admin_changePasscode/${ user }` }) 
		if( result.data.STATUS == -1 ){
			err_04.content = result.data.ERRORMESSAGE 
			$scope.click( err_04 );
			return 
		}

		$scope.click( $scope.modal ); 
	}
}])
