#include <stdlib.h>
#include <sys/socket.h>
#include <netinet/ip.h>
#include <arpa/inet.h> 
#include <unistd.h> 
#include <stdio.h> 

int client_socket ;
struct sockaddr_in serv_addr ;
char message[30];
int str_len;

int main( int argc , char **argv ){
	client_socket = socket( PF_INET , SOCK_STREAM, 0 );
	serv_addr.sin_family = AF_INET;
	serv_addr.sin_addr.s_addr = inet_addr(argv[1] );
	serv_addr.sin_port = htons( atoi( argv[2] ));
	if( connect( client_socket , ( struct sockaddr *)&serv_addr, sizeof( serv_addr)) != -1 ){
		str_len = read( client_socket , message, sizeof(message) -1 );
		if( str_len != -1 )
			printf("Message from server :%s \n", message );
		close( client_socket ); 
	}
}
