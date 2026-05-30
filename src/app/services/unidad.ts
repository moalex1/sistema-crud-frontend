// src/app/services/unidad.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UnidadCoordinador } from '../models/unidad-coordinador';

@Injectable({
  providedIn: 'root'
})
export class UnidadService {
private http = inject(HttpClient);
  private urlPuras = 'apiempleado-aza2cxfzc8eeatew.mexicocentral-01.azurewebsites.net/api/unidad';
private urlCoordinadores = 'https://apiempleado-aza2cxfzc8eeatew.mexicocentral-01.azurewebsites.net/api/unidad/coordinadores';

  // 🔄 URLs corregidas para que coincidan exactamente con tu UnidadController.java
  //private urlPuras = 'http://localhost:8080/api/unidad';
  //private urlCoordinadores = 'http://localhost:8080/api/unidad/coordinadores';

  private obtenerHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getUnidadesPuras(): Observable<UnidadCoordinador[]> {
    return this.http.get<UnidadCoordinador[]>(this.urlPuras, { headers: this.obtenerHeaders() });
  }

  // 🚀 Este es el método que manda a llamar tu componente UnidadesComponent
 getUnidadesConCoordinadores(): Observable<UnidadCoordinador[]> {
  return this.http.get<UnidadCoordinador[]>(this.urlCoordinadores, {
    headers: this.obtenerHeaders()
  });
}
}