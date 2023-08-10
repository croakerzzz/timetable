import {Component, ElementRef, OnInit, Renderer2} from '@angular/core';
import {TitleTableComponent} from "../assignment-table/common";
import {EventType} from "../assignment-table/data-provider";

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.css']
})
export class TitleComponent extends TitleTableComponent implements OnInit {

  createButtonDisabled = false;

  constructor(
    override el: ElementRef,
    override renderer: Renderer2
  ) {
    super(el, renderer);
  }

  ngOnInit(): void {

    this.dataProvider.events.subscribe(event => {
      switch (event.type) {
        case EventType.CREATE_ROW: {
          this.createButtonDisabled = true;
          break;
        }
      }
    });

  }

  add() {
    this.dataProvider.addRow(this.generateEventId(), this.tableSection.id);
  }
}
