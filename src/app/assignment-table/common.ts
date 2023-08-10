import {ElementRef, Renderer2, Type} from "@angular/core";
import {DataProvider} from "./data-provider";
import {Assignment, Mark, TableSection} from "./section";

export abstract class TableComponent {

  protected dataProvider!: DataProvider;

  constructor(
    protected el: ElementRef,
    protected renderer: Renderer2
  ) {
  }

  public position(data: TableComponentInitData): void {

    this.renderer.setStyle(this.el.nativeElement, 'grid-row-start', data.gridRowStart);
    this.renderer.setStyle(this.el.nativeElement, 'grid-row-end', data.gridRowEnd);
    this.renderer.setStyle(this.el.nativeElement, 'grid-column-start', data.gridColumnStart);
    this.renderer.setStyle(this.el.nativeElement, 'grid-column-end', data.gridColumnEnd);
    this.renderer.setStyle(this.el.nativeElement, 'z-index', data.zIndex);

  }

  setDataProvider(dataProvider: DataProvider) {
    this.dataProvider = dataProvider;
  }

}

export abstract class TitleTableComponent extends TableComponent {

  constructor(
    override el: ElementRef,
    override renderer: Renderer2
  ) {
    super(el, renderer);
  }

  abstract setTableSection(tableSection: TableSection): void;

}

export abstract class MarkTableComponent extends TableComponent {

  constructor(
    override el: ElementRef,
    override renderer: Renderer2
  ) {
    super(el, renderer);
  }

  abstract setMarkData(mark: Mark): void;

}

export abstract class AssignmentTableComponent extends TableComponent {

  constructor(
    override el: ElementRef,
    override renderer: Renderer2
  ) {
    super(el, renderer);
  }

  abstract setAssigmentData(assignment: Assignment): void;

}

export interface TableComponentInitData {

  gridRowStart: number;

  gridRowEnd: number;

  gridColumnStart: number;

  gridColumnEnd: number;

  zIndex: number;

}
