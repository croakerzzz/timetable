import {Component, OnInit} from '@angular/core';
import {CommonCellComponent} from "../common-cell/common-cell.component";

@Component({
    selector: 'app-cell-two',
    templateUrl: './cell-two.component.html',
    styleUrls: ['./cell-two.component.css'],
    providers: [{provide: CommonCellComponent, useExisting: CellTwoComponent}]
})
export class CellTwoComponent extends CommonCellComponent implements OnInit {

    constructor() {
        super();
    }

    override ngOnInit(): void {
        super.ngOnInit();
    }
}
