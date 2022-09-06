const route = require('express').Router()
const { createTbl, updateTbl } = require('../../../../nosql_config/fdb_json') 
var sheet0_data = createTbl('importData') 
var sheet0_data_header = createTbl('importData.hdr') 
// const roomCount = 20 
var { lastNumber, lastId, roomCount } = adjust_id( sheet0_data ) 
fill_room( roomCount ) 

updateTbl('importData', sheet0_data ) 

console.log( lastNumber ) 
console.log( sheet0_data_header )

module.exports = ( io, app )=>{
	io.on('connection', ( socket )=>{
		socket.on('getSheet0Data',()=>{
			updateTbl('importData', sheet0_data )
			socket.emit('getSheet0Data', { data: sheet0_data , columns: sheet0_data_header } ) 
		})
		socket.on('updateSheet0Entry', ( ent )=>{
			var ent0 = sheet0_data.find((ent1)=>ent1.id == ent.id ) 
			if( ent.No == undefined ){
				lastNumber++ 
				ent.No = lastNumber
			}
			Object.assign( ent0 , ent ) 
			updateTbl('importData', sheet0_data )
			io.sockets.emit('updateSheet0Entry', { socketId : socket.id , ent : ent } ) 
		})
		socket.on('addSheet0Entry', ( ent )=>{
			sheet0_data.push( ent ) 
			updateTbl('importData', sheet0_data ) 
		})
		socket.on('delSheet0Entry', ( delNo )=>{
			for( indx in sheet0_data ){
				if( sheet0_data[indx].No == delNo ) 
					sheet0_data.splice( indx, 1 ) 
			}
			updateTbl('importData', sheet0_data ) 
			socket.emit('getSheet0Data', { data: sheet0_data , columns: sheet0_data_header } ) 
		})
		socket.on('updateSumTbl', ( sheetId )=>{
            var sumtbl = {}
			sumtbl.totalProductPrice = sheet0_data.reduce(( a,b )=>{
				console.log( a )
				if( isNaN( b['총제품가격(공급가+부가세)'] )) return a;  
			 	return	( a + b['총제품가격(공급가+부가세)']) 
			}, 0 ) 
			sumtbl.totalSupplyPrice = sheet0_data.reduce(( a,b )=>{
				console.log( a )
				if( isNaN( b['총공급가액'] )) return a;  
			 	return	( a + b['총공급가액']) 
			}, 0 ) 
			sumtbl.totalAddTax = sheet0_data.reduce(( a,b )=>{
				console.log( a,  b['총부가세'] )
				if( isNaN( b['총부가세'] )) return a;  
			 	return	( a + b['총부가세']) 
			}, 0 ) 
			sumtbl.prePaid = sheet0_data.reduce(( a,b )=>{
				console.log( a )
				if( isNaN( b['선지급액'] )) return a;  
			 	return	( a + b['선지급액']) 
			}, 0 ) 
			sumtbl.paid = sheet0_data.reduce(( a,b )=>{
				console.log( a )
				if( isNaN( b['지급액'] )) return a;  
			 	return	( a + b['지급액']) 
			}, 0 ) 
			sumtbl.notPaid = sheet0_data.reduce(( a,b )=>{
				console.log( a )
				if( isNaN( b['미지급액'] )) return a;  
			 	return	( a + b['미지급액']) 
			}, 0 ) 
			io.sockets.emit('updateSumTbl', sumtbl) 
		}) 
	})
	return route 
}
function adjust_id( sheet0_data ){
	var lastNumber = 0, lastId = 0, roomCount = 20  
	var unique_id = [] 
	for( item of sheet0_data ){
//		console.log(item) 
		check_unique( unique_id, item ) 
//		console.log( item['No'] )
		if( item.No > lastNumber ) lastNumber = item.No  
		if( item.id > lastId ) lastId = item.id 
		if( item['거래처'] == undefined ) roomCount--  

	}
	return { lastNumber , lastId , roomCount } 
}
function check_unique( unique_id , item ){
	if( unique_id.find((ent)=> ent == item.No ) ){
		item.No++ 
		check_unique( unique_id, item ) 
	}else{
		unique_id.push( item.No  ) 
		return 
	}
}
function fill_room( roomCount ){
	for( var i =0 ; i < roomCount ; i++ ){
	   lastId++
       var newEntry = { id: lastId }
	   sheet0_data.push( JSON.parse( JSON.stringify( newEntry ))) 
	}
}
	
