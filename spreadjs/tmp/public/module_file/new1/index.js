import { generateData , generateBindingColumnInfos } from '../../module_share/generateData.js'; 

const startUp = async ()=>{
       var sheet = spread.getSheet(0)
	sheet.suspendPaint()
	sheet.autoGenerateColumns = false 
	await sheet.bindColumns( generateBindingColumnInfos(7) ) 
	await sheet.setDataSource( generateData(5000) ) 
	sheet.resumePaint() 
}
export { startUp } 


						
