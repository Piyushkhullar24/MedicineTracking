import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicineHomeComponent } from './medicine-home.component';

describe('MedicineHomeComponent', () => {
  let component: MedicineHomeComponent;
  let fixture: ComponentFixture<MedicineHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicineHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicineHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
