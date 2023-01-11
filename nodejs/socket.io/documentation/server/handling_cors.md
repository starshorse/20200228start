# Handling CORS 

Configuration
```javascript 
import { createServer } from "http";
import { Server } from "socket.io";
const httpServer = createSerer();
const io = new Server(httpServer, {
	cors:{
	origin: "https://example.com"
	}
});
````

```javascript 
// server-side ..
const io = new Server( httpServer, {
	cors:{
		origin: "https://example.com",
		allowedHeaders: ["my-custom-header"],
		credentials: true
	}
});

// cient-side 
import { io } from "socket.io-client";
const socket = io("https://api.example.com",{
	withCredentials: true,
	extraHeaders:{
		"my-custom-header":"abcd"
	}
})	
```
#### Port change.
```javascript
const io = new Server( httpServer, {
	cors:{
		origin: "http://localhost:8080"
	}
});
httpServer.listen( 3000 );
```
You can disallow all cross-origin requests with the allowRequest option 
```javascipt 
const io = new Server( httpServer, {
	allowRequest:( req, callback )=>{
		const noOriginHeader = req.headers.orgin === undefined ;
		callback( null , noOriginHeader ); 
	}

``` 



