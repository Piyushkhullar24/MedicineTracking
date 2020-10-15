import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicineRecordComponent } from './medicine-record.component';

describe('MedicineRecordComponent', () => {
  let component: MedicineRecordComponent;
  let fixture: ComponentFixture<MedicineRecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicineRecordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicineRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
