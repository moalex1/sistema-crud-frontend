
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Angular Material
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

// 🔥 IMPORTANTE: Importamos ChangeDetectorRef e inject
import { ChangeDetectorRef, inject } from '@angular/core'; 
import { EmpleadosService } from '../services/empleados';
@Component({
  selector: 'app-empleados',
  standalone: true,
  imports: [ CommonModule,
    FormsModule,
    MatIconModule,
    MatMenuModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule], 
  templateUrl: './empleados.html',
  styleUrl: './empleados.css',
})
export class Empleados implements OnInit, AfterViewInit {

  // 🔥 SOLUCIÓN: Inyectamos el detector de cambios de Angular
  private cdr = inject(ChangeDetectorRef);

  opened = true;
  usuario = '';
  loading = false;
  error: string | null = null;   
editandoEmpleado: any = null;
  empleados: any[] = [];
  dataSource = new MatTableDataSource<any>();

  displayedColumns: string[] = [
    'nombre',
    'email',
    'curp',
    'acciones'
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private router: Router,
    private empleadosService: EmpleadosService
  ) {}

  // ======================
  // LIFECYCLE SAFE
  // ======================
  ngOnInit(): void {
    // Es seguro cargar al usuario aquí para evitar retrasos visuales
    this.loadUser(); 
  }

  ngAfterViewInit() {
    this.loadEmpleados();
    // 🔥 SOLUCIÓN: Forzamos a Angular a asimilar los cambios de "loading" y "error"
    // que ocurrieron durante la inicialización de la vista.
    this.cdr.detectChanges(); 
  }

  // ======================
  // LOAD DATA
  // ======================
  loadEmpleados(): void {
  this.loading = true;
  this.error = null;

  this.empleadosService.obtenerEmpleados().subscribe({
    next: (data: any) => { // Cambiamos temporalmente a 'any' para poder manipularlo
      
      // 🔥 SOLUCIÓN: Si 'data' es un string, lo transformamos a un arreglo real
      const arregloEmpleados = typeof data === 'string' ? JSON.parse(data) : data;

      this.empleados = arregloEmpleados;
      this.dataSource.data = arregloEmpleados;

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      this.loading = false;
      this.cdr.detectChanges(); 
    },
    error: (err) => {
      console.error(err);
      this.error = 'Error al cargar empleados';
      this.loading = false;
      this.cdr.detectChanges(); 
    }
  });
}

  // ======================
  // USER
  // ======================
  loadUser(): void {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        this.usuario = payload.sub;
      } catch (e) {
        console.error("Error al decodificar el token", e);
      }
    }
  }

  // ======================
  // FILTER
  // ======================
  applyFilter(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.dataSource.filter = value.trim().toLowerCase();
  }

  // ======================
  // NAV
  // ======================
  toggle(): void {
    this.opened = !this.opened;
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  // ======================
  // CRUD
  // ======================
crearEmpleado(): void {
  // 1. Solicitamos los datos al usuario de forma rápida
  const nombre = prompt("Ingresa el nombre del empleado:");
  if (!nombre) return; // Cancelar si no pone nombre

  const email = prompt("Ingresa el email:");
  const curp = prompt("Ingresa la CURP:");

  // 2. Armamos el objeto tal cual como lo espera tu clase Empleado en Java
  const nuevoEmpleado = {
    nombre: nombre,
    email: email,
    curp: curp
  };

  this.loading = true;

  // 3. Consumimos el servicio
  this.empleadosService.crearEmpleado(nuevoEmpleado).subscribe({
    next: (res) => {
      alert(res.mensaje); // "Empleado creado con éxito"
      
      // 🔥 TRUCO DE REACTIVIDAD: Volvemos a pedir la lista al backend para que la tabla 
      // se actualice con los datos frescos de la BD (incluyendo el ID autogenerado por MySQL/Postgres)
      this.loadEmpleados(); 
    },
    error: (err) => {
      console.error(err);
      alert("Hubo un error al intentar registrar al empleado.");
      this.loading = false;
      this.cdr.detectChanges();
    }
  });
}

 editarEmpleado(emp: any): void {
  this.editandoEmpleado = { ...emp }; // copia para no mutar directo
}

guardarEdicion(): void {
  if (!this.editandoEmpleado) return;

  this.loading = true;

  this.empleadosService.actualizarEmpleado(
    this.editandoEmpleado.idEmpleado,
    this.editandoEmpleado
  ).subscribe({
    next: (res) => {
      alert(res.mensaje);

      this.empleados = this.empleados.map(e =>
        e.idEmpleado === this.editandoEmpleado.idEmpleado
          ? this.editandoEmpleado
          : e
      );

      this.dataSource.data = this.empleados;

      this.editandoEmpleado = null;
      this.loading = false;
    },
    error: (err) => {
      console.error(err);
      alert("Error al actualizar");
      this.loading = false;
    }
  });
}
cancelarEdicion(): void {
  this.editandoEmpleado = null;
}
  eliminarEmpleado(emp: any): void {
    if (!confirm(`¿Eliminar a ${emp.nombre}?`)) return;

    this.empleadosService.eliminarEmpleado(emp.idEmpleado).subscribe({
      next: () => {
        this.empleados = this.empleados.filter(e => e.idEmpleado !== emp.idEmpleado);
        this.dataSource.data = this.empleados;
      },
      error: (err) => {
        console.error(err);
        alert('Error al eliminar');
      }
    });
  }
}