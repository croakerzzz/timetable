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
import {Assignment, Mark, TableSection} from "./common";

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
  sections!: TableSection[];

  @HostBinding("style.--grid-cell-minsize") gridCellMinSize: string = '1px';

  gridCells: GridCell[] = [];

  times: string[] = [];

  steps: Step[] = [
    {
      minutes: 5,
      gridCellMinSize: '40px',
      markAlignMode: 5
    },
    {
      minutes: 10,
      gridCellMinSize: '20px',
      markAlignMode: 5
    },
    {
      minutes: 15,
      gridCellMinSize: '13px',
      markAlignMode: 15
    },
    {
      minutes: 30,
      gridCellMinSize: '7px',
      markAlignMode: 15
    },
    {
      minutes: 60,
      gridCellMinSize: '3px',
      markAlignMode: 15
    },
  ]

  currentStep = 3;

  stepCells = this.steps[this.currentStep].minutes / 5;

  @ViewChild('dynamic', { read: ViewContainerRef })
  private viewRef?: ViewContainerRef;

  constructor(
    private host: ElementRef<HTMLElement>,
    private cdRef: ChangeDetectorRef,
  ) {
  }

  ngOnInit(): void {
    // this.host.nativeElement.style.setProperty('--timetable-column','3');

    this.refresh();

    console.log(this.times.length);

  }

  ngAfterViewInit(): void {
    this.viewRef?.clear();
    console.log(this.viewRef);

    let row = 2;

    for (let sectionIndex = 0; sectionIndex < this.sections.length; sectionIndex++) {

      const titleComponentRef = this.viewRef?.createComponent(this.sections[sectionIndex].titleComponent);

      if (titleComponentRef) {

        const titleComponent = titleComponentRef.instance;

        titleComponent.setInitData({
          gridRowStart: row,
          gridRowEnd: row,
          gridColumnStart: 1,
          gridColumnEnd: 289,
          zIndex: 1
        });

        titleComponent.setTableSection(this.sections[sectionIndex]);

        row++;

        for (let assignmentIndex = 0; assignmentIndex < this.getSectionAssignment(this.sections[sectionIndex].id).length; assignmentIndex++) {

          for (let markIndex = 0; markIndex < this.sections[sectionIndex].assignments[assignmentIndex].marks.length; markIndex++) {

            const markComponentRef = this.viewRef?.createComponent(this.sections[sectionIndex].markComponent);

            if (markComponentRef) {
              const markComponent = markComponentRef.instance;

              const mark = this.sections[sectionIndex].assignments[assignmentIndex].marks[markIndex];

              markComponent.setInitData({
                gridRowStart: row,
                gridRowEnd: row,
                gridColumnStart: this.getMarkStartColumn(mark),
                gridColumnEnd: this.getMarkEndColumn(mark),
                zIndex: 10
              });

              markComponent.setMarkData(mark);
            }

          }

          row++;
        }
      }

    }

    this.cdRef.detectChanges();

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
    for (let i = 0; i < 12 * 24; i++) {
      this.gridCells.push({offset: i * 5, title: date.toTimeString().substring(0, 5)});
      date.setMinutes(date.getMinutes() + 5);
    }

    // this.gridCells.forEach(v => console.log(v.offset, v.title));

    this.stepCells = this.steps[this.currentStep].minutes / 5;

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
    return this.sections.find(s => s.id === sectionId)?.assignments || [];
  }

  add() {
    this.currentStep = this.currentStep === this.steps.length - 1 ? this.steps.length - 1 : this.currentStep + 1;

    this.refresh();

    console.log(this.currentStep);
  }

  sub() {
    this.currentStep = this.currentStep === 0 ? 0 : this.currentStep - 1;

    this.refresh();

    console.log(this.currentStep);
  }

  getAssignmentRow(sectionIndex: number, assignmentIndex: number): number {
    // шкала с временами + первый заголовок + 1
    return this.countPrevAssignmentRow(sectionIndex) + assignmentIndex + 2;
  }

  countPrevAssignmentRow(currentIndex: number): number {
    let result = 1;

    for (let i = 0; i < currentIndex; i++) {
      result += this.getSectionAssignment(this.sections[i].id).length + 1;
    }

    console.log('prev', result);

    return result;
  }

  getMarkStartColumn(mark: Mark): number {
    return Math.floor(mark.offset / this.steps[this.currentStep].markAlignMode) *
      (this.steps[this.currentStep].markAlignMode / 5) + 2;
  }

  getMarkEndColumn(mark: Mark): number {
    return this.getMarkStartColumn(mark) + Math.floor(mark.duration / this.steps[this.currentStep].markAlignMode) *
      (this.steps[this.currentStep].markAlignMode / 5);
  }

  protected readonly console = console;

  log(s: string) {
    console.log(s);
  }
}
