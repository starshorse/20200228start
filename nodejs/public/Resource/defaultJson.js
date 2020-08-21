var ezChemDataH = [
  {
    "data": "No",
    "title": "No"
  },
  {
    "data": "분류",
    "title": "분류"
  },
  {
    "data": "trackId",
    "title": "trackId"
  },
  {
    "data": "견적회신일",
    "title": "견적회신일"
  },
  {
    "data": "Cas No",
    "title": "Cas No"
  },
  {
    "data": "Name",
    "title": "Name"
  },
  {
    "data": "Supplier",
    "title": "Supplier"
  },
  {
    "data": "Cat No",
    "title": "Cat No"
  },
  {
    "data": "Unit",
    "title": "Unit"
  },
  {
    "data": "ea",
    "title": "ea"
  },
  {
    "data": "요청수신일",
    "title": "요청수신일"
  },
  {
    "data": "가격(VAT별도)",
    "title": "가격(VAT별도)"
  },
  {
    "data": "납기",
    "title": "납기"
  },
  {
    "data": "purity",
    "title": "purity"
  },
  {
    "data": "비고",
    "title": "비고"
  },
  {
    "data": "Currency",
    "title": "Currency"
  },
  {
    "data": "Price",
    "title": "Price"
  },
  {
    "data": "Other Charges",
    "title": "Other Charges"
  },
  {
    "data": "Purity %",
    "title": "Purity %"
  },
  {
    "data": "Stock/Lead Time",
    "title": "Stock/Lead Time"
  },
  {
    "data": "Country of Origin",
    "title": "Country of Origin"
  },
  {
    "data": "Country of Shipment",
    "title": "Country of Shipment"
  }
];
  var ezChemDataH_save = [
    {
      "data": null,
      "title": "ㅁ",
      "render": function ( data, type, row ) {
        return '<input type="checkbox" data-no =' + row['No'] + ' >';
      }
    },
      {
      "data": "Cas No",
      "title": "Cas No"
    },
    {
      "data": "Name",
      "title": "Name"
    },
    {
      "data": "Cat No",
      "title": "Cat No"
    },
    {
      "data": "Unit",
      "title": "Unit"
    },
    {
      "data": "purity",
      "title": "purity"
    },
    {
      "data": "ea",
      "title": "ea"
    },
    {
      "data": "비고",
      "title": "비고"
    },
    {
      "data": null,
      "title": "이미지",
      "render": function ( data, type, row ) {
        return '<button><a href="pixViewer.html">Image<a></button>';
      }
    }
  ];  
  var ezChemDataH_qtRequest = [
    {
      "data": null,
      "title": "ㅁ",
      "render": function ( data, type, row ) {
        return '<input type="checkbox">' + row['재견적'];
      }
    },
    {
      "data": "trackId",
      "title": "Track Id"
    },
    {
      "data": "견적요청일",
      "title": "제출일시"
    },    
    {
      "data": null,
      "title": "진행상태",
      "render": function ( data, type, row ) {
        var class2Name = ['임시저장','접수완료','견적의뢰','견적회신','견적제출']; 
        var class2NameProblem =['견적거절','견적지연'];
        return  class2Name[row['분류']];
      }
    },
    {
      "data": "Cas No",
      "title": "Cas No"
    },
    {
      "data": "Name",
      "title": "물질명"
    },
    {
      "data": "Cat No",
      "title": "Cat No"
    },
    {
      "data": "Unit",
      "title": "단위"
    },
    {
      "data": "ea",
      "title": "수량"
    },
    {
      "data": "purity",
      "title": "순도"
    },
    {
      "data": "비고",
      "title": "비고"
    },
    {
      "data": null,
      "title": "이미지",
      "render": function ( data, type, row ) {
        return '<button><a href="pixViewer.html">Image<a></button>';
      }
    }
  ];
  var ezChemDataH_qtComplete = [
    {
      "data": null,
      "title": "ㅁ",
      "render": function ( data, type, row ) {
        console.dir(row); 
        return '<input type="checkbox" data-no =' + row['No'] + ' >' + row['재견적'];
      }
    },
      {
      "data": "trackId",
      "title": "trackId"
    },
    {
      "data": "견적회신일",
      "title": "견적회신일"
    },
    {
      "data": "Cas No Supplier",
      "title": "Cas No"
    },
    {
      "data": "Name Supplier",
      "title": "Name"
    },
    {
      "data": "Supplier",
      "title": "Supplier"
    },
    {
      "data": "Cat No Supplier",
      "title": "Cat No"
    },
    {
      "data": "Unit Supplier",
      "title": "Unit"
    },
    {
      "data": "ea Supplier",
      "title": "ea"
    },
    {
      "data": "가격(VAT별도)",
      "title": "가격(VAT별도)"
    },
    {
      "data": "납기",
      "title": "납기",
      "render": function( data, type, row ){
        return ( parseInt(row['납기 Ez'].min) + parseInt(data.min) ) +' '+ data.minEnd +'~' + ( parseInt(row['납기 Ez'].max) + parseInt( data.max ) ) +' ' + data.maxEnd ;  
      }
    },
    {
      "data": "purity",
      "title": "purity"
    },
    {
      "data": "비고",
      "title": "비고"
    },
    {
      "data": null,
      "title": "이미지",
      "render": function ( data, type, row ) {
        return '<button><a href="pixViewer.html">Image<a></button>';
      }
    }
  ];
  var ezChemDataH_qtReply = [
    {
      "data": null,
      "title": "ㅁ",
      "render": function ( data, type, row ) {
        return '<input type="checkbox">' + row['재견적'];
      }
    },
    {
      "data": "Cas No Supplier",
      "title": "Cas No"
    },
    {
      "data": "Cat No Supplier",
      "title": "Cat No"
    },
    {
      "data": "Unit Supplier",
      "title": "Unit"
    },
    {
      "data": "ea Supplier",
      "title": "ea"
    },
    {
      "data": "요청수신일",
      "title": "요청수신일"
    },
    {
      "data": "가격(VAT별도)",
      "title": "가격(VAT별도)"
    },
    {
      "data": "납기",
      "title": "납기",
      "render": function( data, type, row ){
        return ( parseInt( row['납기 Ez'].min ) + parseInt( data.min) ) +' '+ data.minEnd +'~' + ( parseInt(row['납기 Ez'].max) + parseInt( data.max ) ) +' ' + data.maxEnd ;  
      }
    },
    {
      "data": "purity Supplier",
      "title": "purity"
    },
    {
      "data": "Currency",
      "title": "Currency"
    },
    {
      "data": "Price",
      "title": "Price"
    },
    {
      "data": "Other Charges",
      "title": "Other Charges"
    },
    {
      "data": "Purity %",
      "title": "Purity %"
    },
    {
      "data": "Stock/Lead Time",
      "title": "Stock/Lead Time"
    },
    {
      "data": "Country of Origin",
      "title": "Country of Origin"
    },
    {
      "data": "Country of Shipment",
      "title": "Country of Shipment"
    },
    {
      "data": null,
      "title": "이미지",
      "render": function ( data, type, row ) {
        return '<button><a href="pixViewer.html">Image<a></button>';
      }
    }
  ];  
var ezChemData = [
  {
    "No": 1,
    "분류": 2,
    "trackId": "20-0-0000",
    "견적요청일": "2020-06-02",
    "견적회신일": "2020-06-13",
    "Cas No": "1341446-83-0",
    "Name": "3-cyclobutylprop-2-ynoic acid",
    "Supplier": "enamine",
    "Cat No": "EN300-127644",
    "Unit": "1g",
    "ea": 1,
    "요청수신일": "2019-12-31",
    "가격(VAT별도)": "1,041,000",
    "납기": "2~3주",
    "purity": "95%",
    "비고": "",
    "Currency": "USD",
    "Price": 656,
    "Other Charges": 25,
    "Purity %": "98%",
    "Stock/Lead Time": "In Stock",
    "Country of Origin": "China",
    "Country of Shipment": "US"
  },
  {
    "No": 2,
    "분류": 2,
    "trackId": "20-0-0001",
    "견적요청일": "2020-06-02",
    "견적회신일": "2020-06-13",
    "Cas No": "1341446-83-0",
    "Name": "3-cyclobutylprop-2-ynoic acid",
    "Supplier": "enamine",
    "Cat No": "EN300-127644",
    "Unit": "2g",
    "ea": 1,
    "요청수신일": "2019-12-31",
    "가격(VAT별도)": "1,772,000",
    "납기": "2~3주",
    "purity": "95%",
    "비고": "",
    "Currency": "USD",
    "Price": 1903,
    "Other Charges": 25,
    "Purity %": "98%",
    "Stock/Lead Time": "In Stock",
    "Country of Origin": "China",
    "Country of Shipment": "US"
  },
  {
    "No": 3,
    "분류": 2,
    "trackId": "20-0-0002",
    "견적요청일": "2020-06-02",
    "견적회신일": "2020-06-13",
    "Cas No": "1341446-83-0",
    "Name": "3-cyclobutylprop-2-ynoic acid",
    "Supplier": "enamine",
    "Cat No": "EN300-127644",
    "Unit": "5g",
    "ea": 1,
    "요청수신일": "2019-12-31",
    "가격(VAT별도)": "2,857,000",
    "납기": "2~3주",
    "purity": "95%",
    "비고": "",
    "Currency": "USD",
    "Price": 699,
    "Other Charges": 25,
    "Purity %": "98%",
    "Stock/Lead Time": "In Stock",
    "Country of Origin": "US",
    "Country of Shipment": "US"
  },
  {
    "No": 4,
    "분류": 2,
    "trackId": "20-0-0003",
    "견적요청일": "2020-06-02",
    "견적회신일": "2020-06-13",
    "Cas No": "1341446-83-0",
    "Name": "3-cyclobutylprop-2-ynoic acid",
    "Supplier": "chemspace",
    "Cat No": "CSC000697834",
    "Unit": "1g",
    "ea": 1,
    "요청수신일": "2019-12-31",
    "가격(VAT별도)": "1,067,000",
    "납기": "2~3주",
    "purity": "95%",
    "비고": "",
    "Currency": "USD",
    "Price": 2028,
    "Other Charges": 25,
    "Purity %": "98%",
    "Stock/Lead Time": "In Stock",
    "Country of Origin": "US",
    "Country of Shipment": "US"
  },
  {
    "No": 5,
    "분류": 2,
    "trackId": "20-0-0004",
    "견적요청일": "2020-06-02",
    "견적회신일": "2020-06-13",
    "Cas No": "1341446-83-0",
    "Name": "3-cyclobutylprop-2-ynoic acid",
    "Supplier": "chemspace",
    "Cat No": "CSC000697834",
    "Unit": "5g",
    "ea": 1,
    "요청수신일": "2019-12-31",
    "가격(VAT별도)": "2,757,000",
    "납기": "2~3주",
    "purity": "95%",
    "비고": "",
    "Currency": "USD",
    "Price": 656,
    "Other Charges": 25,
    "Purity %": "98%",
    "Stock/Lead Time": "In Stock",
    "Country of Origin": "China",
    "Country of Shipment": "US"
  },
  {
    "No": 6,
    "분류": 2,
    "trackId": "20-0-0005",
    "견적요청일": "2020-06-02",
    "견적회신일": "2020-06-13",
    "Cas No": "1341446-83-0",
    "Name": "3-cyclobutylprop-2-ynoic acid",
    "Supplier": "ambeed",
    "Cat No": "A337624",
    "Unit": "1g",
    "ea": 1,
    "요청수신일": "2019-12-31",
    "가격(VAT별도)": "1,159,000",
    "납기": "7~8주",
    "purity": "95%",
    "비고": "",
    "Currency": "USD",
    "Price": 1903,
    "Other Charges": 25,
    "Purity %": "98%",
    "Stock/Lead Time": "In Stock",
    "Country of Origin": "China",
    "Country of Shipment": "US"
  },
  {
    "No": 7,
    "분류": 2,
    "trackId": "20-0-0006",
    "견적요청일": "2020-06-02",
    "견적회신일": "2020-06-13",
    "Cas No": "1341446-83-0",
    "Name": "3-cyclobutylprop-2-ynoic acid",
    "Supplier": "ambeed",
    "Cat No": "A337624",
    "Unit": "5g",
    "ea": 1,
    "요청수신일": "2019-12-31",
    "가격(VAT별도)": "3,082,000",
    "납기": "7~8주",
    "purity": "95%",
    "비고": "",
    "Currency": "USD",
    "Price": 699,
    "Other Charges": 25,
    "Purity %": "98%",
    "Stock/Lead Time": "In Stock",
    "Country of Origin": "US",
    "Country of Shipment": "US"
  },
  {
    "No": 8,
    "분류": 2,
    "trackId": "20-0-0007",
    "견적요청일": "2020-06-02",
    "견적회신일": "2020-06-13",
    "Cas No": "6053-88-9",
    "Name": "3-cyclopentylprop-2-ynoic acid",
    "Supplier": "enamine",
    "Cat No": "EN300-658952",
    "Unit": "1g",
    "ea": 1,
    "요청수신일": "2019-12-31",
    "가격(VAT별도)": "1,103,000",
    "납기": "6~7주",
    "purity": "95%",
    "비고": "",
    "Currency": "USD",
    "Price": 2028,
    "Other Charges": 25,
    "Purity %": "98%",
    "Stock/Lead Time": "In Stock",
    "Country of Origin": "US",
    "Country of Shipment": "US"
  },
  {
    "No": 9,
    "분류": 2,
    "trackId": "20-0-0008",
    "견적요청일": "2020-06-02",
    "견적회신일": "2020-06-13",
    "Cas No": "6053-88-9",
    "Name": "3-cyclopentylprop-2-ynoic acid",
    "Supplier": "enamine",
    "Cat No": "EN300-658952",
    "Unit": "5g",
    "ea": 1,
    "요청수신일": "2019-12-31",
    "가격(VAT별도)": "3,039,000",
    "납기": "6~7주",
    "purity": "95%",
    "비고": "",
    "Currency": "USD",
    "Price": 656,
    "Other Charges": 25,
    "Purity %": "98%",
    "Stock/Lead Time": "In Stock",
    "Country of Origin": "China",
    "Country of Shipment": "US"
  },
  {
    "No": 10,
    "분류": 2,
    "trackId": "20-0-0009",
    "견적요청일": "2020-06-02",
    "견적회신일": "2020-06-13",
    "Cas No": "6053-88-9",
    "Name": "3-cyclopentylprop-2-ynoic acid",
    "Supplier": "chemspace",
    "Cat No": "CSC012100294",
    "Unit": "1g",
    "ea": 1,
    "요청수신일": "2019-12-31",
    "가격(VAT별도)": "1,126,000",
    "납기": "6~7주",
    "purity": "95%",
    "비고": "",
    "Currency": "USD",
    "Price": 1903,
    "Other Charges": 25,
    "Purity %": "98%",
    "Stock/Lead Time": "In Stock",
    "Country of Origin": "China",
    "Country of Shipment": "US"
  },
  {
    "No": 11,
    "분류": 2,
    "trackId": "20-0-0010",
    "견적요청일": "2020-06-02",
    "견적회신일": "2020-06-13",
    "Cas No": "6053-88-9",
    "Name": "3-cyclopentylprop-2-ynoic acid",
    "Supplier": "chemspace",
    "Cat No": "CSC012100294",
    "Unit": "5g",
    "ea": 1,
    "요청수신일": "2019-12-31",
    "가격(VAT별도)": "2,926,000",
    "납기": "6~7주",
    "purity": "95%",
    "비고": "",
    "Currency": "USD",
    "Price": 699,
    "Other Charges": 25,
    "Purity %": "98%",
    "Stock/Lead Time": "In Stock",
    "Country of Origin": "US",
    "Country of Shipment": "US"
  },
  {
    "No": 12,
    "분류": 2,
    "trackId": "20-0-0011",
    "견적요청일": "2020-06-02",
    "견적회신일": "2020-06-13",
    "Cas No": "6053-88-9",
    "Name": "3-Cyclopentylprop-2-ynoic acid",
    "Supplier": "ambeed",
    "Cat No": "A1117430",
    "Unit": "1g",
    "ea": 1,
    "요청수신일": "2019-12-31",
    "가격(VAT별도)": "1,526,000",
    "납기": "7~8주",
    "purity": "95%",
    "비고": "",
    "Currency": "USD",
    "Price": 2028,
    "Other Charges": 25,
    "Purity %": "98%",
    "Stock/Lead Time": "In Stock",
    "Country of Origin": "US",
    "Country of Shipment": "US"
  },
  {
    "No": 13,
    "분류": 2,
    "trackId": "20-0-0012",
    "견적요청일": "2020-06-02",
    "견적회신일": "2020-06-13",
    "Cas No": "6053-88-9",
    "Name": "3-Cyclopentylprop-2-ynoic acid",
    "Supplier": "ambeed",
    "Cat No": "A1117430",
    "Unit": "5g",
    "ea": 1,
    "요청수신일": "2019-12-31",
    "가격(VAT별도)": "4,087,000",
    "납기": "7~8주",
    "purity": "95%",
    "비고": "",
    "Currency": "USD",
    "Price": 2028,
    "Other Charges": 25,
    "Purity %": "98%",
    "Stock/Lead Time": "In Stock",
    "Country of Origin": "US",
    "Country of Shipment": "US"
  },
  {
    "No": 14,
    "분류": 0,
    "trackId": "",
    "견적요청일": "2020-06-02",
    "견적회신일": "2020-06-13",
    "Cas No": "1341446-83-0",
    "Name": "3-cyclobutylprop-2-ynoic acid",
    "Supplier": "",
    "Cat No": "",
    "Unit": "1g",
    "ea": 1,
    "요청수신일": "",
    "가격(VAT별도)": "",
    "납기": "",
    "purity": "95%",
    "비고": "",
    "Currency": "",
    "Price": "",
    "Other Charges": "",
    "Purity %": "",
    "Stock/Lead Time": "",
    "Country of Origin": "",
    "Country of Shipment": ""
  },
  {
    "No": 15,
    "분류": 0,
    "trackId": "",
    "견적요청일": "2020-06-02",
    "견적회신일": "2020-06-13",
    "Cas No": "1341446-83-0",
    "Name": "3-cyclobutylprop-2-ynoic acid",
    "Supplier": "",
    "Cat No": "",
    "Unit": "5g",
    "ea": 1,
    "요청수신일": "",
    "가격(VAT별도)": "",
    "납기": "",
    "purity": "95%",
    "비고": "",
    "Currency": "",
    "Price": "",
    "Other Charges": "",
    "Purity %": "",
    "Stock/Lead Time": "",
    "Country of Origin": "",
    "Country of Shipment": ""
  },
  {
    "No": 16,
    "분류": 1,
    "trackId": "20-0-0013",
    "견적요청일": "2020-06-02",
    "견적회신일": "2020-06-13",
    "Cas No": "6053-88-9",
    "Name": "3-cyclopentylprop-2-ynoic acid",
    "Supplier": "",
    "Cat No": "",
    "Unit": "1g",
    "ea": 1,
    "요청수신일": "",
    "가격(VAT별도)": "",
    "납기": "",
    "purity": "95%",
    "비고": "",
    "Currency": "",
    "Price": "",
    "Other Charges": "",
    "Purity %": "",
    "Stock/Lead Time": "",
    "Country of Origin": "",
    "Country of Shipment": ""
  },
  {
    "No": 17,
    "분류": 1,
    "trackId": "20-0-0014",
    "견적요청일": "2020-06-02",
    "견적회신일": "2020-06-13",
    "Cas No": "6053-88-9",
    "Name": "3-cyclopentylprop-2-ynoic acid",
    "Supplier": "",
    "Cat No": "",
    "Unit": "5g",
    "ea": 1,
    "요청수신일": "",
    "가격(VAT별도)": "",
    "납기": "",
    "purity": "95%",
    "비고": "",
    "Currency": "",
    "Price": "",
    "Other Charges": "",
    "Purity %": "",
    "Stock/Lead Time": "",
    "Country of Origin": "",
    "Country of Shipment": ""
  }
];