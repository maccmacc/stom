import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnimakComponent } from './snimak.component';

describe('SnimakComponent', () => {
  let component: SnimakComponent;
  let fixture: ComponentFixture<SnimakComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnimakComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnimakComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
