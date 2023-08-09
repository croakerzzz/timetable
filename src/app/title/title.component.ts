import {Component, ElementRef, OnInit, Renderer2} from '@angular/core';
import {TableSection, TitleTableComponent} from "../assignment-table/common";

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.css']
})
export class TitleComponent extends TitleTableComponent implements OnInit {

  name!: string;

  constructor(
    override el: ElementRef,
    override renderer: Renderer2
  ) {
    super(el, renderer);
  }

  ngOnInit(): void {

  }

  setTableSection(tableSection: TableSection): void {
    this.name = tableSection.name;
  }

}
