#include <stdio.h>
char *code = " \
 <html ng-app='myInstituteMobile'>\n\
	<head>\n\
		<meta http-equiv='content-type' content='text/html; charset=utf-8'>\n\
		<meta name='viewport' content='width=device-width, initial-scale=1'>\n\
		<script data-require='jquery@*' data-semver='2.1.1' src='//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.1/jquery.min.js'></script>\n\
		<link data-require='SpreadJS@*' data-semver='3.20143.15' rel='stylesheet' href='http://cdn.wijmo.com/spreadjs/jquery.wijmo.wijspread.3.20143.15.css' />\n\
		<script data-require='SpreadJS@*' data-semver='3.20143.15' src='http://cdn.wijmo.com/spreadjs/jquery.wijmo.wijspread.all.3.20143.15.min.js'></script>\n\
		<link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css' integrity='sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l' crossorigin='anonymous'>\n\
		<script src='https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/js/bootstrap.bundle.min.js' integrity='sha384-Piv4xVNRyMGpqkS2by6br4gNJ7DXjqk09RmUpJ8jgGtD7zP9yug3goQfGII0yAns' crossorigin='anonymous'></script>\n\
	</head>\n\
	<body>\n\
		<div class='jumbotron'>\n\
			<h1>학원일정</h1>\n\
		</div>\n\
		<div class='container-fluid' ng-controller='myInstituteMobileCtrl'>\n\
			<div class='row'>\n\
				<div class='col-md-3'>\n\
					<h1>Schedule</h1>\n\
				</div>	\n\
				<div class='col-md-1'>\n\
					<ul class='list-group' drop-item>\n\
					<h3>월</h3>\n\
					<li class='list-group-item' draggable='true' id='{{item.id}}' drag-item ng-repeat='item in lesson_list.mon' >{{item.hour}}시{{item.min}}분&nbsp {{ item.name}}</li>\n\
					</ul>	\n\
				</div>	\n\
				<div class='col-md-1'>\n\
					<ul class='list-group' drop-item>\n\
					<h3>화</h3>\n\
						<li class='list-group-item' draggable='true' id='{{item.id}}' drag-item ng-repeat='item in lesson_list.tue' >{{item.hour}}시{{item.min}}분&nbsp {{ item.name}}</li>\n\
					</ul>	\n\
				</div>	\n\
				<div class='col-md-1'>\n\
					<ul class='list-group' drop-item>\n\
					<h3>수</h3>\n\
						<li class='list-group-item' draggable='true' id='{{item.id}}' drag-item ng-repeat='item in lesson_list.wed' >{{item.hour}}시{{item.min}}분&nbsp {{ item.name}}</li>\n\
					</ul>	\n\
				</div>	\n\
				<div class='col-md-1'>\n\
					<ul class='list-group' drop-item>\n\
					<h3>목</h3>\n\
						<li class='list-group-item' draggable='true' id='{{item.id}}' drag-item ng-repeat='item in lesson_list.thu' >{{item.hour}}시{{item.min}}분&nbsp {{ item.name}}</li>\n\
					</ul>	\n\
				</div>	\n\
				<div class='col-md-1'>\n\
					<ul class='list-group' drop-item>\n\
					<h3>금</h3>\n\
						<li class='list-group-item' draggable='true' id='{{item.id}}' drag-item ng-repeat='item in lesson_list.fri' >{{item.hour}}시{{item.min}}분&nbsp {{ item.name}}</li>\n\
					</ul>	\n\
				</div>	\n\
				<div class='col-md-1'>\n\
					<ul class='list-group' drop-item>\n\
					<h3>토</h3>\n\
						<li class='list-group-item' draggable='true' id='{{item.id}}' drag-item ng-repeat='item in lesson_list.sat' >{{item.hour}}시{{item.min}}분&nbsp {{ item.name}}</li>\n\
					</ul>	\n\
				</div>	\n\
				<div class='col-md-1'>\n\
					<ul class='list-group' drop-item>\n\
					<h3>일</h3>\n\
						<li class='list-group-item' draggable='true' id='{{item.id}}' drag-item ng-repeat='item in lesson_list.sun' >{{item.hour}}시{{item.min}}분&nbsp {{ item.name}}</li>\n\
					</ul>	\n\
				</div>	\n\
			</div>	\n\
		</div>	\n\
		<script src='/lib/angular/angular.js'></script>\n\
        <script src='/lib/socket.io/client-dist/socket.io.js'></script>\n\
		<script src='drapDrop.js'></script>\n\
		<script src='app.js'></script>\n\
	</body>	\n\
</html>	\n\
" ;
int main(int argc , char** argv ){
	FILE *pfile = NULL;
	pfile = fopen("index.html","w");
	fputs(code,pfile);
	fclose(pfile);
	return 0;
}
