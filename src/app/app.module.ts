import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {NzDropDownModule} from "ng-zorro-antd/dropdown";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {NzIconModule} from "ng-zorro-antd/icon";
import {HttpClientModule} from "@angular/common/http";
import {AssignmentTableComponent} from './assignment-table/assignment-table.component';
import { DynamicComponent } from './dynamic/dynamic.component';
import { TitleComponent } from './title/title.component';
import { MarkComponent } from './mark/mark.component';

@NgModule({
  declarations: [
    AppComponent,
    AssignmentTableComponent,
    DynamicComponent,
    TitleComponent,
    MarkComponent,
  ],
  imports: [
    BrowserModule,
    NzDropDownModule,
    BrowserAnimationsModule,
    NzIconModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
