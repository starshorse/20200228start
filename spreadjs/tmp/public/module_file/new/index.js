console.log("hello, new module") 
data = [
	['no','name','email'],
	[1,'RICHARD','richard@richard'],
	[2,'PETER', 'peter@peter']
]
sheet = spread.getSheet(0)
sheet.setArray( 0,0 , data ) 



