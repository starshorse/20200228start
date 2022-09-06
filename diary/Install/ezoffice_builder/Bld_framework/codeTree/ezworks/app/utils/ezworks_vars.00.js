/*
*   Global Variable Define.. 
*/
const ezworks_vars_roomEntry = 20 ; 
const  version = "v0.31"  // EZWS190419CODE
const EZWS190419CODE = 1 ;
const EZWS190422CODE = 1;
const EZWS190423CODE = 1;
// RICHARD-CHOI 2019-10-28 
var spread;
var spreadPtr; 

function ezWs_setCurVendor( vendorName ){
    ezWs_setCurVendor.vendorName = vendorName ; 
    return ezWs_setCurVendor.vendorName; 
}
function ezWs_getCurVendor(){
    return ezWs_setCurVendor.vendorName;
}