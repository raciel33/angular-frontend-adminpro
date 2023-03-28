import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerHospitalesUserComponent } from './ver-hospitales-user.component';

describe('VerHospitalesUserComponent', () => {
  let component: VerHospitalesUserComponent;
  let fixture: ComponentFixture<VerHospitalesUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerHospitalesUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerHospitalesUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
