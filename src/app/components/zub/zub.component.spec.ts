import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZubComponent } from './zub.component';

describe('ZubComponent', () => {
  let component: ZubComponent;
  let fixture: ComponentFixture<ZubComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZubComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
