#include <stdio.h>
char *code = " \
[{'id':1,'이름':'가하나','요일':'토','시간':'16-30','수업시간':'2-0'},{'id':2,'이름':'나둘','요일':'화,금','시간':'14-0','수업시간':'1-0'},{'id':3,'이름':'다셋','요일':'일','시간':'8-30','수업시간':'3-30'},{'id':4,'이름':'라넷','요일':'수','시간':'12-0','수업시간':'2-0'},{'id':5},{'id':6},{'id':7},{'id':8},{'id':9},{'id':10},{'id':11},{'id':12},{'id':13},{'id':14},{'id':15},{'id':16},{'id':17},{'id':18},{'id':19},{'id':20},{'id':21}] \n\
" ;
int main(int argc, char** argv){
	FILE *pfile = NULL;
	pfile = fopen("학원일정","w");
	fputs(code,pfile);
	fclose(pfile);
	return 0; 
}
