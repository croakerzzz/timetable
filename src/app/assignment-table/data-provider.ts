import {Assignment, TableSection} from "./common";
import {BehaviorSubject, Observable} from "rxjs";

export enum EventType {

    EMPTY,
    CREATE_ROW,
    CLICK_TIME_CELL,
    CLICK_MARK,
    CANCEL_MARK,
    REDRAW,

}

export interface DataProviderEvent {
    id: string;
    type: EventType;
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

export abstract class DataProvider {

    protected events$: BehaviorSubject<DataProviderEvent> = new BehaviorSubject<DataProviderEvent>({
        id: '',
        type: EventType.EMPTY
    });

    abstract getSections(): TableSection[];

    abstract getAssignment(sectionId: string): Assignment[];

    addRow(id: string, sectionId: string): void {
        this.events$.next({
            id: id,
            type: EventType.REDRAW,
        } as DataProviderEvent);
    }

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

    abstract clickMark(id: string, markId: string, offset: number, duration: number): void;

    //   this.events$.next({
    //     id: id,
    //     type: EventType.CLICK_MARK,
    //     markId: markId,
    //     offset: offset,
    //     duration: duration,
    //   } as ClickMark);
    // }

}
