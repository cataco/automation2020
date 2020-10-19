import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultVrtComponent } from './result-vrt.component';

describe('ResultVrtComponent', () => {
  let component: ResultVrtComponent;
  let fixture: ComponentFixture<ResultVrtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultVrtComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultVrtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
