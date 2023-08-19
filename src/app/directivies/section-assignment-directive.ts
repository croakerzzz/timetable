import {AfterViewInit, Directive, ElementRef, Input, Renderer2, TemplateRef, ViewContainerRef} from "@angular/core";
import {Assignment, CommonDirective} from "../assignment-table/common";

@Directive({
    selector: "[st-section-assignmentOf]"
})
export class SectionAssignmentDirective extends CommonDirective implements AfterViewInit {

    map: Map<string, ElementRef> = new Map<string, ElementRef>();

    constructor(
        private container: ViewContainerRef,
        private template: TemplateRef<Object>,
        private renderer: Renderer2,
        private elementRef: ElementRef,
    ) {
        super();
    }

    @Input("st-section-assignmentOf")
    set forOf(collection: Assignment[]) {
        this.container.clear();

        collection.forEach((item, index) => {
            const context = {
                $implicit: item,
                index
            };

            //const view = this.container.createEmbeddedView(this.template, context);

            const viewRef = this.template.createEmbeddedView(context);
            this.container.insert(viewRef);

            this.map.set(item.id, viewRef.rootNodes[0]);
        });
    }

    ngAfterViewInit(): void {
    }

    init(): void {
        console.log('draw section assignment');
   }

}