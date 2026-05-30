import { TestBed } from '@angular/core/testing';

import { EstatusEmpleadoService } from './estatus-empleado';

describe('EstatusEmpleado', () => {
  let service: EstatusEmpleadoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EstatusEmpleadoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
