import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {

  // Centralizamos la URL para no repetirla en cada método
//  private apiUrl = 'http://localhost:8080/api/empleado';
private apiUrl = 'https://apiempleado-aza2cxfzc8eeatew.mexicocentral-01.azurewebsites.net/api/empleado';

  constructor(private http: HttpClient) {}

  // ==========================================
  // METODO: OBTENER EMPLEADOS (CON TOKEN Y JSON)
  // ==========================================
  obtenerEmpleados(): Observable<any[]> {
    const token = localStorage.getItem('token');

    // 1. Creamos las cabeceras con el Token para evitar el 403 Forbidden
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    // 2. Quitamos el 'responseType: text'. 
    // Al tiparlo como <any[]>, TypeScript sabrá que es un arreglo y no un string.
//    return this.http.get<any[]>('http://localhost:8080/api/empleado', { headers });
return this.http.get<any[]>('https://apiempleado-aza2cxfzc8eeatew.mexicocentral-01.azurewebsites.net/api/empleado', { headers });    
  }

  // ==========================================
  // METODO: ELIMINAR EMPLEADO
  // ==========================================
  eliminarEmpleado(id: number): Observable<any> {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    // Usamos la variable centralizada apiUrl
    return this.http.delete<any>(`${this.apiUrl}/${id}`, { headers });
  }

actualizarEmpleado(id: number, empleado: any): Observable<any> {
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });

  // Enviamos un PUT a http://localhost:8080/api/empleado/ID con los datos actualizados
  return this.http.put<any>(`${this.apiUrl}/${id}`, empleado, { headers });
}


crearEmpleado(empleado: any): Observable<any> {
  const token = localStorage.getItem('token');
  console.log("TOKEN ENVIADO EN EL POST:", token); // 👈 Revisa si esto no imprime null en la consola 
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });

  // Enviamos un POST a http://localhost:8080/api/empleado con el objeto del nuevo empleado
  return this.http.post<any>(this.apiUrl, empleado, { headers });
}

}