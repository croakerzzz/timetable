import {
    CancelRowEditedEvent,
    DataProvider,
    EventType,
    GridPosition,
    NewMarkCanceledEvent,
    NewMarkCreatedEvent,
    NewRowCanceledEvent,
    NewRowCreatedEvent,
    ReceiverType,
    RowEditedEvent,
    Step
} from "./data-provider";
import {Assignment, AssignmentState, Mark, MarkState, TableSection} from "./common";
import {Injectable} from "@angular/core";

@Injectable()
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

    openedMark: Mark | null = null;

    sections_: TableSection[] = [];

    set sections(sections: TableSection[]) {
        this.sections_ = sections;
    }

    get sections(): TableSection[] {
        return this.sections_;
    }

    currentHour!: number;

    get zeroTime(): string {
        return "07:00";
    }

    countCurrentHour(): void {
        this.currentHour = 16 * 60;

        // const date = new Date();
        //
        // const minutes = date.getHours() * 60 + date.getMinutes();
        //
        // this.currentHour = Math.floor(minutes / this.steps[this.currentStep].minutes) * this.steps[this.currentStep].minutes;
    }

    getCurrentHourOffset(): number {
        const zeroParts = this.zeroTime.split(":");

        const zeroMinutes = Number.parseInt(zeroParts[0]) * 60 + Number.parseInt(zeroParts[1]);

        const prevMinutes = 24 * 60 - zeroMinutes;

        if (zeroMinutes > 0) {
            if (this.currentHour < zeroMinutes) {
                return this.currentHour + prevMinutes;
            } else {
                return this.currentHour - zeroMinutes;
            }
        } else {
            return this.currentHour;
        }
    }

    constructor() {
        super();

        this.countCurrentHour();

        setInterval(() => {
            this.countCurrentHour();
        }, 1000)
    }

    getAssignments(sectionId: string): Assignment[] {
        return this.sections.find(s => s.id === sectionId)?.assignments || [];
    }

    getMarks(sectionId: string, assignmentId: string) {

        const result: Mark[] = [];

        this.getAssignments(sectionId).find(a => a.id === assignmentId)?.marks.forEach(m => {
            if (m.marks && m.marks.length > 0) {
                m.marks.forEach(sm => result.push(sm));
            } else {
                result.push(m);
            }
        })

        return result;
    }

    getSections(): TableSection[] {
        return this.sections;
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

    override editRow(assignmentId: string, auto: boolean): void {
        const assignment = this.findAssigment(assignmentId);

        if (assignment) {

            assignment.state = auto ? AssignmentState.AUTO_EDITED : AssignmentState.EDITED;

            setTimeout(() => {
                this.events$.next({
                    id: assignment.id,
                    type: EventType.ROW_EDITED,
                } as RowEditedEvent);
            })

        }
    }

    private deleteMark(assignment: Assignment, mark: Mark) {
        assignment.marks.splice(assignment.marks.indexOf(mark), 1);
    }

    override cancelEditRow(assignmentId: string): void {
        const assignment = this.findAssigment(assignmentId);

        if (assignment) {

            assignment.state = AssignmentState.NORMAL;

            const marks = this.findAllMarksByAssignment(assignmentId);

            marks.forEach(m => {
                if (m.state === MarkState.CANCELED_NOT_SAVED) {
                    m.state = MarkState.NORMAL;
                }

                if (m.state === MarkState.CREATED_NOT_SAVED) {
                    this.deleteMark(assignment, m);
                }
            })

            setTimeout(() => {
                this.events$.next({
                    id: assignment.id,
                    type: EventType.CANCEL_ROW_EDITED,
                } as CancelRowEditedEvent);
            })

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

                if (this.sections[index].assignments[aIndex].marks
                    .some(m => m.id == markId || m.marks
                        ?.some(m => m.id == markId))) {
                    exit = true;
                    break;
                }

                row++;

            }

            if (exit) {
                break;
            }

        }

        let mark = this.sections
            .flatMap(s => s.assignments.flatMap(a => a.marks))
            .find(m => m.id == markId);

        if (!mark) {
            mark = this.sections
                .flatMap(s => s.assignments
                    .flatMap(a => a.marks)
                    .flatMap(m => m.marks))
                .find(m => m?.id == markId);
        }

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
                    if (m.marks && m.marks.length > 0) {
                        m.marks.forEach(sm => {
                            this.sendPosition(
                                sm.id,
                                ReceiverType.MARK,
                                this.getSectionCellPosition(sm.id)
                            )
                        });
                    } else {
                        this.sendPosition(
                            m.id,
                            ReceiverType.MARK,
                            this.getSectionCellPosition(m.id)
                        )
                    }
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

    private createMark(assignment: Assignment, offset: number, duration: number): Mark {
        const newMark = {
            id: assignment.id + '#new_mark#' + offset,
            offset: offset,
            duration: duration,
            state: MarkState.CREATED_NOT_SAVED,
            marks: [],
        };

        assignment.marks.push(newMark);

        setTimeout(() => {
            this.sendPosition(
                newMark.id,
                ReceiverType.MARK,
                this.getSectionCellPosition(newMark.id)
            );

            this.events$.next({
                id: newMark.id,
                type: EventType.NEW_MARK_CREATED,
                assignmentId: assignment.id,
            } as NewMarkCreatedEvent);
        });

        return newMark;
    }

    incScale(): void {
        this.currentStep--;

        this.countCurrentHour();

        this.events$.next({
            id: '',
            type: EventType.SCALE_CHANGED,
            receiver: ReceiverType.EMPTY
        });
    }

    decScale(): void {
        this.currentStep++;

        this.countCurrentHour();

        this.events$.next({
            id: '',
            type: EventType.SCALE_CHANGED,
            receiver: ReceiverType.EMPTY
        });
    }

    decScaleEnabled(): boolean {
        return this.currentStep < this.steps.length - 1;
    }

    incScaleEnabled(): boolean {
        return this.currentStep > 0;
    }

    isCurrentHour(time: string): boolean {
        return this.currentHour != null && time.startsWith(this.currentHour + '');
    }

    clickEmptyCell(id: string, sectionId: string, assignmentId: string, offset: number, time: string, step: number, shiftKey: boolean): void {
        const assignment = this.findAssigment(assignmentId);

        if (assignment) {

            if (assignment.state === AssignmentState.NORMAL) {
                this.editRow(assignmentId, true);
            }

            if (shiftKey) {
                if (this.openedMark == null) {
                    this.openedMark = this.createMark(assignment, offset, 60);
                } else {
                    this.openedMark.duration = offset - this.openedMark.offset + this.steps[this.currentStep].minutes;

                    const subMarks = assignment.marks.filter(m => this.openedMark
                        && m.id != this.openedMark.id
                        && m.offset >= this.openedMark?.offset
                        && (m.offset + m.duration) <= (this.openedMark?.offset + this.openedMark?.duration));

                    if (subMarks.length > 0) {
                        if (subMarks.every(m => m.state === MarkState.CREATED_NOT_SAVED)) {
                            subMarks.forEach(m => {
                                this.deleteMark(assignment, m);
                            })
                        } else {
                            this.deleteMark(assignment, this.openedMark);
                            this.openedMark = null;
                        }
                    }

                    setTimeout(() => {
                        if (this.openedMark != null) {
                            this.sendPosition(
                                this.openedMark.id,
                                ReceiverType.MARK,
                                this.getSectionCellPosition(this.openedMark.id)
                            );

                            this.openedMark = null;
                        }
                    });
                }
            } else {
                this.createMark(assignment, offset, 60);
            }

        }

    }

    override clickMark(markId: string) {
        const marks = this.sections.flatMap(s => s.assignments.flatMap(a => a.marks));

        const parent = marks.find(m => m.marks && m.marks.some(sm => sm.id === markId));

        const assignment = this.findAssignmentByMark(markId);

        const markMainFunc = (markFunc: (mark: Mark) => void, after?: (markState: MarkState) => void) => {
            if (!parent) {
                const mark = marks.find(m => m.id == markId);

                if (mark) {
                    const markState = mark.state;

                    markFunc(mark);

                    if (after) {
                        after(markState);
                    }
                }
            } else {
                if (parent.marks && parent.marks.length > 0) {
                    const clickedMark = this.findMark(markId);

                    if (clickedMark && clickedMark.offset > this.getCurrentHourOffset()) {
                        const markState = parent.marks[0].state;

                        parent.marks.filter(m => m.offset >= clickedMark.offset).forEach(m => {
                            markFunc(m);
                        })

                        if (after) {
                            after(markState);
                        }
                    }
                }
            }
        };

        if (assignment) {
            switch (assignment.state) {
                case AssignmentState.CREATED_NOT_SAVED: {
                    markMainFunc((mark) => {
                        if (mark && mark.state === MarkState.CREATED_NOT_SAVED) {
                            this.deleteMark(assignment, mark);
                            // assignment.marks.splice(assignment.marks.indexOf(mark), 1);

                            setTimeout(() => {
                                this.events$.next({
                                    id: mark.id,
                                    type: EventType.NEW_MARK_CANCELED,
                                    assignmentId: assignment.id,
                                    offset: mark.offset,
                                } as NewMarkCanceledEvent);
                            })
                        }
                    });

                    break;
                }

                case AssignmentState.EDITED:
                case AssignmentState.AUTO_EDITED: {
                    markMainFunc((mark) => {
                        switch (mark.state) {
                            case MarkState.CREATED_NOT_SAVED: {
                                this.deleteMark(assignment, mark);
                                break;
                            }
                            case MarkState.NORMAL: {
                                mark.state = MarkState.CANCELED_NOT_SAVED;
                                break;
                            }
                            case MarkState.CANCELED_NOT_SAVED: {
                                mark.state = MarkState.NORMAL;
                                break;
                            }
                        }
                    }, (markState) => {
                        if (assignment.state === AssignmentState.AUTO_EDITED) {
                            if (this.findAllMarksByAssignment(assignment.id)
                                .every(m => m.state != MarkState.CREATED_NOT_SAVED
                                    && m.state != MarkState.CANCELED_NOT_SAVED)) {
                                this.cancelEditRow(assignment.id);
                            }
                        }
                    });

                    break;
                }

                case AssignmentState.NORMAL: {
                    const clickedMark = this.findMark(markId);

                    if (clickedMark && clickedMark.offset > this.getCurrentHourOffset()) {
                        this.editRow(assignment.id, true);

                        markMainFunc((mark) => {
                            switch (mark.state) {
                                case MarkState.NORMAL: {
                                    mark.state = MarkState.CANCELED_NOT_SAVED;
                                    break;
                                }
                                case MarkState.CANCELED_NOT_SAVED: {
                                    mark.state = MarkState.NORMAL;
                                    break;
                                }
                            }
                        });
                    }

                    break;
                }
            }
        }

    }

}
