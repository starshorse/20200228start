angular.module('templates', [])
.factory('templates_factory', function(){
	return {
		templates_app : []
	}
})
.service('templates_service', ['templates_factory','workSpace_factory','createApp_service' ,
	function( templates_factory , workSpace_factory , createApp_service 
	){
	  this.applyTemplate_app = ( tbl_name_ , template_id )=>{
		   if( foundTemplate = workSpace_factory.templates_app.find((ent)=>ent.id == template_id )){ 
			      createApp_service.updateApp_list_entry( tbl_name_ , 'configuration', JSON.stringify( foundTemplate.configuration ) ) 
			      if( foundTemplate.configuration.template_app.dependency != undefined ){
					      let dependencies = foundTemplate.configuration.template_app.dependency 
					  	  for( const [key, value] of Object.entries( dependencies )){
							  createApp_service.updateApp_list_entry( tbl_name_ , key , value ) 
						  }
				  }
		   }
	  }
}])
