import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanRadaDialogComponent } from './plan-rada-dialog.component';

describe('PlanRadaDialogComponent', () => {
  let component: PlanRadaDialogComponent;
  let fixture: ComponentFixture<PlanRadaDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanRadaDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanRadaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
