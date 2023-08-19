import {AfterViewInit, Directive, ElementRef, Input, Renderer2, TemplateRef, ViewContainerRef} from "@angular/core";
import {Assignment, CommonDirective} from "../assignment-table/common";

@Directive({
    selector: "[st-section-assignment-title]"
})
export class SectionAssignmentTitleDirective extends CommonDirective implements AfterViewInit {

    map: Map<string, ElementRef> = new Map<string, ElementRef>();

    @Input("st-section-assignment-title")
    assignment!: Assignment;

    constructor(
        private container: ViewContainerRef,
        private renderer: Renderer2,
        private elementRef: ElementRef,
    ) {
        super();
    }

    ngAfterViewInit(): void {
    }

    init(): void {
        console.log('draw section assignment title', this.assignment.id);

        const element = this.elementRef.nativeElement;

        const position = this.dataProvider.getSectionAssigmentPosition(this.assignment.id);

        console.log('position', position);

        this.renderer.setStyle(element, 'grid-row-start', position.rowStart);
        this.renderer.setStyle(element, 'grid-row-end', position.rowEnd);
        this.renderer.setStyle(element, 'grid-column-start', position.columnStart);
        this.renderer.setStyle(element, 'grid-column-end', position.columnEnd);
        this.renderer.setStyle(element, 'z-index', position.zIndex);
    }

}