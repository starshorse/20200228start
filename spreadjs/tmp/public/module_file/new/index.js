console.log("hello, new module") 
/*
data = [
	['no','name','email'],
	[1,'RICHARD','richard@richard'],
	[2,'PETER', 'peter@peter']
]
sheet = spread.getSheet(0)
sheet.setArray( 0,0 , data ) 
*/
const startUp = async ()=>{
       var sheet = spread.getSheet(0)
	sheet.setColumnCount(200) 
	sheet.suspendPaint()
//	sheet.tables.add('Table1', 0,0,3,3 )	
	let colorArray = [
	'rgb(120, 180, 240)', 'rgb(240, 160, 80)', 'rgb(140, 240, 120)', 'rgb(120, 150, 190)',
	'rgb(120, 180, 240)', 'rgb(240, 160, 80)', 'rgb(140, 240, 120)', 'rgb(120, 150, 190)',
	'rgb(120, 180, 240)', 'rgb(240, 160, 80)', 'rgb(140, 240, 120)'
	];
	var chartType = {
		type: GC.Spread.Sheets.Charts.ChartType.columnClustered,
		desc: "columnClustered",
		dataFormula: "data!A1:M12",
		changeStyle: function (chart) {
			changeChartTitle(chart, "The EZchemtech Monthly confirmed quotes counts");
			changColumnChartDataLabels(chart);
			chart.axes({primaryValue: {title: {text: "quotes counts"}}});
			changeChartSeriesColor(chart);
			changeChartSeriesGapWidthAndOverLap(chart);
		}
	}	
//        let chart = sheet.charts.add( chartType.desc, chartType.type ,250,0,600,1400, chartType.dataFormula ) 
/*	        
	var chart = addChart( sheet, chartType.type, chartType.dataFormula )         
	chartType.changeStyle( chart );
*/	
	sheet.resumePaint() 

	function addChart(sheet, chartType, dataFormula) {
		//add chart
		return sheet.charts.add((sheet.name() + 'Chart1'), chartType, 30, 100, 900, 400, dataFormula, GC.Spread.Sheets.Charts.RowCol.rows);
	}

	function changeChartTitle(chart, title) {
		chart.title({text: title});
	}

	// show dataLabels
	function changColumnChartDataLabels(chart) {
		var dataLabels = chart.dataLabels();
		dataLabels.showValue = true;
		dataLabels.showSeriesName = false;
		dataLabels.showCategoryName = false;
		var dataLabelPosition = GC.Spread.Sheets.Charts.DataLabelPosition;
		dataLabels.position = dataLabelPosition.outsideEnd;
		chart.dataLabels(dataLabels);
	}

	//change color
	function changeChartSeriesColor(chart) {
		var series = chart.series().get();
		for (var i = 0; i < series.length; i++) {
			chart.series().set(i, {backColor: colorArray[i]});
		}
	}

	function changeChartSeriesGapWidthAndOverLap(chart) {
		var seriesItem = chart.series().get(0);
		seriesItem.gapWidth = 2;
		seriesItem.overlap = 0.1;
		chart.series().set(0, seriesItem);
	}
}
export { startUp } 



