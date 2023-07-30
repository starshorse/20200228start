import {Component} from '@angular/core';
import * as GC from '@grapecity/spread-sheets';
import '@grapecity/spread-sheets-resources-ko';

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    appHeader = 'SpreadJS Angular Sample';
    appFooter = '© 2022 GrapeCity, inc. All Rights Reserved. All product and company names herein may be trademarks of their respective owners.';

    constructor() {
        GC.Spread.Common.CultureManager.culture('ko-kr');
    }
}
