import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcesComponent } from './proces.component';

describe('ProcesComponent', () => {
  let component: ProcesComponent;
  let fixture: ComponentFixture<ProcesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProcesComponent]
    });
    fixture = TestBed.createComponent(ProcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
