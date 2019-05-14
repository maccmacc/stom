import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RadnoMestoDialogComponent } from './radno-mesto-dialog.component';

describe('RadnoMestoDialogComponent', () => {
  let component: RadnoMestoDialogComponent;
  let fixture: ComponentFixture<RadnoMestoDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RadnoMestoDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RadnoMestoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
