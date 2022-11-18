#include <sys/types.h>
#include <sys/stat.h>
#include <fcntl.h>
#include <unistd.h> 
#include <stdio.h>

#define BUF_SIZE 250 

int write_file( char* file_name , char* buf ){
	int fd;
	fd = open( file_name , O_CREAT | O_WRONLY | O_TRUNC );
	if( fd != -1 ){
		if( write( fd, buf , sizeof( buf ) ) != -1 )
			close( fd );
	}
}
int read_file( char* file_name ){
	int fd; 
	char buf[ BUF_SIZE ];
	fd = open( file_name , O_RDONLY );
	if( fd != -1 ){
		if( read( fd, buf , sizeof(buf)) != -1){
			printf("%s data is %s", file_name , buf ); 
			close( fd ); 
		}
	}
}

int main( void ){
	char buf[] ="Let's go!\0";
	char *file_name  = "data.txt";
	write_file( file_name , buf ); 
	read_file( file_name ); 
}
