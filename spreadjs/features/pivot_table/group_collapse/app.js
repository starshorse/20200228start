window.onload = function () {
    let spread = new GC.Spread.Sheets.Workbook(document.getElementById("ss"), {sheetCount: 2});
    initSpread(spread);
};

function initSpread(spread) {
    spread.suspendPaint();
    let sheet1 = spread.getSheet(0);
    let sheet2 = spread.getSheet(1);
    let tableName = getSource(sheet2, pivotSales);
    let pivotTable = addPivotTable(sheet1, tableName);
    bindEvent(pivotTable,spread);
    spread.resumePaint();
}

function getSource(sheet, tableSource){
    sheet.name("DataSource");
    sheet.setRowCount(117);
    sheet.setColumnWidth(0, 120);
    sheet.getCell(-1, 0).formatter("YYYY-mm-DD");
    sheet.getRange(-1,4,0,2).formatter("$ #,##0");
    let table = sheet.tables.add('table', 0, 0, 117, 6);
    for(let i=2;i<=117;i++)
    {
        sheet.setFormula(i-1,5,'=D'+i+'*E'+i)
    }
    table.style(GC.Spread.Sheets.Tables.TableThemes["none"]);
    sheet.setArray(0, 0, tableSource);
    return table.name();
}

function addPivotTable(sheet, source){
    sheet.suspendPaint();
    sheet.name("PivotTable");
    sheet.setRowCount(10000);
    let pivotTable = sheet.pivotTables.add("PivotTable", source, 1, 1, GC.Spread.Pivot.PivotTableLayoutType.outline, GC.Spread.Pivot.PivotTableThemes.light8);
    pivotTable.suspendLayout();
    pivotTable.add("salesperson", "Salesperson", GC.Spread.Pivot.PivotTableFieldType.rowField);
    pivotTable.add("car", "Cars", GC.Spread.Pivot.PivotTableFieldType.rowField);
    pivotTable.add("date", "Date", GC.Spread.Pivot.PivotTableFieldType.columnField);
    let dateField = pivotTable.getField('Date');
    let start = dateField.start;
    let end = dateField.end;
    let groupInfo = { originFieldName: "date", dateGroups: [{ by: GC.Pivot.DateGroupType.quarters, start: start, end: end }] };
    pivotTable.group(groupInfo);
    pivotTable.add("total", "Totals", GC.Spread.Pivot.PivotTableFieldType.valueField, GC.Pivot.SubtotalType.sum);
    pivotTable.resumeLayout();
    sheet.resumePaint();
    pivotTable.autoFitColumn();
    return pivotTable;
}

function bindEvent(pivotTable,spread){
    document.getElementById("group-date").addEventListener("click",function(e){
        spread.suspendPaint();
        if(e.target.checked){
            let dateField = pivotTable.getField('Date');
            let start = dateField.start;
            let end = dateField.end;
            let groupInfo = { originFieldName: "date", dateGroups: [{ by: GC.Pivot.DateGroupType.quarters, start: start, end: end }] };
            pivotTable.group(groupInfo);
        } else {
            pivotTable.ungroup("date");
        }
        spread.resumePaint();
    });
    document.getElementById("collapse-region").addEventListener("click",function(e){
        spread.suspendPaint();
        let isCollapse = false;
        if(e.target.checked){
            isCollapse = true;
        }
        pivotTable.collapse("Salesperson","Alan",isCollapse);
        pivotTable.collapse("Salesperson","Bob",isCollapse);
        pivotTable.collapse("Salesperson","John",isCollapse);
        pivotTable.collapse("Salesperson","Serena",isCollapse);
        pivotTable.collapse("Salesperson","Tess",isCollapse);
        spread.resumePaint();
    });
}

