import {
    AfterViewInit,
    ChangeDetectorRef,
    ContentChildren,
    Directive,
    ElementRef,
    Input,
    OnChanges,
    QueryList,
    Renderer2,
    SimpleChanges,
    ViewContainerRef
} from "@angular/core";
import {CommonDirective} from "../assignment-table/common";
import {SectionTitleDirective} from "./section-title-directive";
import {SectionCellDirective} from "./section-cell-directive";
import {SectionAssignmentTitleDirective} from "./section-assignment-title-directive";

@Directive({
    selector: "[st-section]"
})
export class SectionDirective extends CommonDirective implements AfterViewInit, OnChanges {

    @Input("st-section")
    sectionId!: string;

    @ContentChildren(SectionTitleDirective)
    sectionTitles?: QueryList<SectionTitleDirective>;

    // @ContentChildren(SectionAssignmentDirective)
    // sectionAssignments?: QueryList<SectionAssignmentDirective>;

    @ContentChildren(SectionAssignmentTitleDirective)
    sectionAssignmentTitles?: QueryList<SectionAssignmentTitleDirective>;

    @ContentChildren(SectionCellDirective, {descendants: true})
    sectionCells?: QueryList<SectionCellDirective>;

    constructor(
        private container: ViewContainerRef,
        private renderer: Renderer2,
        private elementRef: ElementRef,
        private cdRef: ChangeDetectorRef,
    ) {
        super();
    }

    ngAfterViewInit(): void {
    }

    ngOnChanges(changes: SimpleChanges): void {
    }

    init(): void {
        // const view = this.container.createEmbeddedView(this.template);

        console.log(this.sectionTitles);

        this.sectionTitles?.forEach(st => {
            st.setDataProvider(this.dataProvider);
            st.initData(this.dataProvider.getSections().find(s => s.id == this.sectionId));
        });

        // this.sectionAssignments?.forEach(sa => {
        //     sa.setDataProvider(this.dataProvider);
        //     sa.init();
        // });

        this.sectionAssignmentTitles?.forEach(sc => {
            sc.setDataProvider(this.dataProvider);
            // sc.init();
        });

        this.sectionCells?.forEach(sc => {
            sc.setDataProvider(this.dataProvider);
            //sc.init();
        });
    }

}