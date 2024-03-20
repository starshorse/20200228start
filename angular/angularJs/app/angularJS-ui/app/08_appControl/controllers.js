angular.module('myControllers', ['work_space'])
.controller('pageCtrl', function( $scope, $injector ){
	var $window = $injector.get('$window') 
	var $http = $injector.get('$http') 
	var $state = $injector.get('$state') 
	/////////////////////////////////////////////////////////////////////////////////////////////////////////
	//  User Infomation 
	/////////////////////////////////////////////////////////////////////////////////////////////////////////		
	var $cookies = $injector.get('$cookies')
	let id = $cookies.get('user')
	let user_DB = $cookies.get('user_DB')  
	// my-header part.. 			
	$scope.header = { isHeaderEnabled: 1 , companyNmae: 'ezchemtech' ,  header_list: [] , changeSpace: null  } 	
	$scope.changeSpace =( collection )=>{
			switch( collection ){
				case 'Logout':
					//						$state.go('login')
					$window.location.href ='http://localhost:8000/angularJS-ui/app/06_login/'
					break;
				case 'Workspace':	
					//						$state.go('collections_list') 
					$window.location.href ='http://localhost:8000/angularJS-ui/app/07_appMain/#!/collections_list'
					break; 
				case 'Home':	
				default:	
					$state.go('collectionEditMain.info', { cur_collection: collection } ) 
			}	
	}
	$scope.header.header_list = ['Home','Logout'] 
	$scope.header.header_list.push('Workspace')			
	$scope.header.changeSpace = $scope.changeSpace ; 
	( async ()=>{
		let  objects_list  
		const update_collections_list = async ()=>{
			let data  = await $http.get(`http://localhost/hades/collections/${ user_DB }/${ id }` ).catch((err)=>console.log(err));
			$scope.collections_list.collections_list = data.data.DATA;
			data  = await $http.get(`http://localhost/hades/cluster_config/user_config_cluster/${ user_DB }/${ id }` ).catch((err)=>console.log(err));
			$scope.collections_list.apps_list = data.data.DATA.config_list ;	
			$scope.$apply();
		}
		let response  =  await  $http.get(`http://localhost/hades/all_objects/${ user_DB }/${ id }`).then( async (response)=>{
		objects_list  = response.data.DATA 
		console.log( objects_list )
		await update_collections_list(); 
		})
	})();	
	$scope.collections_list = { collections_list: [] , apps_list: [], cur_app: null, cur_collection: {} } 
	$scope.cur_selection =  null ;
	const create_collection = async ( collection_name )=>{
		 let result = { STATUS : -1 , ERRORMESSAGE: null , DATA: null } 
		if( $scope.collections_list.collections_list.find((ent)=>ent.name == collection_name )){
			result.ERRORMESSAGE = '같은 이름이 존재합니다'
			return result 
		}
		let db_result = await $http({ method: 'POST', url: `http://localhost/hades/collection/${ user_DB }/${ collection_name }/${ id }`}).catch((err)=>console.log(err)); 
		let data  = await $http.get(`http://localhost/hades/collections/${ user_DB }/${ id }` ).catch((err)=>console.log(err));
		$scope.collections_list.collections_list = data.data.DATA;
		$scope.$apply();
		result.STATUS = 0 
		return result ;
	}
	const delete_collection = async ( collection_name )=>{
		let result = { STATUS : -1 , ERRORMESSAGE: null , DATA: null } 
		let db_result = await $http({ method: 'DELETE', url: `http://localhost/hades/collection/${ user_DB }/${ collection_name }/${ id }`}).catch((err)=>console.log(err)); 
		let data  = await $http.get(`http://localhost/hades/collections/${ user_DB }/${ id }` ).catch((err)=>console.log(err));
		$scope.collections_list.collections_list = data.data.DATA;
		$scope.$apply();
		result.STATUS = 0 
		return result ;
	}
	$scope.new_collection = ()=>{
		$scope.modal = { title: 'NEW COLLECTION', content: '아래 이름으로 생성합니다.', input_1: { enable: true , text: '' , label:'NAME' } , callback: async ( modal)=>{
			let result  = create_collection( modal.input_1.text )
			if( result.STATUS == -1 )
				modal.content = result.ERRORMESSAGE 
			return result 
		}}
		$scope.$broadcast('doModal') 
	}
	$scope.delete_collection = ( collection_name, $event  )=>{
		$event.stopPropagation(); 
		$scope.modal = { title: 'DELETE COLLECTION', content: `[${ collection_name }]을 삭제합니다.`, input_1: { enable: false , text: '' , label:'NAME' } , callback: async ( modal)=>{
			let result  = delete_collection( collection_name )
			if( result.STATUS == -1 )
				modal.content = result.ERRORMESSAGE 
			return result 
		}}
		$scope.$broadcast('doModal') 
	}
    $scope.enter_collection = ( collection )=>{
		$scope.cur_selection = collection.name ; 
		$scope.collections_list.cur_collection = collection 
		if( collection['apps_list'] == undefined ){
			$scope.collections_list.cur_collection['apps_list'] = [] 
/*			
			$scope.collections_list.apps_list.forEach((ent)=>{
				ent.tblViewSheet.tbl_columns.forEach((ent0)=>{
					if( ent0.oVisible == undefined ){
						ent0['oVisible'] = { visible : true , isDisabled: false } 
						if( ent0.name == 'seq' )
							ent0.oVisible.isDisabled = true 
					}
				})
				$scope.collections_list.cur_collection['apps_list'].push(JSON.parse( JSON.stringify( { name: ent.configName , columns: ent.tblViewSheet.tbl_columns })));
			})
			*/			
		}
		$state.go('collectionEditMain.info', { cur_collection : collection.name } ) 
	}
    $scope.enter_app = ( app )=>{
		$scope.cur_selection = app.configName ;
		$scope.collections_list.cur_app = app ; 
		$state.go('appEditMain.info', { appName : app.configName } ) 
	}
})
.controller('collectionEditMainCtrl',function( $scope, $stateParams, $injector  ){
			var workSpace_service = $injector.get('workSpace_service') 
			var $state = $injector.get('$state')  
			var $stateRegistry = $injector.get('$stateRegistry'); 
	        let collection_id = $stateParams.cur_collection ; 
	        let collection = $scope.collections_list.collections_list.find((ent)=>ent.name == collection_id )

	        if( collection ){
				$scope.collections_list.cur_collection = collection 
			}
			$scope.collections_list.cur_collection['apps_list'] = [] 
//			const apps = workSpace_service.promise_getAppsListData( $stateParams.cur_collection ) 
			$scope.openApp = ( item )=>{
					// my-sider part
					$state.go( item.name ) 
			}
		    $scope.collectioninfo = { name: collection_id }  
	        $scope.current_tab = 'INFO' ;
	        $state.go('collectionEditMain.info') 
	        $scope.enter_info =  ()=>{
	            $scope.current_tab = 'INFO' ;
				$state.go('collectionEditMain.info' )
			}
	        $scope.enter_data =  ()=>{
	            $scope.current_tab = 'DATA' ;
				$state.go('collectionEditMain.data' )
			}
})	
.controller('collectionEditInfoCtrl',function( $scope, $stateParams, $injector  ){
	// name , createDate ..
    $scope.addApp = ( appName )=>{
            if( appName.length > 2 ){
				alert("현재 Join 2개까지 지원!");
				return ; 
			}
		    $scope.collections_list.cur_collection['apps_list'] = []; // reset list.. 
			$scope.collections_list.apps_list.forEach((ent)=>{
				if( appName.includes( ent.configName ) ){
					let newEntry =  JSON.parse( JSON.stringify( { name: ent.configName , columns: ent.tblViewSheet.tbl_columns, tbl_name: ent.tblViewSheet.tbl_name }));
					newEntry.columns.forEach((ent0 )=>{
						if( ent0.oVisible == undefined ){
							ent0['oVisible'] = { visible : true , isDisabled: false } 
							if( ent0.name == 'seq' )
								ent0.oVisible.isDisabled = true 
							if( ent0.name == 'seq' && $scope.collections_list.cur_collection['apps_list'].length != 0 )
								ent0.oVisible.visible = false 
						}
					})
					$scope.collections_list.cur_collection['apps_list'].push( newEntry );
				}
			})
		   $scope.collectioninfo['appList'] = appName ; // array.
	}
	$scope.deleteApp = ( appName )=>{
		$scope.addApp( appName ); 
	}
	$scope.collectioninfo = Object.assign( $scope.collectioninfo , { addApp : $scope.addApp , deleteApp : $scope.deleteApp } );
})
.controller('collectionEditDataCtrl',function( $scope, $stateParams, $injector  ){
	// name , createDate ..
	$scope.cluster = $scope.collections_list.cur_collection.apps_list  
	if( $scope.collections_list.cur_collection['tblViewSheet'] == undefined ){
		$scope.collections_list.cur_collection['tblViewSheet'] = { tbl_columns : [] , tbl_name: $scope.collections_list.cur_collection.name }          
	}
	$scope.joinColumn = new Array(5); 
	$scope.joinType = new Array(5); 
	let alias = ['a','b','c','d','e'] ;
	const genSQL = ()=>{
		let sqlState_select = 'SELECT ' 
		let sqlState_select_sp = []
		let sqlState_from ='\n FROM '
        $scope.collections_list.cur_collection['tblViewSheet'].tbl_columns =  []          
		$scope.cluster.forEach((ent , i )=>{
			let as = alias[i] 
			let column_nameList = ent.columns.reduce(( acc, ent0)=>{
					if( ent0.oVisible.visible == true ){
						acc.push( `${as}.[${ent0.name}]`)
						$scope.collections_list.cur_collection['tblViewSheet'].tbl_columns.push( ent0 ); 
					}
					return acc ;
				}
			,[])
			sqlState_select_sp.push(  column_nameList.join(',') )
		})
		sqlState_select += sqlState_select_sp.join(',');
		sqlState_from += `${ $scope.cluster[0].tbl_name } ${ alias[0] } ${ $scope.joinType[0] || 'LEFT' } join ${ $scope.cluster[1].tbl_name } ${ alias[1] } on ${ alias[0]}.[${ $scope.joinColumn[0] || 'seq' }] = ${ alias[1] }.[${ $scope.joinColumn[1] || 'seq' }]`
		let sqlState = `${ sqlState_select }${ sqlState_from }`
		return sqlState ;
	}
    $scope.cluster['sql_state'] = genSQL(); 
	$scope.setVisibleCheck = ( index )=>{
          $scope.cluster['sql_state'] = genSQL(); 
	}
	$scope.setJoinColumn =( index )=>{
		console.log( $scope.joinColumn[ index ] )
		$scope.cluster[index].columns.forEach(( ent, i )=>{
			ent.oVisible.isDisabled = false 
			if( ent.name == $scope.joinColumn[index] ){
				ent.oVisible.visible = true 
				ent.oVisible.isDisabled = true 
			}
			if( ent.name == 'seq' ){
				ent.oVisible.isDisabled = true 
			    ent.oVisible.visible = false  
				if( index == 0 ){
				   ent.oVisible.visible = true 
				}
			}
		})
		$scope.cluster[index]['joinColumn'] = $scope.joinColumn[ index ]
        $scope.cluster['sql_state'] = genSQL(); 
//		$scope.$apply();
	}
	$scope.setJoinType = ( index )=>{ 
		$scope.cluster[index]['joinType'] = $scope.joinType[ index ]
        $scope.cluster['sql_state'] = genSQL(); 
	    console.log( $scope.cluster ); 
   }
})
.controller('appEditInfoCtrl',function( $scope, $stateParams, $injector  ){
	// name , createDate ..
})
.controller('appEditDataCtrl',function( $scope, $stateParams, $injector  ){
	   console.log( $scope.collections_list.cur_app ) 
	   $scope.tbl_columns = $scope.collections_list.cur_app.tblViewSheet.tbl_columns 
})
.controller('appEditMainCtrl', function($scope, $stateParams, $state, $injector ){
// my-header part.. 			
	    var $window = $injector.get('$window') 
	    var app_id = $stateParams.appName ; 
//  my-sidebar part.. 	
		$scope.appName = $stateParams.appName 
		$scope.openApp = ( item )=>{
			console.log( item.title )
			$state.go( collection.name ) 
		}
		$scope.appinfo ={ name: app_id } 
		$scope.current_tab = 'INFO' ;
		$state.go('appEditMain.info') 
		$scope.enter_info =  ()=>{
			$scope.current_tab = 'INFO' ;
			$state.go('appEditMain.info' )
		}
		$scope.enter_data =  ()=>{
			$scope.current_tab = 'DATA' ;
			$state.go('appEditMain.data' )
		}
})
