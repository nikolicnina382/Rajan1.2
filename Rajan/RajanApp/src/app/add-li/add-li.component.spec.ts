import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLiComponent } from './add-li.component';

describe('AddLiComponent', () => {
  let component: AddLiComponent;
  let fixture: ComponentFixture<AddLiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddLiComponent]
    });
    fixture = TestBed.createComponent(AddLiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
