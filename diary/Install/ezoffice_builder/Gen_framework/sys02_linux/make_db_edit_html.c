#include <stdio.h>

char *html ="            \n\
<html ng-app='myDbEdit'> \n\
	<head>               \n\
		<script data-require='jquery@*' data-semver='2.1.1' src='//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.1/jquery.min.js'></script>                          \n\
		<link data-require='SpreadJS@*' data-semver='3.20143.15' rel='stylesheet' href='http://cdn.wijmo.com/spreadjs/jquery.wijmo.wijspread.3.20143.15.css' />  \n\
		<script data-require='SpreadJS@*' data-semver='3.20143.15' src='http://cdn.wijmo.com/spreadjs/jquery.wijmo.wijspread.all.3.20143.15.min.js'></script>    \n\
		<link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css' integrity='sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l' crossorigin='anonymous'>   \n\
		<script src='https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/js/bootstrap.bundle.min.js' integrity='sha384-Piv4xVNRyMGpqkS2by6br4gNJ7DXjqk09RmUpJ8jgGtD7zP9yug3goQfGII0yAns' crossorigin='anonymous'></script>  \n\
	</head>                                                                \n\
		<body>                                                             \n\
			<div ng-controller='myDbEditCtrl'>                             \n\ 
				<cmd-input></cmd-input>                                    \n\
				<my-spreadjs></my-spreadjs>                                \n\
				<my-events></my-events>\n\
				<my-sheet1></my-sheet1> \n\
             </div>                                                        \n\
			 <script src='/lib/angular/angular.js'></script>               \n\
			 <SCRIPT src='/rest_api/rest_api_service.js'></SCRIPT>         \n\ 
			 <script src='app.js'></script>                                \n\
			 <SCRIPT src='spreadjs.js'></script>                           \n\
			 <SCRIPT src='events.js'></script>                           \n\
			 <SCRIPT src='sheet1.js'></script>                           \n\
			</body>                                                        \n\   
	</html>";

int main( int argc , char ** argv ){
	FILE *pfile = NULL ;
	pfile = fopen( "index.html", "w" );
	fputs( html, pfile );
	fclose( pfile );
	return 0;
}


