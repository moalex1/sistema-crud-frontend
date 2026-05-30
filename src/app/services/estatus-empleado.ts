import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Estatus } from '../models/estatus';
import { EmpleadoGrupo } from '../models/empleado-grupo';




@Injectable({
  providedIn: 'root',
})
export class EstatusEmpleadoService {


// ======================
  // URL BASE
  // ======================
private url = 'apiempleado-aza2cxfzc8eeatew.mexicocentral-01.azurewebsites.net/api/estatusEmpleado';
private urlEmpleado = 'apiempleado-aza2cxfzc8eeatew.mexicocentral-01.azurewebsites.net/api/empleado';

  
//private url = 'http://localhost:8080/api/estatusEmpleado';
  //  private urlEmpleado = 'http://localhost:8080/api/empleado';

  constructor(private http: HttpClient) {}
 private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');

    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    return headers;
  }


 getAll(): Observable<Estatus[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    return this.http.get<Estatus[]>(this.url, { headers });
  }

  create(data: Estatus): Observable<Estatus> {
    return this.http.post<Estatus>(this.url, data, {
      headers: this.getHeaders()
    });
  }

update(id: number, data: Estatus): Observable<Estatus> {
  return this.http.put<Estatus>(
    `apiempleado-aza2cxfzc8eeatew.mexicocentral-01.azurewebsites.net/api/estatusEmpleado/${id}`,
    data,
    { headers: this.getHeaders() }
  );
}

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.url}/${id}`, {
      headers: this.getHeaders()
    });
  }


getConGrupo(): Observable<EmpleadoGrupo[]> {
  return this.http.get<EmpleadoGrupo[]>(
    'apiempleado-aza2cxfzc8eeatew.mexicocentral-01.azurewebsites.net/api/empleado/con-grupo',
    {
      headers: this.getHeaders()
    }
  );
}



  
}


