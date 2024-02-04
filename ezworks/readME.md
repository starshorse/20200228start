
pm2 ecosystem 

ecosystme.config.js 

```
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
    name: 'DT01-Jupitor-hadesMYSQL'
    script: './server/app.js',
    watch: false ,
    env:{
	PORT: 9000,
	HADES_ADDRESS:'172.30.1.87:8000',
        PROXY_HADES:'direct'   
    }
  },
  {
    name: 'DT01-Jupitor-hadesSQLSERVER'
    script: './server/app.js',
    watch: false ,
    env:{
	PORT: 9001,
	HADES_ADDRESS:'172.30.1.87:8001',
        PROXY_HADES:'direct'   
    }
  },
],
};
```
