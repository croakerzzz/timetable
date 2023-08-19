import {AfterViewInit, Directive, ElementRef, Input, Renderer2, TemplateRef, ViewContainerRef} from "@angular/core";
import {DataProvider} from "../assignment-table/data-provider";
import {CommonDirective} from "../assignment-table/common";

@Directive({
    selector: "[st-section-title]"
})
export class SectionTitleDirective extends CommonDirective implements AfterViewInit {

    constructor(
        private container: ViewContainerRef,
        private renderer: Renderer2,
        private elementRef: ElementRef,
    ) {
        super();
    }

    ngAfterViewInit(): void {
    }

    init(sectionId: string) {
        console.log('draw section title', sectionId);

        const element = this.elementRef.nativeElement;

        if (element && this.renderer) {
            const position = this.dataProvider.getSectionTitlePosition(sectionId);

            console.log('position', position);

            this.renderer.setStyle(element, 'grid-row-start', position.rowStart);
            this.renderer.setStyle(element, 'grid-row-end', position.rowEnd);
            this.renderer.setStyle(element, 'grid-column-start', position.columnStart);
            this.renderer.setStyle(element, 'grid-column-end', position.columnEnd);
            this.renderer.setStyle(element, 'z-index', position.zIndex);
        }
    }

}