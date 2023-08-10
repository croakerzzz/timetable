import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScaleTableComponent } from './scale-table.component';

describe('ScaleTableComponent', () => {
  let component: ScaleTableComponent;
  let fixture: ComponentFixture<ScaleTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScaleTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScaleTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
