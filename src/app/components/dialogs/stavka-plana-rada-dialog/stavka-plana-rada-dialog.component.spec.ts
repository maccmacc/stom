import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StavkaPlanaRadaDialogComponent } from './stavka-plana-rada-dialog.component';

describe('StavkaPlanaRadaDialogComponent', () => {
  let component: StavkaPlanaRadaDialogComponent;
  let fixture: ComponentFixture<StavkaPlanaRadaDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StavkaPlanaRadaDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StavkaPlanaRadaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
