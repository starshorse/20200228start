var ezChemDataH_qtRequest2supplier = [
    {
      "data": null,
      "title": "ㅁ",
      "render": function ( data, type, row ) {

        var Owner = (row['CreateOwner'])? "Ez":""; 
        return '<input type="checkbox">' + row['재견적'] + Owner;
      }
    },
    {
      "data": "trackId",
      "title": "Track Id"
    },
    {
      "data": "견적요청일",
      "title": "Submitted Date"
    },
    {
      "data": "Cas No Ez",
      "title": "Cas No"
    },
    {
      "data": "Name Ez",
      "title": "Chemical Name"
    },
    {
      "data": "Cat No Ez",
      "title": "Cat No"
    },
    {
      "data": "Unit Ez",
      "title": "Unit"
    },
    {
      "data": "ea Ez",
      "title": "EA"
    },
    {
      "data": "purity Ez",
      "title": "Purity"
    },
    {
      "data": "비고",
      "title": "Remarks"
    },
    {
      "data": null,
      "title": "Structure",
      "render": function ( data, type, row ) {
        return '<button><a href="pixViewer.html">Image<a></button>';
      }
    }
  ];
  var ezChemDataH_qtRequest2client = [
    {
      "data": null,
      "title": "ㅁ",
      "render": function ( data, type, row ) {
        var Owner = (row['CreateOwner'])? "Ez":""; 
        return '<input type="checkbox">' + row['재견적'] + Owner;
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
      "data": "Cas No Supplier",
      "title": "Cas No"
    },
    {
      "data": "Name Supplier",
      "title": "물질명"
    },
    {
      "data": "Cat No Supplier",
      "title": "Cat No"
    },
    {
      "data": "Unit Supplier",
      "title": "단위"
    },
    {
      "data": "ea Supplier",
      "title": "수량"
    },
    {
      "data": "purity Supplier",
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