import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VrstaIntervencijeComponent } from './vrsta-intervencije.component';

describe('VrstaIntervencijeComponent', () => {
  let component: VrstaIntervencijeComponent;
  let fixture: ComponentFixture<VrstaIntervencijeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VrstaIntervencijeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VrstaIntervencijeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
