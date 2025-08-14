set FLASK_APP=hermes_DB
set FLASK_DEBUG=True 


flask --help // Check command 'db'

flask db init 
flask db migrete [ revision ]
flask db upgrade [ downgrade ] 

flask shell 
>>db_session.query( Board ).filter( Board.seq == 1 ).first() 
>>u = Board('third entery',3 )
>>u.content = 'hello RICHARD noice met you'
>>db_session.add( u )
>>db_session.commit()



