import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnidadService } from '../services/unidad';
import { UnidadCoordinador } from '../models/unidad-coordinador';
import { ChangeDetectorRef } from '@angular/core';
// Importaciones de Angular Material
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
@Component({
  selector: 'app-unidades',
  standalone: true,
  imports: [
    CommonModule, 
    MatTableModule, 
    MatCardModule, 
    MatIconModule, 
    MatProgressSpinnerModule
  ],
  templateUrl: './unidades.html',
  styleUrl: './unidades.css',
})
export class Unidades implements OnInit {
private unidadService = inject(UnidadService);
private cdr = inject(ChangeDetectorRef);
  // Variables de control mapeadas idénticas a tu HTML
  dataSource: UnidadCoordinador[] = [];
  estaCargando: boolean = true;
  
  // Columnas de la tabla que coinciden exactamente con los matColumnDef del HTML
  displayedColumns: string[] = ['numeroUnidad', 'nombreUnidad', 'gradoAcademico', 'coordinador'];

  ngOnInit(): void {
    this.cargarUnidades();
  }

  cargarUnidades(): void {
    this.estaCargando = true;
    
    // Consumimos el endpoint con coordinadores
    this.unidadService.getUnidadesConCoordinadores().subscribe({
      next: (data: UnidadCoordinador[]) => {
        this.dataSource = data;
        this.estaCargando = false;
          this.cdr.detectChanges(); // 🔥 CLAVE
      },
      error: (error) => {
        console.error('❌ Error al recuperar unidades desde Angular:', error);
        this.estaCargando = false;
      }
    });
  }
}
