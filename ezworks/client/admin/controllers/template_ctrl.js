angular.module('templateCtrl',[])
.controller('templateCtrl.srvGrp01_item01', function( $scope,$http,$rootScope,srvGrp01_item01){
	       srvGrp01_item01.forEach((ent)=>{
			   if( ent['enabled'] )
				   ent['enabled'] = true ;
			   else
				   ent['enabled'] = false;
		   })
		   $scope.account_list = srvGrp01_item01 
	       $scope.modal = { title: '업데이트' , content:'변경사항을 업데이트 하시겠습니까?' , callback: async function(){ 
      //         await $scope.updateService_limits_DB();

			   let update_data = JSON.stringify( $scope.account_list.filter((ent)=>ent['enabled'] == false ));
			   await $http({ method: 'POST' , url: `/Hades/service_admin/codeFApi_collectionAccountList/${ $rootScope.user_DB }` , data: { json: update_data } })
			   alert("update done!")} 
		   }
	       $scope.button_click =()=>{
			   $scope.$broadcast('doModal'); 
		   }
})
.controller('service_reportCtrl',['$scope',
'$injector',	
'service_report',
	function(
		$scope, 
		$injector,
		service_report
	){
	    var $cookies = $injector.get('$cookies') 
		server_name = $cookies.get('server_name') 
		if( server_name == 'ezoffice')
			$scope.service_report = service_report ; 
		else{
			user_DB = $cookies.get('user_DB')
			$scope.service_report = service_report.filter((ent)=>ent.organization == user_DB);
		}
		$scope.nameList = Object.keys( service_report[0] ) 
	}
])
.controller('limit_orgListCtrl', ['$scope',
'limit_orgList',
'limit_list',
'service_list',
'limit_orgListService',  
 function( 
		$scope, 
		limit_orgList, 
		limit_list, 
		service_list,
		limit_orgListService
	){
	       $scope.modal = { title: '업데이트' , content:'변경사항을 업데이트 하시겠습니까?' , callback: async function(){ 
               await $scope.updateService_limits_DB();
			   alert("update done!")} 
		   }
	       $scope.service_limits 
	       $scope.limit_list = limit_list 
	       $scope.service_list = service_list 
	       $scope.cur_service = service_list[0] 
	       this.changes_index = [] 
	       $scope.updateService = ()=>{
			   limit_orgListService.getService_limits( $scope.cur_service ).then((data)=>{
				   $scope.service_limits = data ;
				   $scope.$apply(); 
		   })}
	       $scope.updateService();
	       $scope.service_changed =( service )=>{
			   console.log( service ) 
			   $scope.updateService();
		   }
	       $scope.service_limit_changed = ( index )=>{
			   console.log( $scope.service_limits[index] )
			   this.changes_index.push( index )
			   this.changes_index = [...new Set(this.changes_index)] 
		   }
	       $scope.button_click =()=>{
			   $scope.$broadcast('doModal'); 
		   }
	       $scope.updateService_limits_DB = async ()=>{
			   for( index of this.changes_index ){
				  await limit_orgListService.postServices_limitSetting( $scope.service_limits[index] , $scope.cur_service )
			   }
		   }

}]) 
