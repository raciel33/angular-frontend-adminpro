import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendaActividadesComponent } from './agenda-actividades.component';

describe('AgendaActividadesComponent', () => {
  let component: AgendaActividadesComponent;
  let fixture: ComponentFixture<AgendaActividadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgendaActividadesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgendaActividadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
