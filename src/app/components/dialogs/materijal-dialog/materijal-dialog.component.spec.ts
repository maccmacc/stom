import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterijalDialogComponent } from './materijal-dialog.component';

describe('MaterijalDialogComponent', () => {
  let component: MaterijalDialogComponent;
  let fixture: ComponentFixture<MaterijalDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaterijalDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterijalDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
