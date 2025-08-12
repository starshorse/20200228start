// angular.module('myNg', ['ngResource'])
app.service('DataNode', ['$resource', function($resource){
 // Data share in between Controllers.    
        this.selectedData = null ; 
        this.selectedIndex = null ; 

        var resource = $resource('/getajax'); 
        var data = null;
        var last_ID = null; 
        (async function initData(){
            await resource.get().$promise.then(function(value){
        // SargonI 2020-08-20    data = value.data; 
                data = convData( value.data ); 
                last_ID = data.reduce( function( a, b){
                return Math.max( a, b.No );
            }, 0) 
        })})();
        // SargonI 2020-08-20 
        this.wqs_resource = $resource('/EzQuations/:id', null ,{ 'update': { method : 'PUT'}});
  
        // SargonI 2020-08-19  
        // c_cas_no: "1197953-47-1"
        // c_cat_no: "QB-5555"
        // c_chemical_name: "(2-Aminophenyl)dimethylphosphine oxide"
        // c_is_deleted: null
        // c_is_order_request: 1
        // c_is_purity_greater: 1
        // c_is_requested: 1
        // c_maker: "Combi-Blocks"
        // c_order_request_time: null
        // c_purity: 0.98
        // c_qty: 1
        // c_re_request_count: 1
        // c_re_request_time: null
        // c_remark: "비고1"
        // c_requested_time: null
        // c_unit: "1g"
        // c_updated_time: null
        // company: "대한제약"
        // generated_by: "EZ"
        // generated_time: "2020-08-10T01:05:26.000Z"
        // idx: 70
        // internal_remark: "카톡"
        // is_push_c_to_o: null
        // m_cas_no: "1197953-47-1"
        // m_cat_no: "QB-5555"
        // m_chemical_name: "(2-Aminophenyl)dimethylphosphine oxide"
        // m_currency: "USD"
        // m_handling_fee: 0
        // m_is_air_shipping: 1
        // m_is_dg: 0
        // m_is_order_confirmed: 1
        // m_is_purity_greater: 1
        // m_is_replied: 1
        // m_is_same_product: null
        // m_lead_time_max_unit: "d"
        // m_lead_time_max_value: 5
        // m_lead_time_min_unit: "d"
        // m_lead_time_min_value: 3
        // m_maker: "Combi-Blocks"
        // m_order_confirmed_time: null
        // m_origin_country: "USA"
        // m_other_charges: 0
        // m_price: 80
        // m_purity: 0.98
        // m_qt_expired_days: 30
        // m_qty: 1
        // m_reject_reason: null
        // m_reject_type: null
        // m_remark: "m_remark1"
        // m_shipment_country: "USA"
        // m_shipping_fee: 0
        // m_stock_status: 1
        // m_submitted_time: null
        // m_unit: "1g"
        // m_updated_time: null
        // mro: null
        // o_calculated_price: 153004
        // o_cas_no: "1197953-47-1"
        // o_cat_no: "QB-5555"
        // o_chemical_name: "(2-Aminophenyl)dimethylphosphine oxide"
        // o_contract_no: null
        // o_customer_price: 170000
        // o_etc_cost_f: 0
        // o_etc_cost_krw1: 10000
        // o_etc_cost_krw2: 15000
        // o_etc_cost_krw3: null
        // o_fixed_customer_price: null
        // o_fixed_mro_price: null
        // o_fx_correction_rate: 0.0114
        // o_fx_date: "2020-08-06T15:00:00.000Z"
        // o_fx_type: "S"
        // o_is_1fee: 0
        // o_is_included_vat: 0
        // o_is_ordered: 1
        // o_is_purity_greater: 1
        // o_is_replied: 2
        // o_is_requested: 1
        // o_lead_time_max_unit: "d"
        // o_lead_time_max_value: 7
        // o_lead_time_min_unit: "d"
        // o_lead_time_min_value: 3
        // o_maker: "Combi-Blocks"
        // o_margin_rate: 0.2
        // o_mro_fee_rate: 0.11
        // o_mro_price: 154000
        // o_ordered_time: null
        // o_purity: 0.98
        // o_qt_calc: null
        // o_qty: 1
        // o_remark: null
        // o_remark_to_maker: "remark1"
        // o_replied_time: null
        // o_requested_time: null
        // o_tariff_rate: 0.06
        // o_unit: "1g"
        // o_updated_time: null
        // o_updated_time2: null
        // progress_status: 10
        // push_c_to_o_time: null
        // qt_number: null
        // updated_time: "2020-08-10T01:05:26.000Z"
        // user: "홍길동"
        function convData( srvData ){
            clnData = []; 
            for( srvDataEntryA in srvData){
                //var clnDataEntry = this.ezDataEntry(2020081902);
                var clnDataEntry = {};
                var srvDataEntry = srvData[srvDataEntryA]; 
                clnDataEntry['No'] = srvDataEntry['idx'] ;
                // clnDataEntry['lastNo'] = srvDataEntry[] ;
                // clnDataEntry['lastTrackId'] = srvDataEntry[] ;
                 clnDataEntry['분류'] =   0;   // srvDataEntry['progress_status'] ;
                clnDataEntry['trackId'] = 2020082001 ; //srvDataEntry[] ;
                clnDataEntry['clientCompany'] = srvDataEntry['company'] ;
                clnDataEntry['clientOwner'] = srvDataEntry['user'] ;
                clnDataEntry['clientMRO'] = srvDataEntry['mro'] ;
                // clnDataEntry['ezOwner'] = srvDataEntry[] ;
                clnDataEntry['재견적'] = srvDataEntry['c_re_request_count'] ;
                // clnDataEntry['CreateOwner'] = srvDataEntry[] ;
                clnDataEntry['견적요청일'] = srvDataEntry['c_requested_time'] ;
                // clnDataEntry['견적회신일'] = srvDataEntry[] ;
                // clnDataEntry['견적만료일'] = srvDataEntry[] ;
                clnDataEntry['Supplier'] = srvDataEntry['c_maker'] ;
                // clnDataEntry['Cas No Changed'] = srvDataEntry[] ;
                // clnDataEntry['Name Changed'] = srvDataEntry[] ;
                // clnDataEntry['Cat No Changed'] = srvDataEntry[] ;
                // clnDataEntry['Unit Changed'] = srvDataEntry[] ;
                // clnDataEntry['ea Changed'] = srvDataEntry[] ;
                // clnDataEntry['purity Changed'] = srvDataEntry[] ;
                clnDataEntry['Cas No'] = srvDataEntry['c_cas_no'] ;
                clnDataEntry['Name'] = srvDataEntry['c_chemical_name'] ;
                clnDataEntry['Cat No'] = srvDataEntry['c_cat_no'] ;
                clnDataEntry['Unit'] = srvDataEntry['c_unit'] ;
                clnDataEntry['ea'] = srvDataEntry['c_qty'] ;
                clnDataEntry['Cas No Ez'] = srvDataEntry['o_cas_no'] ;
                clnDataEntry['Name Ez'] = srvDataEntry['o_chemical_name'] ;
                clnDataEntry['Cat No Ez'] = srvDataEntry['o_cat_no'] ;
                clnDataEntry['Unit Ez'] = srvDataEntry['o_unit'] ;
                clnDataEntry['ea Ez'] = srvDataEntry['o_qty'] ;
                clnDataEntry['Cas No Supplier'] = srvDataEntry['m_cas_no'] ;
                clnDataEntry['Name Supplier'] = srvDataEntry['m_chemical_name'] ;
                clnDataEntry['Cat No Supplier'] = srvDataEntry['m_cat_no'] ;
                clnDataEntry['Unit Supplier'] = srvDataEntry['m_unit'] ;
                clnDataEntry['ea Supplier'] = srvDataEntry['m_qty'] ;
                // clnDataEntry['요청수신일'] = srvDataEntry[] ;
                // clnDataEntry['가격(VAT별도)'] = srvDataEntry[] ;
                clnDataEntry['purity'] = srvDataEntry['c_purity'] ;
                // clnDataEntry['비고'] = srvDataEntry[] ;
                clnDataEntry['Currency'] = srvDataEntry['m_currency'] ;
                // clnDataEntry['Currency Rate'] = srvDataEntry[] ;
                clnDataEntry['Price'] = srvDataEntry['m_price'] ;
                clnDataEntry['Handling Fee'] = srvDataEntry['m_handling_fee'] ;
                clnDataEntry['Shipping Fee'] = srvDataEntry['m_shipping_fee'] ;
                clnDataEntry['Other Charges'] = srvDataEntry['m_other_charges'] ;
                clnDataEntry['Purity Over'] = srvDataEntry['c_is_purity_greater'] ;
                clnDataEntry['purity Ez'] = srvDataEntry['o_purity'] ;
                clnDataEntry['purity Supplier'] = srvDataEntry['m_purity'] ;
                // clnDataEntry['Purity %'] = srvDataEntry[] ;
                // clnDataEntry['purity Ez%'] = srvDataEntry[] ;
                // clnDataEntry['purity Supplier%'] = srvDataEntry[] ;
                clnDataEntry['Remark Client'] = srvDataEntry['c_remark'] ;
                clnDataEntry['Remark Operator'] = srvDataEntry['o_remark'] ;
                clnDataEntry['Remark Supplier'] = srvDataEntry['m_remark'] ;
                clnDataEntry['sameType'] = srvDataEntry['m_is_same_product'] ;
                // clnDataEntry['supplierAvailable'] = srvDataEntry[] ;
                clnDataEntry['dangerousGood'] = srvDataEntry['m_is_dg'] ;
                clnDataEntry['airShipping'] = srvDataEntry['m_is_air_shipping'] ;
                // clnDataEntry['Stock/Lead Time'] = srvDataEntry[] ;
                clnDataEntry['Stock Status'] = srvDataEntry['m_stock_status'] ;
                clnDataEntry['Country of Origin'] = srvDataEntry['m_origin_country'] ;
                clnDataEntry['Country of Shipment'] = srvDataEntry['m_shipment_country'] ;
                clnDataEntry['계약번호'] = srvDataEntry['o_contract_no'] ;
                clnData.push( clnDataEntry );
            }      
            return clnData ;
        }
        this.getData = function(){
        //    return { 'data': ezChemData  , 'dataH': ezChemDataH_save } ;
           return new Promise( function( resolve , reject ){
                resource.get().$promise.then(function(value){
                // SargonI 2020-08-20 data = value.data;
                data = convData( value.data ); 
                resolve( JSON.stringify(data) ); 
            })     
           }) 
        }
        this.postData = function(myJData){
            return new Promise(function( resolve, reject){
                $.ajax({
                    url: 'ajax',                //주소
                    dataType: 'json',                  //데이터 형식
                    type: 'POST',                      //전송 타입
                    data:{'msg': JSON.stringify(myJData)},
                    success: function(result) {          //성공했을 때 함수 인자 값으로 결과 값 나옴
                        if ( result['result'] == 'ok' ) {
                            resolve(result['data']);
                        }
                    } //function끝
                }); // ------      ajax 끝-----------------
            })
        }
        //  RICHARD-CHOI 2020-06-03 11AM.
        // Date 관련  함수 
        this.formatDateAddDay = function( days){
            var d = new Date();
            d.setDate(d.getDate() + days);

            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

            if (month.length < 2) 
            month = '0' + month;
            if (day.length < 2) 
                day = '0' + day;        
            return [year, month, day].join('-');
        }
        this.formatDate = function(date) {
            var d = new Date(date),
                month = '' + (d.getMonth() + 1),
                day = '' + d.getDate(),
                year = d.getFullYear();
        
            if (month.length < 2) 
                month = '0' + month;
            if (day.length < 2) 
                day = '0' + day;
        
            return [year, month, day].join('-');
        }
        this.returnTodayStr = function(){
            var now = new Date();
            year = now.getYear();            // 현재 년도 가져오기
            year += 1900; 
            month = now.getMonth()+1;        // 현재 월 가져오기 (+1)
            if((month+"").length < 2){       //월이 '7'로 찍히지 않고 '07'로 찍히도록 길이를 받아온다
                 month = "0" +month;         //길이가 1이라면 앞에 0을 붙여서 '07'형태로 나오게 한다
            }
            date = now.getDate();            // 현재 날짜 가져오기
            if((date+"").length < 2){        //일이 '7'로 찍히지 않고 '07'로 찍히도록 길이를 받아온다
                date = "0" +date;            //길이가 1이라면 앞에 0을 붙여서 '07'형태로 나오게 한다
            }
            return year +"-"+ month +"-"+ date ;           //오늘 날짜 ex) 20080801
        }
        this.checkRqDate = function( qtDeadLine_date ){
            var now = new Date();
            year = now.getYear();          // 현재 년도 가져오기
            year += 1900; 
            month = now.getMonth()+1;      // 현재 월 가져오기 (+1)
            if((month+"").length < 2){     //월이 '7'로 찍히지 않고 '07'로 찍히도록 길이를 받아온다
                 month = "0" +month;       //길이가 1이라면 앞에 0을 붙여서 '07'형태로 나오게 한다
            }
            date = now.getDate();          // 현재 날짜 가져오기
            if((date+"").length < 2){      //일이 '7'로 찍히지 않고 '07'로 찍히도록 길이를 받아온다
                date = "0" +date;          //길이가 1이라면 앞에 0을 붙여서 '07'형태로 나오게 한다
            }
            today = year +""+ month +""+ date ;           //오늘 날짜 ex) 20080801
            var InputDate = qtDeadLine_date ; 
            var dateSplit = InputDate.split("-");         //입력값을 '-'을 기준으로 나누어 배열에 저장해 주는 함수 split

            year = dateSplit[0];      //첫번째 배열은 년
            month = dateSplit[1];     //월
            day = dateSplit[2];       //일
            InputDate = year +""+ month +""+ day;                 // 입력된 값을 더해준다.

        //     if (parseInt(InputDate) < parseInt(today) ){          //int형으로 변환하여 비교한다
        //          alert("오늘 날짜보다 이전 날짜입니다.");
        //     }  
            return parseInt(InputDate) < parseInt(today);
         }
        //  Data handling Serices Intergation. 
        this.minEzMargin = 3000 ; 
        this.rateOp = 100 ; // % 100 , non %  1 
        this.currentRate = {
            "USD" : 1.25 ,
            "JPN" : 1.5,
            "CHN" : 30
        }
        this.ezDataEntry = function (numNo){
            return {"No": numNo,
                    "lastNo": "",
                    "lastTrackId": "",
                    "분류": 0,
                    "trackId": "",
                    "clientCompany":"LG C&R",
                    "clientOwner":"정기태",
                    "clientMRO":"LG MR",
                    "ezOwner":"최종규",
                    "재견적":0,
                    "CreateOwner":0,
                    "견적요청일": null,
                    "견적회신일": null,
                    "견적만료일": null,
                    "Supplier": "Dupont C",
                    "Cas No Changed":0,
                    "Name Changed":0,
                    "Cat No Changed":0,
                    "Unit Changed":0,
                    "ea Changed":0,
                    "purity Changed": 0,
                    "Cas No": "",
                    "Name": "",
                    "Cat No": "",
                    "Unit": "",
                    "ea": 1,
                    "Cas No Ez": "",
                    "Name Ez": "",
                    "Cat No Ez": "",
                    "Unit Ez": "",
                    "ea Ez": "",
                    "Cas No Supplier": "",
                    "Name Supplier": "",
                    "Cat No Supplier": "",
                    "Unit Supplier": "",
                    "ea Supplier": "",
                    "요청수신일": "",
                    "가격(VAT별도)": "",
                    "납기": {min:0,minEnd: 'Week', max:0, maxEnd: 'Week'},
                    "납기 Ez": { min:0,minEnd: "Week", max:4, maxEnd: "Week"},
                    "purity": "",
                    "비고": "",
                    "Currency": "",
                    "Currency Rate": 1,
                    "Price": 0,
                    "Handling Fee":0,
                    "Shipping Fee":0,
                    "Other Charges": 0,
                    "Purity Over":0,   // bit define : 0 bit - Client(1) , 1 bit - Operator(2) , 2 bit -Supplier(4)  
                    "purity Ez": "",
                    "purity Supplier": "",
                    "Purity %": 0,
                    "purity Ez%": 0,
                    "purity Supplier%": 0,
                    "Remark Client":"",
                    "Remark Operator":"",
                    "Remark Supplier":"",
                    "sameType": 0,
                    "supplierAvailable": 0,
                    "dangerousGood":3,   // 3 out of selection unselected.. 
                    "airShipping": 0,
                    "Stock/Lead Time": "",
                    "Stock Status":0 ,   // bit define : 0 bit - Supplier(1) 1 bit - Ez(2)
                    "Country of Origin": "",
                    "Country of Shipment": "",
                    "계약번호":"",
                    "Ez Margin": { "기타비용(외화)": 0,
                                   "기타비용1(한화)":0,
                                   "기타비용2(한화)":0,
                                   "기타비용3(한화)":0,
                                   "MRO Fee":0,
                                   "1 Fee":0,
                                   "str판매가 수기계산가격":"",
                                   "판매가 수기계산가격":0,
                                   "strMRO판매가 수기계산가격":"",
                                   "MRO판매가 수기계산가격":0,
                                   "관세율":0,
                                   "환율보정율":0,
                                   "마진율":0
                 }
                };
        }
    }]);
