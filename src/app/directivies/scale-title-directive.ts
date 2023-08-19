import {AfterViewInit, Directive, ElementRef, Renderer2, TemplateRef, ViewContainerRef} from "@angular/core";
import {CommonDirective} from "../assignment-table/common";

@Directive({
    selector: "[st-scale-title]"
})
export class ScaleTitleDirective extends CommonDirective implements AfterViewInit {

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
        // const view = this.container.createEmbeddedView(this.template);

        const element = this.elementRef.nativeElement;

        if (element && this.renderer) {
            const position = this.dataProvider.getScaleTitlePosition();

            this.renderer.setStyle(element, 'grid-row-start', position.rowStart);
            this.renderer.setStyle(element, 'grid-row-end', position.rowEnd);
            this.renderer.setStyle(element, 'grid-column-start', position.columnStart);
            this.renderer.setStyle(element, 'grid-column-end', position.columnEnd);
            this.renderer.setStyle(element, 'z-index', position.zIndex);
        }
    }

}