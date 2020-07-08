#include <iostream>
#include <cstring>
#include <ctime>

void createComm(); 
using namespace std; 

/**
   2019-01-14 Function pointers 
*/
typedef int(*ft())();
//int(*getFunc())(int, int){ return *ft; };

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




//	fb(3)[1];


//	ft_1();
	return 0;
}