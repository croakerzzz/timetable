import {Component, OnInit} from '@angular/core';
import {CommonCellComponent} from "../common/common-cell/common-cell.component";

@Component({
    selector: 'app-cell',
    templateUrl: './cell.component.html',
    styleUrls: ['./cell.component.css'],
    providers: [{provide: CommonCellComponent, useExisting: CellComponent}]
})
export class CellComponent extends CommonCellComponent implements OnInit {

    constructor() {
        super();
    }

    override ngOnInit(): void {
        super.ngOnInit();
    }

}
