/*
 * .env
 * 
	PORT=9000
	HADES_ADDRESS=172.30.1.87:8000
	PROXY_HADES='direct'
 */
module.exports = {
  apps : [
  {
    name: 'DT01-Jupitor-hadesSQLSERVER',
    script: './server/app.js',
    watch: false ,
    env:{
		PORT: 9000,
		HADES_ADDRESS:'192.168.0.80:8000',
		PROXY_HADES:'direct',   
		CLIENT_TAR:'client_jq'
    }
  },
  {
    name: 'DT02-Jupitor-hadesSQLSERVER',
    script: './server/app.js',
    watch: false ,
    env:{
		PORT: 9001,
		HADES_ADDRESS:'192.168.0.106:8000',
        PROXY_HADES:'direct',   
		CLIENT_TAR:'client'
    }
  },
],
};
