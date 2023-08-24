import {AfterContentInit, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {DataProvider} from "../../../common/data-provider";
import {Mark} from "../../../common/common";

@Component({
    selector: 'app-common-cell',
    templateUrl: './common-cell.component.html',
    styleUrls: ['./common-cell.component.css']
})
export class CommonCellComponent implements OnInit, OnChanges, AfterContentInit {

    mark!: Mark;

    dataProvider!: DataProvider;

    // text1 = new BehaviorSubject<string>('2');

    @Input()
    text = '1';

    constructor() {
    }

    ngOnInit(): void {
        //
        // console.log('**********************************************************');
        //
        // this.text1.subscribe(v => {
        //    console.log(';;;;;;;;;;;;;;;;;;;;;;;;', v);
        // });
    }

    ngOnChanges(changes: SimpleChanges): void {
        // console.log('text', this.text);
    }

    initData(mark: Mark, dataProvider: DataProvider) {
        this.mark = mark;
        this.dataProvider = dataProvider;
    }

    ngAfterContentInit(): void {

    }

}
