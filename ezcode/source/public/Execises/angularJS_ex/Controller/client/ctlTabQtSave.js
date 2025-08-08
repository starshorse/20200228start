// const { json } = require("express");

app.controller('ctlTabQtSave',['$scope', 'DataNode', '$location', '$routeParams', function($scope, DataNode, $location,  $routeParams ){

    console.log( $routeParams.id );
    console.log( $routeParams.action ); 

    ( $scope.hideInput = function(){
         $('#saveInput').hide();
         $('#createQt').show();
    })();
    $scope.row_1_values ={} ;
    $scope.row_1 =[
         { col_num:'col-1', label:'CAS 번호', placeholder : 'CAS Number' },
         { col_num:'col-2', label:'물질명', placeholder : 'Name'  },
         { col_num:'col-1', label:'단위*', placeholder : 'Unit' },
         { col_num:'col-1', label:'수량', placeholder : 'Qty' },
         { col_num:'col-1', label:'순도', placeholder : 'Purity' },
    ];
    // SargonI 2020-08-09 
    $scope.qtPurityOver = true; 
    $scope.qtPurityOverChanged = function(){
        console.log($scope.qtPurityOver); 
        ( $scope.qtPurityOver == true )? $scope.row_1_values['5'] += "+" :  $scope.row_1_values['5'] = $scope.row_1_values['5'].replace("+","");
    }

    $scope.row_2_values ={} ;
    $scope.row_2 =[
         { col_num:'col-1', label:'공급사*', placeholder : 'Supplier Name'},
         { col_num:'col-3', label:'카탈로그 번호*', placeholder : 'Cat. Number'},
         { col_num:'col-3', label:'비고', placeholder : 'Etc'},
    ];
 //   var defaultData = ezChemData.filter(function(cur){
      DataNode.getData().then( function(data){
         ezChemData = JSON.parse(data); 
        //  var defaultData = DataNode.getData().data.filter( function(cur){
            defaultData = ezChemData.filter(function(cur){
             return cur['분류']==0 ;
         });
         $scope.updateTable();
     }) ;
 
    
    $scope.updateTable = function(){
         if ( $.fn.dataTable.isDataTable( '#clientData_tabQtSave' ) ) {
                     var attendanceDetailsTable = $('#clientData_tabQtSave').DataTable();
                     attendanceDetailsTable.destroy();
                     $('#clientData_tabQtSave').empty(); // empty in case the columns change
            }
        $('#clientData_tabQtSave').DataTable({
            data: defaultData ,
            columns: ezChemDataH_save
         });
             currentDt = $('#clientData_tabQtSave').DataTable();
             $('#clientData_tabQtSave tbody').on('click','td',function(){
                         currentRow = currentDt.row(this).data();
                         console.log($(this).index());
                         $scope.$apply(function(){
//                            $scope.updateContents(); 
                             $scope.row_1_values['1'] = currentRow['Cas No'];
                             $scope.row_1_values['2'] = currentRow['Name'];
                             $scope.row_1_values['3'] = currentRow['Unit'];
                             $scope.row_1_values['4'] = currentRow['ea'];
                             $scope.row_1_values['5'] = currentRow['purity'];
 
                             $scope.row_2_values['1'] = currentRow['Supplier'];
                             $scope.row_2_values['2'] = currentRow['Cat No'];
                             $scope.qtPurityOver = false ; 
                              if ( currentRow['Purity Over'] & 1 ) $scope.qtPurityOver = true;
                         });
                 if($(this).index() == 0){
                     
                 }
                 else{        
                     $('#saveInput').show();
                     $('#createQt').hide();
                 }
                 });
         $('#saveInput').hide();
     };
     $scope.updateContents = function(){
        // $scope.row_1_values['1'] = currentRow['Cas No'];
        // $scope.row_1_values['2'] = currentRow['Name'];
        // $scope.row_1_values['3'] = currentRow['Unit'];
        // $scope.row_1_values['4'] = currentRow['ea'];
        // $scope.row_1_values['5'] = currentRow['purity'];

        // $scope.row_2_values['1'] = currentRow['Supplier'];
        // $scope.row_2_values['2'] = currentRow['Cat No'];
        // $scope.qtPurityOver = false ; 
        //  if ( currentRow['Purity Over'] & 1 ) $scope.qtPurityOver = true;
    };
       // SargonI 2021-02-14 
    if( $routeParams.id != 'undefined'){
        currentRow =  ezChemData.find( function(item){
            return item['id'] == $routeParams.id ;  
        })
        $scope.updateContents(); 
        $('#saveInput').show();
    };
     // var currentDt ;
     var currentRow ;
     $scope.editEntry = function(){

     // RICHARD-CHOI pre-Check  Data..  
     var validationField = 0; 
     var re = null ;
        //   1. Cas No   
        //   re = /[0-9]{2,7}-[0-9]{2}-[0-9]-.{1}/gi;
        re = /[0-9]{2,7}-[0-9]{2}-[0-9]{1}$/;
            var rlt = $scope.row_1_values['1'].match(re);
            if( rlt == null ) validationField |= 1; 
        //   2. 수량
        //   re =/[0-9]+/;   
        //   rlt = $scope.qtSubmit_row_3_values['6'].toString.match(re);
            if( isNaN($scope.row_1_values['4']) ) validationField |= 2; 
        //   3. Purity Check. 
            re = /\d{1,3}%/ ;  
            rlt = $scope.row_1_values['5'].match(re); 
            if( rlt == null ||  parseInt( rlt[0]) > 100 || parseInt( rlt[0]) < 0 ) validationField |= 4; 

            if( validationField){
                var ErrorStr =""; 
                if( validationField & 1) ErrorStr += "1. Cas No format Error :i.e 345678-23-0\n";
                if( validationField & 2) ErrorStr += "2. Quntity should be number\n";
                if( validationField & 4) ErrorStr += "3. Purity format Error : i.e 98% \n";

                alert(ErrorStr); 

                return 1 ; 
            }
         // SargonI 2020-08-21
         var editData ={} ;          
         editData[web2dbCov['Cas No']] = currentRow['Cas No']   =    $scope.row_1_values['1'];
         editData[web2dbCov['Name']] = currentRow['Name']     =   $scope.row_1_values['2'];

         currentRow['Unit']     =   $scope.row_1_values['3'];
         currentRow['ea']       =   $scope.row_1_values['4'];
         currentRow['purity']   =   $scope.row_1_values['5'];
 
         currentRow['Cat No']   =   $scope.row_2_values['2'];
 
         currentRow['Cas No Ez']   =    $scope.row_1_values['1'];
         currentRow['Name Ez']     =   $scope.row_1_values['2'];
         currentRow['Unit Ez']     =   $scope.row_1_values['3'];
         currentRow['ea Ez']       =   $scope.row_1_values['4'];
         currentRow['purity Ez']   =   $scope.row_1_values['5'];
 
         currentRow['Cat No Ez']   =   $scope.row_2_values['2'];
 
         currentRow['Cas No Supplier']   =    $scope.row_1_values['1'];
         currentRow['Name Supplier']     =   $scope.row_1_values['2'];
         currentRow['Unit Supplier']     =   $scope.row_1_values['3'];
         currentRow['ea Supplier']       =   $scope.row_1_values['4'];
         currentRow['purity Supplier']   =   $scope.row_1_values['5'];
 
         currentRow['Cat No Supplier']   =   $scope.row_2_values['2'];
 
         currentRow['Supplier'] = $scope.row_2_values['1'];
         currentRow['Supplier Ez'] = $scope.row_2_values['1'];    
         
         currentRow['Purity Over'] &=  12;   // 0b1100  
         if( $scope.qtPurityOver == true ) currentRow['Purity Over'] |=  3;   // 0b0011
 // RICHARD-CHOI 2020-05-03 
         DataNode.postData(ezChemData);   
 // SargonI 2020-08-21 
         DataNode.wqs_resource.update({ id: currentRow['No']}, { text : JSON.stringify(editData)}); 
 //       DataNode.wqs_resource.update();
        //  DataNode.wqs_resource.get({ id: currentRow['No']}).$promise.then(function(wqs_Entry) {
        //     wqs_Entry.text = JSON.stringify(editData);
        //     wqs_Entry.update({ id: currentRow['No']});
        //   }); 
         
         $scope.updateTable();
         $('#createQt').show();
         return 0;
     }
     $scope.addEntry = function($event){
 // RICHARD-CHOI 2020-05-03
 //        defaultData.push({});

         var numLastNo = ezChemData[0]['lastNo']++;
         ezChemData.push( new DataNode.ezDataEntry( numLastNo ));
         defaultData = ezChemData.filter(function(cur){
             return cur['분류']==0 ;
         });
 
         DataNode.postData(ezChemData);
        // SargonI 2020-08-21 
        DataNode.wqs_resource.save();          
 
         $scope.updateTable();
     }
     $scope.moveEntry = function( $event ){
        // SargonI 2021-02-14 
        // SargonI 2021-02-14      
        $scope.showAlert($event, currentRow ); 
     //   $location.url( '#!/clientSubmit#!/:'+ currentRow['trackId'] );
     // SargonI 2021-02-15 give up using angularJS  $location %2F 
        window.location.href ="./Ezwqs_1.html#/clientSubmit/"+ currentRow['trackId'];
        
        return 0; 


         if( $scope.editEntry()) return 1;
  // Check Valid 
         if( currentRow['Cas No'] == "" && currentRow['Name'] == "" &&  currentRow['Cat No'] =="" )
         {   
             alert("Input Failure :CAS ID / Name / CAT ID 중 하나라도 입력하세요.") ;
             return ; 
         }

         var tmp = defaultData.find( (data) => data['No'] == currentRow['No']);
         tmp['분류'] = 1;
 // RICHARD-CHOI 2020-05-03 
         // currentRow['trackId'] = ezChemData[0]['lastTrackId']++; 
         var numLastTrackId = ezChemData[0]['lastTrackId']++; 
         var numTrackId_num = parseInt( numLastTrackId % 10000 ) + 10000 ; 
         var numTrackId_class = parseInt( ( numLastTrackId / 10000 )% 100 ) + 100 ; 
         var numTrackId_year = parseInt(( numLastTrackId / 1000000 )% 100 ) + 100 ; 
 
         currentRow['trackId'] = numTrackId_year.toString().substr(1) + "-" +
                                 numTrackId_class.toString().substr(1) + "-" +     
                                 numTrackId_num.toString().substr(1) ;
         
         currentRow['견적요청일'] = DataNode.returnTodayStr();   
         // SargonI 2020-08-09 
         //if ( currentRow['Purity Over'] & 1 ) currentRow['purity'] += "+" ;                    
 
         console.log( currentRow['trackId']);                         
  
         DataNode.postData(ezChemData);         
         defaultData = defaultData.filter(function(cur){
               return cur['분류']==0 ;
            });
         $scope.updateTable();
   
     }
    $scope.delEntry = function(){
        var checkBoxes = $('input:checkbox:checked'); 
        var selectIndexArr = [];
        $.each(checkBoxes, function(index, checkBox){
            console.dir(checkBox.dataset.no); 
             selectIndexArr.push(checkBox.dataset.no); 
             ezChemData.splice( ezChemData.findIndex( x => x['No'] == checkBox.dataset.no), 1 );   
           // SargonI 2020-08-21 
            DataNode.wqs_resource.delete({id: checkBox.dataset.no});        
            }
        )
        DataNode.selectedIndex = selectIndexArr; 
        DataNode.postData(ezChemData)
        .then(function(){         
            defaultData = ezChemData.filter(function(cur){
                return cur['분류']==0 ;
                });
            $scope.updateTable();
            }
        )
    }  
 }]);