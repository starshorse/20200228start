angular.module('myNgRs')
.config( function( $httpProvider ){
	$httpProvider.interceptors.push('httpRequestInterceptor');
	$httpProvider.defaults.headers.delete = { "Content-Type=": "application/json; charset=utf-8 "};
})
.factory('httpRequestInterceptor', ()=>{
	return {
		request: function( config ){
			config.headers['Authorization'] = 'Basic 12344567890';
			config.headers['Accept'] = 'application/json; odata=verbose'
		    return config;
		}
	}
})


