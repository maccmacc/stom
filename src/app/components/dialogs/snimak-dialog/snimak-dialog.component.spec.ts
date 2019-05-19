import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnimakDialogComponent } from './snimak-dialog.component';

describe('SnimakDialogComponent', () => {
  let component: SnimakDialogComponent;
  let fixture: ComponentFixture<SnimakDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnimakDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnimakDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
