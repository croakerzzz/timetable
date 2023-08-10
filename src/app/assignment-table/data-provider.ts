import {Assignment, TableSection} from "./common";
import {BehaviorSubject, Observable} from "rxjs";

interface DataProviderEvent {
  name: string;
}

export abstract class DataProvider {

  private events$: BehaviorSubject<DataProviderEvent> = new BehaviorSubject<DataProviderEvent>({name: 'empty'});

  abstract getSections(): TableSection[];

  abstract getAssignment(sectionId: string): Assignment[];

  addRow(sectionId: string): void {
    this.events$.next({name: 'createRow'});
  }

  get events(): Observable<DataProviderEvent> {
    return this.events$.asObservable();
  }

  clickTimeCell(sectionId:string, offset: number, time: string, step: number):void {
    this.events$.next({name: 'clickTimeCell'});
  }

}
