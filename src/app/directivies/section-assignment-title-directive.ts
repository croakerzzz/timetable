import {
    AfterViewInit,
    Directive,
    ElementRef,
    Host,
    Input, Optional,
    Renderer2,
    TemplateRef,
    ViewContainerRef
} from "@angular/core";
import {Assignment, CommonDirective} from "../common/common";
import {ScaleTitleCommonComponent} from "../new_components/common/scale-title-common/scale-title-common.component";
import {
    SectionAssigmentTitleCommonComponent
} from "../new_components/common/section-assigment-title-common/section-assigment-title-common.component";
import {DataProvider, EventType, Positioning, ReceiverType} from "../common/data-provider";

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
        @Host() @Optional() private component: SectionAssigmentTitleCommonComponent,
    ) {
        super();
    }

    ngAfterViewInit(): void {
    }

    override setDataProvider(dataProvider: DataProvider) {
        super.setDataProvider(dataProvider);

        this.dataProvider.events.subscribe(e => {
            if (e.type === EventType.POSITION && e.receiver === ReceiverType.ASSIGNMENT && e.id == this.assignment.id) {
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
                this.component.initData(this.assignment, this.dataProvider);
            });
        }
    }

}