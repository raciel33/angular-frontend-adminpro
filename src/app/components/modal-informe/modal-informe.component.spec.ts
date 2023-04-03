import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalInformeComponent } from './modal-informe.component';

describe('ModalInformeComponent', () => {
  let component: ModalInformeComponent;
  let fixture: ComponentFixture<ModalInformeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalInformeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalInformeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
