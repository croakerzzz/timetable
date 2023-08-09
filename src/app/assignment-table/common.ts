import {ElementRef, Renderer2, Type} from "@angular/core";

export interface Mark {
  offset: number,
  duration: number,
}

export abstract class TableComponent {

  constructor(
    protected el: ElementRef,
    protected renderer: Renderer2
  ) {
  }

  public setInitData(data: TableComponentInitData): void {

    this.renderer.setStyle(this.el.nativeElement, 'grid-row-start', data.gridRowStart);
    this.renderer.setStyle(this.el.nativeElement, 'grid-row-end', data.gridRowEnd);
    this.renderer.setStyle(this.el.nativeElement, 'grid-column-start', data.gridColumnStart);
    this.renderer.setStyle(this.el.nativeElement, 'grid-column-end', data.gridColumnEnd);
    this.renderer.setStyle(this.el.nativeElement, 'z-index', data.zIndex);

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

export interface TableComponentInitData {

  gridRowStart: number;

  gridRowEnd: number;

  gridColumnStart: number;

  gridColumnEnd: number;

  zIndex: number;

}

export interface Assignment {
  name: string
  marks: Mark[],
}


export interface TableSection {

  id: string;

  name: string;

  titleComponent: Type<TitleTableComponent>;

  markComponent: Type<MarkTableComponent>;

  assignments: Assignment[];

}
