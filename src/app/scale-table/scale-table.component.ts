import {Component, OnInit} from '@angular/core';
import {CancelMark, DataProvider, EventType, GridPosition} from "../assignment-table/data-provider";
import {Assignment, Mark, TableSection} from "../assignment-table/common";
import {TitleComponent} from "./components/title/title/title.component";
import {MarkComponent} from "./components/mark/mark/mark.component";
import {AssignmentComponent} from "./components/assignment/assignment/assignment.component";

interface GridCell {
    offset: number,
    title: string,
}

interface Step {
    minutes: number,
    gridCellMinSize: string,
    markAlignMode: 5 | 10 | 15;
}

/**
 * todo группы марок
 * todo подумать над оптимизацией пересоздания компонентов
 * todo разные компоненты для разных назначений (заголовки назначений и марки)
 */
export class AppDataProvider extends DataProvider {

    steps: Step[] = [
        {
            minutes: 5,
            gridCellMinSize: '8px',
            markAlignMode: 5
        },
        {
            minutes: 10,
            gridCellMinSize: '4px',
            markAlignMode: 10
        },
        {
            minutes: 15,
            gridCellMinSize: '2.5px',
            markAlignMode: 15
        },
        {
            minutes: 30,
            gridCellMinSize: '1.5px',
            markAlignMode: 15
        },
        {
            minutes: 60,
            gridCellMinSize: '0.5px',
            markAlignMode: 15
        },
    ]

    gridCellStep: number = 1;

    currentStep = 4;

    stepCells = this.steps[this.currentStep].minutes / this.gridCellStep;

    constructor(private sections: TableSection[]) {
        super();
    }

    getAssignments(sectionId: string): Assignment[] {
        return this.sections.find(s => s.id === sectionId)?.assignments || [];
    }

    getMarks(sectionId: string, assignmentId: string) {
        return this.getAssignments(sectionId).find(a => a.id === assignmentId)?.marks || [];
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

    override getSectionTitlePosition(sectionId: string): GridPosition {
        let row = 2;

        for (let index = 0; index < this.sections.length; index++) {
            if (this.sections[index].id === sectionId) {
                break;
            }

            row += this.sections[index].assignments.length + 1;
        }

        console.log('row', row);

        return {
            rowStart: row,
            rowEnd: row,
            columnStart: 1,
            columnEnd: 1,
            zIndex: 10,
        }
    }

    override getSectionAssigmentPosition(assignmentId: string): GridPosition {
        let row = 2;

        let exit = false;

        for (let index = 0; index < this.sections.length; index++) {

            row++;

            for (let aIndex = 0; aIndex < this.sections[index].assignments.length; aIndex++) {

                if (this.sections[index].assignments[aIndex].id == assignmentId) {
                    exit = true;
                    break;
                }

                row++;

            }

            if (exit) {
                break;
            }

        }

        console.log('assigment row', row);

        return {
            rowStart: row,
            rowEnd: row,
            columnStart: 1,
            columnEnd: 1,
            zIndex: 10,
        }
    }

    getMarkStartColumn(mark: Mark): number {
        return Math.floor(mark.offset / this.steps[this.currentStep].markAlignMode) *
            (this.steps[this.currentStep].markAlignMode / this.gridCellStep) + 2;
    }

    getMarkEndColumn(mark: Mark): number {
        return this.getMarkStartColumn(mark) + Math.ceil(mark.duration / this.steps[this.currentStep].markAlignMode) *
            (this.steps[this.currentStep].markAlignMode / this.gridCellStep);
    }

    getSectionCellPosition(markId: string): GridPosition {

        let row = 2;

        let exit = false;

        for (let index = 0; index < this.sections.length; index++) {

            row++;

            for (let aIndex = 0; aIndex < this.sections[index].assignments.length; aIndex++) {

                if (this.sections[index].assignments[aIndex].marks.some(m => m.id == markId)) {
                    exit = true;
                    break;
                }

                row++;

            }

            if (exit) {
                break;
            }

        }

        console.log('mark row', row);

        const mark = this.sections
            .flatMap(s => s.assignments.flatMap(a => a.marks))
            .find(m => m.id == markId);

        return {
            rowStart: row,
            rowEnd: row,
            columnStart: !mark ? -1 : this.getMarkStartColumn(mark),
            columnEnd: !mark ? -1 : this.getMarkEndColumn(mark),
            zIndex: 10,
        }
    }

    getGridCellStep(): number {
        return this.gridCellStep;
    }

}


@Component({
    selector: 'app-scale-table',
    templateUrl: './scale-table.component.html',
    styleUrls: ['./scale-table.component.css']
})
export class ScaleTableComponent implements OnInit {

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
