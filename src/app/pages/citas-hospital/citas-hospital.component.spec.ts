import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitasHospitalComponent } from './citas-hospital.component';

describe('CitasHospitalComponent', () => {
  let component: CitasHospitalComponent;
  let fixture: ComponentFixture<CitasHospitalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CitasHospitalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CitasHospitalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
