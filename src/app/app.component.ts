import {Component, OnInit} from '@angular/core';
import {TitleComponent} from "./title/title.component";
import {MarkComponent} from "./mark/mark.component";
import {CancelMark, ClickTimeCell, DataProvider, EventType} from "./assignment-table/data-provider";
import {AssignmentComponent} from "./assignment/assignment.component";
import {Assignment, TableSection} from "./assignment-table/common";

/**
 * todo группы марок
 * todo подумать над оптимизацией пересоздания компонентов
 * todo разные компоненты для разных назначений (заголовки назначений и марки)
 */
class AppDataProvider extends DataProvider {

    constructor(private sections: TableSection[]) {
        super();
    }

    getAssignment(sectionId: string): Assignment[] {
        return this.sections.find(s => s.id === sectionId)?.assignments || [];
    }

    getSections(): TableSection[] {
        return this.sections;
    }

    override addRow(id: string, sectionId: string) {
        const section = this.sections.find(s => s.id === sectionId);

        if (section) {
            section.assignments.unshift({
                id: '',
                name: '',
                isEdit: true,
                marks: []
            })
        }

        super.addRow(id, sectionId);
    }

    override clickTimeCell(id: string, sectionId: string, offset: number, time: string, step: number) {
        const section = this.sections.find(s => s.id === sectionId);

        const assigment = section?.assignments.find(a => a.isEdit);

        if (assigment) {
            assigment.marks.push({
                id: '',
                offset: offset,
                duration: step,
                canceled: false,
            });
        }

        super.clickTimeCell(id, sectionId, offset, time, step);
    }

    override clickMark(id: string, markId: string, offset: number, duration: number) {
        const marks = this.sections.flatMap(s => s.assignments.flatMap(a => a.marks));

        const parent = marks.find(m => m.marks && m.marks.some(sm => sm.id === markId));

        if (parent) {
            parent.marks?.filter(m => m.id != markId).forEach(m => {
                console.log('cancel mark', m.id);

                this.events$.next({
                    id: id,
                    type: EventType.CANCEL_MARK,
                    markId: m.id,
                    offset: offset,
                    duration: duration
                } as CancelMark);
            })
        }
    }

}

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    sections: TableSection[] = [
        {
            id: "1",
            name: "Назначения",
            titleComponent: TitleComponent,
            markComponent: MarkComponent,
            assignmentComponent: AssignmentComponent,
            assignments: [
                {
                    id: "1",
                    name: "Гелофузин р-р д/инф. 500 мл 500",
                    isEdit: false,
                    marks: [
                        {
                            id: "1",
                            offset: 25,
                            duration: 5,
                            canceled: false,
                        },
                        {
                            id: "2",
                            offset: 120,
                            duration: 60,
                            canceled: false,
                        }
                    ]
                }
            ]
        },
        {
            id: "2",
            name: "Процедуры и манипуляции",
            titleComponent: TitleComponent,
            markComponent: MarkComponent,
            assignmentComponent: AssignmentComponent,
            assignments: [
                {
                    id: "2",
                    name: "Конфокальная микроскопия роговицы",
                    isEdit: false,
                    marks: [
                        {
                            id: "3",
                            offset: 360,
                            duration: 90,
                            canceled: false,
                        }
                    ]
                },
                {
                    id: "3",
                    name: "Конфокальная микроскопия роговицы",
                    isEdit: false,
                    marks: [
                        {
                            id: "4",
                            offset: 435,
                            duration: 45,
                            canceled: false,
                        }
                    ]
                }
            ]
        },
        {
            id: "3",
            name: "Исследования",
            titleComponent: TitleComponent,
            markComponent: MarkComponent,
            assignmentComponent: AssignmentComponent,
            assignments: [
                {
                    id: "4",
                    name: "Конфокальная микроскопия роговицы",
                    isEdit: false,
                    marks: [
                        {
                            id: "5",
                            offset: 0,
                            duration: 15,
                            canceled: false,
                        },
                        {
                            id: "6",
                            offset: 16,
                            duration: 15,
                            canceled: false,
                        },
                        {
                            id: "7",
                            offset: 31,
                            duration: 15,
                            canceled: false,
                        },
                        {
                            id: "8",
                            offset: 46,
                            duration: 15,
                            canceled: false,
                        },
                    ]
                }
            ]
        },
        {
            id: "4",
            name: "Питание",
            titleComponent: TitleComponent,
            markComponent: MarkComponent,
            assignmentComponent: AssignmentComponent,
            assignments: [
                {
                    id: "5",
                    name: "Что то там",
                    isEdit: false,
                    marks: [
                        {
                            id: "9",
                            offset: 120,
                            duration: 120,
                            canceled: false,
                            marks: [
                                {
                                    id: "10",
                                    offset: 120,
                                    duration: 30,
                                    canceled: false,
                                },
                                {
                                    id: "11",
                                    offset: 150,
                                    duration: 30,
                                    canceled: false,
                                },
                                {
                                    id: "12",
                                    offset: 180,
                                    duration: 60,
                                    canceled: false,
                                },
                            ]
                        }
                    ]
                }
            ]
        },
    ]

    appDataProvider = new AppDataProvider(this.sections);

    constructor() {
    }

    ngOnInit(): void {

        this.appDataProvider.events.subscribe(event => {
            console.log('event', event);
        })

    }

}
