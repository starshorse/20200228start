/*
 *	git clone https://github.com/socketio/chat-example.git
 */
const express = require('express')
const app = express();
const http = require('http')
const cors = require('cors') 
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, { cors: { origin: "*" }})


app.use( cors({ origin: '*' }) )  // cors({ origin: 허용 오리진 주소 }) // cors({ origin:'https://www.zercho.com' })

app.get('/',(req, res)=>{
//	res.send('<h1>Hello world</h1>');
	res.writeHead( 200, { 'Access-Control-Allow-Origin':'*' });
	res.sendFile( __dirname + '/index.html');	
});

io.on('connection', ( socket )=>{
	console.log('a user connected'); 
	socket.on('chat message', (msg)=>{
		console.log('message: ' + msg);	
// Broadcasting ..
// socket.broadcast.emit('hi')
// * in this case , for the sake of simplicity we'll send the message to everyone , including the sender . 
		io.emit('chat message', msg ); 

	});
})

server.listen( 3000, ()=>{
	console.log('listening on *:3000');
}); 
