import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScaleTitleCommonComponent } from './scale-title-common.component';

describe('ScaleTitleCommonComponent', () => {
  let component: ScaleTitleCommonComponent;
  let fixture: ComponentFixture<ScaleTitleCommonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScaleTitleCommonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScaleTitleCommonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
