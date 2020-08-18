#include <iostream>
using namespace std;
class boVector{
	int size;
	double *arr_; // big Array
public:
	/*
	Move constructor's practice You can manipulate rvlaue in std::move,
	it is important to make the pointer null only in the object being moved.
	*/
	boVector(int a = 10){
		size = a;
		arr_ = new double[size];
		cout << "creator\n" << endl;
	}
	boVector(const boVector& rhs){  // copy contructor
		size = rhs.size;
		arr_ = new double[size];
		for (int i = 0; i < size; i++){
			arr_[i] = rhs.arr_[i];
		}
		cout << "copy constructor\n" << endl;
	}
	boVector(boVector&& rhs){  // mov contructor
		size = rhs.size;
		arr_ = rhs.arr_;
		rhs.arr_ = nullptr;
		cout << "mov constructor\n" << endl;
	}
	boVector & operator=(const boVector& rhs){
		return boVector(rhs);
	}
	boVector & operator=(boVector&& rhs){
		cout << "mov = operator\n" << endl;
		/*The std::move() can change Lvalue to rvalue.
		It is not an && operator itself, but must use std::move().*/
		return boVector(std::move(rhs));
	}
	~boVector(){ delete arr_; }
};