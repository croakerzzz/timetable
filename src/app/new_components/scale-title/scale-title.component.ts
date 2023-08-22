import {Component, OnInit} from '@angular/core';
import {ScaleTitleCommonComponent} from "../common/scale-title-common/scale-title-common.component";
import {ScaleTableComponent} from "../../scale-table/scale-table.component";

@Component({
    selector: 'app-scale-title',
    templateUrl: './scale-title.component.html',
    styleUrls: ['./scale-title.component.css'],
    providers: [{provide: ScaleTitleCommonComponent, useExisting: ScaleTitleComponent}]

})
export class ScaleTitleComponent extends ScaleTitleCommonComponent implements OnInit {

    constructor() {
        super();
    }

    override ngOnInit(): void {
        super.ngOnInit();

        console.log('ddddddddddddddddddddddddddddddddddddddddddddddd', this.dataProvider);
    }

}
