import {Assignment, Mark, TableSection} from "./common";
import {BehaviorSubject, find, Observable, Subject} from "rxjs";

export interface DirectiveInput {
    dataProvider: DataProvider;
}

export interface SectionInput extends DirectiveInput {
    sectionId: string;
}

export interface GridPosition {
    rowStart: number;
    rowEnd: number;
    columnStart: number;
    columnEnd: number;
    zIndex: number;
}

export enum EventType {

    EMPTY,
    NEW_ROW_CREATED,
    NEW_ROW_CANCELED,
    NEW_MARK_CREATED,
    NEW_MARK_CANCELED,
    POSITION,
    ROW_EDITED,
    CANCEL_ROW_EDITED,
    SCALE_CHANGED

}

export enum ReceiverType {

    EMPTY,
    SCALE_TITLE,
    SECTION,
    ASSIGNMENT,
    MARK,

}

export interface DataProviderEvent {
    id: string;
    type: EventType;
    receiver: ReceiverType,
}

export interface NewRowCreatedEvent extends DataProviderEvent {
    sectionId: string;
}

export interface NewMarkCreatedEvent extends DataProviderEvent {
    assignmentId: string;
}

export interface NewRowCanceledEvent extends DataProviderEvent {
    sectionId: string;
}

export interface NewMarkCanceledEvent extends DataProviderEvent {
    assignmentId: string;
    offset: number;
}

export interface RowEditedEvent extends DataProviderEvent {
}

export interface CancelRowEditedEvent extends DataProviderEvent {
}

export interface Positioning extends DataProviderEvent {
    position: GridPosition;
}

export interface GridCell {
    offset: number,
    title: string,
}

export interface Step {
    minutes: number,
    gridCellMinSize: string,
    markAlignMode: 5 | 10 | 15;
}

export abstract class DataProvider {

    abstract get gridCellStep(): number;

    abstract set gridCellStep(v: number);

    abstract get stepCells(): number;

    abstract set stepCells(v: number);

    abstract get steps(): Step[];

    abstract set steps(v: Step[]);

    abstract get currentStep(): number;

    abstract set currentStep(v: number);

    protected events$: Subject<DataProviderEvent> = new Subject<DataProviderEvent>();

    abstract getSections(): TableSection[];

    abstract getAssignments(sectionId: string): Assignment[];

    abstract getMarks(sectionId: string, assignmentId: string): Mark[];

    // --- действия ---

    abstract addRow(sectionId: string): void;

    abstract cancelAddRow(sectionId: string): void;

    abstract applyAddRow(sectionId: string, name: string): void;

    abstract clickEmptyCell(id: string, sectionId: string, assignmentId: string, offset: number, time: string, step: number, shiftKey: boolean): void;

    abstract clickMark(markId: string): void;

    abstract editRow(assignmentId: string, auto: boolean): void;

    abstract cancelEditRow(assignmentId: string): void;

    // ---

    abstract incScale(): void;

    abstract decScale(): void;

    abstract incScaleEnabled(): boolean;

    abstract decScaleEnabled(): boolean;

    get events(): Observable<DataProviderEvent> {
        return this.events$.asObservable();
    }

    sendPosition(id: string, receiver: ReceiverType, position: GridPosition): void {
        this.events$.next({
            id: id,
            type: EventType.POSITION,
            receiver: receiver,
            position: position,
        } as Positioning);
    }

    abstract sendAllPosition(): void;

    //   this.events$.next({
    //     id: id,
    //     type: EventType.CLICK_MARK,
    //     markId: markId,
    //     offset: offset,
    //     duration: duration,
    //   } as ClickMark);
    // }

    getScaleTitlePosition(): GridPosition {
        return {
            rowStart: 1,
            rowEnd: 1,
            columnStart: 1,
            columnEnd: 1,
            zIndex: 10,
        }
    }

    abstract getSectionTitlePosition(sectionId: string): GridPosition;

    abstract getSectionAssigmentPosition(assignmentId: string): GridPosition;

    abstract getSectionCellPosition(markId: string): GridPosition;

    findMark(markId: string): Mark | undefined {
        let mark = this.getSections()
            .flatMap(s => s.assignments
                .flatMap(a => a.marks))
            .find(m => m.id == markId);

        if (!mark) {
            mark = this.getSections()
                .flatMap(s => s.assignments
                    .flatMap(a => a.marks)
                    .flatMap(m => m.marks))
                .find(m => m?.id == markId);

            return mark;
        } else {
            return mark;
        }
    }

    findAssigment(assignmentId: string): Assignment | undefined {
        return this.getSections()
            .flatMap(s => s.assignments)
            .find(a => a.id == assignmentId);
    }

    findAssignmentByMark(markId: string): Assignment | undefined {
        return this.getSections()
            .flatMap(s => s.assignments)
            .find(a => a.marks
                .some(m => m.id == markId || m.marks?.some(sm => sm.id == markId)));
    }

    findAllMarksByAssignment(assignmentId: string) {
        return this.getSections()
            .flatMap(s => s.assignments
                .filter(a => a.id == assignmentId)
                .flatMap(a => a.marks))
            .concat(this.getSections()
                .flatMap(s => s.assignments
                    .filter(a => a.id == assignmentId)
                    .flatMap(a => a.marks.flatMap(m => m.marks || []))));
    }

}
