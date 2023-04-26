angular.module('myApp.rest_api',['myApp.rest_api_service'])
angular.module('myApp.rest_api_service',['myApp.rest_api_service.db_edit',
])
.service('restApiService', ['$http', function($http){
	this.getData = ( url_ , cb_f, in_args  =null )=>{
//		console.log('getData!', url_ ) 
		$http.get( url_ ).then(( res)=>{
			cb_f( res.data, in_args  ) 
		}).catch((err)=>{
			cb_f( undefined , undefined , err ) 
		})
	}
	this.postData = ( url_ , data_ , cb_f )=>{
		$http({ method:'POST', url:url_ , data: data_ }).then((res)=>{
			cb_f( res.data ) 
		})
	}
	this.deleteData = ( url_ , data_ , cb_f )=>{
		$http({ method:'DELETE', url:url_ , data: JSON.stringify( data_ )}).then((res)=>{
			cb_f( res.data ) 
		})
	}
}])
angular.module('myApp.rest_api_service.db_edit', [])
.service('restApiServiceDbEdit', ['restApiService', function( restApiService ){
	this.getData = ( tbl_name , cb_f , in_args = { db_mode: 'fdb'} )=>{
		switch( in_args.db_mode ){
			case 'mssql':
			case "mssql":
				        const cb_f_in = ( res, inargs , err )=>{ 
//1							cb_f( res?.tbl_data , inargs , err ) 
							cb_f( res?.DATA , inargs , err ) 
						}
//1						restApiService.getData( `/company/data/${ tbl_name }`, cb_f_in ) 
				                debugger;
						restApiService.getData( `/tbl_editor/ezchemtech/${ tbl_name }`, cb_f_in ) 
				        break ;
			default:	
						restApiService.getData( `/db_edit/data/${tbl_name}`, cb_f , in_args ) 
		}
	}
    this.postData = ( tbl_name , data_ , cb_f, mode = 0, ent_data_= null, in_args = { db_mode :'fdb' } )=>{
		switch( in_args.db_mode ){
			case 'mssql':
			case "mssql":
				 const cb_f_in = ( res )=>{ cb_f( res.tbl_data ) }
        		if(mode){ // insert update to mssql 
		                restApiService.postData(`/company/data/${ tbl_name }/mssql`, ent_data_ , cb_f_in ) }
/* 						restApiService.postData(`/company/data/${ tbl_name }`, data_ , cb_f_in ) 
Tue May 17 05:47:27 UTC 2022
*/
						restApiService.postData(`/db_edit/data/${ tbl_name }`, data_ , cb_f_in ) 
				break ; 
		    default:		
						restApiService.postData( `/db_edit/data/${tbl_name}`, data_ , cb_f ) 
		}	
	}
	this.postDataMssql = ( tbl_name , cb_f , ent_data_ )=>{
		 restApiService.postData(`/company/data/${ tbl_name }/mssql`, ent_data_ , cb_f ) 
	}
	this.putDataMssql = ( tbl_name , cb_f , ent_data_ )=>{
		 restApiService.postData(`/company/data/${ tbl_name }/mssql/${ ent_data_['seq']}`, ent_data_ , cb_f ) 
	}
	this.postDataDanfoJs = ( tbl_name , cb_f , queryStr ) =>{
		restApiService.postData(`/service/danfo_js/${ tbl_name }`, queryStr , cb_f )
	}
	this.postDataDoSql = ( opt1 , cb_f ,  queryStr  ) =>{
		restApiService.postData(`/service/do_sql/${ opt1 }`, queryStr , cb_f )
	}
	this.convData = ( csvData , cb_f )=>{
	    restApiService.postData(`/db_edit/data/conv2json` , csvData , cb_f )
	}
	this.command_db = ( cmd_name , tbl_name ,  params , cb_f )=>{
		restApiService.postData(`/db_edit/data/command/${cmd_name}/${tbl_name}` , params , cb_f ) 
	}
}])
