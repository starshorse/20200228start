function importJSON( spreadJson ){
	var ss = GC.Spread.Sheets.findControl( document.getElementById("ss"));
	if( spreadJson.version && spreadJson.sheets ){
		ss.fromJSON( spreadJson );
		ss.focus(); 
	}
}
function importSpreadFromExcel( file, options ){
	excelIO.open(
		file,
		function( json ){
			importJSON( json );
		},
		function(e){
			console.log(e);
		},
		options
	);
}
function importSpreadFromJSON( file ){
	function importSuccessCallback( responseText ){
		var spreadJson = JSON.parse( responseText );
		importJSON( spreadJson )
	}
	var reader = new FileReader()
	reader.onload = function(){
		importSuccessCallback( this.result ) 
	}
	reader.readAsText( file )
	return true 
}
function importFile(file){
	var fileName = file.name;
	var index = fileName.lastIndexOf(".");
	var fileExt = fileName.substr( index + 1 ).toLowerCase();
	if( fileExt === "json" || fileExt === "ssjson" ){
		importSpreadFromJSON( file );
	}else if( fileExt  === "xlsx" ){
		importSpreadFromExcel( file ); 
	}
}
function processFileSelected(){
	var fileSelector = document.getElementById("fileSelector");
	var file = fileSelector.files[0];
	if(!file) return false;
	fileSelector.innerHTML ="";
	return importFile( file );
}
