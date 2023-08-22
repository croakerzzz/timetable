import {Component, OnInit} from '@angular/core';
import {
    SectionAssigmentTitleCommonComponent
} from "../common/section-assigment-title-common/section-assigment-title-common.component";
import {AssignmentState} from "../../common/common";

@Component({
    selector: 'app-section-assignment-title',
    templateUrl: './section-assignment-title.component.html',
    styleUrls: ['./section-assignment-title.component.css'],
    providers: [{provide: SectionAssigmentTitleCommonComponent, useExisting: SectionAssignmentTitleComponent}]
})
export class SectionAssignmentTitleComponent extends SectionAssigmentTitleCommonComponent implements OnInit {

    constructor() {
        super();
    }

    override ngOnInit(): void {
        super.ngOnInit();
    }

    isNormal(): boolean {
        return this.assignment ? this.assignment.state == AssignmentState.NORMAL : true;
    }

    isCreatedNotSaved(): boolean {
        return this.assignment ? this.assignment.state == AssignmentState.CREATED_NOT_SAVED : false;
    }
}
