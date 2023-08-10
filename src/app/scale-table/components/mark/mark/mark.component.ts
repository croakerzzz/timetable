import {Component, ElementRef, OnInit, Renderer2} from '@angular/core';
import {MarkTableComponent} from "../../../../assignment-table/common";
import {filter} from "rxjs";
import {CancelMark, EventType} from "../../../../assignment-table/data-provider";

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

        this.dataProvider.events
            .pipe(filter(e => e.id != this.generateEventId()))
            .subscribe(event => {
                switch (event.type) {
                    case EventType.CANCEL_MARK: {
                        if ((event as CancelMark).markId === this.mark.id) {
                            this.mark.canceled = true;
                        }
                        break;
                    }
                }
            });

    }

    click() {

        this.mark.canceled = true;

        this.dataProvider.clickMark(this.generateEventId(), this.mark.id, this.mark.offset, this.mark.duration);

    }
}
