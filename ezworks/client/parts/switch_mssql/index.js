angular.module('switch_mssql',[])
.controller('switch_mssqlCtrl',['$scope', function($scope){
// Socke.io interface. 
	const socket = io()
	$scope.switch_mssql_enable = 0 
	$scope.mssql_status_flag = 1 
// Socket event handling . 
	$scope.toggle_mssql_status_flag = ()=>{
		$scope.mssql_status_flag = !$scope.mssql_status_flag 
		socket.emit('set_mssql_flag', { 'flag': $scope.mssql_status_flag } ) 
	}
	socket.on('status_mssql_flag', (res_)=>{
          console.log('mssql_status', res_.flag ) 
		 $scope.mssql_status_flag = res_.flag 
	})
}])
.directive('switchMssql', function(){
	return {
		restrict:'E',
		controller:'switch_mssqlCtrl',
		template:`
						<label class="switch">
							  <input type="checkbox" ng-checked='mssql_status_flag' ng-click='toggle_mssql_status_flag()'>
							  <span class="slider round"></span>
						</label><strong>MSSQL</strong>
		           `
	}
})
