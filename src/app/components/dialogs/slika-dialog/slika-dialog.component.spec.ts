import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlikaDialogComponent } from './slika-dialog.component';

describe('SlikaDialogComponent', () => {
  let component: SlikaDialogComponent;
  let fixture: ComponentFixture<SlikaDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlikaDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlikaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
