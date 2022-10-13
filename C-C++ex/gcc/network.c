#include <stdio.h>
#define MinGW 1 
#ifdef MinGW
	#include <winsock2.h> 
#else
	#include <sys/socket.h>
        #include <netinet/in.h> 
#endif 
#include <string.h> 

int main( int argc , char** argv )
{
	int serv_sock;
	struct sockaddr_in serv_addr; 
	serv_sock = socket( PF_INET,  SOCK_STREAM , 0);
	memset( &serv_addr, 0 , sizeof( serv_addr )); 
	serv_addr.sin_family = AF_INET ; 
	serv_addr.sin_addr.s_addr = htonl(INADDR_ANY) ;
	serv_addr.sin_port = htons( atoi( argv[1] );
	return 0 ;
}
