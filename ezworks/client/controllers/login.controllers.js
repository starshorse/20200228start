angular.module('login_ctrl',[])
.controller('companies_listCtrl',['$scope','$injector','$stateParams',function( $scope, $injector, $stateParams  ){
	    var $Cookies = $injector.get('$cookies') 
		var $state = $injector.get('$state') 
        $scope.login_companies = $stateParams.myParam 
	    $scope.go = ( company )=>{
               $Cookies.put('user_DB' , company.db_name , { path: '/' })
			   $Cookies.put('org_name', company.name  , { path: '/ ' }) 
			   $Cookies.put('server_name', company.server_name , { path: '/ ' }) 
//			   window.location.href ='http://localhost:9000/admin'
			   $state.go('main_page') 
			   
		}
}])
.controller('loginCtrl',['$scope','$injector','users','companies', function( $scope, $injector, users, companies ){
		var $state = $injector.get('$state') 
		var $Cookies = $injector.get('$cookies') 
	    var $http = $injector.get('$http') 
		$scope.user_id 
		$scope.password 
		$scope.users = users
		$scope.login = users  
		$scope.companies = companies.data 
		$scope.login_companies = companies.data 
		$scope.cur_view = 'login' 
		$scope.isCurView = ( curView )=>curView == $scope.cur_view 
		$scope.setCurView = ( curView )=>$scope.cur_view = curView 
	    $scope.getLogin = async ( user_id, password )=>{
    //		let result	 = await $http.get(`/Hades/dba_editor/admin_list/${ user_id }`) 
			let result   = await $http({ method:'POST' , data: { password } , url:`/Hades/dba_editor/getAdmin_list/${ user_id }` })
	//		$scope.login = $scope.users.filter((ent)=> ent.email == user_id && ent.password == password );  
	//		$scope.login = result.data.DATA
			$scope.login = result.data.ROWS
			$scope.login_companies = [] 
			for( login of $scope.login ){
                  let company = $scope.companies.find((ent)=>ent.db_name == login.dbName )
				 if( company ) 
					$scope.login_companies.push(company) 
			}
			if( $scope.login_companies.length ==  0){
				const err_01 = { title:'입력오류', content:'ID 나 패스워드를 다시 확인하세요', callback:()=>{} }
			     $scope.click( err_01 );
//				alert(" no company avaiable" );
				return -1 ;
			}
			console.log( user_id );
            $Cookies.put('user', user_id, { path: '/' })  
			$state.go("companies_list",{ myParam: $scope.login_companies } )
		}
}])
