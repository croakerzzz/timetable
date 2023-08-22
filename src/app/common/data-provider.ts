import {Assignment, Mark, TableSection} from "./common";
import {BehaviorSubject, Observable} from "rxjs";

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
    CREATE_ROW,
    CLICK_TIME_CELL,
    CLICK_MARK,
    CANCEL_MARK,
    REDRAW,
    POSITION,

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

export interface CreateRowEvent extends DataProviderEvent {
    sectionId: string;
}

export interface ClickTimeCell extends DataProviderEvent {
    sectionId: string;
    offset: number;
    time: string;
    step: number;
}

export interface ClickMark extends DataProviderEvent {
    markId: string;
    offset: number;
    duration: number;
}

export interface CancelMark extends DataProviderEvent {
    markId: string;
    offset: number;
    duration: number;
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

    protected events$: BehaviorSubject<DataProviderEvent> = new BehaviorSubject<DataProviderEvent>({
        id: '',
        receiver: ReceiverType.EMPTY,
        type: EventType.EMPTY
    });

    abstract getSections(): TableSection[];

    abstract getAssignments(sectionId: string): Assignment[];

    abstract getMarks(sectionId: string, assignmentId: string): Mark[];

    abstract addRow(sectionId: string): void;

    get events(): Observable<DataProviderEvent> {
        return this.events$.asObservable();
    }

    clickTimeCell(id: string, sectionId: string, offset: number, time: string, step: number): void {
        this.events$.next({
            id: id,
            type: EventType.CLICK_TIME_CELL,
            sectionId: sectionId,
            offset: offset,
            time: time,
            step: step,
        } as ClickTimeCell);
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

    abstract clickMark(id: string, markId: string, offset: number, duration: number): void;

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

}
