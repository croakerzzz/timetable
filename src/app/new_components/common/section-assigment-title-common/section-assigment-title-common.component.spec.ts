import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionAssigmentTitleCommonComponent } from './section-assigment-title-common.component';

describe('SectionAssigmentTitleCommonComponent', () => {
  let component: SectionAssigmentTitleCommonComponent;
  let fixture: ComponentFixture<SectionAssigmentTitleCommonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectionAssigmentTitleCommonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionAssigmentTitleCommonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
