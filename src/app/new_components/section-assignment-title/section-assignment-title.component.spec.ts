import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionAssignmentTitleComponent } from './section-assignment-title.component';

describe('SectionAssignmentTitleComponent', () => {
  let component: SectionAssignmentTitleComponent;
  let fixture: ComponentFixture<SectionAssignmentTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectionAssignmentTitleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionAssignmentTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
