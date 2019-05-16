import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VrstaIntervencijeDialogComponent } from './vrsta-intervencije-dialog.component';

describe('VrstaIntervencijeDialogComponent', () => {
  let component: VrstaIntervencijeDialogComponent;
  let fixture: ComponentFixture<VrstaIntervencijeDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VrstaIntervencijeDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VrstaIntervencijeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
