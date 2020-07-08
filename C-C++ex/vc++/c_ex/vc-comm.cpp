#include <Windows.h>

int main(){
  HANDLE hcomm;
  hcomm = CreateFile("L\\\.\\COM3", GENERIC_READ | GENERIC_WRITE,0,0, OPEN_EXISTING,0,0); 
  DCB dcbSerialParams ={0};
}