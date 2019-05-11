import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterijalComponent } from './materijal.component';

describe('MaterijalComponent', () => {
  let component: MaterijalComponent;
  let fixture: ComponentFixture<MaterijalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaterijalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterijalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
