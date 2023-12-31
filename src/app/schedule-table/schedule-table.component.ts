import {
    AfterViewInit,
    Component,
    ContentChild,
    ContentChildren,
    HostBinding,
    Input,
    OnInit,
    QueryList
} from '@angular/core';
import {DataProvider, EventType, GridCell} from "../common/data-provider";
import {toNumber} from "ng-zorro-antd/core/util";
import {ScaleTitleDirective} from "../directivies/scale-title-directive";
import {SectionDirective} from "../directivies/section-directive";
import {Assignment} from "../common/common";

@Component({
    selector: 'app-schedule-table',
    templateUrl: './schedule-table.component.html',
    styleUrls: ['./schedule-table.component.css']
})
export class ScheduleTableComponent implements OnInit, AfterViewInit {

    @Input()
    dataProvider!: DataProvider;

    @HostBinding("style.--grid-cell-minsize") gridCellMinSize: string = '1px';

    @HostBinding("style.--grid-cell-step") gridCellStep: number = 1;

    @ContentChild(ScaleTitleDirective)
    scaleTitle?: ScaleTitleDirective;

    @ContentChildren(SectionDirective)
    sections?: QueryList<SectionDirective>;

    gridCells: GridCell[] = [];

    times: string[] = [];

    constructor() {
    }

    refresh(): void {
        let date = new Date();
        date.setHours(toNumber(this.dataProvider.zeroTime.split(":")[0]),
            toNumber(this.dataProvider.zeroTime.split(":")[1]), 0, 0);
        for (let i = 0; i < (60 / this.gridCellStep) * 24; i++) {
            this.gridCells.push({offset: i * this.gridCellStep, title: date.toTimeString().substring(0, 5)});
            date.setMinutes(date.getMinutes() + this.gridCellStep);
        }

        // this.gridCells.forEach(v => console.log(v.offset, v.title));

        this.dataProvider.stepCells = this.dataProvider.steps[this.dataProvider.currentStep].minutes / this.gridCellStep;

        this.times = [];

        for (let i = 0; i < (60 / this.dataProvider.steps[this.dataProvider.currentStep].minutes) * 24; i++) {
            this.times.push(i + '');
        }

        this.gridCellMinSize = this.dataProvider.steps[this.dataProvider.currentStep].gridCellMinSize;
    }

    ngOnInit(): void {
        this.refresh();

        this.dataProvider.events.subscribe(e => {

            switch (e.type) {
                case EventType.SCALE_CHANGED: {
                    this.refresh();
                    break;
                }
            }

        });
    }

    getScaleTitleRowName(gridCellIndex: number): string {
        return this.gridCells[gridCellIndex].title;
    }

    ngAfterViewInit(): void {
        if (this.scaleTitle) {
            this.scaleTitle.setDataProvider(this.dataProvider);
            //this.scaleTitle.init();
        }

        if (this.sections) {
            this.sections.forEach(s => {
                s.setDataProvider(this.dataProvider);
                s.init();
            });
        }

        this.dataProvider.sendAllPosition();
    }

    getSectionAssignment(sectionId: string): Assignment[] {
        return this.dataProvider.getAssignments(sectionId);
    }

    countPrevAssignmentRow(currentIndex: number): number {
        let result = 1;

        for (let i = 0; i < currentIndex; i++) {
            result += this.getSectionAssignment(this.dataProvider.getSections()[i].id).length + 1;
        }

        // console.log('prev', result);

        return result;
    }

    getAssignmentRow(sectionIndex: number, assignmentIndex: number): number {
        // шкала с временами + первый заголовок + 1
        return this.countPrevAssignmentRow(sectionIndex) + assignmentIndex + 2;
    }

    clickTimeCell($event: MouseEvent, sectionId: string, assignmentId: string, timeCell: number) {
        this.dataProvider.clickEmptyCell(
            "",
            sectionId,
            assignmentId,
            this.gridCells[timeCell].offset,
            this.gridCells[timeCell].title,
            this.dataProvider.steps[this.dataProvider.currentStep].minutes,
            $event.shiftKey
        );
    }

    isCurrentHour(time: string): boolean {
        const zeroParts = this.dataProvider.zeroTime.split(":");

        const zeroMinutes = Number.parseInt(zeroParts[0]) * 60 + Number.parseInt(zeroParts[1]);

        const prevMinutes = 24 * 60 - zeroMinutes;

        const minutes = Number.parseInt(time) * this.dataProvider.steps[this.dataProvider.currentStep].minutes;

        if (zeroMinutes > 0) {
            if (this.dataProvider.currentHour < zeroMinutes) {
                return minutes == this.dataProvider.currentHour + prevMinutes;
            } else {
                return minutes + zeroMinutes == this.dataProvider.currentHour;
            }
        } else {
            return minutes == this.dataProvider.currentHour;
        }
    }

}
