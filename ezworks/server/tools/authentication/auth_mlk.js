const path = require('path')
const { readFileSync , writeFileSync, existsSync } = require('fs')
const jwt = require('jsonwebtoken')
env_path = path.join( __dirname , '../../../.env')
require('dotenv').config({ path: env_path }) 
const JWT_SEED = process.env.JWT_SEED 
console.log( JWT_SEED )
////////////////////////////////////////////////////////////////////////////////////////
//  MKL storage.. 
///////////////////////////////////////////////////////////////////////////////////////
const get_mlk = ( org_name )=>{
	const file_name = `mlks_${ org_name }.json` 
	const dir_path = path.join( __dirname , '/data'); 
	let  file_path 
	if( existsSync( file_path = path.join( dir_path, file_name ) )){
		return { RESULT: 0 , ERRORMESSGAE: '', DATA:  JSON.parse( readFileSync(  file_path, 'utf-8' )) , FILEPATH: file_path }
	}
	return { RESULT: -1 , ERRORMESSAGE: 'File not found' , DATA: null, FILEPATH: file_path }			
}
const nw_entry = ( company , id,  type= 'Machine' , source= 'excel' ,ver='1.0' )=>{
	return { company, id, source, type, ver }
}
const update_mlk = ( org_name , obj_key )=>{
	const { RESULT , DATA , FILEPATH } =  get_mlk( org_name )
	let init_a = DATA 
	obj_key['no'] = 1 
	if( RESULT == -1 ){
		init_a = []
		init_a.push( obj_key )
	}else{
		obj_exist  = init_a.filter((ent)=>ent.id == obj_key.id)
		if( obj_exist )obj_key['no'] = obj_exist.length+1 
		init_a.push( obj_key )
	}
	writeFileSync( FILEPATH, JSON.stringify( init_a ) )
	return{ RESULT: 0 , FILEPATH , MLK_OBJ: obj_key } 
}
////////////////////////////////////////////////////////////////////////////////////////
//  MKL sign verify  
///////////////////////////////////////////////////////////////////////////////////////
const signKey = ( obj_key ) =>{
	return jwt.sign( obj_key, JWT_SEED ) 
}
const verifyKey = async ( mlk_value )=>{
	let obj_key = await jwt.verify( mlk_value, JWT_SEED ) 
	return obj_key 
}
/*
const { RESULT , ERRORMESSAGE, DATA } =  get_mlk( 'ezchemtech') 
console.log( RESULT, DATA ) 

update_mlk( 'ezoffice', nw_entry( 'ezoffice', 'star_horse@naver.com' ));
(()=>{
	const { RESULT , ERRORMESSAGE, DATA } =  get_mlk( 'ezoffice') 
	console.log( RESULT, DATA ) 
})();

let test_mlk = signKey( nw_entry('ezoffice','star_horse@naver.com')) ;
console.log( test_mlk ); 
( async ()=>{
	let obj_key = await verifyKey( test_mlk );
	console.log( obj_key ); 
})()
*/
exports.sign_key = ( req, res )=>{
	let org_name = req.body.company
	let id = req.body.id 
	let type = req.body.type 
	let MLK_VALUE = null  
	const { RESULT , MLK_OBJ } = update_mlk( org_name , nw_entry( org_name, id, type )) 
	if( RESULT == 0 )
		MLK_VALUE = signKey( MLK_OBJ )
        else	
		RESULT = -1 

	res.status( 200 ).json( { RESULT, MLK_VALUE })

}

