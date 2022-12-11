angular.module('gc_spreadjs',[])
.factory('gc_spreadjsFactory', ['$injector', function( $injector ){
	var gc_spreadjsFactory = {
		spread: null, 
		create_spread : ( sheetCount )=>{
			gc_spreadjsFactory.spread = new GC.Spread.Sheets.Workbook(
				document.getElementById('ss'),
				{ sheetCount }
			)
			return gc_spreadjsFactory.spread 
		}
	}
	return gc_spreadjsFactory 
}])
