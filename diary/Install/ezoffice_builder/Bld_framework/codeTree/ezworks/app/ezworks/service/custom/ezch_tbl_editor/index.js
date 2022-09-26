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
		schema_add :{
			No: 3 , Field: 'Fomula', Visible: true
		},
		tbl_data_columns :[] ,
		tbl_data_info :{
			name: 'TableData', region: 'east',
			tbl_data: []
		},
		update_schema_table: null,
		update_order_column: null,
		update_visible_status: null 
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
		this.update_visible_status = ( spread , newValue , index )=>{
			let tbl_schema = ezch_tbl_editor_appFactory.tbl_schema_info.tbl_schema
			if( newValue == true )ezch_tbl_editor_appFactory.tbl_schema_info.tbl_schema[index -1].No = ezch_tbl_editor_appFactory.tbl_schema_info.tbl_schema.length  
			else if( newValue == false )ezch_tbl_editor_appFactory.tbl_schema_info.tbl_schema[index -1].No = 99 
			tbl_schema.sort((a,b)=>{ return ( a.No-b.No)}) 
            tbl_schema = tbl_schema.map((ent, index )=>{ 
                  if( ent.No != 99 )ent.No = index + 1 
				  return ent 
			})
		}
		this.update_order_column = ( spread , newValue, oldValue )=>{
		    let tbl_schema =	ezch_tbl_editor_appFactory.tbl_schema_info.tbl_schema
//			spread.options.isPaintSuspended( true  ) 
			newValue = parseInt( newValue ) , oldValue = parseInt( oldValue ) 

			tbl_schema.forEach((ent, index )=>{
				ent.No = parseInt( ent.No ) 
				if( index == oldValue -1)return 
				else if( ent.No >= newValue && ent.No < oldValue )ent.No++ 
				else if( ent.No <= newValue && ent.No > oldValue )ent.No-- 
			})
			tbl_schema.sort((a,b)=>{ return ( a.No-b.No)}) 
//			spread.options.isPaintSuspended( false ) 

		}
		this.update_schema_table = async ( spread , tbl_name = null )=>{
			let sheet1 = spread.getSheet(1) 
			table = sheet1.tables.findByName('TableSchema') 
			if( tbl_name != null ){
				let response = await $http.get(`/Hermes/ezchemtech/TableEditor/${ tbl_name }`)
				response = response.data.tbl_data 
				let i = 1
				ezch_tbl_editor_appFactory.tbl_schema_info.tbl_schema = []
				for( const [ key, value ] of Object.entries( response ) ){
					let formatter = '@' 
					if( value.type == 'DATETIME' )formatter ='YY/MM/DD' 
					ent = { No: i , Field: key, Comment: value.comment , 
						Type: value.type , primaryKey : value.primaryKey, Default : value.defaultValue ,
						Null : value.allowNull , Extra: null , Formatter: formatter , Visible: true }
					ezch_tbl_editor_appFactory.tbl_schema_info.tbl_schema.push( ent ) 
					i++  
				}
				let tableColumns = Object.keys( ezch_tbl_editor_appFactory.tbl_schema_info.tbl_schema[0])
				tableColumns = tableColumns.map((ent, index )=>{ 
					if( ent == 'Visible'){
						let cellType2 = new GC.Spread.Sheets.CellTypes.ComboBox() 
						cellType2.items([ true , false ]) 
						return new GC.Spread.Sheets.Tables.TableColumn( index +1 , ent, ent, undefined, cellType2 )
					}else{
						return new GC.Spread.Sheets.Tables.TableColumn( index +1 , ent, ent )
					}
				})
				ezch_tbl_editor_appFactory.tbl_schema_columns = tableColumns
		   }else{
				let newEntry = JSON.parse( JSON.stringify( ezch_tbl_editor_appFactory.schema_add ))
			    ezch_tbl_editor_appFactory.tbl_schema_info.tbl_schema.push( newEntry )
                this.update_order_column( spread , newEntry.No , ezch_tbl_editor_appFactory.tbl_schema_info.tbl_schema.length )
		   }
            table.autoGenerateColumns( false ) 	
//			table.bind( tableColumns , 'tbl_schema', ezch_tbl_editor_appFactory.tbl_schema_info )
			table.bind( ezch_tbl_editor_appFactory.tbl_schema_columns , 'tbl_schema', ezch_tbl_editor_appFactory.tbl_schema_info )

		}
		this.initSpread = async ( spread )=>{
			let sheet1 = spread.getSheet(1)
			let cell_add = sheet1.getRange('C2:C2') 
			let cell_button = sheet1.getRange('L2:L2')

			let cellType_button = new GC.Spread.Sheets.CellTypes.Button() 
			cellType_button.text('ADD') 
			sheet1.addSpan( cell_button.row , cell_button.col, 2, 1)

			sheet1.getCell( cell_add.row, cell_add.col ).text('No').backColor('#EEEEEE') 
			sheet1.getCell( cell_add.row, cell_add.col+1 ).text('Field').backColor('#EEEEEE') 
			sheet1.getCell( cell_button.row, cell_button.col ).backColor('#EEEEEE').cellType( cellType_button )  


			let cellSource = new GC.Spread.Sheets.Bindings.CellBindingSource( ezch_tbl_editor_appFactory.schema_add )
			sheet1.setBindingPath( cell_add.row+1, cell_add.col , 'No' ) 
			sheet1.setBindingPath( cell_add.row+1, cell_add.col+1 , 'Field' ) 
            sheet1.setDataSource( cellSource ) 			

			let table = sheet1.tables.add('TableList', 1,0,150,1) 
			let response = await $http.get('/Hermes/ezchemtech/TableEditor') 
			response = response.data.tbl_data 
			ezch_tbl_editor_appFactory.tbl_list_info.tbl_list = response.map((ent)=>{ return { tbl_name: ent.TABLE_NAME.replace('TB_','')}}) 
			table.bind( [ new GC.Spread.Sheets.Tables.TableColumn( 1, 'tbl_name', 'tbl_name' ) ] , 'tbl_list' , ezch_tbl_editor_appFactory.tbl_list_info )				
			sheet1.setColumnWidth( 0, 300 ) 
			table.setColumnName( 0  , 'Table List' )
			table = sheet1.tables.add('TableSchema', 4,2,150,10) 
			let tbl_name = ezch_tbl_editor_appFactory.tbl_list_info.tbl_list[0].tbl_name 

			await this.update_schema_table( spread , tbl_name )
		}
		ezch_tbl_editor_appFactory.update_schema_table = this.update_schema_table
		ezch_tbl_editor_appFactory.update_order_column = this.update_order_column
		ezch_tbl_editor_appFactory.update_visible_status = this.update_visible_status 
	}
])
.service('ezch_tbl_editor_eventService',[
'ezch_tbl_editor_appFactory',
	function(
		ezch_tbl_editor_appFactory
	){
		this.sheet1_cellDoubleClick = ( spread , sender, args ) =>{
			let sheet1 = spread.getSheet(1) 
			let cell_list = sheet1.getRange('A2:A2')
			if( args.col == cell_list.col && args.row > cell_list.row ){
				let tbl_name = sheet1.getValue( args.row, args.col ) 
				ezch_tbl_editor_appFactory.update_schema_table( spread, tbl_name )
			}
		}
		this.sheet1_cellChanged = ( spread ,sender, args )=>{
			let sheet1 = spread.getSheet(1) 
			let cell_order = sheet1.getRange('C2:C2') 
			let cell_visible = sheet1.getRange('L2:L2') 
			switch( args.col){
				case cell_order.col:
					if( args.row > cell_order.row )ezch_tbl_editor_appFactory.update_order_column( spread , args.newValue , args.oldValue )
					break;
				case cell_visible.col:
					if( args.row > cell_visible.row)ezch_tbl_editor_appFactory.update_visible_status( spread, args.newValue , args.row -  cell_visible.row ) 
					break;
				default:	
			}
		}
	}
])
