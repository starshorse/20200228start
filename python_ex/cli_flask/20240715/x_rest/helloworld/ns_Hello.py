from flask_restx import fields , Resource , Namespace ,Api

namespace = Namespace('hello')
@namespace.route('/')
class HelloWorld( Resource ):
    def get( self ):
        return {"Hello":"World"}, 201 , {"hi":"hello"}


