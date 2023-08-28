import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Assignment, AssignmentState, Mark, MarkState, TableSection} from "../common/common";
import {
    EventType,
    NewMarkCanceledEvent,
    NewMarkCreatedEvent,
    NewRowCreatedEvent,
    RowEditedEvent
} from "../common/data-provider";
import {AppDataProvider} from "../common/app-data-provider";

@Component({
    selector: 'app-main-table',
    templateUrl: './main-table.component.html',
    styleUrls: ['./main-table.component.css']
})
export class MainTableComponent implements OnInit {

    sections: TableSection[] = [
        {
            id: "1",
            name: "Назначения",
            assignments: [
                {
                    id: "1",
                    name: "Гелофузин р-р д/инф. 500 мл 500",
                    state: AssignmentState.NORMAL,
                    marks: [
                        {
                            id: "1",
                            offset: 25,
                            duration: 5,
                            state: MarkState.NORMAL,
                        },
                        {
                            id: "2",
                            offset: 120,
                            duration: 60,
                            state: MarkState.NORMAL,
                        }
                    ]
                },
                {
                    id: "1_1",
                    name: "Гелофузин р-р д/инф. 500 мл 500",
                    state: AssignmentState.NORMAL,
                    marks: [
                        {
                            id: "1_1",
                            offset: 7 * 60,
                            duration: 5 * 60,
                            state: MarkState.NORMAL,
                            marks: [
                                {
                                    id: "1_1_1",
                                    offset: 7 * 60,
                                    duration: 60,
                                    state: MarkState.NORMAL,
                                },
                                {
                                    id: "1_1_2",
                                    offset: 8 * 60,
                                    duration: 60,
                                    state: MarkState.NORMAL,
                                },
                                {
                                    id: "1_1_3",
                                    offset: 9 * 60,
                                    duration: 60,
                                    state: MarkState.NORMAL,
                                },
                                {
                                    id: "1_1_4",
                                    offset: 10 * 60,
                                    duration: 60,
                                    state: MarkState.NORMAL,
                                },
                                {
                                    id: "1_1_5",
                                    offset: 11 * 60,
                                    duration: 60,
                                    state: MarkState.NORMAL,
                                },
                            ]
                        },
                    ]
                }
            ]
        },
        {
            id: "2",
            name: "Процедуры и манипуляции",
            assignments: [
                {
                    id: "2",
                    name: "Конфокальная микроскопия роговицы",
                    state: AssignmentState.NORMAL,
                    marks: [
                        {
                            id: "3",
                            offset: 360,
                            duration: 90,
                            state: MarkState.NORMAL,
                        },
                        {
                            id: "3_1",
                            offset: (16 - 7) * 60 + 15,
                            duration: 60,
                            state: MarkState.NORMAL,
                        }
                    ]
                },
                {
                    id: "3",
                    name: "Конфокальная микроскопия роговицы",
                    state: AssignmentState.NORMAL,
                    marks: [
                        {
                            id: "4",
                            offset: 435,
                            duration: 45,
                            state: MarkState.NORMAL,
                        }
                    ]
                }
            ]
        },
        {
            id: "3",
            name: "Исследования",
            assignments: [
                {
                    id: "4",
                    name: "Конфокальная микроскопия роговицы",
                    state: AssignmentState.NORMAL,
                    marks: [
                        {
                            id: "5",
                            offset: 0,
                            duration: 15,
                            state: MarkState.NORMAL,
                        },
                        {
                            id: "6",
                            offset: 16,
                            duration: 15,
                            state: MarkState.NORMAL,
                        },
                        {
                            id: "7",
                            offset: 31,
                            duration: 15,
                            state: MarkState.NORMAL,
                        },
                        {
                            id: "8",
                            offset: 46,
                            duration: 15,
                            state: MarkState.NORMAL,
                        },
                    ]
                }
            ]
        },
        {
            id: "4",
            name: "Питание",
            assignments: [
                {
                    id: "5",
                    name: "Что то там",
                    state: AssignmentState.NORMAL,
                    marks: [
                        {
                            id: "9",
                            offset: 120,
                            duration: 120,
                            state: MarkState.NORMAL,
                            marks: [
                                {
                                    id: "10",
                                    offset: 120,
                                    duration: 30,
                                    state: MarkState.NORMAL,
                                },
                                {
                                    id: "11",
                                    offset: 150,
                                    duration: 30,
                                    state: MarkState.NORMAL,
                                },
                                {
                                    id: "12",
                                    offset: 180,
                                    duration: 60,
                                    state: MarkState.NORMAL,
                                },
                            ]
                        }
                    ]
                }
            ]
        },
    ]

    editor = false;

    mode: 'none' | 'new' | 'edit' = 'none';

    editorSectionId?: string;

    assignmentName: string = '';

    editAssignment: Assignment | undefined;

    newMarks: number[] = [];

    constructor(public appDataProvider: AppDataProvider) {
        this.appDataProvider.sections = this.sections;
    }

    ngOnInit(): void {

        this.appDataProvider.events.subscribe(e => {
            switch (e.type) {
                case EventType.NEW_ROW_CREATED: {
                    this.editor = true;
                    this.mode = 'new';
                    this.editorSectionId = (e as NewRowCreatedEvent).sectionId;
                    break;
                }
                case EventType.NEW_MARK_CREATED: {
                    const event = (e as NewMarkCreatedEvent);

                    const mark = this.appDataProvider.findMark(event.id);

                    if (mark) {
                        this.newMarks.push(mark.offset);
                    }

                    break;
                }
                case EventType.NEW_MARK_CANCELED: {
                    const event = (e as NewMarkCanceledEvent);

                    this.newMarks.splice(this.newMarks.indexOf(event.offset), 1);

                    break;
                }
                case EventType.ROW_EDITED: {
                    const event = (e as RowEditedEvent);

                    this.editAssignment = this.appDataProvider.findAssigment(event.id);

                    if (this.editAssignment) {
                        this.editor = true;
                        this.mode = 'edit';
                        this.assignmentName = this.editAssignment.name;
                    }

                    break;
                }
                case EventType.CANCEL_ROW_EDITED: {
                    this.editor = false;
                    this.mode = "none";

                    break;
                }
            }
        })

    }

    add() {
        if (this.editorSectionId) {
            this.appDataProvider.applyAddRow(this.editorSectionId, this.assignmentName);
        }

        this.editor = false;
    }

    cancel() {
        if (this.mode == 'new') {
            if (this.editorSectionId) {
                this.appDataProvider.cancelAddRow(this.editorSectionId);
            }
        }

        if (this.mode == 'edit') {
            if (this.editAssignment) {
                this.appDataProvider.cancelEditRow(this.editAssignment.id);
            }
        }

        this.editor = false;
    }
}
