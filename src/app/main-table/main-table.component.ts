import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {AssignmentState, Mark, MarkState, TableSection} from "../common/common";
import {EventType, NewMarkCanceledEvent, NewMarkCreatedEvent, NewRowCreatedEvent} from "../common/data-provider";
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

    appDataProvider = new AppDataProvider(this.sections);

    editor = false;

    editorSectionId?: string;

    assignmentName: string = '';

    newMarks: number[] = [];

    constructor(private cdf: ChangeDetectorRef) {
    }

    ngOnInit(): void {

        this.appDataProvider.events.subscribe(e => {
            switch (e.type) {
                case EventType.NEW_ROW_CREATED: {
                    this.editor = true;
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
        if (this.editorSectionId) {
            this.appDataProvider.cancelAddRow(this.editorSectionId);
        }

        this.editor = false;
    }
}
