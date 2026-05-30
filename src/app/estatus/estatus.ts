import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';

import { EstatusEmpleadoService } from '../services/estatus-empleado';
import { Estatus } from '../models/estatus';
import { EmpleadoGrupo } from '../models/empleado-grupo';

@Component({
  selector: 'app-estatus',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule
  ],
  templateUrl: './estatus.html',
  styleUrl: './estatus.css',
})
export class EstatusComponent implements OnInit {

  estatus: Estatus[] = [];
  dataSource = new MatTableDataSource<Estatus>([]);

  // Flujo reactivo asíncrono puro para la tabla que causaba el conflicto
  empleadosGrupo$: Observable<EmpleadoGrupo[]> = of([]);

  form: Estatus = {
    idEstatusEmpleado: 0,
    estatusEmpleado: ''
  };

  columnasEstatus: string[] = ['id', 'estatus', 'acciones'];
  columnasEmpleados: string[] = ['rfc', 'nombreCompleto', 'grupo'];

  ui = {
    loading: false,
    editando: false,
    error: null as string | null
  };

  constructor(private service: EstatusEmpleadoService) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.ui.loading = true;
    this.ui.error = null;

    // 1. Carga tradicional para el catálogo (sin problemas de sincronía)
    this.service.getAll().subscribe({
      next: (data) => {
        this.estatus = data;
        this.dataSource.data = data;
      },
      error: (err) => {
        this.ui.error = 'Error al cargar el catálogo de estatus';
        console.error(err);
      }
    });

    // 2. Carga reactiva delegada al Pipe async del HTML (inmune a errores de chequeo)
    this.empleadosGrupo$ = this.service.getConGrupo().pipe(
      finalize(() => this.ui.loading = false),
      catchError((err) => {
        this.ui.error = 'Error al cargar empleados con grupo laboral';
        console.error('Error en consulta de empleados:', err);
        return of([]);
      })
    );
  }

  crear(): void {
    if (!this.form.estatusEmpleado) return;

    this.service.create(this.form).subscribe({
      next: () => {
        this.resetForm();
        this.load();
      }
    });
  }

  editar(row: Estatus): void {
    this.form = { ...row };
    this.ui.editando = true;
  }

  guardar(): void {
    this.service.update(this.form.idEstatusEmpleado, this.form).subscribe({
      next: () => {
        this.resetForm();
        this.load();
      }
    });
  }

  eliminar(id: number): void {
    if (confirm('¿Está seguro de eliminar este estatus?')) {
      this.service.delete(id).subscribe({
        next: () => this.load()
      });
    }
  }

  resetForm(): void {
    this.form = {
      idEstatusEmpleado: 0,
      estatusEmpleado: ''
    };

    this.ui.editando = false;
  }

  cancelar(): void {
    this.resetForm();
  }
}