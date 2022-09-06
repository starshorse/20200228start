angular.module('myOptsel', [])
.controller('myOptselCtrl', ['$scope', function($scope){
     init_Optsel($scope.spread, $scope.spread_data)	
}])
.directive('myOptsel',function(){
	return {
		restrict:'E',
		templateUrl:'/ezworks/sub_app/buynsell/parts/optsel.html',
		controller:'myOptselCtrl'
	}
})
const init_Optsel = (spread, spread_data)=>{
// RICAHRD-CHOI 2018-12-19  계산 결과 반영  - 진행단계 /  입고경과 / 매입계산서 / 대금결제
$("#item1").click(function(){
//	       spread.getActiveSheet().setValue(0,1,"진행단계", GC.Spread.Sheets.SheetArea.colHeader);	
/*
           spreadjs_setColHead( spread, 0,  1, "진행단계" );
		   var ezCounts = spread.getActiveSheet().getRowCount();
		   for( ezi = 0 ;  ezi < ezCounts  ; ezi++ )  ezUp_SellInStageStatus( ezi ) ; 
		   opStatus = 0 ;
*/           
         spreadjs_suspendPaint(spread); 
          for( key in spread_data[0].data){
                ezWs_updateSellStatus( spread_data[0].data[key] ); 
        } 
         ezJSON_Data_Edit( spread_data[0].columns, "name" , "진행단계", "visible" , true );   
         ezJSON_Data_Edit( spread_data[0].columns, "name" , "입고경과", "visible" , false );    
         ezJSON_Data_Edit( spread_data[0].columns, "name" , "매입계산서", "visible" , false );    
         ezJSON_Data_Edit( spread_data[0].columns, "name" , "대금결제", "visible" , false );             
         opStatus = 0;
         spreadjs_resumePaint(spread);           
}); 
$("#item2").click(function(){
//	       spread.getActiveSheet().setValue(0,1,"입고경과", GC.Spread.Sheets.SheetArea.colHeader);	
/*
           spreadjs_setColHead( spread, 0,  1, "입고경과" );
		   var ezCounts = spread.getActiveSheet().getRowCount();
		   for( ezi = 0 ;  ezi < ezCounts  ; ezi++ )  ezUp_SellInStatus( ezi ) ; 
		   opStatus = 1 ; 
*/       spreadjs_suspendPaint(spread); 

 for( key in spread_data[0].data){
                ezWs_updateSellStatus( spread_data[0].data[key] ); 
        } 
   
         ezJSON_Data_Edit( spread_data[0].columns, "name" , "진행단계", "visible" , false );   
         ezJSON_Data_Edit( spread_data[0].columns, "name" , "입고경과", "visible" , true );    
         ezJSON_Data_Edit( spread_data[0].columns, "name" , "매입계산서", "visible" , false );    
         ezJSON_Data_Edit( spread_data[0].columns, "name" , "대금결제", "visible" , false );             
         opStatus = 1;
         spreadjs_resumePaint(spread);           
}); 
$("#item3").click(function(){
//	       spread.getActiveSheet().setValue(0,1,"매입계산서", GC.Spread.Sheets.SheetArea.colHeader);	
/*
           spreadjs_setColHead( spread, 0,  1, "매입계산서" );
		   var ezCounts = spread.getActiveSheet().getRowCount();
		  for( ezi = 0 ;  ezi < ezCounts  ; ezi++ )  ezUp_SellInvoiceStatus( ezi ) ; 
		   opStatus = 2 ; 
*/ 
         spreadjs_suspendPaint(spread); 
         
 for( key in spread_data[0].data){
                ezWs_updateSellStatus( spread_data[0].data[key] ); 
        } 
   
         ezJSON_Data_Edit( spread_data[0].columns, "name" , "진행단계", "visible" , false );   
         ezJSON_Data_Edit( spread_data[0].columns, "name" , "입고경과", "visible" , false );    
         ezJSON_Data_Edit( spread_data[0].columns, "name" , "매입계산서", "visible" , true );    
         ezJSON_Data_Edit( spread_data[0].columns, "name" , "대금결제", "visible" , false );             
         opStatus = 2;
         spreadjs_resumePaint(spread);                     
}); 
$("#item4").click(function(){
//	       spread.getActiveSheet().setValue(0,1,"대금결제", GC.Spread.Sheets.SheetArea.colHeader);
/*
           spreadjs_setColHead( spread, 0,  1, "대금결제" );	
		   var ezCounts = spread.getActiveSheet().getRowCount();
		   for( ezi = 0 ;  ezi < ezCounts  ; ezi++ )  ezUp_SellStatus( ezi ) ; 
		    opStatus = 3 ; 
*/    
         spreadjs_suspendPaint(spread); 
         
 for( key in spread_data[0].data){
                ezWs_updateSellStatus( spread_data[0].data[key] ); 
        } 
   
         ezJSON_Data_Edit( spread_data[0].columns, "name" , "진행단계", "visible" , false );   
         ezJSON_Data_Edit( spread_data[0].columns, "name" , "입고경과", "visible" , false );    
         ezJSON_Data_Edit( spread_data[0].columns, "name" , "매입계산서", "visible" ,false );    
         ezJSON_Data_Edit( spread_data[0].columns, "name" , "대금결제", "visible" , true );             
         opStatus = 3;
         spreadjs_resumePaint(spread);                  
}); 	
}
