import {AfterContentChecked, Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {CommonDirective, TableSection} from "../assignment-table/common";
import {TitleComponent} from "../scale-table/components/title/title/title.component";
import {MarkComponent} from "../scale-table/components/mark/mark/mark.component";
import {AssignmentComponent} from "../scale-table/components/assignment/assignment/assignment.component";
import {AppDataProvider} from "../scale-table/scale-table.component";

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
    }

}
