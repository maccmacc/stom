import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StrukaComponent } from './struka.component';

describe('StrukaComponent', () => {
  let component: StrukaComponent;
  let fixture: ComponentFixture<StrukaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StrukaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StrukaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
