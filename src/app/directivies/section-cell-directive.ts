import {AfterViewInit, Directive, ElementRef, Input, Renderer2, ViewContainerRef} from "@angular/core";
import {CommonDirective, Mark} from "../assignment-table/common";

@Directive({
    selector: "[st-section-cell]"
})
export class SectionCellDirective extends CommonDirective implements AfterViewInit {

    constructor(
        private container: ViewContainerRef,
        private renderer: Renderer2,
        private elementRef: ElementRef,
    ) {
        super();
    }

    @Input("st-section-cell")
    mark!: Mark;

    ngAfterViewInit(): void {
    }

    init(): void {
        console.log('draw section cell');

        const element = this.elementRef.nativeElement;

        const position = this.dataProvider.getSectionCellPosition(this.mark.id);

        console.log('mark position', position);

        this.renderer.setStyle(element, 'grid-row-start', position.rowStart);
        this.renderer.setStyle(element, 'grid-row-end', position.rowStart);
        this.renderer.setStyle(element, 'grid-column-start', position.columnStart);
        this.renderer.setStyle(element, 'grid-column-end', position.columnEnd);
        this.renderer.setStyle(element, 'z-index', position.zIndex);
    }

}