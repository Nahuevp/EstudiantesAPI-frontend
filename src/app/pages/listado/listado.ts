import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { Estudiante } from '../../interfaces';
import { EstudianteCard } from '../../components/estudiante-card/estudiante-card';
import { Spinner } from '../../components/spinner/spinner';
import { EstudiantesServices } from '../../services/estudiantes.services';
import { filter } from 'rxjs';

@Component({
  imports: [
  Spinner,
  MatButtonModule,
  EstudianteCard,
  RouterModule,
  ],
  templateUrl: './listado.html',
  styleUrl: './listado.css'
})
export class Listado implements OnInit {
  private _estudiantesService = inject(EstudiantesServices);
  private _router = inject(Router);

  public estudiantes: WritableSignal<Estudiante[]> = signal([]);
  isLoading: WritableSignal<boolean> = signal(true);
  mensaje = 'Cargando listado de estudiantes';

  ngOnInit() {
    console.log('Se ejecutó ngOnInit en Listado');
    this.getAll();

    // 🔄 Detectar navegación a esta ruta y recargar
    this._router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        if (this._router.url === '/home/listado') {
          this.getAll();
        }
      });
  }

 getAll() {
  this.estudiantes.set([]); // <-- Limpiar la lista antes
  console.log('Se ejecutó getAll() para obtener estudiantes');
  this._estudiantesService.getEstudiantes().subscribe((x) => {
    if (x.isSuccess) {
      console.log('Estudiantes nuevos:', x.result);
      this.estudiantes.update(() => [...x.result]); // 👈 Cambio clave
      setTimeout(() => {
        this.isLoading.set(false);
      }, 1400);
    }
  });
}

  wasDelete(x: boolean) {
    if (x) this.getAll();
  }
}

