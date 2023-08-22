import {Component, OnInit} from '@angular/core';
import {DataProvider} from "../../../assignment-table/data-provider";

@Component({
    selector: 'app-scale-title-common',
    templateUrl: './scale-title-common.component.html',
    styleUrls: ['./scale-title-common.component.css']
})
export class ScaleTitleCommonComponent implements OnInit {

    dataProvider!: DataProvider;

    constructor() {
    }

    ngOnInit(): void {
    }

    initData(dataProvider: DataProvider) {
        this.dataProvider = dataProvider;
    }

}
