angular.module('parse_str',[])
.service('parseStr_service',['$injector','spreadJs_service','adminApp_service','$filter', function( $injector, spreadJs_service, adminApp_service, $filter ){
	var $location = $injector.get('$location') 
	this.parse_str_f = ( data_, Data_S = null ) =>{
			var reserve_words = [
				{ 'var_':'%user%' ,'value': adminApp_service.getCur_user_info().name },
				{ 'var_':'%userId%' ,'value': adminApp_service.getCur_user_info().email },
				{ 'var_':'%host_ip%' ,'value': document.location.hostname },
				{ 'var_':'%userLevel%' ,'value': adminApp_service.getCur_user_info().level },
				{ 'var_':'%company_name%','value': adminApp_service.getCompany_info().CorporationName },
				{ 'var_':'%nowDate(YYYYMMDD)%' ,'value': null },
				{ 'var_':'%host_name%' ,'value': $location.host() },
			]
		    let merge = null
		    reserve_words.find((ent)=>ent.var_ == '%nowDate(YYYYMMDD)%').value =  $filter('date')( new Date(), 'yyyyMMdd' ) 
		  const dataParse = ( str_ , Data_S_ )=>{
			      for( var i = 0 ; i < Data_S_.length ; i++ ){
					   str_ = str_.replaceAll(`%Data[${i}]%`, Data_S_[i])
				  }
			      return str_ 
		  }
          switch( typeof data_ ){
			  case 'object':
				  merge_ = data_.join('#') 
				  reserve_words.forEach( ( ent ) =>{
					  merge_ = merge_.replaceAll( ent.var_ , ent.value ) 
				  })
				  if( Data_S != null )merge_ = dataParse( merge_, Data_S )
				  return merge_.split('#') 
				  break;
			  case 'string':	  
				  merge_ = data_ 
				  reserve_words.forEach( ( ent ) =>{
					  merge_ = merge_.replaceAll( ent.var_ , ent.value ) 
				  })
				  if( Data_S != null )merge_ = dataParse( merge_, Data_S )
				  return merge_ 
				  break;
		  }
		return data_ 
	}
	spreadJs_service.set_parseStr_f_p( this.parse_str_f ) 
}])

