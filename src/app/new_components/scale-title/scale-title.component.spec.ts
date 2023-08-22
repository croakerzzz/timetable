import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScaleTitleComponent } from './scale-title.component';

describe('ScaleTitleComponent', () => {
  let component: ScaleTitleComponent;
  let fixture: ComponentFixture<ScaleTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScaleTitleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScaleTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
