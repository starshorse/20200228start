 angular.module('myDbEditSqlite3',['myApp.rest_api', 
	'myDbEditCmdInput', 
	'myDbEditSpreadjs'
])
.controller('myDbEditSqlite3Ctrl',['$scope',function($scope){
	$scope.DbData 
	$scope.tbl_name =''
	$scope.addCol 
	$scope.addRow
	$scope.openTbl
	$scope.saveTbl
	$scope.updateSheet 
	const socket = io()
	socket.on('lsSqlite3', ( data )=>{
		$scope.updateSheet( data ) 
	})
	$scope.extendCmdOpts = ( cmdOpts )=>{
		switch( cmdOpts[0]){
			case 'saveTbl_db':
				socket.emit('putSqlite3', { tbl_name:$scope.tbl_name, data: $scope.DbData } ) 
				break; 
			case 'delTbl_db':
				socket.emit('delSqlite3', { tbl_name:cmdOpts[1] }) 
				break;
			case 'listTbl_db':
				socket.emit('lsSqlite3', {})
				break;
			case 'setTbl_name':
				$scope.tbl_name = cmdOpts[1]
				break;
			default:
		}
	}
}])
