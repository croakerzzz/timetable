import {Component, ElementRef, OnInit, Renderer2} from '@angular/core';
import {Assignment, AssignmentTableComponent} from "../assignment-table/common";

@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.css']
})
export class AssignmentComponent extends AssignmentTableComponent implements OnInit {

  assignment!: Assignment;

  constructor(
    override el: ElementRef,
    override renderer: Renderer2
  ) {
    super(el, renderer);
  }

  ngOnInit(): void {

  }

  setAssigmentData(assignment: Assignment): void {
    this.assignment = assignment;
  }

}
