import {Component, ElementRef, OnInit, Renderer2} from '@angular/core';
import {MarkTableComponent} from "../assignment-table/common";

@Component({
  selector: 'app-mark',
  templateUrl: './mark.component.html',
  styleUrls: ['./mark.component.css']
})
export class MarkComponent extends MarkTableComponent implements OnInit {

  constructor(
    override el: ElementRef,
    override renderer: Renderer2
  ) {
    super(el, renderer);
  }

  ngOnInit(): void {

    this.dataProvider.events.subscribe(event => {

    });

  }

  click() {
    console.log(123);
  }
}
