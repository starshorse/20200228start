angular.module('myApp',[
	'ui.router'
])
.config([
'$interpolateProvider',
'$stateProvider',
'$urlRouterProvider', 
	function(
		$interpolateProvider,
		$stateProvider,
		$urlRouterProvider
	){
    $interpolateProvider.startSymbol('{a');
    $interpolateProvider.endSymbol('a}');
	var homeState ={
		name:'home',
		url:'/home',
		template:`
		{{ moment.include_moment() }}
		<h5> {a name a} </h5>
		<p>The local date and time is {{ moment( current_time ).format('LLL') }}</p> 
		`
	}
	var auth_uploadState ={
		name:'auth_upload',
		url:'/auth_upload/:cert_id',
		controller: function( $scope , $stateParams ){
			$scope.cert_id = $stateParams.cert_id 
			switch( $scope.cert_id ){
				case '001':
					$scope.cert_title = '계좌거래내역'
					break;
				case '002':
					$scope.cert_title = '전자세금계산서수집'
					break;
				case '003':
					$scope.cert_title = '법인카드내역수집'
					break;
			}
			document.uploadForm.action = `/upload_file/${ $scope.cert_id }`
		},
		templateUrl:'/static/templates/upload_file.html'
	}
	$stateProvider.state( homeState );
	$stateProvider.state( auth_uploadState );
	$urlRouterProvider.otherwise('/home'); 	

}])
.controller('myAppCtrl',['$scope', function( $scope ){
	$scope.name = 'RICHARD CHOI'
	$scope.companyName = 'EZoffice' 
}])
