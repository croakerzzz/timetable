import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostBinding,
  Input,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {toNumber} from "ng-zorro-antd/core/util";
import {Assignment, Mark} from "./common";
import {DataProvider} from "./data-provider";

interface GridCell {
  offset: number,
  title: string,
}

interface Step {
  minutes: number,
  gridCellMinSize: string,
  markAlignMode: 5 | 10 | 15;
}

@Component({
  selector: 'app-assignment-table',
  templateUrl: './assignment-table.component.html',
  styleUrls: ['./assignment-table.component.css']
})
export class AssignmentTableComponent implements OnInit, AfterViewInit {

  // todo сделать объект с настройками всей таблицы
  @Input()
  dataProvider!: DataProvider;

  @HostBinding("style.--grid-cell-minsize") gridCellMinSize: string = '1px';

  @HostBinding("style.--grid-cell-step") gridCellStep: number = 1;

  gridCells: GridCell[] = [];

  times: string[] = [];

  steps: Step[] = [
    {
      minutes: 5,
      gridCellMinSize: '8px',
      markAlignMode: 5
    },
    {
      minutes: 10,
      gridCellMinSize: '4px',
      markAlignMode: 5
    },
    {
      minutes: 15,
      gridCellMinSize: '2.5px',
      markAlignMode: 15
    },
    {
      minutes: 30,
      gridCellMinSize: '1.5px',
      markAlignMode: 15
    },
    {
      minutes: 60,
      gridCellMinSize: '0.5px',
      markAlignMode: 15
    },
  ]

  currentStep = 3;

  stepCells = this.steps[this.currentStep].minutes / this.gridCellStep;

  @ViewChild('dynamic', {read: ViewContainerRef})
  private viewRef?: ViewContainerRef;

  constructor(
    private host: ElementRef<HTMLElement>,
    private cdRef: ChangeDetectorRef,
  ) {
  }

  draw(): void {
    this.viewRef?.clear();
    // console.log(this.viewRef);

    let row = 2;

    for (let sectionIndex = 0; sectionIndex < this.dataProvider.getSections().length; sectionIndex++) {

      const titleComponentRef =
        this.viewRef?.createComponent(this.dataProvider.getSections()[sectionIndex].titleComponent);

      if (titleComponentRef) {

        const titleComponent = titleComponentRef.instance;

        titleComponent.position({
          gridRowStart: row,
          gridRowEnd: row,
          gridColumnStart: 1,
          gridColumnEnd: 289,
          zIndex: 1
        });

        titleComponent.setDataProvider(this.dataProvider);

        titleComponent.setTableSection(this.dataProvider.getSections()[sectionIndex]);

        row++;

        for (let assignmentIndex = 0;
             assignmentIndex < this.getSectionAssignment(this.dataProvider.getSections()[sectionIndex].id).length;
             assignmentIndex++) {

          const assignmentComponentRef =
            this.viewRef?.createComponent(this.dataProvider.getSections()[sectionIndex].assignmentComponent);

          if (assignmentComponentRef) {
            const assignmentComponent = assignmentComponentRef.instance;

            assignmentComponent.position({
              gridRowStart: row,
              gridRowEnd: row,
              gridColumnStart: 1,
              gridColumnEnd: 1,
              zIndex: 1
            });

            assignmentComponent.setDataProvider(this.dataProvider);

            assignmentComponent.setAssigmentData(this.getSectionAssignment(this.dataProvider.getSections()[sectionIndex].id)[assignmentIndex]);

          }

          for (let markIndex = 0;
               markIndex < this.getSectionAssignment(this.dataProvider.getSections()[sectionIndex].id)[assignmentIndex].marks.length;
               markIndex++) {

            const markComponentRef =
              this.viewRef?.createComponent(this.dataProvider.getSections()[sectionIndex].markComponent);

            if (markComponentRef) {
              const markComponent = markComponentRef.instance;

              const mark = this.getSectionAssignment(this.dataProvider.getSections()[sectionIndex].id)[assignmentIndex].marks[markIndex];

              markComponent.position({
                gridRowStart: row,
                gridRowEnd: row,
                gridColumnStart: this.getMarkStartColumn(mark),
                gridColumnEnd: this.getMarkEndColumn(mark),
                zIndex: 10
              });

              markComponent.setDataProvider(this.dataProvider);

              markComponent.setMarkData(mark);
            }

          }

          row++;
        }
      }

    }

    this.cdRef.detectChanges();
  }

  ngOnInit(): void {
    // this.host.nativeElement.style.setProperty('--timetable-column','3');

    this.refresh();

    // console.log(this.times.length);

    this.dataProvider.events.subscribe(event => {
      console.log('event', event);

      this.draw();
    });

  }

  ngAfterViewInit(): void {

    this.draw();

    // const componentRef = this.viewRef?.createComponent(DynamicComponent);
    // console.log(componentRef);
    //
    // if (componentRef) {
    //   componentRef.instance.setInitData({
    //     gridRowStart: 3,
    //     gridRowEnd: 3,
    //     gridColumnStart: 10,
    //     gridColumnEnd: 20,
    //     zIndex: 10
    //   });
    //   componentRef.instance.title$ = of('123');
    //
    //   componentRef.instance.customEvent.subscribe(() => {
    //     console.log('123');
    //   });
    // }
  }

  zeroTime: string = '07:00';

  refresh(): void {
    let date = new Date();
    date.setHours(toNumber(this.zeroTime.split(":")[0]), toNumber(this.zeroTime.split(":")[1]), 0, 0);
    for (let i = 0; i < (60 / this.gridCellStep) * 24; i++) {
      this.gridCells.push({offset: i * this.gridCellStep, title: date.toTimeString().substring(0, 5)});
      date.setMinutes(date.getMinutes() + this.gridCellStep);
    }

    // this.gridCells.forEach(v => console.log(v.offset, v.title));

    this.stepCells = this.steps[this.currentStep].minutes / this.gridCellStep;

    this.times = [];

    for (let i = 0; i < (60 / this.steps[this.currentStep].minutes) * 24; i++) {
      this.times.push(i + '');
    }

    this.gridCellMinSize = this.steps[this.currentStep].gridCellMinSize;
  }

  getScaleTitleRowName(gridCellIndex: number): string {
    return this.gridCells[gridCellIndex].title;
  }

  getSectionAssignment(sectionId: string): Assignment[] {
    return this.dataProvider.getAssignment(sectionId);
  }

  add() {
    this.currentStep = this.currentStep === this.steps.length - 1 ? this.steps.length - 1 : this.currentStep + 1;

    this.refresh();

    // console.log(this.currentStep);
  }

  sub() {
    this.currentStep = this.currentStep === 0 ? 0 : this.currentStep - 1;

    this.refresh();

    // console.log(this.currentStep);
  }

  getAssignmentRow(sectionIndex: number, assignmentIndex: number): number {
    // шкала с временами + первый заголовок + 1
    return this.countPrevAssignmentRow(sectionIndex) + assignmentIndex + 2;
  }

  countPrevAssignmentRow(currentIndex: number): number {
    let result = 1;

    for (let i = 0; i < currentIndex; i++) {
      result += this.getSectionAssignment(this.dataProvider.getSections()[i].id).length + 1;
    }

    // console.log('prev', result);

    return result;
  }

  getMarkStartColumn(mark: Mark): number {
    return Math.floor(mark.offset / this.steps[this.currentStep].markAlignMode) *
      (this.steps[this.currentStep].markAlignMode / this.gridCellStep) + 2;
  }

  getMarkEndColumn(mark: Mark): number {
    return this.getMarkStartColumn(mark) + Math.floor(mark.duration / this.steps[this.currentStep].markAlignMode) *
      (this.steps[this.currentStep].markAlignMode / this.gridCellStep);
  }

  log(s: string) {
    console.log(s);
  }

  clickTimeCell(sectionId: string, timeCell: number) {
    console.log(this.gridCells[timeCell]);

    this.dataProvider.clickTimeCell(sectionId, this.gridCells[timeCell].offset, this.gridCells[timeCell].title, this.steps[this.currentStep].minutes);
  }

}
