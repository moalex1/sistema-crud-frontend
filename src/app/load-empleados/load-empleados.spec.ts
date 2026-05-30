import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadEmpleados } from './load-empleados';

describe('LoadEmpleados', () => {
  let component: LoadEmpleados;
  let fixture: ComponentFixture<LoadEmpleados>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoadEmpleados],
    }).compileComponents();

    fixture = TestBed.createComponent(LoadEmpleados);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
