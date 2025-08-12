const ejs = require('ejs') 
const { existsSync , writeFileSync , readFileSync , unlinkSync } = require('fs')  
const path = require('path') 

exports.saveModel = function( db_name , tbl_name , tbl_schema , tbl_schema_extra ){
	let result_status ={ 'STATUS': -1 ,'RESULT': 'error' , 'MESSAGEERROR': '' ,'ROWS':''  }
	const TEMPLATE = `
	const Sequelize = require('sequelize');
	module.exports = function(sequelize, DataTypes) {
	  return sequelize.define('<%= tbl_name %>',<%- tbl_schema %>, <%-  tbl_schema_extra  %> )
	} `
	let output = ejs.render( TEMPLATE , { tbl_name , tbl_schema , tbl_schema_extra })
    let path_file_name  =  `../../company/${ db_name}/models/${ tbl_name}.js`
    let path_file_info  =  `../../company/${ db_name}/models/models_info`
	
    if( existsSync( path.join( __dirname , path_file_name ) )){
		 result_status.MESSAGEERROR ='[saveModel] File already Exist'
		 return result_status
	}else{
		result_status.STATUS = 1 
		result_status.RESULT = 'success' 
		writeFileSync( path.join( __dirname, path_file_name ) , output,  'utf-8' )
		let models_info = JSON.parse( readFileSync( path.join( __dirname ,  path_file_info ) ))
		if( !models_info.includes( tbl_name ))models_info.push( tbl_name ) 	
		writeFileSync( path.join( __dirname , path_file_info ), JSON.stringify( models_info ))
	}
	return result_status
}
exports.deleteModel = function( db_name , tbl_name ){
	let result_status ={ 'STATUS': -1 ,'RESULT': 'error' , 'MESSAGEERROR': '' ,'ROWS':''  }
    let path_file_name  =  `../../company/${ db_name}/models/${ tbl_name}.js`
    let path_file_info  =  `../../company/${ db_name}/models/models_info`
    if( !existsSync( path.join( __dirname , path_file_name ) )){
		 result_status.MESSAGEERROR ='[saveModel] non Exist model'
		 return result_status
	}else{
		result_status.STATUS = 1 
		result_status.RESULT = 'success' 
		unlinkSync ( path.join( __dirname, path_file_name ))
		let models_info = JSON.parse( readFileSync( path.join( __dirname , path_file_info ) ))
		if( models_info.includes( tbl_name )){
			const idx = models_info.indexOf( tbl_name ) 
			if( idx > -1 )models_info.splice( idx, 1 ) 
		}
		writeFileSync( path.join( __dirname , path_file_info ), JSON.stringify( models_info ))
	}
	return result_status
}


