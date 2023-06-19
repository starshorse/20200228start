function generateData( itemCount )
{
	var data = [];
	var countries = ["China", "American" , "UK", "Japan", "France"];
	var products = ["Computer", "Car", "Others"];
	var colors =["Red", "Green", "Blue", "White" , "Black", "Yellow" , "Pink", "Oragne"]; 
	var dt = new Date(); 
	for( var i =0 ;i < itemCount; i++ ){
		var item ={
			id: i ,
			date: new Date( dt.getFullYear(), i%12, 1), 
			country: countries[ Math.floor( Math.random() * countries.length) ],
			product: products[Math.floor( Math.random()* products.length )],
			color: colors[ Math.floor( Math.random()* products.length )],
			amount: 1000 + Math.random()*10000,
			big: Math.random() > .5 
		};
		data.push( item );		
	}
	return data;

}
function generateBindingColumnInfos( colCount )
{
	var bindColumnInfos = [
		{ name: "id", displayName: "ID", size: 60 },
		{ name: "product", displayName: "Product", size: 90 },
		{ name: "country", displayName: "Country", size: 90 },
		{ name: "amount", displayName:  "Amount", size: 90 , formatter: "#,##0" },
		{ name: "date", displayName: "Date", size: 90, formatter: 'yyyy-mm-dd' },
		{ name: "color", displayName: "Color", size: 85 },
		{ name: "big", displayName: "Big", size: 90 , cellType: new GC.Spread.Sheets.CellTypes.CheckBox()  },
	];
	return bindColumnInfos;		

}
export { generateData , generateBindingColumnInfos } 
