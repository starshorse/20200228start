angular.module( 'async_job', [])
.service('asyncJob_service', ['$injector','$q','restApiServiceDbEdit', function( $injector, $q,restApiServiceDbEdit ){
	var asyncJob_cb_service = $injector.get('asyncJob_cb_service') 
	var $filter = $injector.get('$filter') 
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
		this.dequeue = ()=>{
			let emp = 0 
			if( queue.length > 0 ){
				emp = queue.shift()
//				defer_cb( emp ) 
				switch( emp.mode ){
					case 0:
					case '0':	 // update.. 
				      restApiServiceDbEdit.putDataMssql( emp.tbl_name , ( res)=>{ 
					      console.log(res) 
//					      asyncJob_cb_service.add_newEntry() 		
				      } , emp ) 
					  break; 
					case 1:
					case '1':    // insert.. 
				      restApiServiceDbEdit.postDataMssql( emp.tbl_name , ( res)=>{
					      console.log(res) 
					      if( $filter('uppercase')( res.status_ ) == 'OK' )
					                asyncJob_cb_service.add_newEntry() 		

				      } , emp ) 
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
/*	
	this.parallel_apply = async ()=> {
		asyncJob_factory.asyncJob_buffer.forEach((ent)=>{
			await ent.ft_pt.setFormula( ...ent.args ) 
		})
	}*/
	this.promise_all_apply = ()=>{
		Promise.all( asyncJob_factory.asyncJob_buffer.map( (ent)=>{ 
			return new Promise( function( resolve, reject ){
//				console.log('ent D', ent ) 
//				ent.ft_pt.setFormula( ent.args[0], ent.args[1], ent.args[2] ) 
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
/*	this.set_sheetCmd_service = ( sheetCmd_service )=>{
		asyncJob_cb_factory.sheetCmd_service = sheetCmd_serivce 
	}*/
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
