import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KalendarDialogComponent } from './kalendar-dialog.component';

describe('KalendarDialogComponent', () => {
  let component: KalendarDialogComponent;
  let fixture: ComponentFixture<KalendarDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KalendarDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KalendarDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
