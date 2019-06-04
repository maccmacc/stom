import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IzvrsenaIntervencijaComponent } from './izvrsena-intervencija.component';

describe('IzvrsenaIntervencijaComponent', () => {
  let component: IzvrsenaIntervencijaComponent;
  let fixture: ComponentFixture<IzvrsenaIntervencijaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IzvrsenaIntervencijaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IzvrsenaIntervencijaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
