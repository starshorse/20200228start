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
		this.update_database = async( spread , seq , col_index, newValue )=>{
			let headInfo = ezch_tbl_editor_appFactory.tbl_schema_info.tbl_schema.filter((ent)=>ent.Visible == true ) 
			let col_info = headInfo[ col_index ]
            let ent_info = ezch_tbl_editor_appFactory.tbl_data_info.tbl_data.find((ent)=>ent.seq == seq ) 
			console.log('seq', seq, 'col_name:', col_info.Field , 'currentValue:', ent_info[col_info.Field] , 'newValue:', newValue )  

		}
		this.update_data_table = async( spread, tbl_name = null )=>{
			let sheet0 = spread.getSheet(0) 
			let table = sheet0.tables.findByName('TableData') 
			if( tbl_name != null ){
				let response = await $http.get(`/Hermes/ezchemtech/TableEditor/Data/${ tbl_name }`)
				ezch_tbl_editor_appFactory.tbl_data_info.tbl_data = response.data.tbl_data 
			}else{
			}
			let headInfo = ezch_tbl_editor_appFactory.tbl_schema_info.tbl_schema.filter((ent)=>ent.Visible == true ) 
			let tableColumns = [] 
			headInfo.map((ent, index)=>{
				tableColumns.push( new GC.Spread.Sheets.Tables.TableColumn( index +1 , ent.Field , ent.Field , ent.Formatter ) )	
			})
			sheet0.tables.resize( table , new GC.Spread.Sheets.Range( 8, 1, 4, tableColumns.length ))  
// mass block clear 
			let cell_mass = sheet0.getRange('B3:B3')
			sheet0.getRange( cell_mass.row, cell_mass.col , 5 , 100 ).value('') 


			table.autoGenerateColumns( false )
			table.expandBoundRows( true ) 
			table.bind( tableColumns , 'tbl_data', ezch_tbl_editor_appFactory.tbl_data_info ) 

		}
		this.update_schema_table = async ( spread , tbl_name = null )=>{
			let sheet1 = spread.getSheet(1) 
			let table = sheet1.tables.findByName('TableSchema') 
			if( tbl_name != null ){
				ezch_tbl_editor_appFactory.tbl_name = tbl_name 
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
			let sheet0 = spread.getSheet(0)
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
			
			spread.setActiveSheetIndex(1) 

			sheet0.addColumns( 2, 10) 
            sheet0.frozenRowCount(9)  
			let cell_buttons = sheet0.getRange('B2:B2') 
			sheet0.addSpan( cell_buttons.row, cell_buttons.col , 1, 2) 
			let cellType_button1 = new GC.Spread.Sheets.CellTypes.Button() 
			cellType_button1.text('대량삽입') 
		    sheet0.getCell( cell_buttons.row, cell_buttons.col ).backColor('#EEEEEE').cellType( cellType_button1 ) 

			sheet0.addSpan( cell_buttons.row, cell_buttons.col+2 , 1, 2) 
			let cellType_button2 = new GC.Spread.Sheets.CellTypes.Button() 
			cellType_button2.text('잠금해제') 
		    sheet0.getCell( cell_buttons.row, cell_buttons.col +2 ).backColor('#EEEEEE').cellType( cellType_button2 ) 

			sheet0.addSpan( cell_buttons.row, cell_buttons.col+4 , 1, 2) 
			let cellType_button3 = new GC.Spread.Sheets.CellTypes.Button() 
			cellType_button3.text('업데이트') 
		    sheet0.getCell( cell_buttons.row, cell_buttons.col +4 ).backColor('#EEEEEE').cellType( cellType_button3 ) 

			sheet0.setRowHeight( cell_buttons.row, 30 )


			let cell_mass = sheet0.getRange('B3:B3')
			sheet0.getRange( cell_mass.row , cell_mass.col , 1 , 100 ).borderTop( new GC.Spread.Sheets.LineBorder('#777777', GC.Spread.Sheets.LineStyle.medium ))
			sheet0.getRange( cell_mass.row , cell_mass.col , 5 , 1 ).borderLeft( new GC.Spread.Sheets.LineBorder('#777777', GC.Spread.Sheets.LineStyle.medium ))
			sheet0.getRange( cell_mass.row + 4 , cell_mass.col , 1 , 100 ).borderBottom( new GC.Spread.Sheets.LineBorder('#777777', GC.Spread.Sheets.LineStyle.medium ))


			table = sheet0.tables.add('TableData', 8,1,150,4) 
			await this.update_data_table( spread , tbl_name )
		}
		ezch_tbl_editor_appFactory.update_schema_table = this.update_schema_table
		ezch_tbl_editor_appFactory.update_data_table = this.update_data_table
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
			let cell_order = sheet1.getRange('C5:C5') 
			let cell_visible = sheet1.getRange('L5:L5') 
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
		this.spread_buttonClicked = ( spread, sender, args )=>{
			let sheet1 = spread.getSheet(1)
			let cell_add = sheet1.getRange('L2:L2')
			let sheet_name = args.sheet.name() 
			switch( sheet_name ){
				case 'Sheet1':
					break;
				case 'Sheet2':
					if( args.row == cell_add.row )ezch_tbl_editor_appFactory.update_schema_table( spread ) // only add update. 
					break;
			   default:	
			}
		}
		this.spread_activeSheetChanging = ( spread , sender , args )=>{
			let sheet_name = args.newSheet.name() 
			switch( sheet_name ){
				case 'Sheet1':
					ezch_tbl_editor_appFactory.update_data_table( spread,ezch_tbl_editor_appFactory.tbl_name )
					break;
				case 'Sheet2':
					break;
				default:
			}
		}
	}
])
