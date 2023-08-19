import {AfterViewInit, Directive, ElementRef, Input, Renderer2, ViewContainerRef} from "@angular/core";
import {CommonDirective, Mark} from "../assignment-table/common";

@Directive({
    selector: "[st-section-cell]"
})
export class SectionCellDirective extends CommonDirective implements AfterViewInit {

    map: Map<string, ElementRef> = new Map<string, ElementRef>();

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

        console.log('cell map', this.map);

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