import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from '../models/auth-service'; // Ajusta la ruta a tu servicio si es necesario
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { FormsModule } from '@angular/forms'; //
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';


@Component({
  selector: 'app-register',
  imports: [ 
    MatIconModule,
    MatMenuModule,
    MatSidenavModule,
    MatListModule,
    MatFormFieldModule,FormsModule,
    MatInputModule,
    MatToolbarModule,
    MatButtonModule,
    MatTableModule,
    MatCardModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatSortModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  // Objeto enlazado al formulario HTML (ajusta los campos según tu modelo de Java)
  form = {
    usuario: '',
    email: '',
    password: ''
  };

  loading = false;
  errorMessage: string | null = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  onRegister(): void {
    this.loading = true;
    this.errorMessage = null;

    this.authService.register(this.form).subscribe({
      next: () => {
        this.snackBar.open('¡Registro exitoso! Ya puedes iniciar sesión.', 'Cerrar', {
          duration: 4000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
        this.router.navigate(['/login']); // Redirige al login tras tener éxito
      },
      error: (err) => {
        this.loading = false;
        // Atrapa el mensaje exacto enviado desde el catch(IllegalArgumentException) de Spring Boot
        if (err.status === 400) {
          this.errorMessage = err.error; 
        } else {
          this.errorMessage = 'Ocurrió un error inesperado en el servidor.';
        }
      }
    });
  }
}
