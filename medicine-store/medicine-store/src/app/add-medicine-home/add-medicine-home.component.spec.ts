import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMedicineHomeComponent } from './add-medicine-home.component';

describe('AddMedicineHomeComponent', () => {
  let component: AddMedicineHomeComponent;
  let fixture: ComponentFixture<AddMedicineHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMedicineHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMedicineHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
