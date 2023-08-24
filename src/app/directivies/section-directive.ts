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
import {CommonDirective} from "../common/common";
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
        this.sectionAssignmentTitles?.changes.subscribe(c => {
            this.sectionAssignmentTitles?.forEach(sa => {
                sa.setDataProvider(this.dataProvider);
            });
        })

        this.sectionCells?.changes.subscribe(c => {
            this.sectionCells?.forEach(sc => {
                sc.setDataProvider(this.dataProvider);
            });
        })
    }

    ngOnChanges(changes: SimpleChanges): void {
    }

    init(): void {
        this.sectionTitles?.forEach(st => {
            st.setDataProvider(this.dataProvider);
            st.initData(this.dataProvider.getSections().find(s => s.id == this.sectionId));
        });

        this.sectionAssignmentTitles?.forEach(sc => {
            sc.setDataProvider(this.dataProvider);
        });

        this.sectionCells?.forEach(sc => {
            sc.setDataProvider(this.dataProvider);
            //sc.init();
        });
    }

}