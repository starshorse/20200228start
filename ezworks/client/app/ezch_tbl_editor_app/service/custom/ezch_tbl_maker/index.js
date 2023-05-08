angular.module('ezch_tbl_maker',[])
.factory('ezch_tbl_maker_factory', function(){
	var ezch_tbl_maker_factory = {
		reqs_qt_seq: [] ,
		clear_qt_seq: ()=> ezch_tbl_maker_factory.reqs_qt_seq = [] 
	}
	return ezch_tbl_maker_factory
})
.service('ezch_tbl_maker_service',['$injector', function( $injector ){
	var spreadJs_service = $injector.get('spreadJs_service') 
	var ezch_tbl_maker_factory = $injector.get('ezch_tbl_maker_factory') 
	var $http  = $injector.get('$http') 
	this.request_tbl_maker = async ( req_data )=>{
		let result_status = { STATUS: 1 , RESULT: 'success' , ERRORMESSAGE: '견적이 정상적으로 요청 되었습니다.' } 
		let reqs_data_filter = req_data.filter((ent)=>ent.seq == null ) 
		let Spread =  spreadJs_service.getSpread() 
        Spread.isPaintSuspended( true ) 
//	    reqs_data_filter.forEach( async (ent)=>{
		try{
		for await( let ent of reqs_data_filter ){
			if( ent.qtInitial != null && ent.qtDecimal != null && ent.casNo != null ){
				let ent_cp = JSON.parse( JSON.stringify( ent )) 
				delete ent_cp['RegDate'] 
				delete ent_cp['UpdateDate'] 
				let entry_new = await $http({ method: 'POST', data: ent_cp , url: '/ezchemtech/QuoteInformationCollector' }).catch((err)=>{ throw err })  
				if( entry_new){ 
					Object.assign( ent, entry_new.data.tbl_data ) 
					ezch_tbl_maker_factory.reqs_qt_seq.push( ent.seq ) 
				}
			}
		}
		}catch(err){
			console.log( err ) 
			result_status.STATUS = -1 
			result_status.RESULT = 'warning' 
			result_status.ERRORMESSAGE = '중복된 요청입니다. 입력정보를 재확인 하세요'
		}
        Spread.isPaintSuspended( false ) 
		Spread.refresh() 
		return result_status 
	}
	this.clear_qt_seq = ()=>{
		ezch_tbl_maker_factory.clear_qt_seq() 
	}
	this.tbl_maker_price_result_init = async ( sheet )=>{
		let params = { arg : { where : { crSeq : ezch_tbl_maker_factory.reqs_qt_seq } } }
	    let dataSet = await $http({ method: 'POST', data: params , url: '/ezchemtech/QuoteInformationCollector/price' })
		sheet.setDataSource( dataSet.data.tbl_data ) 
        sheet.bindColumns( dataSet.data.tbl_hdr ) 
	}
	this.tbl_maker_product_result_init = async ( sheet )=>{
	    let params = { arg : { where : { crSeq : ezch_tbl_maker_factory.reqs_qt_seq } } }
	    let dataSet = await $http({ method: 'POST', data: params , url: '/ezchemtech/QuoteInformationCollector/product' })
		sheet.setDataSource( dataSet.data.tbl_data ) 
        sheet.bindColumns( dataSet.data.tbl_hdr ) 
	}
}])
