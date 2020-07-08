#include <Windows.h>
#include <stdio.h>

void createComm(){
	HANDLE hcomm; 

	hcomm = CreateFile(L"\\\\.\\COM3", GENERIC_READ | GENERIC_WRITE ,0,0,OPEN_EXISTING,0,0 ); 
	DCB dcbSerialParams = {0 };
	GetCommState(hcomm, &dcbSerialParams); 
	dcbSerialParams.BaudRate = CBR_115200; 
	dcbSerialParams.ByteSize = 8; 
	dcbSerialParams.StopBits = ONESTOPBIT;
	dcbSerialParams.Parity = NOPARITY;

	SetCommState(hcomm, &dcbSerialParams);

	COMMTIMEOUTS timeouts = { 0 }; 
	GetCommTimeouts(hcomm, &timeouts);
	timeouts.ReadIntervalTimeout = 50;
	timeouts.ReadTotalTimeoutConstant = 50; 
	timeouts.ReadTotalTimeoutMultiplier = 10; 
	timeouts.WriteTotalTimeoutConstant = 50; 
	timeouts.WriteTotalTimeoutMultiplier = 10; 
	SetCommTimeouts(hcomm, &timeouts); 

	char data; 
	DWORD NoBytesRead; 
	do{
		ReadFile(hcomm,
			&data,
			sizeof(data),
			&NoBytesRead,
			NULL); 
		if (NoBytesRead > 0)printf("%c", data); 
	} while (1);
}
