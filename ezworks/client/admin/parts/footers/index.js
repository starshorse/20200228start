angular.module('myFooter',[])
.controller('myFooterCtrl',['$scope',
'$injector',	
// 'restApiServiceDbEdit', 
	function($scope, 
$injector,		
restApiServiceDbEdit 
){	
	    $scope.company_name 
	    $scope.company_logo_path 
	    $scope.company_address 
	    $scope.company_tel 
	    $scope.company_email 
	    var $http = $injector.get('$http')	
/*1		
	    const cb_f_main = (res)=>{
			$scope.company_name = res[0].CorporationName 
			$scope.company_logo_path = res[0].logo_path 
			$scope.company_address = res[0].address 
			$scope.company_tel = res[0].contact_number 
			$scope.company_email = res[0].contact_email 
		} 
            if( $scope.frame_type != 'AppEdit' ){	
	    	restApiServiceDbEdit.getData('회사정보', cb_f_main ) 
	    }	    
*/	    	  		
}])
.directive('myFooter', function(){
	return {
		restrict:'E',
		templateUrl:'/admin/parts/footers/footer.html',
		controller:'myFooterCtrl'
	}
})
