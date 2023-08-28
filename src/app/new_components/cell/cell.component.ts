import {Component, OnInit} from '@angular/core';
import {CommonCellComponent} from "../common/common-cell/common-cell.component";
import {MarkState} from "../../common/common";

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

    clickCell() {
        this.dataProvider.clickMark(this.mark.id);
    }

    isNormal(): boolean {
        return this.mark.state === MarkState.NORMAL;
    }

    isCanceled(): boolean {
        return this.mark.state === MarkState.CANCELED_NOT_SAVED || this.mark.state === MarkState.CANCELED_SAVED;
    }

}
