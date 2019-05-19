import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZubDialogComponent } from './zub-dialog.component';

describe('ZubDialogComponent', () => {
  let component: ZubDialogComponent;
  let fixture: ComponentFixture<ZubDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZubDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZubDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
