import {Component, OnInit} from '@angular/core';
import {SectionTitleCommonComponent} from "../common/section-title-common/section-title-common.component";

@Component({
    selector: 'app-section-title',
    templateUrl: './section-title.component.html',
    styleUrls: ['./section-title.component.css'],
    providers: [{provide: SectionTitleCommonComponent, useExisting: SectionTitleComponent}]
})
export class SectionTitleComponent extends SectionTitleCommonComponent implements OnInit {

    constructor() {
        super();
    }

    override ngOnInit(): void {
        super.ngOnInit()
    }

    addRow() {
        this.dataProvider.addRow(this.section.id);
    }
}
