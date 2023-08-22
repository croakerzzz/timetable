import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonCellComponent } from './common-cell.component';

describe('CommonCellComponent', () => {
  let component: CommonCellComponent;
  let fixture: ComponentFixture<CommonCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommonCellComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
