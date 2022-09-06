angular.module('myhighLightRow',[])
.service('myhighLightRowService',[function(){
	this.highLightRow = ( spread, working_row , colInfos )=>{
          spreadjs_ezHighlightrow( spread , working_row ,colInfos , 1 )
	}
	this.unhighLightRow = ( spread, working_row , colInfos )=>{
          spreadjs_ezHighlightrow( spread , working_row ,colInfos , 0 )
	}
}])
