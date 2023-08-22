import {AfterViewInit, Directive, ElementRef, Host, Input, Optional, Renderer2, ViewContainerRef} from "@angular/core";
import {DataProvider, EventType, Positioning, ReceiverType} from "../assignment-table/data-provider";
import {CommonDirective, TableSection} from "../assignment-table/common";
import {
    SectionTitleCommonComponent
} from "../new_components/common/section-title-common/section-title-common.component";

@Directive({
    selector: "[st-section-title]"
})
export class SectionTitleDirective extends CommonDirective implements AfterViewInit {

    section!: TableSection;

    constructor(
        private container: ViewContainerRef,
        private renderer: Renderer2,
        private elementRef: ElementRef,
        @Host() @Optional() private component: SectionTitleCommonComponent,
    ) {
        super();
    }

    ngAfterViewInit(): void {
    }

    override setDataProvider(dataProvider: DataProvider) {
        super.setDataProvider(dataProvider);
    }

    initData(section?: TableSection): void {
        if (section) {
            this.section = section;

            this.dataProvider.events.subscribe(e => {
                if (e.type === EventType.POSITION && e.receiver === ReceiverType.SECTION && this.section.id == e.id) {
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
                    this.component.initData(this.section, this.dataProvider);
                });
            }
        }
    }

    // init(sectionId: string) {
    //     console.log('draw section title', sectionId);
    //
    //     const element = this.elementRef.nativeElement;
    //
    //     if (element && this.renderer) {
    //         const position = this.dataProvider.getSectionTitlePosition(sectionId);
    //
    //         console.log('position', position);
    //
    //         this.renderer.setStyle(element, 'grid-row-start', position.rowStart);
    //         this.renderer.setStyle(element, 'grid-row-end', position.rowEnd);
    //         this.renderer.setStyle(element, 'grid-column-start', position.columnStart);
    //         this.renderer.setStyle(element, 'grid-column-end', position.columnEnd);
    //         this.renderer.setStyle(element, 'z-index', position.zIndex);
    //     }
    // }

}