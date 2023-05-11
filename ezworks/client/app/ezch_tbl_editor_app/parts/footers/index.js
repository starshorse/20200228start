angular.module('myFooter',[])
.controller('myFooterCtrl',['$scope',
//1 'restApiServiceDbEdit', 
	function($scope, 
//1 restApiServiceDbEdit 
){
	    $scope.company_name = 'EzChemtech' 
	    $scope.company_logo_path = '/'
	    $scope.company_address = '광교법조타운'
	    $scope.company_tel = '010-111-2222'
	    $scope.company_email = 'EzChemtech@'
/*	
	    const cb_f_main = (res)=>{
			$scope.company_name = res[0].CorporationName 
			$scope.company_logo_path = res[0].logo_path 
			$scope.company_address = res[0].address 
			$scope.company_tel = res[0].contact_number 
			$scope.company_email = res[0].contact_email 
		} 
	    restApiServiceDbEdit.getData('회사정보', cb_f_main ) 
*/		
}])
.directive('myFooter', function(){
	return {
		restrict:'E',
		templateUrl:'/app/ezch_tbl_editor_app/parts/footers/footer.html',
		controller:'myFooterCtrl'
	}
})
