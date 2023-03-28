import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCitasComponent } from './modal-citas.component';

describe('ModalCitasComponent', () => {
  let component: ModalCitasComponent;
  let fixture: ComponentFixture<ModalCitasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalCitasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCitasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
