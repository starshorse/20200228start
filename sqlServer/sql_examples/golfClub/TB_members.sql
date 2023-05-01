create database golfClub 
using golfClub ;

create table TB_members ( seq INT  IDENTITY  PRIMARY KEY , name NVARCHAR( 50), email NVARCHAR(100) , level INT );

insert into TB_members( name , email, level ) values( 'ÃÖÁ¾±Ô','richard.choi@ez-office.co.kr', 2 );  
insert into TB_members( name , email, level ) values( 'À±Çö°æ','service1@ezchemtech.com', 5 );  
insert into TB_members( name , email, level ) values( '±è¿¬Èñ','am@ezchemtech.com', 5 );  
insert into TB_members( name , email, level ) values( 'È²ÀÎ±¹','yinkwhang@ezchemtech.com', 2 );  
insert into TB_members( name , email, level ) values( 'ÀÌÁ¤¹Î','info3@ezchemtech.com', 1 );  
insert into TB_members( name , email, level ) values( 'Á¤ÁöÇý','service3@ezchemtech.com', 5 );  
insert into TB_members( name , email, level ) values( '±è½Å¿µ','service2@ezchemtech.com', 2 );  