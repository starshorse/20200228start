angular.module('rest_api',[])
.service('restApi_service', ['$http', function($http){
	this.getData = ( url_ , cb_f, in_args  =null )=>{
		$http.get( url_ ).then(( res)=>{
			cb_f( res.data, in_args  ) 
		})
	}
	this.postData = ( url_ , data_ , cb_f )=>{
		$http({ method:'POST', url:url_ , data: JSON.stringify( data_ )}).then((res)=>{
			cb_f( res.data ) 
		})
	}
	this.deleteData = ( url_ , data_ , cb_f )=>{
		$http({ method:'DELETE', url:url_ , data: JSON.stringify( data_ )}).then((res)=>{
			cb_f( res.data ) 
		})
	}
}])
