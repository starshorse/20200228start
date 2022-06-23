const { Sequelize, DataTypes } = require('sequelize') 

const sequelize = new Sequelize('sqlite::memory:'); 

( async ()=>{
	try {
	  await sequelize.authenticate();
	  console.log('Connection has been established successfully.');
	} catch (error) {
	  console.error('Unable to connect to the database:', error);
	}
})();

const User = sequelize.define('User', { 
	// Model attributes are defined here ..
	firstName:{
		type: DataTypes.STRING, 
		allowNull : false 
	},
	lastName: {
		type: DataTypes.STRING 
		// allowNull defaults to true 
	}
},{
	// Other model options go here 
	// 1. Enforcing the table name to the model name 
	freezeTableName: true 
	/* 2. Providing the table name directly 
	 *  tableName : 'Employees' 
	 */
 
})
// `sequelize.define` also returns the model 
console.log( User === sequelize.models.User );

// Model synchronization .. 
( async ()=>{
	await User.sync({ force: true }) 
	console.log('The table for the User model was just (re)created!') 
	await sequelize.sync({ force: true }) 
	console.log('All models were synchronized sucessfully.')  
})();
