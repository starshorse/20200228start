#include <iostream>
#include <cstring>
#include <ctime>
#include "C++string.h"
#include "C++Shared_ptr.h"

void createComm();
void main_cpp11();
using namespace std; 

void main_var_c();

/*
 In order to return a function pointer within a function, 
 an array of function pointers must be made malloc.
 
typedef void (*drawFunctionPointer)(void);
drawFunctionPointer *drawFunctions = malloc(sizeof(drawFunctionPointer) * numFunctions);
*/

/**
   2019-01-14 Function pointers 
*/
typedef int(*ft())();
typedef int(*fta)();
//int(*getFunc())(int, int){ return *ft; };

int(*a1())(){
	printf("function return function!");
	fta *functions = (fta *)malloc(sizeof(fta) * 4);
	return functions[0];
}


int sum(int a, int b){
	return a + b; 
}
void f(int(*a)(int, int)){
	a(2, 3);
}

int(*funct_get(int a))(int a, int b){
	static int(*myf)(int, int);
//	myf = myf2;
	return myf;
}
int aft(){
	printf("This is aft");
	return 0;
}
int bft(){
	printf("This is bft");
	return 0;
}
int cft(){
	printf("This is cft");
	return 0;
}
int dft(){
	printf("This is dft");
	return 0;
}

int(*ft_a[4])() = {
	aft, bft, cft, dft
};
/*
    RICHARD-CHOI 2020-07-08 
	Follow function return  ft int(\*()) and get argment int a
*/
int(*funct_getA(int a))(){
	return ft_a[a];
}
typedef int(*p_array_t)[10]; 

int(*fp(int))[10];

p_array_t fp(int c){
	static int b[10] = { 0 };
//	int *b = new int[10];
	p_array_t pRet = &b; 
	return pRet;
}

void f1( char *m[5]){
	printf("%s", m[1]); 
}
/**
/**
2019-01-15 
*/
struct Address{
	char *address;
	int  end;
};
struct contract{
	string name; 
	Address *address;
};
int main(){

	time_t biggest = 0x7FFFFFFF; 
	tm *a;
	contract worker{ "", new Address{ "123 est", 0 } };
	char *name[5] = {
		"RICK",
		"RICHARD",
		"Love",
		"Me",
		"Tender"
	};
	int(*myA)();
	fta b;
	b = a1();
//  C++ 이 나니라서 안된다.	b = a();	

	myA = funct_getA(2);
	myA();

// RICHARD-CHOI 2020-07-08 COM3 work well 
// Temporary comment
//	createComm();
	printf("biggest = %s \n", ctime(&biggest));
	
	a = gmtime(&biggest); 
	cout << a->tm_hour << endl; 
	asctime(a);

	f1(name);

//	printf(" hello %d",fb(3)[1]) ;

	funct_get(3);

	p_array_t myp;

	myp = fp(3); 

	printf(" value : %d", *myp[3]);

	main_cpp11(); 
	outString();
	mainShared_ptr();
	main_var_c();
//	fb(3)[1];
//	ft_1();
	return 0;
}