 angular.module('myDbEditEvents',[])
.controller('myDbEditEventsCtrl',['$scope', function( $scope ){
	$scope.spread.bind( $.wijmo.wijspread.Events.ActiveSheetChanging, ( sender, args )=>{
        	const sheet0 = $scope.spread.getSheet(0) 
        	const sheet1 = $scope.spread.getSheet(1) 
		    sheet0.bindColumns( $scope.headInfos )  
//		    sheet1.setDataSource( $scope.headInfos ) 
            $scope.sheet1SheetChange() 		    
	})
}])
.directive('myEvents', function(){
	return {
		restrict: 'E',
		controller:'myDbEditEventsCtrl' 
	}
})
