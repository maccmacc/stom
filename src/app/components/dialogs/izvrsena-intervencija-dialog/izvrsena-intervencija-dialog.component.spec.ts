import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IzvrsenaIntervencijaDialogComponent } from './izvrsena-intervencija-dialog.component';

describe('IzvrsenaIntervencijaDialogComponent', () => {
  let component: IzvrsenaIntervencijaDialogComponent;
  let fixture: ComponentFixture<IzvrsenaIntervencijaDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IzvrsenaIntervencijaDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IzvrsenaIntervencijaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
