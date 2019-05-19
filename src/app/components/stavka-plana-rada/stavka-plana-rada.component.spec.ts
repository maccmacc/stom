import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StavkaPlanaRadaComponent } from './stavka-plana-rada.component';

describe('StavkaPlanaRadaComponent', () => {
  let component: StavkaPlanaRadaComponent;
  let fixture: ComponentFixture<StavkaPlanaRadaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StavkaPlanaRadaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StavkaPlanaRadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
