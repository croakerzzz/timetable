import {Component, OnInit} from '@angular/core';
import {TableSection} from "../../../common/common";
import {DataProvider} from "../../../common/data-provider";

@Component({
  selector: 'app-section-title-common',
  templateUrl: './section-title-common.component.html',
  styleUrls: ['./section-title-common.component.css']
})
export class SectionTitleCommonComponent implements OnInit {

    section!: TableSection;

    dataProvider!: DataProvider;

    constructor() {
    }

    ngOnInit(): void {
    }

    initData(section: TableSection, dataProvider: DataProvider) {
        this.section = section;
        this.dataProvider = dataProvider;
    }

}
