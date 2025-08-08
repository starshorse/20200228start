/*
*	JSON  파일로 데이터  관리한다. 
*/
const path = require('path') 
const { existsFileSync, readFileSync,  writeFileSync } = require('fs') 

var DataTypes = require("sequelize").DataTypes;
function initModels(sequelize) {
const tbl_list_info = JSON.parse( readFileSync( path.join(__dirname ,'models_info') , 'utf-8' )) 
	let result_status ={ 'STATUS': -1 ,'RESULT': 'error' , 'MESSAGEERROR': '' ,'ROWS':''  }
	return_objs = {}
	try{
		tbl_list_info.forEach((ent)=>{
			return_objs[ent] = require(`./${ent}`)( sequelize, DataTypes ) 
		})
	}catch(err){
	     result_status.MESSAGEERROR ='model not exists' 
		 result_status[err] = err 
		 console.log( result_status ) 
	}
  return return_objs  
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
