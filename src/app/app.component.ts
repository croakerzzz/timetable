import {Component, ElementRef, HostBinding, OnInit} from '@angular/core';
import {TableSection} from "./assignment-table/common";
import {TitleComponent} from "./title/title.component";
import {MarkComponent} from "./mark/mark.component";

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
      assignments: [
        {
          name: "Гелофузин р-р д/инф. 500 мл 500",
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
      assignments: [
        {
          name: "Конфокальная микроскопия роговицы",
          marks: [
            {
              offset: 360,
              duration: 90
            }
          ]
        },
        {
          name: "Конфокальная микроскопия роговицы",
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
      assignments: [
        {
          name: "Конфокальная микроскопия роговицы",
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
      assignments: []
    },
  ]

  constructor() {
  }

  ngOnInit(): void {
  }

}
