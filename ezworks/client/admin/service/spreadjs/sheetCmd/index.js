angular.module('sheetCmd',[])
.service('sheetCmd_service',['spreadJs_service','spreadjsEvents_factory','sheetFormat_service','spreadJs_factory',
	function( spreadJs_service, spreadjsEvents_factory, sheetFormat_service, spreadJs_factory ){
 	var  first_c = {"name":"seq","displayName":"seq","size":120,"formatter":"* ######","locked":true,"TYPE":"NVARCHAR(120)"}
	this.getFirst_c = ( col_name_ )=>{
		first_c.name = first_c.displayName = col_name_
		return first_c 
	}
	this.addCol = ( col_name  )=>{
		let spread = spreadJs_service.getSpread() 
		let headInfos = spreadJs_service.getHeadInfos() 
		let sheet0 = spreadJs_service.getSheet0()
		let sheet1 = spreadJs_service.getSheet1()

		var activeSheet = spread.getActiveSheet() 
		const a_index = spread.getActiveSheetIndex()
		if( a_index == 1 ){
			headInfos = sheetFormat_service.getHeadInfos() 
		}
		let  i_default = activeSheet.getColumnCount()
		activeSheet.suspendEvent()
// find index for insert. 
		let sel_cell = spreadjsEvents_factory.sell_cell  
		let pos = headInfos.findIndex( i => i.name == sel_cell.col_sel  )  
		if( pos == undefined || pos == -1  )pos = i_default 
		else pos++ 
		activeSheet.addColumns( pos , 1 ) 
		activeSheet.bindColumn( pos , col_name ) 
		activeSheet.resumeEvent() 
		if( a_index == 0 ){
// 2021-12-10 			
			first_c.name = col_name , first_c.displayName = col_name
			first_c.Column_default = 'NULL'
			first_c.DATA_TYPE = 'nvarchar' 
			first_c.character_maximum_length = 30 
			first_c.is_nullable = 'YES' 
			first_c.is_primary = 'NO' 
			first_c.is_identity = 'NO' 
			headInfos.splice( pos, 0, JSON.parse( JSON.stringify( first_c )))  
        sheet0.bindColumns( headInfos )  
		sheet1.reset() 
		sheet1.setDataSource( headInfos ) 
        }
		return headInfos 
	}
	this.addRow = ( rowCount )=>{
		let sheet0 = spreadJs_service.getSheet0()
		let spread = spreadJs_service.getSpread() 
		sheet0 = spread.getActiveSheet() 
		var N = sheet0.getRowCount()
		sheet0.addRows( N , rowCount )
		var j = sheet0.getValue( N -1 , 0 )
		let newId , newId_id, newRow_num 
		j++
		for( var i= 0  ; i < rowCount   ; i++){
// Wed May 11 08:48:29 UTC 2022
			newId = j+i 
			if( spreadJs_factory.current_dataMode ) spreadJs_factory.affected_recordsId.push( newId )
			sheet0.setValue( N+i , 0, newId )
		    	newId_jpt = spreadJs_service.getHeadIndex('id_jpt') 
		    	newId_id = spreadJs_service.getHeadIndex('id') 
			sheet0.setValue( N+i , newId_jpt , newId )
			sheet0.setValue( N+i , newId_id , newId )
			newRow_num = N+i 
		}
		return { newId , newRow_num }  
	}
	this.iAskCol = ( cmdOpts )=>{
		let spread = spreadJs_service.getSpread() 
		let headInfos = spreadJs_service.getHeadInfos() 
//1 add for sheet1 		
		const a_index = spread.getActiveSheetIndex()
		if( a_index == 1 ){
			headInfos = sheetFormat_service.getHeadInfos() 
		}
		col_list = eval( cmdOpts[1] ) 
		var stmt =''
		for( p_i of col_list ){
			  deleteEnt = headInfos[p_i] 
			 stmt += `col[ ${p_i} ] is ${deleteEnt.name}\n` 
		}
		alert( stmt ) 
	}	
//////////////////////////////////////////////////////////////////////////////////////////////////////			 
/*			
   SheetCmd.deleteCol   :  DB에 Table를 변경   
   		global: 
				[ spreadJs_service ] 
		input:
				[ 	cmdOpts -  [0]:deleteCol [1]: [index of column] ( i.e [1] )   
				               [0]:deleteCol  x  
			    ]
		return: [
				 { col_name ,  cb_function  } 
				]
*/			
//////////////////////////////////////////////////////////////////////////////////////////////////////				 
	this.deleteCol = ( cmdOpts )=>{
		let spread = spreadJs_service.getSpread() 
		let DbData = spreadJs_service.getDbData()
		let headInfos = spreadJs_service.getHeadInfos() 
		let sheet0 = spreadJs_service.getSheet0()
		let sheet1 = spreadJs_service.getSheet1()
		var col_list = eval( cmdOpts[1] ) 
		let col_name_list = []
		if( Array.isArray( col_list )){
			col_list = col_list.sort((a,b)=>b-a) 
			sheet0.suspendEvent()
			for( p_i of col_list ){
				col_name_list.push( headInfos[p_i].name ) 
				DbData.forEach((ent)=>{
					  let deleteEnt = headInfos[p_i] 
					  if( deleteEnt )delete ent[deleteEnt.name] 
				})
			   headInfos.splice( p_i, 1 ) 
			}
		spreadJs_service.initData( DbData )
		spreadJs_service.initHead( headInfos )
		sheet0.resumeEvent() 
//1		sheetFormat_service.resetFormulas() 
		     return { cols_name : col_name_list , cb_function : null } 	
		}else{
		    let sel_cell = spreadjsEvents_factory.sell_cell  
			let pos = headInfos.findIndex( i => i.name == sel_cell.col_sel  )
			const cb_f = ()=>{
				DbData.forEach((ent)=>{
					delete ent[sel_cell.col_sel] 
				})
				if( pos != undefined )headInfos.splice( pos, 1 ) 
				spreadJs_service.initData( DbData )
				spreadJs_service.initHead( headInfos )
				sheet0.resumeEvent() 
				sheetFormat_service.resetFormulas() 
			}	
			return { col_name : sel_cell.col_sel ,  cb_function : cb_f } 
		}
	}
	this.moveCol =( cmdOpts )=>{
		let spread = spreadJs_service.getSpread() 
		let DbData = spreadJs_service.getDbData()
		let headInfos = spreadJs_service.getHeadInfos() 
		let sheet0 = spreadJs_service.getSheet0()
		let sheet1 = spreadJs_service.getSheet1()
		let src_index = headInfos.findIndex( ent=> ent.displayName == cmdOpts[1] ) 
		if( src_index ){
			sheet0.suspendEvent()
			let ent0 = headInfos[ src_index ] 
		    let sel_cell = spreadjsEvents_service.getSel_cell() 
			let pos = headInfos.findIndex( ent => ent.name == sel_cell.col_sel  )
			headInfos.splice( src_index, 1 ) 
			headInfos.splice( pos, 0, ent0 )
		    sheet0.bindColumns( headInfos ) 
		    sheet0.resumeEvent() 
		}
	}
 }
])
