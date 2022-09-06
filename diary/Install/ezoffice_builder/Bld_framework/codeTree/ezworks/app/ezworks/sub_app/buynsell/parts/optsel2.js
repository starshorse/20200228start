angular.module('myOptsel2',[])
.controller('myOptsel2Ctrl',['$scope', function($scope){
     init_Optsel2($scope.spread, $scope.spread_data)	
}])
.directive('myOptsel2', function(){
	return {
		restrict:'E',
		templateUrl:'/ezworks/sub_app/buynsell/parts/optsel2.html',
		controller:'myOptsel2Ctrl'
	}
})
const init_Optsel2 = (spread, spread_data)=>{
	 sp0_sh5_combEvent_enlist(spread) 
}
function sp0_sh5_combEvent_enlist(spread){
// RICAHRD-CHOI 2018-12-19  계산 결과 반영  - 진행단계 /  납품경과 / 매출계산서 / 대금결제
$("#sp0_sh5_item1").click(function(){
    
         spreadjs_suspendPaint(spread); 
          for( key in sp0_sh5_initData){
                sp0_sh5_co_updateStatus( sp0_sh5_initData[key] ); 
        } 
         ezJSON_Data_Edit( sp0_sh5_colInfos, "name" , "진행단계", "visible" , true );   
         ezJSON_Data_Edit( sp0_sh5_colInfos, "name" , "납품경과", "visible" , false );    
         ezJSON_Data_Edit( sp0_sh5_colInfos, "name" , "매출계산서", "visible" , false );    
         ezJSON_Data_Edit( sp0_sh5_colInfos, "name" , "대금결제", "visible" , false );             
         opStatus = 0;
         spreadjs_resumePaint(spread);           
}); 
$("#sp0_sh5_item2").click(function(){
        spreadjs_suspendPaint(spread); 

 for( key in sp0_sh5_initData){
                sp0_sh5_co_updateStatus( sp0_sh5_initData[key] ); 
        } 
   
         ezJSON_Data_Edit( sp0_sh5_colInfos, "name" , "진행단계", "visible" , false );   
         ezJSON_Data_Edit( sp0_sh5_colInfos, "name" , "납품경과", "visible" , true );    
         ezJSON_Data_Edit( sp0_sh5_colInfos, "name" , "매출계산서", "visible" , false );    
         ezJSON_Data_Edit( sp0_sh5_colInfos, "name" , "대금결제", "visible" , false );             
         opStatus = 1;
         spreadjs_resumePaint(spread);           
}); 
$("#sp0_sh5_item3").click(function(){
 
         spreadjs_suspendPaint(spread); 
         
 for( key in sp0_sh5_initData){
                sp0_sh5_co_updateStatus( sp0_sh5_initData[key] ); 
        } 
   
         ezJSON_Data_Edit( sp0_sh5_colInfos, "name" , "진행단계", "visible" , false );   
         ezJSON_Data_Edit( sp0_sh5_colInfos, "name" , "납품경과", "visible" , false );    
         ezJSON_Data_Edit( sp0_sh5_colInfos, "name" , "매출계산서", "visible" , true );    
         ezJSON_Data_Edit( sp0_sh5_colInfos, "name" , "대금결제", "visible" , false );             
         opStatus = 2;
         spreadjs_resumePaint(spread);                     
}); 
$("#sp0_sh5_item4").click(function(){
         spreadjs_suspendPaint(spread); 
         
        for( key in sp0_sh5_initData){
                sp0_sh5_co_updateStatus( sp0_sh5_initData[key] ); 
        } 
   
         ezJSON_Data_Edit( sp0_sh5_colInfos, "name" , "진행단계", "visible" , false );   
         ezJSON_Data_Edit( sp0_sh5_colInfos, "name" , "납품경과", "visible" , false );    
         ezJSON_Data_Edit( sp0_sh5_colInfos, "name" , "매출계산서", "visible" ,false );    
         ezJSON_Data_Edit( sp0_sh5_colInfos, "name" , "대금결제", "visible" , true );             
         opStatus = 3;
         spreadjs_resumePaint(spread);                  
}); 	
};

