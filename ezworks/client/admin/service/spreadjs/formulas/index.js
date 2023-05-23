angular.module('formulas',[])
.constant('row_limit', 50 ) 
.factory('formulas_factory',['$injector','spreadJs_service','row_limit',function( $injector ,spreadJs_service, row_limit ){
   var asyncJob_promise_service = $injector.get('asyncJob_promise_service') 	
	var formulas_factory = {
		last_row: 0 ,
		numToSSColumn : ( num )=>{
			var s = '' , t 
			while( num > 0){
				t = ( num - 1 )%26 
				s = String.fromCharCode( 65 + t ) + s
				num = ( num - t)/26 | 0 
			}
			return s || undefined 
		},
		applyFormulas : ( row_start )=>{
			console.log('*[formulas_factory] applyFormulas _start') 
			console.time('applyFormulas') 
			let sheet0 = spreadJs_service.getSheet0() 
			let headInfos = spreadJs_service.getHeadInfos() 
			headInfos.forEach((ent)=>{
				let formulas = ent.formula 
				if( formulas ){
					let arr_colName = formulas.match(/(\'.*?\')/gi) 
					if( arr_colName ){
						console.log('arr_colName', arr_colName ) 
						let col_pos = spreadJs_service.getHeadIndex( ent.displayName ) 
						let row_cnt = sheet0.getRowCount() 
						row_cnt = ( row_cnt < row_limit )? row_cnt : row_limit 
						for( let i = formulas_factory.last_row ; i < formulas_factory.last_row + row_cnt ; i++ ){
							let rowFormulas = formulas 
							arr_colName.forEach( (ent)=>{
								let ent0 = ent.replaceAll('\'','') 
								let tgt_i =  spreadJs_service.getHeadIndex( ent0 ) 
								if( tgt_i > -1 ){
									let ss_i = formulas_factory.numToSSColumn( tgt_i + 1 ) 
									ss_i += ( i + 1 )  
									rowFormulas = rowFormulas.replace( ent , ss_i  )
								}
							})	
//							sheet0.setFormula( i, col_pos , rowFormulas ) 
							asyncJob_promise_service.promise_all_enque( sheet0 , [i,col_pos,rowFormulas] ) 
						}
						formulas_factory.last_row = row_start + row_limit 
					}
				}
			})
			console.timeEnd('applyFormulas') 			
			asyncJob_promise_service.promise_all_apply() 
		}
	}
	return formulas_factory 
}])
.service('formulas_service', ['$injector','formulas_factory', 
	function( $injector ,formulas_factory ){
//		const row_limit = 100 
//		var last_row = 0 
		this.getLast_row = ()=>{ return formulas_factory.last_row } 
		this.setLast_row = ( start= 0 )=>{ formulas_factory.last_row = start }  
		this.resetFormulas = ()=>{
			this.setLast_row() 
			this.applyFormulas() 
		}
		this.applyFormulas = ( row_start = 0  )=>{
			formulas_factory.applyFormulas( row_start ) 
		}
// OaDate to 'YYYY-MM-DD' 		
	this.oaDate2yyyymmdd = ( oaDate , delimiter ='-' )=>{
		const leftPad = ( value )=>{
			if( value >= 10 )return value 
			return `0${ value }` 
		}
		let date_data = new Date( Math.round(( oaDate - 25569 )*86400*1000 )) 
		const year = date_data.getFullYear() 
		const month = leftPad( date_data.getMonth() +1 )
		const day = leftPad( date_data.getDate()) 
		return [year, month, day].join( delimiter ) 
	}
//Wed Jun 15 16:10:30 KST 2022
    this.ostStr2yyyymmdd = ( ostStr , delimiter = '-' )=>{
		const leftPad = ( value )=>{
			if( value >= 10 )return value 
			return `0${ value }` 
		}
		let date_data = new Date( ostStr ) 
		const year = date_data.getFullYear() 
		const month = leftPad( date_data.getMonth() +1 )
		const day = leftPad( date_data.getDate()) 
		return [year, month, day].join( delimiter ) 
	}
// Javascript 'YYYYMMDD' to OaDate.. 		
     this.yyyymmdd2Oadate = ( date_data )=>{
		  let date_year = date_data.substr(0,4) 
		  let date_mm   = date_data.substr(4,2) 
		  let date_day  = date_data.substr(6,2) 
		  let date_ = new Date( date_year , date_mm -1  , date_day );
		  date_  = 25569.0 + ((date_.getTime() - (date_.getTimezoneOffset() * 60 * 1000)) / (1000 * 60 * 60 * 24));
		  return date_
	 }
// Javascript  'YYYYMMDD' to 'YYY-MM-DD' . 		
	 this.dateFormat_convert = ( date_data , nType = 'YYYY-MM-DD' )=>{
		  switch( nType ){
			  case 'YYYY-MM-DD':
				  let date_year = date_data.substr(0,4) 
				  let date_mm   = date_data.substr(4,2) 
				  let date_day  = date_data.substr(6,2) 
				  return `${date_year}-${date_mm}-${date_day}`
			      break;
			  default:	  
				  return null 
		  }
	 }
     this.oadateCorrection = ( objEnt , objArrHeadInfo)=>{
		  let ent0 = objArrHeadInfo.find((ent)=>ent.formatter == 'MM/DD/YYYY')
 		 if( ent0 != -1 ){
			 if( typeof objEnt[ent0.name] == 'string' ){
				 let oadate2int = objEnt[ent0.name].match(/\(.*\)/gi)[0]
				 if( oadate2int != undefined )objEnt[ent0.name] = parseInt( oadate2int.replace('(','').replace(')','')) 
			 }
		 }
	 }
}])
