import { Component, OnInit, inject,ViewChild  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Madres } from '../services/madre';
import { Empleado } from '../models/empleado';
// Angular Material
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-madres',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatPaginatorModule
  ],
  templateUrl: './madre.html',
  styleUrl: './madre.css'
})
export class MadresComponent  implements OnInit {
private madreService = inject(Madres);

  // 📊 Tablas independientes
  dataSourceDisponibles = new MatTableDataSource<any>([]);
  dataSourceActivas = new MatTableDataSource<any>([]);
  
  estaCargando: boolean = true;

  // 📋 Columnas para cada tabla
  columnsDisponibles: string[] = ['nombre', 'accion'];
columnsActivas: string[] = ['idMadre', 'nombre', 'observaciones', 'accion'];

  // 🎯 Capturamos ambos paginadores usando identificadores del HTML
  @ViewChild('paginatorDisponibles') paginatorDisponibles!: MatPaginator;
  @ViewChild('paginatorActivas') paginatorActivas!: MatPaginator;

  ngOnInit(): void {
    this.cargarPantalla();
  }

  cargarPantalla(): void {
    this.estaCargando = true;

    // Disparamos ambas peticiones en paralelo al backend
    this.madreService.obtenerMujeresDisponibles().subscribe({
      next: (disponibles) => {
        this.dataSourceDisponibles.data = disponibles;
        
        // Una vez cargadas las disponibles, traemos las activas
        this.madreService.listarActivas().subscribe({
          next: (activas) => {
            this.dataSourceActivas.data = activas;

            // Sincronizamos los paginadores independientes
            setTimeout(() => {
              this.dataSourceDisponibles.paginator = this.paginatorDisponibles;
              this.dataSourceActivas.paginator = this.paginatorActivas;
            });

            this.estaCargando = false;
          },
          error: () => this.estaCargando = false,
        });
      },
      error: () => this.estaCargando = false,
    });
  }

  // 💾 Registrar Madre (Viene de la tabla 1)
  seleccionar(empleada: any): void {
    this.estaCargando = true;
    this.madreService.registrarMadre(empleada.idEmpleado, 1).subscribe({
      next: () => {
        alert('Madre registrada con éxito.');
        this.cargarPantalla(); // Recarga ambas tablas dinámicamente
      },
      error: (err) => { this.estaCargando = false; alert(err.error || err.message); }
    });
  }

  // ❌ Desactivar Madre (Viene de la tabla 2)
  desactivar(madre: any): void {
    if (confirm('¿Deseas desactivar esta madre del sistema?')) {
      this.estaCargando = true;
      this.madreService.desactivarMadre(madre.idMadre).subscribe({
        next: (msg) => {
          alert(msg);
          this.cargarPantalla(); // Recarga ambas tablas para ver los movimientos
        },
        error: (err) => { this.estaCargando = false; alert(err.error || err.message); }
      });
    }
  }
}