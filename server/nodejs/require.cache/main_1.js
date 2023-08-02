/*
 *  노드에서 모듈 로드후 모듈 파일 내용이 바꾸었을 경우 다시 로드 할 수있도록 캐쉬내용 을 업데이트 시켜주는 모듈 
 *
 */
const path = require('path')
const fs = require('fs') 

const src_file ='foo'
const tgt_file ='poo' 
const tmp_file ='tmp' 

let foo = require(`./${src_file}`);
console.log('---------- require.cache ----------')
console.log( require.cache );

console.log('---------- require.cache keys -----')
console.log( Object.keys( require.cache )) 

fs.renameSync( path.join( __dirname , `/${ src_file }.js`) , path.join( __dirname ,`/${ tmp_file }`)) 
fs.renameSync( path.join( __dirname , `/${ tgt_file }.js`) , path.join( __dirname ,`/${ src_file }.js`)) 
fs.renameSync( path.join( __dirname , `/${ tmp_file }`) , path.join( __dirname ,`/${ tgt_file }.js`)) 

let foo_m = path.join( __dirname, '/foo.js') 
delete require.cache[foo_m]
console.log( Object.keys( require.cache )) 
console.log( foo.foo ) 
	
foo = require('./foo') 

console.log( Object.keys( require.cache )) 
console.log( foo.foo ) 	

