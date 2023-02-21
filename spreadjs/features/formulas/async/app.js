window.onload = function () {
    var spread = new GC.Spread.Sheets.Workbook(document.getElementById("ss"), {sheetCount: 2});
    initSpread(spread);
};

function initSpread(spread) {
    var asyncSum = function () {
    };
    asyncSum.prototype = new GC.Spread.CalcEngine.Functions.AsyncFunction("ASUM", 1, 255);
    asyncSum.prototype.defaultValue = function () {
        return "Loading...";
    };
    asyncSum.prototype.evaluateAsync = function (context) {
        // use setTimeout to simulate server side evaluation
        // in read world it maybe an ajax post to server for evaluation
        var args = arguments;
        setTimeout(function () {
            var result = 0;
            for (var i = 1; i < args.length; i++) {
                result += args[i];
            }
            result *= 2;
            context.setAsyncResult(result);
        }, 2000);
    };

    var GetNumberFromServer = function () {
    };
    GetNumberFromServer.prototype = new GC.Spread.CalcEngine.Functions.AsyncFunction("GETNUMBERFROMSERVER", 1, 2);
    GetNumberFromServer.prototype.evaluate = function (context, arg1, arg2) {
        setTimeout(function () {
            var value = Math.random() + 1;
            context.setAsyncResult(value);
        }, 500);
    };
    GC.Spread.CalcEngine.Functions.defineGlobalCustomFunction("GETNUMBERFROMSERVER", new GetNumberFromServer());

    var GetTimeFromServer = function () {
    };
    GetTimeFromServer.prototype = new GC.Spread.CalcEngine.Functions.AsyncFunction("GETTIMEFROMSERVER");
    GetTimeFromServer.prototype.evaluate = function (context) {
        setTimeout(function () {
            var date = new Date();
            context.setAsyncResult(date);
        }, 500);
    };
    GetTimeFromServer.prototype.evaluateMode = function () {
        return 2;
    };
    GetTimeFromServer.prototype.interval = function () {
        return 1000;
    };
    GC.Spread.CalcEngine.Functions.defineGlobalCustomFunction("GETTIMEFROMSERVER", new GetTimeFromServer());

    var sheet = spread.sheets[0];
    sheet.suspendPaint();
    sheet.options.allowCellOverflow = true;

    sheet.setArray(0, 0, [[5, 15]]);
    sheet.addCustomFunction(new asyncSum());

    sheet.setText(1, 1, 'ASUM(A1,B1)');
    sheet.setText(2, 1, 'SUM(A1,B1)');

    sheet.setFormula(1, 2, "ASUM(A1,B1)");
    sheet.getCell(1, 2).foreColor("green");
    sheet.setFormula(2, 2, "SUM(A1,B1)");

    sheet.setValue(4, 0, "Edit the formula of C2 or referenced cell' value to see how async function works.");

    sheet.setValue(8, 0, 'CHANGEVALUE');
    sheet.setValue(8, 1, 'FORMULA');
    sheet.setValue(8, 2, 'RESULT');
    sheet.setValue(8, 3, 'COMMENTS');
    sheet.setValue(9, 3, 'On A10 changed');
    sheet.setValue(10, 3, 'On A10 changed');
    sheet.setValue(11, 3, 'Evaluate once');
    sheet.setValue(12, 3, 'Every 2 seconds');
    sheet.setValue(9, 0, 1);
    sheet.setValue(9, 1, '=GetNumberFromServer(A10)');
    sheet.setValue(10, 1, '=Refresh(GetNumberFromServer(A10), 0)');
    sheet.setValue(11, 1, '=Refresh(GetNumberFromServer(A10), 1)');
    sheet.setValue(12, 1, '=Refresh(GetNumberFromServer(A10), 2, 2000)');
    sheet.setFormula(9, 2, '=GetNumberFromServer(A10)');
    sheet.setFormula(10, 2, '=Refresh(GetNumberFromServer(A10), 0)');
    sheet.setFormula(11, 2, '=Refresh(GetNumberFromServer(A10), 1)');
    sheet.setFormula(12, 2, '=Refresh(GetNumberFromServer(A10), 2, 2000)');
    sheet.getCell(12, 2).foreColor("green");
    sheet.setColumnWidth(0, 100);
    sheet.setColumnWidth(1, 300);
    sheet.setColumnWidth(2, 200);
    sheet.setColumnWidth(3, 200);

    sheet.setValue(15, 1, "=Refresh(now(), 2, 1000)");
    sheet.setValue(15, 3, "Every 1 second");
    sheet.setFormula(15, 2, "=Refresh(now(), 2, 1000)");
    sheet.getCell(15, 2).foreColor("green");

    sheet.setValue(18, 1, "=GetTimeFromServer()");
    sheet.setValue(18, 3, "Every 1 second");
    sheet.setFormula(18, 2, "=GetTimeFromServer()");
    sheet.getCell(18, 2).foreColor("green");

    sheet.getCell(18, 2).hAlign(GC.Spread.Sheets.HorizontalAlign.right);
    sheet.resumePaint();
}