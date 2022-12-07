
//1:- create createSampleData()
function createSampleData() {
 // Create sample report card data
    return [
        {
            Course: "Calculus",
            Term: 1,
            Credit: 5,
            Score: 80,
            Teacher: "Nancy.Feehafer",
        },
        {
            Course: "P.E.",
            Term: 1,
            Credit: 3.5,
            Score: 85,
            Teacher: "Andrew.Cencini",
        },
        {
            Course: "Political Economics",
            Term: 1,
            Credit: 3.5,
            Score: 95,
            Teacher: "Jan.Kotas",
        },
        {
            Course: "Basic of Computer",
            Term: 1,
            Credit: 2,
            Score: 85,
            Teacher: "Steven.Thorpe",
        },
        {
            Course: "Micro-Economics",
            Term: 1,
            Credit: 4,
            Score: 62,
            Teacher: "Jan.Kotas",
        },
        {
            Course: "Linear Algebra",
            Term: 2,
            Credit: 5,
            Score: 73,
            Teacher: "Nancy.Feehafer",
        },
        {
            Course: "Accounting",
            Term: 2,
            Credit: 3.5,
            Score: 86,
            Teacher: "Nancy.Feehafer",
        },
        {
            Course: "Statistics",
            Term: 2,
            Credit: 5,
            Score: 85,
            Teacher: "Robert.Zare",
        },
        {
            Course: "Marketing",
            Term: 2,
            Credit: 4,
            Score: 70,
            Teacher: "Laura.Giussani",
        },
    ];
}
function loadTable( ss, data ){
	ss.suspendPain;
	try{
		var sheet = ss.getActiveSheet();
		var table = sheet.tables.addFromDataSource(
			"Table1",
			0,
			0,
			data,
			GC.Spread.Sheets.Tables.TableThemes.medium2 
		)
		table.showHeader( true );
		table.highlightFirstColumn( true ) 

		sheet.setColumnWidth( 0, 130 );
		sheet.setColumnWidth( 1, 130 );
		sheet.setColumnWidth( 2, 70 );
		sheet.setColumnWidth( 3, 70 );
		sheet.setColumnWidth( 4, 100 );
		sheet.setColumnWidth( 5, 260 );

	}catch(e){
		alert( e.message ); 
	}
	ss.resumePaint;
}
function refresh(){
	var ss = GC.Spread.Sheets.findControl( document.getElementById("ss")); 
	var sheet = ss.getActiveSheet()
	sheet.reset();
	sheet.setColumnCount(7);
	var data = createSampleData();
	loadTable( ss, data ) 
}
                
