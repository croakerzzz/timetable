import {Component, ElementRef, OnInit, Renderer2} from '@angular/core';
import {TableSection, TitleTableComponent} from "../assignment-table/common";

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.css']
})
export class TitleComponent extends TitleTableComponent implements OnInit {

  tableSection!: TableSection;

  createButtonDisabled = false;

  constructor(
    override el: ElementRef,
    override renderer: Renderer2
  ) {
    super(el, renderer);
  }

  ngOnInit(): void {

    this.dataProvider.events.subscribe(event => {
      switch (event.name) {
        case 'createRow': {
          this.createButtonDisabled = true;
          break;
        }
      }
    });

  }

  setTableSection(tableSection$: TableSection): void {
    this.tableSection = tableSection$;
  }

  add() {
    this.dataProvider.addRow(this.tableSection.id);
  }
}
