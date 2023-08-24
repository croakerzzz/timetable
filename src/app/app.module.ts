import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {NzDropDownModule} from "ng-zorro-antd/dropdown";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {NzIconModule} from "ng-zorro-antd/icon";
import {HttpClientModule} from "@angular/common/http";
import {ReactiveComponentModule} from "@ngrx/component";
import {ScheduleTableComponent} from './schedule-table/schedule-table.component';
import {MainTableComponent} from './main-table/main-table.component';
import {ScaleTitleDirective} from "./directivies/scale-title-directive";
import {SectionDirective} from "./directivies/section-directive";
import {SectionTitleDirective} from "./directivies/section-title-directive";
import {SectionCellDirective} from "./directivies/section-cell-directive";
import {SectionAssignmentTitleDirective} from "./directivies/section-assignment-title-directive";
import {CellComponent} from './new_components/cell/cell.component';
import {CommonCellComponent} from './new_components/common/common-cell/common-cell.component';
import {CellTwoComponent} from './new_components/cell-two/cell-two.component';
import {ScaleTitleCommonComponent} from './new_components/common/scale-title-common/scale-title-common.component';
import {ScaleTitleComponent} from './new_components/scale-title/scale-title.component';
import {
    SectionAssigmentTitleCommonComponent
} from './new_components/common/section-assigment-title-common/section-assigment-title-common.component';
import {
    SectionAssignmentTitleComponent
} from './new_components/section-assignment-title/section-assignment-title.component';
import {SectionTitleCommonComponent} from './new_components/common/section-title-common/section-title-common.component';
import {SectionTitleComponent} from './new_components/section-title/section-title.component';
import {FormsModule} from "@angular/forms";

@NgModule({
    declarations: [
        AppComponent,
        ScheduleTableComponent,
        MainTableComponent,
        ScaleTitleDirective,
        SectionDirective,
        SectionTitleDirective,
        SectionAssignmentTitleDirective,
        SectionCellDirective,
        CellComponent,
        CommonCellComponent,
        CellTwoComponent,
        ScaleTitleCommonComponent,
        ScaleTitleComponent,
        SectionAssigmentTitleCommonComponent,
        SectionAssignmentTitleComponent,
        SectionTitleCommonComponent,
        SectionTitleComponent,
    ],
    imports: [
        BrowserModule,
        NzDropDownModule,
        BrowserAnimationsModule,
        NzIconModule,
        HttpClientModule,
        ReactiveComponentModule,
        FormsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
