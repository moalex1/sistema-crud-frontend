import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Empleado } from '../models/empleado';
@Injectable({
  providedIn: 'root',
})
export class Madres {
private http = inject(HttpClient);
  //private url = 'http://localhost:8080/api/madre';
private url = 'apiempleado-aza2cxfzc8eeatew.mexicocentral-01.azurewebsites.net/api/madre';

  private obtenerHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  // 🔍 obtener mujeres disponibles
  obtenerDisponibles(): Observable<Empleado[]> {
    return this.http.get<Empleado[]>(`${this.url}/disponibles`, {
      headers: this.obtenerHeaders()
    });
  }

  // 💾 guardar madre
  guardarMadre(data: any) {
    return this.http.post(this.url, data, {
      headers: this.obtenerHeaders()
    });
  }

  getMadres(page: number = 0, size: number = 10): Observable<any> {
    return this.http.get<any>(`${this.url}?page=${page}&size=${size}`, { 
      headers: this.obtenerHeaders() 
    });
  }

  obtenerMujeresDisponibles(): Observable<any[]> {
  return this.http.get<any[]>(`${this.url}/disponibles`, { 
    headers: this.obtenerHeaders() 
  });}


// 💾 Enviar datos para Registrar una nueva Madre
registrarMadre(idEmpleado: number, idUsuario: number): Observable<any> {
  const body = { idEmpleado, idUsuario };
  return this.http.post<any>(this.url, body, { headers: this.obtenerHeaders() });
}

// ❌ Mandar el ID por la URL para Desactivar
desactivarMadre(idMadre: number): Observable<any> {
  // Nota cómo usamos backticks `` para incrustar el ID en la ruta /desactivar/{id}
  return this.http.put<any>(`${this.url}/desactivar/${idMadre}`, {}, { 
    headers: this.obtenerHeaders(),
    responseType: 'text' as 'json' // 💡 Agregamos esto porque tu Java responde con un String plano ("Madre desactivada correctamente") en vez de un JSON
  });
}
listarActivas(): Observable<any[]> {
  return this.http.get<any[]>(`${this.url}/activas`, { headers: this.obtenerHeaders() });
}

}
