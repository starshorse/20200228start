
#include <memory>
#include <iostream>
#include <string>

using namespace std;
class Dog{
	string name_;
public:
	Dog(string name){ 
		name_ = name;
		cout << name_ << "Dog Created\n";

	};
	~Dog(){
		cout << name_ << "Dog Destroyed\n";
	}
};

void foo(){
	Dog *p1 = new Dog("BY");
	shared_ptr<Dog> p(new Dog("Amni"));
	cout << "1st :" << p.use_count();

	shared_ptr<Dog> p3 = make_shared<Dog>("anOther");
	p3 = p;
	cout << "2nd :" << p.use_count();
}
void mainShared_ptr(){
	foo(); 
}