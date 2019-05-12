import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IsplataComponent } from './isplata.component';

describe('IsplataComponent', () => {
  let component: IsplataComponent;
  let fixture: ComponentFixture<IsplataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IsplataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IsplataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
