import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {NzDropDownModule} from "ng-zorro-antd/dropdown";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {NzIconModule} from "ng-zorro-antd/icon";
import {HttpClientModule} from "@angular/common/http";
import {AssignmentTableComponent} from './assignment-table/assignment-table.component';
import {TitleComponent} from './scale-table/components/title/title/title.component';
import {MarkComponent} from './scale-table/components/mark/mark/mark.component';
import {ReactiveComponentModule} from "@ngrx/component";
import {AssignmentComponent} from './scale-table/components/assignment/assignment/assignment.component';
import {ScaleTableComponent} from './scale-table/scale-table.component';

@NgModule({
  declarations: [
    AppComponent,
    AssignmentTableComponent,
    TitleComponent,
    MarkComponent,
    AssignmentComponent,
    ScaleTableComponent,
  ],
    imports: [
        BrowserModule,
        NzDropDownModule,
        BrowserAnimationsModule,
        NzIconModule,
        HttpClientModule,
        ReactiveComponentModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
