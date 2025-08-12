/*
   해당 커맨드 앱은 초기 유져 세팅을 테이블 편집기 즐겨찾기 로 연결하기 위해서 만들었음..
*/
const path = require('path');
const company_name = 'ezchemtech'
const fs = require('fs')

const return_dir = ( company_name )=>{
	const user_dir = path.join( __dirname ,`./${ company_name }/user` );
	const tbl_editor_dir = path.join( __dirname ,`./${ company_name }/user/tbl_editor` );
return { user_dir , tbl_editor_dir } 	
}

const loopThroughJSON =( obj )=>{
var tblEditor_configList = []
	function _loopThroughJSON( obj ){
	for (let key in obj) {
		if (typeof obj[key] === 'object') {
		  if (Array.isArray(obj[key])) {
			// loop through array
			for (let i = 0; i < obj[key].length; i++) {
			  _loopThroughJSON(obj[key][i]);
			}
		  } else {
			// call function recursively for object
			_loopThroughJSON(obj[key]);
		  }
		} else {
		  // do something with value
		  if( key == 'text' && obj['openable'] == true ){	
			console.log(key + ': ' + obj[key]);
			tblEditor_configList.push( obj[key]); 
		  }
		}
	}  
	}	
	_loopThroughJSON( obj )
  return tblEditor_configList
}
const loopThroughJSON_delete = ( obj, nodeText  )=>{
    var obj_tar = obj 
	function _loopThroughJSON_delete( obj, nodeText ){
		let result
		for (let key in obj) {
			if (typeof obj[key] === 'object') {
			  if (Array.isArray(obj[key])) {
				// loop through array
				for (let i = 0; i < obj[key].length; i++) {
				  result =  _loopThroughJSON_delete(obj[key][i], nodeText); 
				  console.log( 'Array' + i )
			      if( result == true ){
					  obj[key].splice( key , 1 ); 
					  console.log( 'Array' + key + result )
					  console.log( obj[key] )
			     }
				}
			  } else {
				// call function recursively for object
			      result =	_loopThroughJSON_delete(obj[key], nodeText);
			      if( result == true ){
					  obj.splice( key , 1 ); 
					  console.log( 'obj' + key + result )
					  console.log( obj )
			     }
			  }
			} else {
			  // do something with value
			  if( obj['text'] ==  nodeText && obj['openable'] == true  ){	
				console.log(key + ': ' + obj[key]);
				return true ;
			  }
			}
		}  
	}
	_loopThroughJSON_delete( obj_tar , nodeText ); 
	return obj_tar 
}	
const get_tblEditor_configName = ( company_name , id )=>{
	  let result = { STATUS: -1 , RESULT: 'fail' , ERRORMESSAGE:'' , DATA:null } 
/*	
      const user_dir = `./${ company_name }/user` 
      const tbl_editor_dir = `./${ company_name }/user/tbl_editor` 
	  */
	  const { user_dir , tbl_editor_dir }  = return_dir( company_name );  
	  let id_tbl_editor_file = `${ tbl_editor_dir}/${ id }`;
	  let tblEditor_config_list
	  try{
		  if( fs.existsSync( id_tbl_editor_file )){
				 tblEditor_config_list  = JSON.parse( fs.readFileSync( id_tbl_editor_file ) );
		  }
		  else{
				 tblEditor_config_list = [config_name] 
				 fs.writeFileSync( id_tbl_editor_file , JSON.stringify( tblEditor_config_list ) ); 
		  }
		  result.STATUS = 1 ; result.RESULT ='success' ;
		  result.DATA = tblEditor_config_list  
	  }catch(err){
		  result.ERRORMESSAGE = err.message 
	  }
	  return result;
}
const add_tblEditor_configName = ( company_name , id ,  config_name )=>{
	  let result = { STATUS: -1 , RESULT: 'fail' , ERRORMESSAGE:'' , DATA:null } 
/*	
      const user_dir = `./${ company_name }/user` 
      const tbl_editor_dir = `./${ company_name }/user/tbl_editor` 
	  */	  
	  const { user_dir , tbl_editor_dir }  = return_dir( company_name );  
	  let id_tbl_editor_file = `${ tbl_editor_dir}/${ id }`;
	  let tblEditor_config_list 
	  try{
		  if( fs.existsSync( id_tbl_editor_file )){
			 tblEditor_config_list  = JSON.parse( fs.readFileSync( id_tbl_editor_file ) );
// tblEditor_configList , configName array currently exists in tblEditor_config_list 			
			  let tblEditor_configList =  loopThroughJSON( tblEditor_config_list ) 
			  console.log( tblEditor_configList ) 
			  console.log( tblEditor_config_list )
			  let node_tar_index =  tblEditor_configList.findIndex((ent)=>ent == config_name  )
			  if( node_tar_index == -1){
					tblEditor_config_list.push({ text: config_name ,  openable: true }  );
			  }else{
				  result.ERRORMESSAGE = 'config_name already exisits!' ;
//                    tblEditor_config_list.splice( node_tar_index , 1 );
			  }
			  fs.writeFileSync( id_tbl_editor_file , JSON.stringify( tblEditor_config_list ) ); 
			}
			else{
				 let config_name_list = [config_name] 
				 fs.writeFileSync( id_tbl_editor_file , JSON.stringify( config_name_list ) ); 
			}
		  result.STATUS = 1 ; result.RESULT ='success' ;
		  result.DATA = tblEditor_config_list  
	  }catch(err){
		  result.ERRORMESSAGE = err.message 
	  }
	  return result;
		  
}
const delete_tblEditor_configName = ( company_name , id ,  config_name )=>{
	  let result = { STATUS: -1 , RESULT: 'fail' , ERRORMESSAGE:'' , DATA:null } 
/*	
      const user_dir = `./${ company_name }/user` 
      const tbl_editor_dir = `./${ company_name }/user/tbl_editor` 
	  */	  
	  const { user_dir , tbl_editor_dir }  = return_dir( company_name );  
	  let id_tbl_editor_file = `${ tbl_editor_dir}/${ id }`;
	  if( fs.existsSync( id_tbl_editor_file )){
			 let tblEditor_config_list  = JSON.parse( fs.readFileSync( id_tbl_editor_file ) );
		     tblEditor_config_list = loopThroughJSON_delete( tblEditor_config_list , config_name ); 
             fs.writeFileSync( id_tbl_editor_file , JSON.stringify( tblEditor_config_list ) ); 
		     result.STATUS = 1 
		     result.RESULT =  'success' 
	   }else{
		    result.ERRORMESSAGE = 'File not Found'
	   }
	   return result 
}
const delete_userConfig_tblEditor = ( company_name , id, config_name )=>{
	  const { user_dir , tbl_editor_dir }  = return_dir( company_name );  
	  let id_tbl_editor_file = `${ user_dir }/${ id }`;
	  if( fs.existsSync( id_tbl_editor_file )){
			 let tblEditor_config_list  = JSON.parse( fs.readFileSync( id_tbl_editor_file ) );
		     let arr_index = tblEditor_config_list.config_list.findIndex((ent)=>ent.configName ==  config_name ); 
		     console.log('arr_index:' + arr_index);
		     if( arr_index != -1 )
			        tblEditor_config_list.config_list.splice( arr_index , 1 ); 

             fs.writeFileSync( id_tbl_editor_file , JSON.stringify( tblEditor_config_list ) ); 
		     result.STATUS = 1 
		     result.RESULT =  'success' 
	   }else{
		    result.ERRORMESSAGE = 'File not Found'
	   }
	   return result 
}

const sync_tblEdtior_configName = ( company_name, id , direction = 'tree_view' )=>{
	 let result = { STATUS: -1 , RESULT: 'fail' , ERRORMESSAGE:'' , DATA:null } 
	const { user_dir , tbl_editor_dir }  = return_dir( company_name );  
		let id_file = `${user_dir}/${ id }` ; 
		if( fs.statSync( id_file).isFile()){
			let config_list  = JSON.parse( fs.readFileSync(id_file) );
			let config_name_list = config_list?.config_list?.map((ent)=>ent.configName ); 
			if( !config_name_list )
				return ; 

			console.log( config_name_list ) 
			let set_config_name_list = new Set( config_name_list )
			let set_tblEditor_configList 
			let id_tbl_editor_file = `${ tbl_editor_dir}/${ id }`;
			if( fs.existsSync( id_tbl_editor_file )){
				  let tblEditor_config_list  = JSON.parse( fs.readFileSync( id_tbl_editor_file ) );
	// tblEditor_configList , configName array currently exists in tblEditor_config_list 			
				  tblEditor_configList =  loopThroughJSON( tblEditor_config_list ) 
				  console.log( tblEditor_configList ) 
//				  console.log( tblEditor_config_list )
				  set_tblEditor_configList = new Set( tblEditor_configList ) 
				  const diff1 = new Set([...set_config_name_list].filter((ent) => !set_tblEditor_configList.has( ent)))
				  console.log([...diff1])  
				  const diff2 = new Set([...set_tblEditor_configList].filter((ent) => !set_config_name_list.has( ent)))
				  console.log([...diff2])  
				  switch( direction ){
					  case 'tree_view':
						  diff1.forEach((ent)=>{
			                   result =  add_tblEditor_configName( company_name , id, ent );
							   console.log( result );
						  });
						  diff2.forEach((ent)=>{
							  delete_tblEditor_configName( company_name, id, ent );
						  })
						  break;
					  case 'tbl_editor':
						  diff1.forEach((ent)=>{
						      console.log(ent);
							  delete_userConfig_tblEditor( company_name, id , ent ); 
						  })
					      break; 	  
				  }
			}
			else{
				// no dir make dir.. 
				if( !fs.existsSync( tbl_editor_dir )){
					fs.mkdirSync( tbl_editor_dir );
				}
				config_name_list = config_name_list.map((ent)=>{ return { text: ent, openable: true }});
				fs.writeFileSync( id_tbl_editor_file , JSON.stringify( config_name_list ) ); 
			}
		}
}
const sync_tblEdtior_configName_allId = ( company_name , direction = 'tree_view')=>{
	const { user_dir , tbl_editor_dir }  = return_dir( company_name );  
	let file_list = fs.readdirSync(user_dir)
	console.log( file_list );
	for( i =0 ; i< file_list.length ; i++ ){
		let id = file_list[i] ;
		console.log('ID: '+ id );
		sync_tblEdtior_configName( company_name, id, direction );
	}
}


let result =  get_tblEditor_configName( 'ezchemtech','star_horse@naver.com.json')
console.log( result.DATA ); 
result = delete_tblEditor_configName('ezchemtech','star_horse@naver.com.json','TB_Broker_Company') 
console.log( result ) 
// console.log( loopThroughJSON_delete( tbl_editorList , 'TB_Broker_Company'))
result =  add_tblEditor_configName('ezchemtech','star_horse@naver.com.json', 'TB_test_config')
console.log( result ); 
result =  get_tblEditor_configName( 'ezchemtech','star_horse@naver.com.json')
console.log( result.DATA ); 
result = delete_tblEditor_configName('ezchemtech','star_horse@naver.com.json','TB_test_config') 
console.log( result ) 
result =  get_tblEditor_configName( 'ezchemtech','star_horse@naver.com.json')
console.log( result.DATA ); 
loopThroughJSON( result.DATA );
result = delete_tblEditor_configName('ezchemtech','star_horse@naver.com.json','TB_Broker_Company') 
console.log( result ) 
console.log('===Sync======');
// sync_tblEdtior_configName( 'ezchemtech','star_horse@naver.com.json'); 
//sync_tblEdtior_configName_allId( 'ezchemtech'); 
sync_tblEdtior_configName_allId( 'ezchemtech', 'tbl_editor'); 






