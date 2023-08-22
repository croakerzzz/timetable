import {
    AfterViewInit,
    ContentChildren,
    Directive,
    ElementRef,
    Host,
    Input,
    Optional,
    QueryList,
    Renderer2,
    ViewContainerRef
} from "@angular/core";
import {CommonDirective, Mark} from "../assignment-table/common";
import {CommonCellComponent} from "../new_components/common-cell/common-cell.component";

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
        // console.log('cell components: ', this.components);
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

        // console.log(')))))))))))))))))))))))))))))))))))))))', this.components);
        //
        // if (this.components && this.components.length > 0) {
        //     setTimeout(() => {
        //         this.components?.get(0)?.text1.next(position.columnStart + '');
        //     });
        // }

        if (this.component) {
            setTimeout(() => {
                this.component.text = position.columnStart + '';
                this.component.initData(this.mark, this.dataProvider);
            });
        }

    }

}