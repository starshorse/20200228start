describe('[Hades/sequelize/models] sequelize_auto module test', function(){
       it('[Hades/sequelize/models] sequelize_auto module test', function(){
		   let sequelize_auto = require('./sequelize-auto') 
		   let tbl_list =['TB_User']
		   sequelize_auto.syncModels( 'ezoffice_test', tbl_list )
	   })
})
