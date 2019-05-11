import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdinacijaDialogComponent } from './ordinacija-dialog.component';

describe('OrdinacijaDialogComponent', () => {
  let component: OrdinacijaDialogComponent;
  let fixture: ComponentFixture<OrdinacijaDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdinacijaDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdinacijaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
