



let  obj1 ={}

let  strD = 'NVARCHAR(120)' 

obj1['type'] = strD 

strD = 'DataTypes.'+ strD.replace('NVARCHAR', 'STRING' )

let name = 'seq'
let obj_arr = []
let key_ = 'type'
obj_arr.push(`${ key_ } : ${ strD }`) 
key_ ='allowNull' 
obj_arr.push(`${ key_ } : false `) 

merge_data = obj_arr.join(',') 

let obj2 = `{ ${ name } : { ${ merge_data } } }` 


console.log(obj2) 
