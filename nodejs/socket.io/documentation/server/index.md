## Server Installation. 
```console
npm install socket.io
```
## Server Initialization 
```javascript
const { server } = require("socket.io")
const io  = new Server({ /* options */ }) 

io.on("connection", ( socket )=>{
 // ...
 }); 

io.listen( 3000 );
```
```javascript
const io = new Server( 3000, {/* options */}) 
```

### With an HTTP server . 
```javascript 
const { createServer } = require("http");
const { Server } = require("socket.io");

const  httpServer = createServer();
const io = new Server( httpServer, {/* options */ }); 
io.on("connection", ( socket ) =>{
	// ...
});
httpServer.listen( 3000 );
```

### With an HTTPS server 
```javascript 
const { readFileSync } = require("fs"); 
const { createServer } = require("https");
const { Server } = require("socket.io");
const httpsServer = createServer({
	key: readFileSync("/path/to/my/key.pem"),
	cert: readFileSync("/path/to/my/cert.pem")
});
const io  =  new Server( httpsServer, { /* option */ });
io.on("connection", (socket)=>{
	// ... 
});
httpsServer.listen( 3000 );
```

### With Express 
```javascript
const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const httpServer = createServer(app);
const io = new Server( httpServer, { /* options */ });
io.on("connection", ( socket )=>{
	// ...
});
httpServer.listen( 3000 );
```

