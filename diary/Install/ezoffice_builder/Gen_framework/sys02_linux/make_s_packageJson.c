#include <stdio.h>

char *html = " \
{\n\
  \"name\": \"nodee6\",\n\
  \"version\": \"1.0.0\",\n\
  \"description\": \"\",\n\
  \"main\": \"app.js\",\n\
  \"scripts\": {\n\
    \"test\": \"karma start karma.conf.js\",\n\
    \"test_node\": \"nodemon --ext js --exec jasmine \\\"server/**/*.spec.js\\\"\",\n\
    \"copy-libs\": \"cpx \\\"node_modules/{angular,angular-*,socket.io}/**/*\\\" app/lib -C\",\n\
    \"start\": \"http-server -a localhost -p 8000 ./app -c-1\",\n\
    \"startDev\": \"nodemon --inspect app.js\"\n\
  },\n\
  \"author\": \"\",\n\
  \"license\": \"ISC\",\n\
  \"devDependencies\": {\n\
    \"angular\": \"^1.8.2\",\n\
    \"angular-mocks\": \"^1.8.2\",\n\
    \"angular-route\": \"^1.8.2\",\n\
    \"cookie-parser\": \"^1.4.5\",\n\
    \"cpx\": \"^1.5.0\",\n\
    \"express\": \"^4.17.1\",\n\
    \"http-server\": \"^0.12.3\",\n\
    \"karma\": \"^6.3.4\",\n\
    \"karma-chrome-launcher\": \"^3.1.0\",\n\
    \"karma-firefox-launcher\": \"^2.1.1\",\n\
    \"karma-jasmine\": \"^4.0.1\",\n\
    \"morgan\": \"^1.10.0\",\n\
    \"nodemon\": \"^2.0.7\",\n\
    \"socket.io\": \"^4.1.3\",\n\
    \"sqlite3\": \"^5.0.2\",\n\
    \"csvtojson\": \"^2.0.10\"\n\
  }\n\
}\n\
";

int main( int argc , char** argv ){
	FILE *pfile = NULL;
	pfile = fopen("package.json", "w");
	fputs( html, pfile );
	fclose( pfile );
	return 0; 
}


