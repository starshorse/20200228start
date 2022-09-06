#include <stdio.h>

char *html = " \
angular.module('myApp.rest_api',['myApp.rest_api_service'])\n\
angular.module('myApp.rest_api_service',['myApp.rest_api_service.db_edit'])\n\
.service('restApiService', ['$http', function($http){\n\
	this.getData = ( url_ , cb_f )=>{\n\
		$http.get( url_ ).then(( res)=>{\n\
			cb_f( res.data ) \n\
		})\n\
	}\n\
	this.postData = ( url_ , data_ , cb_f )=>{\n\
		$http({ method:'POST', url:url_ , data: JSON.stringify( data_ )}).then((res)=>{\n\
			cb_f( res.data ) \n\
		})\n\
	}\n\
}])\n\
angular.module('myApp.rest_api_service.db_edit', [])\n\
.service('restApiServiceDbEdit', ['restApiService', function( restApiService ){\n\
	this.getData = ( tbl_name , cb_f )=>{\n\
		restApiService.getData( `/db_edit/data/${tbl_name}`, cb_f ) \n\
	}\n\
    this.postData = ( tbl_name , data_ , cb_f )=>{\n\
		restApiService.postData( `/db_edit/data/${tbl_name}`, data_ , cb_f ) \n\
	}\n\
}])\n\
";

int main( int argc, char** argv ){
	FILE *pfile = NULL ;
	pfile = fopen("rest_api_service.js", "w"); 
	fputs( html, pfile ); 
	fclose( pfile ); 
}

