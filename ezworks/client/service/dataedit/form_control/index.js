angular.module('form_control',[])
.service('formControl_service',['spreadJs_service', function( spreadJs_service ){
	this.dataedit_select = ( dataedit_select_colInfo , select_list , select_list_sub , form_cb_f )=>{
/*
	$scope. used 
	$scope.dataedit_select_colInfo 
	$scope.select_list
	$scope.select_list_sub
*/
		var dependency_check = [] 
		for( select_lists of dataedit_select_colInfo ){
           switch( select_lists.sel_opt ){ 
			   case 1:
/*				   
	[
	{"id":1,"name":"복리후생비","title":"복리후생비","parent":"self"},
	{"id":2,"name":"비품소모품","title":"비품소모품","parent":"self"},
	{"id":3,"name":"차량유지비","title":"차량유지비","parent":"self"},
	{"id":4,"name":"수수료비용","title":"수수료비용","parent":"self"},
	{"id":5,"name":"매입","title":"매입","parent":"self"},
	{"id":6,"name":"교육훈련비","title":"교육훈련비","parent":"self"}
	]			   
	[
	{"id":1,"name":"식대","title":"식대","parent":"복리후생비"},
	{"id":2,"name":"해외제품구입","title":"해외제품구입","parent":"매입"},
	{"id":3,"name":"주유비","title":"주유비","parent":"차량유지비"},
	{"id":4,"name":"의료비","title":"의료비","parent":"복리후생비"},
	{"id":5,"name":"주차비","title":"주차비","parent":"차량유지비"},
	{"id":6,"name":"소모품구입비","title":"소모품구입비","parent":"비품소모품"},
	{"id":7,"parent":"교육훈련비","name":"워크샵_기타비용","title":"워크샵_기타비용"},
	{"id":8,"parent":"교육훈련비","name":"워크샵_숙박비","title":"워크샵_숙박비"}
	]
	ext_arg: $scope.dataedit_select_colInfo , $scope.select_list , $scope.select_list_sub 
	option: json( parent / child ) , sel_opt ..  
*/
		        var jsonItems = JSON.parse( select_lists.json ) 
				 var jsonItems_arr = [] 
				 while( jsonItems.length > 0 ){
					 var jsonItem = jsonItems.pop()
					 dependency_check.push( JSON.parse( JSON.stringify( jsonItem ))) 
					 jsonItems_arr.push( jsonItem.title ) 
				 }
// $scope.select_lis used by dataedit.html .  				   
// select_lists.name => $scope.dataedit_select_colInfo.name 				   
				 select_list[select_lists.name] = jsonItems_arr
				 break;
			   case 2:
// Case 2 for get list values from reference table.. 				   
// sel_opt:2 -> ref_tbl 
				  var jsonTbl_info = JSON.parse( select_lists.ref_tbl ) 
// Callback function for get reference Table list. 				   
// in_args object used for communication between call and callback function . ptr .. 				   
				  const callback = (res, in_args ) =>{
					  console.log(res)
					  var real_owners = res.reduce((acc, cur, indx )=>{
//						  acc.push( cur.약칭 )
						  acc.push( cur[in_args.jsonTbl_info.col_name] )
						  return acc 
					  },[]) 
					  real_owners = real_owners.filter( n=>n).sort((a,b)=>a-b) 
//					  $scope.select_list[select_lists.name] = real_owners 
					  select_list[in_args.select_lists.name] = real_owners 
// Fri Feb 25 09:38:28 KST 2022  form alias not update instantly. 
					  form_cb_f() 
//					  $scope.$apply() 
				  }
				  spreadJs_service.loadTbl( jsonTbl_info.tbl_name, callback ,{  select_lists ,  jsonTbl_info  } ) 
				 break;
			   default:	   
		  }	   
		}
///*		I move following to above , for assemble same code base..
// Depedence detech mechenism.. 		
// First check parents 
	   for( mParent of dependency_check.filter((ent)=>ent.parent == 'self' ) ){
		      select_list_sub[mParent.name] = [] 
	   }
// update child. 		
	  for( mChild of dependency_check.filter((ent)=>ent.parent != 'self' )){
		      try{
		      		select_list_sub[mChild.parent].push( mChild.title )
			  }catch(err){
				    console.log(' dataEdit_service', err ) 
			  }
	  }
//		*/

	}
}])

