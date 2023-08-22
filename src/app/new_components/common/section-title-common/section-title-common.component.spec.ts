import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionTitleCommonComponent } from './section-title-common.component';

describe('SectionTitleCommonComponent', () => {
  let component: SectionTitleCommonComponent;
  let fixture: ComponentFixture<SectionTitleCommonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectionTitleCommonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionTitleCommonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
