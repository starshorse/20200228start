import socket 
import pdb

HOST ='127.0.0.1'
PORT = 9999

server_socket = socket.socket( socket.AF_INET , socket.SOCK_STREAM )
server_socket.setsockopt( socket.SOL_SOCKET, socket.SO_REUSEADDR, 1 ) 
server_socket.listen()

client_socket, addr = server_socket.accept() 
print('connected by', addr ) 
while True:
    data = client_socket.recv( 1024 )
    if not data:
        break
    print( 'Received from', addr , data.decode() ) 
    client_socket.sendall( data ) 

pdb.set_trace() 

client_socket.close()
server_socket.close() 
