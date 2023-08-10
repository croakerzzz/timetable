import {Type} from "@angular/core";
import {AssignmentTableComponent, MarkTableComponent, TitleTableComponent} from "./common";

export interface Mark {
  offset: number,
  duration: number,
}

export interface Assignment {
  name: string
  isEdit: boolean;
  marks: Mark[],
}

export interface TableSection {

  id: string;

  name: string;

  titleComponent: Type<TitleTableComponent>;

  markComponent: Type<MarkTableComponent>;

  assignmentComponent: Type<AssignmentTableComponent>;

  assignments: Assignment[];

}
