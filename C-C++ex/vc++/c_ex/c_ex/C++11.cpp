/*
2020-07-10 We have created the project for C++11 practice.
The aim is to practice based on the content of Bo Qian YouTube. Modern C++
*/
#include <vector>
#include <iostream>
#include "boVector.h"

using namespace std;

std::vector<int> v = { 1, 2, 3, 4 };
std::vector<boVector> myBo; 
 
/*
The value converted to rValue using unversal reference && is not maintained 
in the next function call, but is changed to Lvalue. To maintain this, 
use std::move(a) or std::forward<int>(a) Just give it.
*/
void printInt(int& a){ cout << "Lvalue called:" << a << endl; }
void printInt(int&& a){ cout << "Rvalue called" << a << endl; }
void printPerfectFwd(int&& a){
	printInt(a);
	printInt( std::forward<int>(a) );
}

void main_cpp11(){
	int a = 4;
	printInt(a);
	printInt(5);
	cout << "perfect Fwd test=>\n";
	printPerfectFwd(5);
// 2020-07-09 9:36
	boVector a_bo; 
	boVector b_bo(a_bo);
	// std::move() converts lvalue to rvalue.
	boVector c_bo( std::move(b_bo));
	boVector d_bo = c_bo;
	c_bo = std::move(b_bo);
	cout << "This Example using Vector container.." << endl; 

	myBo.push_back(std::move(c_bo));
	myBo.push_back(std::move(a_bo));

	cout << "size:" << myBo.size();


}