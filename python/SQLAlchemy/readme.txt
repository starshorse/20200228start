
* Pre Work :  여러 소스로 부터 데이터 베이스화 하기 
	- DB table 을 Excel , SpreadJS 에 reverse를 먼저 해본다. 
	- 1개의 Table 로 된 Excel 데이러를 여러 테이블로 분리하게 업데이트 저장 . 


2024-12-30
-----------------------------------------------------------------------------
venv1 :
	는 sqlachemy 1.4 를 사용하게 위해서 만든 Python vertual env  세팅파일임.
pip install mssql-cli 설치 


2025-01-01
-----------------------------------------------------------------------------
https://soogoonsoogoonpythonists.github.io/sqlalchemy-for-pythonist/

import sqlalchemy

sqlalchemy.__version__
1.4.20

from sqlalchemy import create_engine 
engine = create_engine

engine = create_engine("sqlite+pysqlite:///:memory", echo=True, future=True ) 

from sqlalchemy import text 
with engine.connect() as conn:
	result = conn.execute( text("select 'hello world'"))
	print( result.all()) 


with engine.connect() as conn:	
	conn.execute( text("CREATE TABLE some_table ( x int, y int )"))
	conn.execute(
			text("INSERT INTO some_table ( x , y ) VALUES (:x, :y)"),
			[{"x":1,"y":1},{"x":2,"y":4}]
	)
	conn.commit()

ORM Session 으로 실행 
=====================
from sqlalchemy.orm import Session 

stmt = text("SELECT x, y FROM some_table WHERE y > :y ORDER BY x, y").bindparams(y=6)
with Session(engine) as session:
	result = session.execute( stmt ) 
	for row in result:
		print(f"x: { row.x } y: { row.y }") 

with Session(engine) as session:
	result = session.execute(
			text("UPDATE some_table SET y=:y WHERE x=:x"),
			[{"x":9,"y":11},{"x":13,"y":15}]
	)
	session.commit() 

데이터베이스 메타데이터로 작업하기 
==================================

Core와 ORM방식으로 행 조회하기 
==================================

select()를 통한 SQL 표현식 구성
-------------------------------

from sqlachemy import select
stmt = select( user_table ).where( user_table.c.name == 'spongebob' )
print( stmt )


with engine.connct() as conn:
	for row in conn.execute( stmt ):
		print( row ) 
(1.'spongebob','Spongebob Squarepants') 


stmt = select(User).where(User.name == 'spongebob' )

with Session(engine) as session:
	for row inn sessionn.execute(stmt):
		print(row)
(User( id=1 , name='spongebob', fullname='Spongebob Squreparnts'),) 

FROM절과 컬럼세팅하기 
---------------------

>>> print(select(user_table))
"""
SELECT user_account.id, user_account.name, user_account.fullname
FROM user_account
"""

>>> print(select(user_table.c.name, user_table.c.fullname))
"""
SELECT user_account.name, user_account.fullname
FROM user_account
"""

ORM 엔티티 및 열조회 
-------------------

>>> with Session(engine) as session:
...     row = session.execute(select(User)).first()
...     print(row)
(User(id=1, name='spongebob',fullname='Spongebob Squarepants'),)

>>> with Session(engine) as session:
...	row = session.execute(select(User.name, User.fullname)).first()
...	print(row)
('spongebob', 'Spongebob Squarepants')

>>> session.execute(
...     select(User.name, Address).
...     where(User.id==Address.user_id).
...     order_by(Address.id)
... ).all()
[('spongebob', Address(id=1, email_address='spongebob@sqlalchemy.org')),
('sandy', Address(id=2, email_address='sandy@sqlalchemy.org')),
('sandy', Address(id=3, email_address='sandy@squirrelpower.org'))]




