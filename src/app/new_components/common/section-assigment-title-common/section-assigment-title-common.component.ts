import { Component, OnInit } from '@angular/core';
import {DataProvider} from "../../../common/data-provider";
import {Assignment} from "../../../common/common";

@Component({
  selector: 'app-section-assigment-title-common',
  templateUrl: './section-assigment-title-common.component.html',
  styleUrls: ['./section-assigment-title-common.component.css']
})
export class SectionAssigmentTitleCommonComponent implements OnInit {

    assignment!: Assignment;

    dataProvider!: DataProvider;

    constructor() {
    }

    ngOnInit(): void {
    }

    initData(assignment: Assignment, dataProvider: DataProvider) {
        this.assignment = assignment;
        this.dataProvider = dataProvider;
    }

}
