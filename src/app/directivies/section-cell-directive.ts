import {AfterViewInit, Directive, ElementRef, Host, Input, Optional, Renderer2, ViewContainerRef} from "@angular/core";
import {CommonDirective, Mark} from "../common/common";
import {CommonCellComponent} from "../new_components/common/common-cell/common-cell.component";
import {DataProvider, EventType, Positioning, ReceiverType} from "../common/data-provider";

@Directive({
    selector: "[st-section-cell]"
})
export class SectionCellDirective extends CommonDirective implements AfterViewInit {

    // @ContentChildren(CommonCellComponent, {descendants: true})
    // components?: QueryList<CommonCellComponent>;

    constructor(
        private container: ViewContainerRef,
        private renderer: Renderer2,
        private elementRef: ElementRef,
        @Host() @Optional() private component: CommonCellComponent,
    ) {
        super();
    }

    @Input("st-section-cell")
    mark!: Mark;

    ngAfterViewInit(): void {

    }

    override setDataProvider(dataProvider: DataProvider) {
        super.setDataProvider(dataProvider);

        this.dataProvider.events.subscribe(e => {
            if (e.type === EventType.POSITION && e.receiver === ReceiverType.MARK) {
                if (this.mark && this.mark.id == e.id) {
                    const positioning = e as Positioning;

                    const element = this.elementRef.nativeElement;

                    this.renderer.setStyle(element, 'grid-row-start', positioning.position.rowStart);
                    this.renderer.setStyle(element, 'grid-row-end', positioning.position.rowStart);
                    this.renderer.setStyle(element, 'grid-column-start', positioning.position.columnStart);
                    this.renderer.setStyle(element, 'grid-column-end', positioning.position.columnEnd);
                    this.renderer.setStyle(element, 'z-index', positioning.position.zIndex);
                }
            }
        })

        if (this.component) {
            setTimeout(() => {
                this.component.initData(this.mark, this.dataProvider);
            });
        }
    }

}