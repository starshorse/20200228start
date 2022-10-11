#include <stdio.h>
#define MinGW 1 
#ifdef MinGW
	#include <winsock2.h> 
#else
	#include <sys/socket.h>
#endif 

int main( int argc , char** argv )
{
	int serv_sock;
	struct sockaddr_in serv_addr; 
	serv_sock = socket( PF_INET,  SOCK_STREAM , 0);
	return 0 ;
}
