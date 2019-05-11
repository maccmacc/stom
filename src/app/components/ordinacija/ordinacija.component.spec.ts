import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdinacijaComponent } from './ordinacija.component';

describe('OrdinacijaComponent', () => {
  let component: OrdinacijaComponent;
  let fixture: ComponentFixture<OrdinacijaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdinacijaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdinacijaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
