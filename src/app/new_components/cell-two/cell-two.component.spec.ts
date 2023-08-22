import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CellTwoComponent } from './cell-two.component';

describe('CellTwoComponent', () => {
  let component: CellTwoComponent;
  let fixture: ComponentFixture<CellTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CellTwoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CellTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
