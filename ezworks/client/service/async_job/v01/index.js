angular.module( 'async_job', [])
.factory('asyncJob_factory',['$injector', function( $injector ){
	var asyncJob_factory = {
		async_updates: []
	}
	return asyncJob_factory
}])
.service('asyncJob_service', ['$injector','$q',
	function( $injector, $q,
){
	var asyncJob_cb_service = null; 

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
				switch( emp.mode ){
					case 0:
					case '0':	 // update.. 
						  let headers = {}
						  let user_DB = $cookies.get('user_DB') 
						  if( user_DB )headers['user_DB'] = user_DB 
						  let tbl_name = emp.tbl_name 
						  let seq = emp.seq 
						  asyncJob_factory.async_updates.push( seq ) 
//1						  url_ = `/ezchemtech/TableEditor/${ tbl_name }/${seq }`
						  url_ = `/tbl_editor/${ tbl_name }/${seq }`
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
					default:	
				}
			}
			return emp 
		}
	}
	this.restApi_queue() 
}])  
