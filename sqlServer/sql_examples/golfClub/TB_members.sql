create database golfClub 
using golfClub ;

create table TB_members ( seq INT  IDENTITY  PRIMARY KEY , name NVARCHAR( 50), email NVARCHAR(100) , level INT );

insert into TB_members( name , email, level ) values( '������','richard.choi@ez-office.co.kr', 2 );  
insert into TB_members( name , email, level ) values( '������','service1@ezchemtech.com', 5 );  
insert into TB_members( name , email, level ) values( '�迬��','am@ezchemtech.com', 5 );  
insert into TB_members( name , email, level ) values( 'Ȳ�α�','yinkwhang@ezchemtech.com', 2 );  
insert into TB_members( name , email, level ) values( '������','info3@ezchemtech.com', 1 );  
insert into TB_members( name , email, level ) values( '������','service3@ezchemtech.com', 5 );  
insert into TB_members( name , email, level ) values( '��ſ�','service2@ezchemtech.com', 2 );  