import { Component } from '@angular/core';
import { AuthService } from '../services/auth';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
   standalone: true, // 🔥 CLAVE,
  templateUrl: './login.html',
  imports:[MatIconModule
    ,MatMenuModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule
  ],
  styleUrls: ['./login.css']
})
export class LoginComponent {

  userOrEmail: string = '';
  password: string = '';

  constructor(private auth: AuthService, private router: Router) {}

 login() {
  if (!this.userOrEmail || !this.password) {
    alert('Completa todos los campos');
    return;
  }

  const data = {
    userOrEmail: this.userOrEmail.trim(),
    password: this.password
  };

  console.log('LOGIN DATA:', data);

  this.auth.login(data).subscribe({
    next: (res: any) => {
      const token = res.token || res.jwt || res.access_token;

      if (!token) {
        console.error("NO VIENE TOKEN");
        return;
      }

      localStorage.setItem('token', token);
      this.router.navigate(['/dashboard']);
    },
    error: (err) => {
      console.error(err);
      alert('Credenciales incorrectas');
    }
  });
}
irAlRegistro(): void {
    this.router.navigate(['/register']);
  }

}
