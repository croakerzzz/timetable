import {Component, OnInit} from '@angular/core';
import {SectionTitleCommonComponent} from "../common/section-title-common/section-title-common.component";
import {TableSection} from "../../common/common";
import {DataProvider, EventType} from "../../common/data-provider";

@Component({
    selector: 'app-section-title',
    templateUrl: './section-title.component.html',
    styleUrls: ['./section-title.component.css'],
    providers: [{provide: SectionTitleCommonComponent, useExisting: SectionTitleComponent}]
})
export class SectionTitleComponent extends SectionTitleCommonComponent implements OnInit {

    addButtonEnabled = true;

    constructor() {
        super();
    }

    override ngOnInit(): void {
        super.ngOnInit()
    }

    override initData(section: TableSection, dataProvider: DataProvider) {
        super.initData(section, dataProvider);

        this.dataProvider.events.subscribe(e => {
            switch (e.type) {
                case EventType.NEW_ROW_CREATED: {
                    this.addButtonEnabled = false;
                    break;
                }
                case EventType.NEW_ROW_CANCELED: {
                    this.addButtonEnabled = true;
                    break;
                }
            }
        })
    }

    addRow() {
        this.dataProvider.addRow(this.section.id);
    }
}
