import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientRecordTableComponent } from './patient-record-table.component';

describe('PatientRecordTableComponent', () => {
  let component: PatientRecordTableComponent;
  let fixture: ComponentFixture<PatientRecordTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PatientRecordTableComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientRecordTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
