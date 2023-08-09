import {Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2} from '@angular/core';
import {Observable} from "rxjs";
import {TableComponent} from "../assignment-table/common";

@Component({
  selector: 'app-dynamic',
  templateUrl: './dynamic.component.html',
  styleUrls: ['./dynamic.component.css']
})
export class DynamicComponent extends TableComponent implements OnInit {

  @Input()
  title$!: Observable<string>;

  @Output()
  customEvent: EventEmitter<void> = new EventEmitter<void>();

  constructor(override el: ElementRef, override renderer: Renderer2) {
    super(el, renderer);
  }

  ngOnInit(): void {
  }

  print() {
    console.log(1);
    this.customEvent.emit();
  }

}
