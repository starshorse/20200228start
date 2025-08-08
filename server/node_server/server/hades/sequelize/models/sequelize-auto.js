const sequelizeAuto = require('sequelize-auto') 
const { objDbConfig } = require('../../db_config/mssql/conf')  
const path = require('path') 
// const company = 'ezchemtech' 


const getAuto = function( company , table_list ){
	let directory_path = path.join( __dirname , `../../company/${company}/models` )
	const auto = new sequelizeAuto( objDbConfig[company].database , objDbConfig[company].user , objDbConfig[company].password ,{
	// const auto = new sequelizeAuto( 'ezchemtech' , objDbConfig[company].user , objDbConfig[company].password ,{
		host: objDbConfig[company].server ,
		dialect: 'mssql', 
		dialectOptions:{
			options: {
				options:{
					encrypt: false ,
					trustServerCertificate: true, 
				},
			}
		},
		directory: directory_path,
	//	directory:`../../company/${company}/models`,
		tables: table_list
	//	tables:['TB_정기업무기본정보','TB_정기업무수행대상목록']
	})
	return auto 
}
exports.getAuto = function( company ='ezoffice_test', table_list ){
	return getAuto( company, table_list ) 
}
exports.syncModels = function( company = 'ezoffice_test' , table_list = null ){ 
	let auto = getAuto( company, table_list ) 
console.log( auto )
auto.run((err)=>{
	console.log( err.message , err.code ) 
})
	return auto 
}
/*
auto.run((err)=>{
	if(err) throw err ;
}) */
