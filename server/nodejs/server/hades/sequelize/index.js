const { existsFileSync , readFileSync , writeFileSync, unlinkSync } = require('fs') 
const path = require('path') 

const { Sequelize } = require('sequelize') 
// Cache issue. 
function requireUncached(module) {
	    delete require.cache[require.resolve(module)];
	    return require(module);
}
const { objDbConfig } = requireUncached('../db_config/mssql/conf')  

exports.initModels = ( db_name )=>{
	let directory_path = path.join( __dirname, `../company/${db_name}/models` )
	const initModels = requireUncached(`../company/${ db_name }/models/init-models`); 
/* MSSQL  DataTime convert.. issue 
*/
	Sequelize.DATE.prototype._stringify = function _stringify( date , options ){
		return this._applyTimezone( date, options ).format('YYYY-MM-DD HH:mm:ss.SSS');
	};
    const sequelize_ = new Sequelize( objDbConfig[db_name].database , objDbConfig[db_name].user , objDbConfig[db_name].password ,{
	host: objDbConfig[db_name].server ,
	dialect: 'mssql', 
	dialectOptions:{
		options: {
			options:{
				encrypt: false ,
				trustServerCertificate: true, 
			},
		}
	},
	directory: directory_path ,
//	directory:`../company/${db_name}/models`,
//	tables:['TB_정기업무기본정보','TB_정기업무수행대상목록']
})
	let models = initModels( sequelize_ )
	return { sequelize_  , models } 
}
exports.createTbl = ( db_name , tbl_name )=>{
}
exports.deleteTbl = ( db_name, tbl_name )=>{
}
