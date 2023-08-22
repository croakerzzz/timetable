import {AfterViewInit, Directive, ElementRef, Host, Optional, Renderer2, ViewContainerRef} from "@angular/core";
import {CommonDirective} from "../common/common";
import {DataProvider, EventType, Positioning, ReceiverType} from "../common/data-provider";
import {ScaleTitleCommonComponent} from "../new_components/common/scale-title-common/scale-title-common.component";

@Directive({
    selector: "[st-scale-title]"
})
export class ScaleTitleDirective extends CommonDirective implements AfterViewInit {

    constructor(
        private container: ViewContainerRef,
        private renderer: Renderer2,
        private elementRef: ElementRef,
        @Host() @Optional() private component: ScaleTitleCommonComponent,
    ) {
        super();
    }

    override setDataProvider(dataProvider: DataProvider) {
        super.setDataProvider(dataProvider);

        this.dataProvider.events.subscribe(e => {
            if (e.type === EventType.POSITION && e.receiver === ReceiverType.SCALE_TITLE) {
                const positioning = e as Positioning;

                const element = this.elementRef.nativeElement;

                this.renderer.setStyle(element, 'grid-row-start', positioning.position.rowStart);
                this.renderer.setStyle(element, 'grid-row-end', positioning.position.rowStart);
                this.renderer.setStyle(element, 'grid-column-start', positioning.position.columnStart);
                this.renderer.setStyle(element, 'grid-column-end', positioning.position.columnEnd);
                this.renderer.setStyle(element, 'z-index', positioning.position.zIndex);
            }
        })

        if (this.component) {
            setTimeout(() => {
                this.component.initData(this.dataProvider);
            });
        }
    }

    ngAfterViewInit(): void {
    }

    // init(): void {
    //     // const view = this.container.createEmbeddedView(this.template);
    //
    //     const element = this.elementRef.nativeElement;
    //
    //     if (element && this.renderer) {
    //         const position = this.dataProvider.getScaleTitlePosition();
    //
    //         this.renderer.setStyle(element, 'grid-row-start', position.rowStart);
    //         this.renderer.setStyle(element, 'grid-row-end', position.rowEnd);
    //         this.renderer.setStyle(element, 'grid-column-start', position.columnStart);
    //         this.renderer.setStyle(element, 'grid-column-end', position.columnEnd);
    //         this.renderer.setStyle(element, 'z-index', position.zIndex);
    //     }
    // }

}