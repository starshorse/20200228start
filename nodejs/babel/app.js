import express from 'express'
export class Server{
	constructor(){
		this.app = express()
		this.app.get('/console', ( req, res)=>{
			res.send('This is NodeServer');	
		})	
    	}	
}	
