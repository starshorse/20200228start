const { exec_mssql, queryAll_mssql } = require('./index.js')

const callback = ( res) =>{
	console.log(res) 
}
// setTimeout(()=>{ queryAll_mssql( `exec [SP_Table_Info] @tablename='TB_카드승인내역'` , callback )} , 5000 )

queryAll_mssql( `SP_Table_Info @tablename='TB_카드승인내역';` , callback )
