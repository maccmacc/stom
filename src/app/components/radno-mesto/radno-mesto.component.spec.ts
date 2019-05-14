import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RadnoMestoComponent } from './radno-mesto.component';

describe('RadnoMestoComponent', () => {
  let component: RadnoMestoComponent;
  let fixture: ComponentFixture<RadnoMestoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RadnoMestoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RadnoMestoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
