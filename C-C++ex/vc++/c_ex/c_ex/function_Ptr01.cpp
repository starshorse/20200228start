#include <stdio.h>
#include <string>

typedef int(*ft())(int,int);
typedef int(*fta[4])(int, int); // function Array..
// typedef int(*ftb()[4])(int, int); // function Array..s

class Address{
public:
	std::string nameAddr;
};
struct Contact{
	std::string name;
	Address* myAddress;
};

Contact Worker{ "RICHARD", new Address { "Seoul Korea" } };

int fA(int a, int b){
	return a + b;
}
int fB(int a, int b){
	return a*b;
}

int(*myft())(int, int){
	return fB;
}

void putFarr(){
	fta CA;
	CA[0] = fA;
	CA[1] = myft();
}
void secArr(){
	char asciiE[5][4] = {
		'A', 'B', 'C', 0, 'K', 'O', 'R', 0, 'D', 'E', 'F', 0, 'J', 'P', 'N', 0
	};
	printf(" Data %s", *asciiE[1]);
	{
		char *a = (char *)(asciiE + 2);
		a = *(asciiE + 2) + 1;
		a = a + 4;
		printf(" Data %s %c", (char *)asciiE[1], *a);
	}
}

