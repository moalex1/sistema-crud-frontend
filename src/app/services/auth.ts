import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

//  private API = 'http://localhost:8080/api/usuarios';
private API = 'https://apiempleado-aza2cxfzc8eeatew.mexicocentral-01.azurewebsites.net/api/usuarios';
  constructor(private http: HttpClient) {}

  login(data: any) {
    return this.http.post(`${this.API}/login`, data);
  }
}