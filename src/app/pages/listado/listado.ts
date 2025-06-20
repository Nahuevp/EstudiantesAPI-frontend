import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { Estudiante } from '../../interfaces';
import { EstudianteCard } from '../../components/estudiante-card/estudiante-card';
import { Spinner } from '../../components/spinner/spinner';
import { EstudiantesServices } from '../../services/estudiantes.services';

@Component({
  imports: [
  Spinner,
  MatButtonModule,
  EstudianteCard,
  RouterModule  
  ],
  templateUrl: './listado.html',
  styleUrl: './listado.css'
})
export class Listado implements OnInit {
private _estudiantesService = inject(EstudiantesServices);

  public estudiantes: WritableSignal<Estudiante[]> = signal([]);
  isLoading: WritableSignal<boolean> = signal(true);
  mensaje = 'Cargando listado de estudiantes';

  //* Recibir output del hijo
  wasDelete(x: boolean) {
    if (x) {
      this.isLoading.set(true);
      setTimeout(() => {
        this.getAll();
      }, 1500);
    }
  }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this._estudiantesService.getEstudiantes().subscribe((x) => {
      if (x.isSuccess) {
        this.estudiantes.set(x.result);
        setTimeout(() => {
          this.isLoading.set(false);
        }, 1400);
      }
    });
  }
}
