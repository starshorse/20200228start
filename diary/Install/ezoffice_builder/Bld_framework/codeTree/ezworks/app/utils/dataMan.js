/*
var Version ="0.02 "
var arrSheets = ['매입', '매입견적'] ;

//  Sheets index. 
var Sheets = [];
var Moneyback =   {'Vendor': 'All' ,'Total_supply':0, 'Total_add':0 ,'Pre_pay' :0 , 'On_pay':0 , 'Due_pay':0 }; 
for (k in arrSheets) {
    var WorkingLine = {'Working_row' :0, 'Working_col' : 0, 'ShowActiveRow': 0}; 
    var arrMoneyback =[ Moneyback ]; 
    Sheets.push({'SheetName':arrSheets[k], 'WorkingLine':WorkingLine, 'Moneyback': arrMoneyback }); 
}   
 var Ezworks = {'Version': Version , 'Sheets': Sheets }; 
*/
function ezls_LoadData(){ 
        if(localStorage.getItem('Ezworks')) Ezworks = JSON.parse(localStorage.getItem('Ezworks'));   
}
function ezls_SaveDataAll(){
		localStorage.removeItem('Ezworks'); 
		localStorage.setItem('Ezworks', JSON.stringify(Ezworks)); 		
}
/*  Array ..  Data handing Through Array.
*   1. Add
     2 .Delete
     3. Select 
     4. Sum
     5. Edit
*/
function ezArray_Radom( ezArray ){
        return ezArray[ Math.floor( Math.random()*ezArray.length )]; 
}
function ezArray_Add( JsonObject , JsonEntry ){
     JsonObject.push( JsonEntry ); 
     return JsonObject ;  
}
function ezArray_Insert( JsonObject,  InsertPos, JsonEntry){
    JsonObject.Splice( InsertPos, 0 , JsonEntry ) ; 
    return JsonObject; 
}
function ezArray_DelPos( JsonObject, DelPos, DelNum ){
    JsonObject.Splice( DelPos , DelNum )
    return JsObject; 
}
function ezArray_Del( JsonObject , Index ){
     JsonObject.pop(); 
     return ; 
}
/*  JSON Data handing Through Array.
*   1. Add
     2 .Delete
     3. Select 
     4. Sum
     5. Edit
*/
if( EZWS190419CODE )
{    
    function ezJSON_dataSort( array_jsonObject , JsonID){
        return array_jsonObject.sort( function( before, next ){
           return before[JsonID] - next[JsonID];
        }); 
    }    
}    
function ezJSONEntry_checkUndefined( JsonEntry , JsonID){    
    if( typeof JsonEntry[JsonID] == "undefined")return true;
    return false; 
}    
// return Index 
function ezJSON_Data_FindIndex( JsonObject, JsonID, JasonValue ){
     return JsonObject.findIndex(x => x[JsonID] == JasonValue );   
}    
// return Data . 
function ezJSON_Data_Find( JsonObject, JsonID, JsonValue ){
     return  JsonObject.find( x => x[JsonID] == JsonValue  );
     }
function ezJSON_Data_Filter( JsonObject, JsonID, JsonValue ){
     return  JsonObject.filter( x => x[JsonID] == JsonValue  );
}
function ezJSON_Ent_Add( JsonObject, JsonID, JsonValue = null ){
	JsonObject[JsonID] = JsonValue; 
}
function ezJSON_Data_Add( JsonObject , JsonEntry ){
     JsonObject.push( JsonEntry ); 
     return JsonObject ;  
}
function ezJSON_Data_Del( JsonObject , Index ){
     JsonObject.pop(); 
     return ; 
}
function ezJSON_Data_Select( JsonObject , JsonID_key , JsonID ){
    var selectedObject = [] ; 
    for(var k in JsonObject ){
            if( JsonObject[k][JsonID_key] == JsonID ) selectedObject.push( JsonObject[k] ); 
    }
    return selectedObject ;  
}
function ezJSON_Data_Sum( JsonObject , JsonID_key, JsonID, JsonKey  ){
    var Sum = 0; 
    for( var key in JsonObject ){
             if( JsonObject[key][JsonID_key] == JsonID ){
                    Sum += parseInt(JsonObject[key][JsonKey]);             
             }
    }  
    return Sum; 
}
function ezJSON_Data_Edit( JsonObject, JsonID_key , JsonID, JsonKey , JasonValue ){
       for( var key in JsonObject ){
             if( JsonObject[key][JsonID_key] == JsonID ){
                    JsonObject[key][JsonKey] = JasonValue ;             
             }
    }  
}
function ezJSON_Data_EmptyCheck( JsonValue )
{
        if( JsonValue == null || JsonValue =="" || JsonValue == undefined ) return true ;
        return false;
}
function ezJSON_Find_Bykey( JsonData, JsonKey, JsonValue ){
    for ( k in JsonData ){
             if( JsonData[k][JsonKey] == JsonValue )
                    return JsonData[k]; 
        }
        return null; 
}
function ezJSON_Index_Byname( JsonData, JsonValue ){
        return JsonData.map( e => e.name).indexOf(JsonValue) ; 
}
/* 
    Javascript  Array handling. 
*/
function ezArray_Radom( ezArray ){
        return ezArray[ Math.floor( Math.random()*ezArray.length )]; 
}
/*
* usage:
  const peopleArray = [   { id: 123, name: "dave", age: 23 },   { id: 456, name: "chris", age: 23 },   { id: 789, name: "bob", age: 23 },   { id: 101, name: "tom", age: 23 },   { id: 102, name: "tim", age: 23 } ]
  const peopleObject = arrayToObject(peopleArray, "id") console.log(peopleObject[idToSelect])
*/
const arrayToObject = (array, keyField) => array.reduce((obj, item) => { obj[item[keyField]] = item ;    return obj    }, {});
/*
*  ETC utility functions . 
*/
function ezJSObject_Copy( JsObject ) {
    return $.extend({}, JsObject ) ;
}    

function ez01_Radom(){
        return Math.round(Math.random()); 
}
// roundpos is 10 / 100 /1000
function ezRound_10x( number , roundpos ){
        return Math.round( number/roundpos )*roundpos ; 
}
// round num .01 .001 
function ezRound_v10( number , roundnum){
       return number.toFixed(roundnum); 
}
function ezNumber_Radom( min, max ){     
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; 
 }
function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}
function ezGet2digitYear(){
     var date = new Date();
     var year2digit =  date.getFullYear().toString().substr(2,2);
     return year2digit; 
}
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
