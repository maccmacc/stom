import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IsplataDialogComponent } from './isplata-dialog.component';

describe('IsplataDialogComponent', () => {
  let component: IsplataDialogComponent;
  let fixture: ComponentFixture<IsplataDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IsplataDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IsplataDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
