angular.module('sheetFormat', [])
.factory('sheetFormat_factory',function(){
	var sheetFormat_factory = {}
	return sheetFormat_factory 
})
.service('sheetFormat_service',['spreadJs_service',
'spreadJs_factory',
	function( spreadJs_service, 
	spreadJs_factory 
){
	var post_loadHead_f_list = [] 
	var defaultHInfo = { name: '', displayName: '', formatter: '####', size: 120, resizable: true , visible: true , formula:'', locked: true, TYPE:'NVARCHAR(120)' }
	var headInfos_head
///////////////////////////////////////////////////////////////////////////////////////////
// Init service 
///////////////////////////////////////////////////////////////////////////////////////////	
	const hook_initHead_post = ( headInfos_ )=>{
	}
    spreadJs_factory.addHook_initHead_post( hook_initHead_post ) 
///////////////////////////////////////////////////////////////////////////////////////////
// Head format  service. part..
//////////////////////////////////////////////////////////////////////////////////////////	
	this.addPost_loadHead_f_list = ( ft_name )=>{
		post_loadHead_f_list.push( ft_name ) 
	}
	this.loadHead = ()=>{
		console.log('[sheetFormat_service] loadHead _start ') 
		let sheet1 = spreadJs_service.getSheet1() 
		let headInfos = spreadJs_service.getHeadInfos() 
		let spread = spreadJs_service.getSpread() 

		headInfos_head = this.retractHead( headInfos[0] ) 
		sheet1.setDataSource( headInfos ) 
		sheet1.bindColumns( headInfos_head )

//		spread.setActiveSheet(1) 

        post_loadHead_f_list.forEach((ent_f)=>{
			ent_f()
		})
		formulas_service.setLast_row() 
//		formulas_service.applyFormulas() 
		setTimeout( formulas_service.applyFormulas , 5000 ) 
	}
	
	this.getSpread  = spreadJs_service.getSpread 
	this.getHeadInfos_sheet0  = spreadJs_service.getHeadInfos  
//Fri Mar  4 16:06:05 KST 2022
	this.saveTbl = spreadJs_service.saveTbl 	
	this.getSheet1 = spreadJs_service.getSheet1  
	this.getSheet0 = spreadJs_service.getSheet0  
	this.getHeadInfos = ()=>{ return headInfos_head } 
	this.updateHead = ( headInfos_, filter_rows = null ) =>{
		spreadJs_service.updateHead( headInfos_ , filter_rows ) 
		spreadJs_service.setIndex() 
//Fri May 27 04:48:58 UTC 2022
		hook_initHead_post( headInfos_ )
	}
	this.retractHead = ( DbData_1 )=>{
         const headers = Object.keys( DbData_1 ) 
		 headInfos = [] 
		 for( idx in headers ){
			var newHeader = JSON.parse( JSON.stringify( defaultHInfo )) 
			newHeader.name = newHeader.displayName = headers[idx] 
			headInfos.push( newHeader ) 
		 }
		 return headInfos
	}
	this.retract_loadHead = ( DbData_1 )=>{
		let headInfos = this.retractHead( DbData_1[0] )
		spreadJs_service.setHeadInfos( headInfos ) 
		this.loadHead() 
	}
///////////////////////////////////////////////////////////////////////////////////////////
// run time edit ..  json editor.. 
//////////////////////////////////////////////////////////////////////////////////////////	
}])