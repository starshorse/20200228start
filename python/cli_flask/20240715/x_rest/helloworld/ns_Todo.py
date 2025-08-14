from flask_restx import fields , Resource , Namespace 

Todo = Namespace('todo')

Todo_list = [ {'data':'First Todo', 'todo_id': 1 }] 

todo_fields = Todo.model('Todo', { 'data': fields.String( description = 'a Todo', required=True , example="what to do" )})
todo_fields_with_id = Todo.inherit('Todo with ID', todo_fields , {'todo_id': fields.Integer( description = 'a TodoID' )})


@Todo.route('/')
class TodoList( Resource ):
    def get( self ):
        return {"Todo":"World"}, 201 , {"hi":"Todo"}

@Todo.route('/<int:todo_id>')
@Todo.doc( params = {'todo_id':'An ID'})
class TodoSimple( Resource ):
    @Todo.doc( response = { 202: 'Success' })
    @Todo.doc( response = { 500: 'Failed' })
    class TodoGet( Resource ):
        @Todo.response( 201 , 'success', todo_fields_with_id ) 
        def get( self , todo_id ):
            return Todo_list[ todo_id ] 
