const importJSON  = ( spread , spreadJson )=>{
			spread.fromJSON( spreadJson )
}
const importSpreadFromExcel_text = ( excelIO, spread, file_text, options )=>{
            //            const blob = new Blob([file_text], { type:'text/pain' }) 
			const file = new File([file_text] ,'sample.xlsx', { type:'text/plain' })
	                const blob = new Blob([file], { type: file.type })

			excelIO.open( blob , ( json )=>importJSON( spread, json) , (e)=>console.log(e) , options )
}
const exportExcelFromSpread = ( excelIO, spread, fileName )=>{
	                let json = JSON.stringify( spread.toJSON() ); 
	                excelIO.save( json, function( blob ){  saveAs( blob, fileName );} , (e)=>console.log(e))
}
const getFileExt = ( fileName )=>{
		        return fileName.substr( fileName.lastIndexOf('.') +1 , fileName.length )
}
export { importJSON, importSpreadFromExcel_text , exportExcelFromSpread, getFileExt } 
