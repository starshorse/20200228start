angular.module('uploadFile_csv', [])
.service('uploadFileCsv_service', ['restApiServiceDbEdit', function(restApiServiceDbEdit){
    this.uploadFile_csv = ( obj, cb_f )=>{
           const files = obj.files
           const file = files[0]
           var reader = new FileReader()
           reader.onload = function(event) {
             console.log(event.target.result)
//			this.convData( event.target.result )   
			 let textCsv = event.target.result 
		    restApiServiceDbEdit.convData( { text: textCsv }, cb_f ) 
           }
           reader.readAsText(file)
	}
/*	
	this.convData = ( textCsv )=>{
//		scope.tbl_name = '' 
//		scope.headInfos = '' 
//		restApiServiceDbEdit.convData( { text: textCsv }, scope.updateSheet ) 
		restApiServiceDbEdit.convData( { text: textCsv }, cb_f ) 
	}
*/	
}])
