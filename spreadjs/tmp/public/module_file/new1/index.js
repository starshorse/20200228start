var sheet = spread.getSheet(0)
import { generateData , generateBindingColumnInfos } from '../../module_share/generateData.js'; 

const startUp = ()=>{
	sheet.suspendPaint()
	sheet.setDataSource( generateData(5000) ) 
	sheet.autoGenerateColumns = false 
	sheet.bindColumns( generateBindingColumnInfos(7) ) 
	sheet.resumePaint() 
}
export { startUp } 


						
