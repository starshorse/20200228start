#include <stdio.h>
#include <stdarg.h>

void vfunction1(char *str, ...){
	va_list ap;
	va_start(ap, str);
		vprintf(str, ap);
	va_end(ap);
}

int ** dbInt; 

void putNumS(int dat[][5]){
	for (int i = 0; i < 5; i++){
		dat[0][i] = i;
	}
}
void dynAdbl(){

	dbInt = new int*[3];

	for (int i = 0; i < 3; i++){
		dbInt[i] = new int[5];
	}

	dbInt[2][4] = 4; 

	printf("Data= %d", dbInt[2][4]);
	putNumS((int(*)[5])dbInt);
}
void main_var_c(){
	vfunction1("number is %d %s", 345 , "Hello");
	dynAdbl();
}