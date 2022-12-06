
window.onload  = function() {
    var spread = new GC.Spread.Sheets.Workbook(document.getElementById("ss"));
    initSpread(spread);
};

function initSpread(spread) {
    var spreadNS = GC.Spread.Sheets;

    var sheet = spread.getSheet(0);
    sheet.bind(spreadNS.Events.SelectionChanged, function() {
        propertyChange(false);
    });
    sheet.suspendPaint();

    sheet.setColumnWidth(1, 120);
    sheet.setColumnWidth(2, 150);

    sheet.setRowHeight(1, 35);
    sheet.setValue(1, 1, "caption");
    sheet.getCell(1, 1).hAlign(GC.Spread.Sheets.HorizontalAlign.center).vAlign(GC.Spread.Sheets.VerticalAlign.center).foreColor("green");
    var captionCellType = new GC.Spread.Sheets.CellTypes.CheckBox();
    captionCellType.caption("Caption");
    sheet.setCellType(1, 2, captionCellType);
    sheet.getCell(1, 2).hAlign(GC.Spread.Sheets.HorizontalAlign.center).vAlign(GC.Spread.Sheets.VerticalAlign.center);


    sheet.setRowHeight(3, 35);
    sheet.setValue(3, 1, "threeState");
    sheet.getCell(3, 1).hAlign(GC.Spread.Sheets.HorizontalAlign.center).vAlign(GC.Spread.Sheets.VerticalAlign.center).foreColor("red");
    var threeStateCellType = new GC.Spread.Sheets.CellTypes.CheckBox();
    threeStateCellType.isThreeState(false);
    threeStateCellType.textTrue("Checked!");
    threeStateCellType.textFalse("Check Me!");
    sheet.setCellType(3, 2, threeStateCellType);
    sheet.getCell(3, 2).hAlign(GC.Spread.Sheets.HorizontalAlign.center).vAlign(GC.Spread.Sheets.VerticalAlign.center);

    sheet.setRowHeight(5, 35);
    sheet.setValue(5, 1, "textAlign");
    sheet.getCell(5, 1).hAlign(GC.Spread.Sheets.HorizontalAlign.center).vAlign(GC.Spread.Sheets.VerticalAlign.center).foreColor("blue");
    var textAlignCellType = new GC.Spread.Sheets.CellTypes.CheckBox();
    textAlignCellType.isThreeState(false);
    textAlignCellType.caption("textAlign");
    textAlignCellType.textAlign(GC.Spread.Sheets.CellTypes.CheckBoxTextAlign.bottom);
    sheet.setCellType(5, 2, textAlignCellType);
    sheet.getCell(5, 2).hAlign(GC.Spread.Sheets.HorizontalAlign.center).vAlign(GC.Spread.Sheets.VerticalAlign.center);

    sheet.resumePaint();

    _getElementById("changeProperty").addEventListener('click',function() {
        propertyChange(true);
    });

    function propertyChange(isSet) {
        var sheet = spread.getActiveSheet();
        var sels = sheet.getSelections();
        if (sels && sels.length > 0) {
            var sel = getActualRange(sels[0], sheet.getRowCount(), sheet.getColumnCount());
            var checkboxCellType = sheet.getCellType(sel.row, sel.col);
            if (!(checkboxCellType instanceof spreadNS.CellTypes.CheckBox)) {
                _getElementById("changeProperty").setAttribute("disabled", 'disabled');
                return;
            }
            if (!isSet) {
                _getElementById("changeProperty").removeAttribute("disabled");
                if(checkboxCellType.caption()) {
                    _getElementById("txtCheckBoxCellTextCaption").parentNode.style.display="block";
                    _getElementById("txtCheckBoxCellTextCaption").value=checkboxCellType.caption();
                    _getElementById("txtCheckBoxCellTextTrue").parentNode.style.display="none";
                    _getElementById("ckbCheckBoxCellIsThreeState").parentNode.style.display="none";
                } else {
                    _getElementById("txtCheckBoxCellTextCaption").parentNode.style.display="none";
                    _getElementById("txtCheckBoxCellTextTrue").parentNode.style.display="block";
                    _getElementById("ckbCheckBoxCellIsThreeState").parentNode.style.display="block";
                    _getElementById("txtCheckBoxCellTextTrue").value=checkboxCellType.textTrue();
                    _getElementById("txtCheckBoxCellTextIndeterminate").value=checkboxCellType.textIndeterminate();
                    _getElementById("txtCheckBoxCellTextFalse").value=checkboxCellType.textFalse();
                    _getElementById("ckbCheckBoxCellIsThreeState").checked=checkboxCellType.isThreeState();
                    _getElementById("checkboxSize").value = checkboxCellType.boxSize();
                }
                _getElementById("selCheckBoxCellAlign").value=checkboxCellType.textAlign();

            } else {
                if(checkboxCellType.caption()) {
                    checkboxCellType.caption(_getElementById("txtCheckBoxCellTextCaption").value);
                } else {
                    checkboxCellType.textTrue(_getElementById("txtCheckBoxCellTextTrue").value);
                    checkboxCellType.textIndeterminate(_getElementById("txtCheckBoxCellTextIndeterminate").value);
                    checkboxCellType.textFalse(_getElementById("txtCheckBoxCellTextFalse").value);
                    checkboxCellType.isThreeState(_getElementById("ckbCheckBoxCellIsThreeState").checked);
                    var boxSizeValue = _getElementById("checkboxSize").value;
                    var boxSize = Number(boxSizeValue);
                    if (isNaN(boxSize)) {
                        checkboxCellType.boxSize(boxSizeValue);
                    } else {
                        checkboxCellType.boxSize(boxSize);
                    }
                }
                checkboxCellType.textAlign(_getElementById("selCheckBoxCellAlign").value - 0);
            }
        }
        sheet.repaint();
    }

    function getActualRange(range, maxRowCount, maxColCount) {
        var row = range.row < 0 ? 0 : range.row;
        var col = range.col < 0 ? 0 : range.col;
        var rowCount = range.rowCount < 0 ? maxRowCount : range.rowCount;
        var colCount = range.colCount < 0 ? maxColCount : range.colCount;

        return new spreadNS.Range(row, col, rowCount, colCount);
    }
}

function _getElementById(id){
    return document.getElementById(id);
}
        