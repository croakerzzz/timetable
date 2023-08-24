import {
    CancelMark,
    DataProvider,
    EventType,
    GridPosition, NewMarkCanceledEvent, NewMarkCreatedEvent,
    NewRowCanceledEvent,
    NewRowCreatedEvent,
    ReceiverType,
    Step
} from "./data-provider";
import {Assignment, AssignmentState, Mark, MarkState, TableSection} from "./common";

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

        this.events$.subscribe(e => {
            // if (e.type === EventType.POSITION && e.receiver === ReceiverType.ASSIGNMENT) {
            //     console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> event: ', e);
            // }
        });
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

    // override addRow(id: string, sectionId: string) {
    //     const section = this.sections.find(s => s.id === sectionId);
    //
    //     if (section) {
    //         section.assignments.unshift({
    //             id: '',
    //             name: '',
    //             isEdit: true,
    //             marks: []
    //         })
    //     }
    //
    //     super.addRow(id, sectionId);
    // }

    override clickMark(markId: string) {
        const marks = this.sections.flatMap(s => s.assignments.flatMap(a => a.marks));

        const parent = marks.find(m => m.marks && m.marks.some(sm => sm.id === markId));

        if (!parent) {
            const mark = marks.find(m => m.id == markId);

            if (mark) {

                if (mark.state === MarkState.CREATED_NOT_SAVED) {

                    const assignment = this.sections
                        .flatMap(s => s.assignments)
                        .find(a => a.marks
                            .some(m => m.id == markId));

                    if (assignment) {
                        assignment.marks.splice(assignment.marks.indexOf(mark), 1);

                        setTimeout(() => {
                            this.events$.next({
                                id: mark.id,
                                type: EventType.NEW_MARK_CANCELED,
                                assignmentId: assignment.id,
                                offset: mark.offset,
                            } as NewMarkCanceledEvent);
                        })
                    }

                }

                // parent.marks?.filter(m => m.id != markId).forEach(m => {
                //     this.events$.next({
                //         id: id,
                //         type: EventType.CANCEL_MARK,
                //         markId: m.id,
                //         offset: offset,
                //         duration: duration
                //     } as CancelMark);
                // })
            }

        } else {

            const mark = parent?.marks?.find(m => m.id == markId);

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

    sendAllPosition(): void {

        this.sendPosition(
            '',
            ReceiverType.SCALE_TITLE,
            this.getScaleTitlePosition()
        )

        this.sections.forEach(s => {

            this.sendPosition(
                s.id,
                ReceiverType.SECTION,
                this.getSectionTitlePosition(s.id)
            )

            s.assignments.forEach(a => {

                this.sendPosition(
                    a.id,
                    ReceiverType.ASSIGNMENT,
                    this.getSectionAssigmentPosition(a.id)
                )

                a.marks.forEach(m => {
                    this.sendPosition(
                        m.id,
                        ReceiverType.MARK,
                        this.getSectionCellPosition(m.id)
                    )
                });

            });

        });

    }

    addRow(sectionId: string): void {
        const section = this.sections.find(s => s.id === sectionId);

        if (section) {
            const assignment: Assignment = {
                id: sectionId + '#new_assignment',
                name: '',
                state: AssignmentState.CREATED_NOT_SAVED,
                marks: []
            };

            section.assignments.unshift(assignment);

            setTimeout(() => {
                this.sendAllPosition();

                this.events$.next({
                    id: assignment.id,
                    type: EventType.NEW_ROW_CREATED,
                    sectionId: section.id
                } as NewRowCreatedEvent);
            });
        }
    }

    cancelAddRow(sectionId: string): void {
        const section = this.sections.find(s => s.id === sectionId);

        if (section) {
            const assignment = section.assignments.find(a => a.id == sectionId + '#new_assignment');

            if (assignment) {
                section.assignments.splice(section.assignments.indexOf(assignment), 1);

                setTimeout(() => {
                    this.sendAllPosition();

                    this.events$.next({
                        id: assignment.id,
                        type: EventType.NEW_ROW_CANCELED,
                        sectionId: section.id
                    } as NewRowCanceledEvent);
                });
            }
        }
    }

    applyAddRow(sectionId: string, name: string): void {
        const section = this.sections.find(s => s.id === sectionId);

        if (section) {
            const assignment = section.assignments.find(a => a.id == sectionId + '#new_assignment');

            if (assignment) {
                assignment.name = name;
                assignment.state = AssignmentState.NORMAL;

                // setTimeout(() => {
                //     this.sendAllPosition();
                //
                //     this.events$.next({
                //         id: assignment.id,
                //         type: EventType.NEW_ROW_CANCELED,
                //         sectionId: section.id
                //     } as NewRowCanceledEvent);
                // });
            }
        }
    }

    clickEmptyCell(id: string, sectionId: string, offset: number, time: string, step: number): void {
        const newAssigment = this.sections
            .flatMap(s => s.assignments)
            .find(a => a.state === AssignmentState.CREATED_NOT_SAVED);

        if (newAssigment) {

            const newMark = {
                id: newAssigment.id + '#new_mark#' + offset,
                offset: offset,
                duration: 60,
                state: MarkState.CREATED_NOT_SAVED,
                marks: [],
            };

            newAssigment.marks.push(newMark);

            setTimeout(() => {
                this.sendPosition(
                    newMark.id,
                    ReceiverType.MARK,
                    this.getSectionCellPosition(newMark.id)
                );

                this.events$.next({
                    id: newMark.id,
                    type: EventType.NEW_MARK_CREATED,
                    assignmentId: newAssigment.id,
                } as NewMarkCreatedEvent);
            });


        }

    }

}
