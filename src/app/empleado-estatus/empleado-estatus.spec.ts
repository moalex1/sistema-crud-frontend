import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpleadoEstatus } from './empleado-estatus';

describe('EmpleadoEstatus', () => {
  let component: EmpleadoEstatus;
  let fixture: ComponentFixture<EmpleadoEstatus>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmpleadoEstatus],
    }).compileComponents();

    fixture = TestBed.createComponent(EmpleadoEstatus);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
