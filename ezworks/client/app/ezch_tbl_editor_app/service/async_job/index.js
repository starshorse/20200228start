angular.module( 'async_job', [])
.factory('asyncJob_factory',['$injector', function( $injector ){
	var asyncJob_factory = {
		async_updates: []
	}
	return asyncJob_factory
}])
.service('asyncJob_service', ['$injector','$q','restApiServiceDbEdit', function( $injector, $q,restApiServiceDbEdit ){
	var asyncJob_cb_service = $injector.get('asyncJob_cb_service') 
	var asyncJob_factory = $injector.get('asyncJob_factory') 
	var $filter = $injector.get('$filter') 
	var $http = $injector.get('$http') 
	var $cookies = $injector.get('$cookies')  

	this.restApi_queue = ()=>{
		var queue = [] 
	    var defer_cb = null 
		this.enqueue = ( tbl_name_ , ent, mode = 0 )=>{ 
			ent['tbl_name'] = tbl_name_ 
			ent['mode'] = mode 
			queue.push( JSON.parse( JSON.stringify( ent ))) 
			setTimeout( this.dequeue , 1000 )  
		} 
		this.register_cb = ( cb_ft )=>{ defer_cb = cb_ft } 
		this.dequeue = async()=>{
			let emp = 0 
			let url_
			if( queue.length > 0 ){
				emp = queue.shift()
//				defer_cb( emp ) 
				switch( emp.mode ){
					case 0:
					case '0':	 // update.. 
						  let headers = {}
						  let user_DB = $cookies.get('user_DB') 
						  if( user_DB )headers['user_DB'] = user_DB 
						  let tbl_name = emp.tbl_name 
						  let seq = emp.seq 
						  asyncJob_factory.async_updates.push( seq ) 
						  url_ = `/ezchemtech/TableEditor/${ tbl_name }/${seq }`
						  delete emp.tbl_name , delete emp.seq ;	
// force update Date input .. 
						  emp['UpdateDate'] = new Date() 
						  try{
							  $http({ method:'POST', url: url_ ,  data: emp , headers: headers }).then((res_)=>{
								  let seq = res_.config.data.seq; 
								  let seq_index = asyncJob_factory.async_updates.indexOf( seq )
								  asyncJob_factory.async_updates.splice( seq_index, 1 ) 
//								  console.log( res_ )
								  console.log( asyncJob_factory.async_updates )
							  }) 
						  }catch(err){
							 console.log(err) 	
						  }	  
					  break; 
					case 1:
					case '1':    // insert.. 
						url_ = `/ezchemtech/ReqularBusinessBasicInformation/ezch_task_app`
						$http({ method:'POST', url: url_ ,  data: emp }).then((res_)=>{
						  console.log( res_ )
					      if( $filter('uppercase')( res_.RESULT ) == 'success' )
					                asyncJob_cb_service.add_newEntry() 		
						}) 
					  break;
					default:	
				}
			}
			return emp 
		}
	}
	this.restApi_queue() 
}])  
.factory('asyncJob_promise_factory',['$injector', function($injector){
	var asyncJob_promise_factory ={
		asyncJob_buffer: []
	}
	return asyncJob_promise_factory 
}]) 
.service('asyncJob_promise_service',['$injector',  function($injector){
	var asyncJob_factory = $injector.get('asyncJob_promise_factory') 
    this.promise_all_enque = ( ft_pt , arr_args )=>{
		let newEntry = JSON.parse( JSON.stringify({ 'args': arr_args }))
			newEntry['ft_pt'] = ft_pt 
		asyncJob_factory.asyncJob_buffer.push( newEntry ) 
	}
	this.promise_all_apply = ()=>{
		Promise.all( asyncJob_factory.asyncJob_buffer.map( (ent)=>{ 
			return new Promise( function( resolve, reject ){
				resolve( ent.args ) 
				ent.ft_pt.setFormula( ...ent.args ) 
//				resolve( ent.args ) 
			})
		}) ).then(( Data_S )=>{ 
			// init issue.. 
			asyncJob_factory.asyncJob_buffer = []
			console.log('return D', Data_S )
		})    
	}
}])
.factory('asyncJob_cb_factory',['$injector', function( $injector ){
	var spreadJs_db_factory = $injector.get('spreadJs_db_factory') 
	var spreadJs_factory = $injector.get('spreadJs_factory') 
	var asyncJob_cb_factory = {
		get_spreadJs_factory :()=>spreadJs_factory ,
		get_spreadJs_db_factory :()=>spreadJs_db_factory ,
//		sheetCmd_service: null 
	}
	return asyncJob_cb_factory 
}])
.service('asyncJob_cb_service',['$injector', function( $injector ){
	var spreadJs_db_service = $injector.get('spreadJs_db_service') 
    var asyncJob_cb_factory = $injector.get('asyncJob_cb_factory') 
	var sheetCmd_service = $injector.get('sheetCmd_service') 
	this.add_newEntry = ()=>{
//Tue Jun 21 11:46:08 KST 2022
		let spreadJs_factory = asyncJob_cb_factory.get_spreadJs_factory() 
		if( spreadJs_factory.appConfiguration.component?.spreadJs?.rt_save?.type != 'insert_first' ) return 
        let spreadJs_db_factory = asyncJob_cb_factory.get_spreadJs_db_factory() 
        spreadJs_db_service.convertTo_updateRow() 
		let newId = sheetCmd_service.addRow(1) 
		spreadJs_factory.newId_jpt = newId.newId 
		spreadJs_db_factory.newId_jpt = newId.newId 
		spreadJs_db_factory.newId_row.row_num = newId.newRow_num 
		spreadJs_db_service.indicateNotNull_tempRow() 
	}

}])
