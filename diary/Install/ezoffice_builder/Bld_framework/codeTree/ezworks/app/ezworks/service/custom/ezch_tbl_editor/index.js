angular.module('ezch_tbl_editor_app',[])
.factory('ezch_tbl_editor_appFactory',[function(){
	var ezch_tbl_editor_appFactory = {
		tbl_name : null ,
		tbl_list_info :{
			name: 'TableList', region: 'east',
			tbl_list: []
		},
		tbl_schema_columns : [],
		tbl_schema_info :{
			name: 'TableSchema', region: 'east',
			tbl_schema: []
		},
		tbl_data_columns :[] ,
		tbl_data_info :{
			name: 'TableData', region: 'east',
			tbl_data: []
		}
	}
	return ezch_tbl_editor_appFactory
}])
.service('ezch_tbl_editor_appService', [
'ezch_tbl_editor_appFactory',
'$http',	
	function(
		ezch_tbl_editor_appFactory,
		$http
	){
		this.initSpread = async ( spread )=>{
			let sheet1 = spread.getSheet(1)
			let table = sheet1.tables.add('TableList', 1,0,150,1) 
			let response = await $http.get('/Hermes/ezchemtech/TableEditor') 
			response = response.data.tbl_data 
			ezch_tbl_editor_appFactory.tbl_list_info.tbl_list = response.map((ent)=>{ return { tbl_name: ent.TABLE_NAME.replace('TB_','')}}) 
			table.setColumnName( 0 , 'Table List' )
			table.bind( [ new GC.Spread.Sheets.Tables.TableColumn( 1, 'tbl_name', 'tbl_name' ) ] , 'tbl_list' , ezch_tbl_editor_appFactory.tbl_list_info )				
			sheet1.setColumnWidth( 0, 300 ) 
		}
	}
])
.service('ezch_tbl_editor_eventService',[
'ezch_tbl_editor_appFactory',
	function(
		ezch_tbl_editor_appFactory
	){
	}
])
