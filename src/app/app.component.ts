import {Component, OnInit} from '@angular/core';
import {TitleComponent} from "./title/title.component";
import {MarkComponent} from "./mark/mark.component";
import {DataProvider} from "./assignment-table/data-provider";
import {AssignmentComponent} from "./assignment/assignment.component";
import {Assignment, TableSection} from "./assignment-table/section";

class AppDataProvider extends DataProvider {

  constructor(private sections: TableSection[]) {
    super();
  }

  getAssignment(sectionId: string): Assignment[] {
    return this.sections.find(s => s.id === sectionId)?.assignments || [];
  }

  getSections(): TableSection[] {
    return this.sections;
  }

  override addRow(sectionId: string) {
    const section = this.sections.find(s => s.id === sectionId);

    if (section) {
      section.assignments.unshift({
        name: '',
        isEdit: true,
        marks: []
      })
    }

    super.addRow(sectionId);
  }

  override clickTimeCell(sectionId: string, offset: number, time: string, step: number) {
    const section = this.sections.find(s => s.id === sectionId);

    const assigment = section?.assignments.find(a => a.isEdit);

    if (assigment) {
      assigment.marks.push({
        offset: offset,
        duration: step,
      });
    }

    super.clickTimeCell(sectionId, offset, time, step);
  }

}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  sections: TableSection[] = [
    {
      id: "1",
      name: "Назначения",
      titleComponent: TitleComponent,
      markComponent: MarkComponent,
      assignmentComponent: AssignmentComponent,
      assignments: [
        {
          name: "Гелофузин р-р д/инф. 500 мл 500",
          isEdit: false,
          marks: [
            {
              offset: 120,
              duration: 60
            }
          ]
        }
      ]
    },
    {
      id: "2",
      name: "Процедуры и манипуляции",
      titleComponent: TitleComponent,
      markComponent: MarkComponent,
      assignmentComponent: AssignmentComponent,
      assignments: [
        {
          name: "Конфокальная микроскопия роговицы",
          isEdit: false,
          marks: [
            {
              offset: 360,
              duration: 90
            }
          ]
        },
        {
          name: "Конфокальная микроскопия роговицы",
          isEdit: false,
          marks: [
            {
              offset: 435,
              duration: 45
            }
          ]
        }
      ]
    },
    {
      id: "3",
      name: "Исследования",
      titleComponent: TitleComponent,
      markComponent: MarkComponent,
      assignmentComponent: AssignmentComponent,
      assignments: [
        {
          name: "Конфокальная микроскопия роговицы",
          isEdit: false,
          marks: [
            {
              offset: 0,
              duration: 15
            },
            {
              offset: 16,
              duration: 15
            },
            {
              offset: 31,
              duration: 15
            },
            {
              offset: 46,
              duration: 15
            },
          ]
        }
      ]
    },
    {
      id: "4",
      name: "Питание",
      titleComponent: TitleComponent,
      markComponent: MarkComponent,
      assignmentComponent: AssignmentComponent,
      assignments: []
    },
  ]

  appDataProvider = new AppDataProvider(this.sections);

  constructor() {
  }

  ngOnInit(): void {
  }

}
