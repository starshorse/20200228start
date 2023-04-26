angular.module('danfo_js', [])
.service('danfoJs_service', ['restApiServiceDbEdit', 'sheetFormat_service','spreadJs_factory', 
	function( restApiServiceDbEdit, sheetFormat_service, spreadJs_factory ){
	const cb_f = ( res_ , opt1 ='pandas' )=>{
		let  sheet0 = spreadJs_factory.sheet0 
		let headInfo_spreadJs = spreadJs_factory.headInfos 
		let headInfo = headInfo_spreadJs
//		sheet0.reset() 
		switch( opt1 ){
			case 'sql_cmdInput':
			    headInfo =  sheetFormat_service.retractHead( res_.dataFrame.recordset[0] ) 
			case 'sql':
				if( sheet0){ 
					sheet0.setDataSource( res_.dataFrame.recordset ) 
					sheet0.bindColumns( headInfo ) 
				}
				break;
			case 'pandas':	
				headInfo =  sheetFormat_service.retractHead( res_.dataFrame[0] ) 
				if( sheet0 ){
					sheet0.setDataSource( res_.dataFrame ) 
					sheet0.bindColumns( headInfo) 
				}
				break;
			default:	
		}
	}
    this.execPandas = ( tbl_name_ ,  queryStr_ , cb_f_ = null )=>{
		 let queries = queryStr_.split('#') 
		 this.execPandas_p( tbl_name_ , queries , cb_f_ ) 
	}
	this.execPandas_p = ( tbl_name_ , queries , cb_f_ = null , cb_f_chart = null, cb_f_form ) =>{
		 const cb_f_main = ( res_ )=>{
			 if( res_.status == 'failure' ) {
				       res_['dataFrame'] = [] 
			          if( cb_f_form  != null )cb_f_form ( res_ ) 
				      return 
			 }
			 cb_f( res_ ) 
			 if( cb_f_ != null )cb_f_( res_.dataReturn )
			 if( cb_f_chart != null )cb_f_chart( res_.chartReturn ) 
			 if( cb_f_form  != null )cb_f_form ( res_ ) 
		 }
//         restApiServiceDbEdit.postDataDanfoJs( tbl_name_ , cb_f ,{ 'query':  queryStr_ } )  
         restApiServiceDbEdit.postDataDanfoJs( tbl_name_ , cb_f_main  ,{ 'query':  queries } )  
	}
	this.execSQL_p = (  queries , opt1 = 1, db_name_ = null , cb_f_ = null )=>{
		 const cb_f_main = ( res_ )=>{
			if( cb_f_ != null )cb_f_( res_.dataFrame ) 
		    else{
				switch( opt1 ){
					case 1:
				         cb_f( res_ , 'sql' )  
						 break; 
					case 2:
						 cb_f( res_ , 'sql_cmdInput' )
						 break;
					default:		 
				}
			}
		 }
		 restApiServiceDbEdit.postDataDoSql( opt1 , cb_f_main , {'query': queries , 'db_name': db_name_ })   
	}
	this.execFilter_p = ( DbData_, queries )=>{
		var filter_data = DbData_ 
		queries.forEach((ent0)=>{
			filter_data = filter_data.filter((ent)=>{
				return eval( ent0 ) 
//				return ent.edit_level > -2 
			})
		})
		return filter_data	
	}
	spreadJs_factory.set_ft_execPandas_p( this.execPandas_p ) 
	spreadJs_factory.set_ft_execFilter_p( this.execFilter_p ) 
	spreadJs_factory.set_ft_execSQL_p( this.execSQL_p ) 
}])

