import {Component, OnInit} from '@angular/core';
import {
    SectionAssigmentTitleCommonComponent
} from "../common/section-assigment-title-common/section-assigment-title-common.component";
import {Assignment, AssignmentState} from "../../common/common";
import {DataProvider, EventType} from "../../common/data-provider";

@Component({
    selector: 'app-section-assignment-title',
    templateUrl: './section-assignment-title.component.html',
    styleUrls: ['./section-assignment-title.component.css'],
    providers: [{provide: SectionAssigmentTitleCommonComponent, useExisting: SectionAssignmentTitleComponent}]
})
export class SectionAssignmentTitleComponent extends SectionAssigmentTitleCommonComponent implements OnInit {

    editMode = false;

    lockEdit = false;

    constructor() {
        super();
    }

    override ngOnInit(): void {
        super.ngOnInit();
    }

    override initData(assignment: Assignment, dataProvider: DataProvider): void {
        super.initData(assignment, dataProvider);

        this.dataProvider.events.subscribe(e => {
            switch (e.type) {
                case EventType.ROW_EDITED: {
                    this.lockEdit = true;
                    if (e.id == this.assignment.id) {
                        this.editMode = true;
                    }
                    break;
                }
                case EventType.CANCEL_ROW_EDITED: {
                    this.lockEdit = false;
                    if (e.id == this.assignment.id) {
                        this.editMode = false;
                    }
                    break;
                }
            }
        })
    }

    isNormalOrEdit(): boolean {
        return this.assignment
            ? (this.assignment.state == AssignmentState.NORMAL
                || this.assignment.state == AssignmentState.EDITED
                || this.assignment.state == AssignmentState.AUTO_EDITED)
            : true;
    }

    isCreatedNotSaved(): boolean {
        return this.assignment ? this.assignment.state == AssignmentState.CREATED_NOT_SAVED : false;
    }

    edit() {
        if (!this.lockEdit) {
            this.dataProvider.editRow(this.assignment.id, false);
        }
    }
}
