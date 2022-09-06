angular.module('myMainbtn',[])
.controller('myMainbtnCtrl',['$scope','mySheet0Service', function($scope, mySheet0Service ){
	$scope.row_add = ()=>{
			var row_id = ezData_RowAdd_parsing($scope.spread, $scope.spread_data) 
		    mySheet0Service.addData( row_id , 0 ) 
	}
	$scope.row_del = ()=>{
//			console.log( mySheet0Service.spread_data.working_row ) 
		   mySheet0Service.delData(0)
	}
	$scope.filter = ()=>{
		   mySheet0Service.filterData(0) 
	}
	$scope.rel_filter = ()=>{
		   mySheet0Service.rel_filter(0) 
	}
	$scope.freeze_cols = ()=>{
		   mySheet0Service.freeze_cols(0)  
	}
}])
.directive('myMainbtn', function(){
	return{
		restrict:'E',
		templateUrl:'/ezworks/sub_app/buynsell_fdb/parts/mainbtn.html',
		controller:'myMainbtnCtrl'
	}
})
