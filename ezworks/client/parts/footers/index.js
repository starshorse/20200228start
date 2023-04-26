angular.module('myFooter',[])
.controller('myFooterCtrl',['$scope','restApiServiceDbEdit', function($scope, restApiServiceDbEdit ){
	    $scope.company_name 
	    $scope.company_logo_path 
	    $scope.company_address 
	    $scope.company_tel 
	    $scope.company_email 
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
}])
.directive('myFooter', function(){
	return {
		restrict:'E',
		templateUrl:'/parts/footers/footer.html',
		controller:'myFooterCtrl'
	}
})
