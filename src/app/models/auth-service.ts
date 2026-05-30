import { Injectable } from '@angular/core';
// ⚠️ ASEGÚRATE DE QUE ESTA LÍNEA SEA EXACTAMENTE ASÍ:
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private apiUrl = 'http://localhost:8080/api/usuarios';

  // El constructor debe recibir el HttpClient correcto
  constructor(private http: HttpClient) {}

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  register(usuario: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, usuario);
  }
}
