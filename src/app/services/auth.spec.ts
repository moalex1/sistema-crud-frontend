import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { AuthService } from './auth'; // Ajusta la ruta exacta si cambiaste el archivo de carpeta

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Verifica que no queden peticiones HTTP pendientes entre cada prueba
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // 🆕 Prueba para el método Login
  it('should send a POST request on login', () => {
    const mockCredentials = { userOrEmail: 'admin', password: 'password123' };
    const mockResponse = { token: 'jwt-token-xyz', usuario: 'admin' };

    service.login(mockCredentials).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('http://localhost:8080/api/usuarios/login');
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse); // Simula la respuesta exitosa del backend
  });

  // 🆕 Prueba para el método Register
  it('should send a POST request on register', () => {
    const mockUser = { idUsuario: 0, usuario: 'nuevoUser', password: 'password', email: 'test@mail.com' };

    service.register(mockUser).subscribe((response) => {
      expect(response).toEqual(mockUser);
    });

    const req = httpMock.expectOne('http://localhost:8080/api/usuarios/register');
    expect(req.request.method).toBe('POST');
    req.flush(mockUser); // Simula la respuesta del backend (HttpStatus.CREATED)
  });
});