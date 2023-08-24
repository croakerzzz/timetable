import {Directive, ElementRef, Renderer2, Type} from "@angular/core";
import {DataProvider} from "./data-provider";

export enum AssignmentState {

    NORMAL,
    CREATED_NOT_SAVED,
    CREATED_SAVED,
    EDITED,

}

export enum MarkState {

    NORMAL,
    CREATED_NOT_SAVED,
    CREATED_SAVED,
    CANCELED_NOT_SAVED,
    CANCELED_SAVED

}

export abstract class CommonDirective {

    protected dataProvider!: DataProvider;

    constructor() {
    }

    setDataProvider(dataProvider: DataProvider): void {
        this.dataProvider = dataProvider;
    }

}

export interface Mark {

    id: string;

    offset: number;

    duration: number;

    state: MarkState;

    marks?: Mark[];

}

export interface Assignment {

    id: string;

    name: string;

    state: AssignmentState;

    marks: Mark[];

}

export interface TableSection {

    id: string;

    name: string;

    assignments: Assignment[];

}

export interface TableComponentInitData {

    gridRowStart: number;

    gridRowEnd: number;

    gridColumnStart: number;

    gridColumnEnd: number;

    zIndex: number;

}

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

    abstract generateEventId(): string;

}

export abstract class TitleTableComponent extends TableComponent {

    tableSection!: TableSection;

    constructor(
        override el: ElementRef,
        override renderer: Renderer2
    ) {
        super(el, renderer);
    }

    setTableSection(tableSection: TableSection): void {
        this.tableSection = tableSection;
    }

    override generateEventId(): string {
        return "titleTable#" + this.tableSection.id;
    }

}

export abstract class MarkTableComponent extends TableComponent {

    mark!: Mark;

    constructor(
        override el: ElementRef,
        override renderer: Renderer2
    ) {
        super(el, renderer);
    }

    setMarkData(mark: Mark): void {
        this.mark = mark;
    }

    override generateEventId(): string {
        return "markTable#" + this.mark.offset + "#" + this.mark.duration;
    }

}

export abstract class AssignmentTableComponent extends TableComponent {

    assignment!: Assignment;

    constructor(
        override el: ElementRef,
        override renderer: Renderer2
    ) {
        super(el, renderer);
    }

    setAssigmentData(assignment: Assignment): void {
        this.assignment = assignment;
    }

    override generateEventId(): string {
        return "assignmentTable#" + this.assignment.id;
    }

}
