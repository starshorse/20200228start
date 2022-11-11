#include <sys/socket.h>
#include <netinet/ip.h>
#include <stdlib.h>
#include <unistd.h> 

int serv_sock;
int client_sock;
struct sockaddr_in serv_addr ;
struct sockaddr_in client_addr;
char message[] = "Hello World"; 
socklen_t client_addr_size;

int main( int argc, char** argv ){
	serv_sock = socket( PF_INET, SOCK_STREAM, 0 );
	serv_addr.sin_family = AF_INET ;
	serv_addr.sin_addr.s_addr = htonl( INADDR_ANY );
	serv_addr.sin_port = htons( atoi( argv[1] ));
	bind( serv_sock , ( struct sockaddr *)&serv_addr , sizeof( serv_addr )) ;
	listen ( serv_sock , 5 ) ;
	client_addr_size = sizeof( client_addr ); 
	client_sock = accept( serv_sock , ( struct sockaddr* )&client_addr , &client_addr_size );
	write( client_sock , message, sizeof( message )); 
	return 0 ;
}
