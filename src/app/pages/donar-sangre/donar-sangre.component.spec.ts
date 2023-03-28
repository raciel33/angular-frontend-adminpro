import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonarSangreComponent } from './donar-sangre.component';

describe('DonarSangreComponent', () => {
  let component: DonarSangreComponent;
  let fixture: ComponentFixture<DonarSangreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DonarSangreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DonarSangreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
