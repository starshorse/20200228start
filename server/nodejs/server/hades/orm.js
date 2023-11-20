const sequelizeAuto = require('sequelize-auto') 
const { objDbConfig } = require('../db_config/mssql/conf')  
const company = 'ezoffice_test' 

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
	directory:`./company/${company}/models`,
	tables:['TB_User']
//	tables:['TB_정기업무기본정보','TB_정기업무수행대상목록']
})

console.log( auto )

auto.run((err)=>{
	if(err) throw err ;
})
