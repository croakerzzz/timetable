import {Assignment, TableSection} from "./common";
import {BehaviorSubject, Observable} from "rxjs";

export enum EventType {

  EMPTY,
  CREATE_ROW,
  CLICK_TIME_CELL,
  CLICK_MARK,

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

interface ClickMark extends DataProviderEvent {
  sectionId: string;
}

export abstract class DataProvider {

  private events$: BehaviorSubject<DataProviderEvent> = new BehaviorSubject<DataProviderEvent>({id: '', type: EventType.EMPTY});

  abstract getSections(): TableSection[];

  abstract getAssignment(sectionId: string): Assignment[];

  addRow(id: string, sectionId: string): void {
    this.events$.next({
      id: id,
      type: EventType.CREATE_ROW,
      sectionId: sectionId,
    } as CreateRowEvent);
  }

  get events(): Observable<DataProviderEvent> {
    return this.events$.asObservable();
  }

  clickTimeCell(id: string, sectionId:string, offset: number, time: string, step: number):void {
    this.events$.next({
      id: id,
      type: EventType.CLICK_TIME_CELL,
      sectionId: sectionId,
      offset: offset,
      time: time,
      step: step,
    } as ClickTimeCell);
  }

}
