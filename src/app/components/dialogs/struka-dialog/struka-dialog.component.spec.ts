import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StrukaDialogComponent } from './struka-dialog.component';

describe('StrukaDialogComponent', () => {
  let component: StrukaDialogComponent;
  let fixture: ComponentFixture<StrukaDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StrukaDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StrukaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
