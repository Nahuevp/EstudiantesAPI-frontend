import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Spinner } from '../../components/spinner/spinner';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { EstudiantesServices } from '../../services/estudiantes.services';
import { ToastrService } from 'ngx-toastr';
import { Estudiante } from '../../interfaces';
import { HttpErrorResponse } from '@angular/common/http';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-detalle',
  imports: [
  NgIf,
  Spinner,
  MatCardModule,
  MatIconModule,
  MatProgressBarModule,
  MatDividerModule,
  MatButtonModule,
  RouterModule,
  ],
  templateUrl: './detalle.html',
  styleUrl: './detalle.css'
})
export class Detalle implements OnInit{
  private _activeRouter = inject(ActivatedRoute);
  private _estudiantesService = inject(EstudiantesServices);
  private _router = inject(Router);
  private _toast = inject(ToastrService);
  mensaje = 'Buscando el estudiante'

  //*Propiedades
  isLoading = true;
  estudiante?: Estudiante;
  ngOnInit() {
    const id = this._activeRouter.snapshot.paramMap.get('id');
    if(!id){
      this._router.navigate(['/home']);
    }else {
      this._estudiantesService.getEstudiante(id).subscribe(x => {
        if (x.isSuccess) {
          console.log('Estudiante:', x);

          this.estudiante = x.result;
          setTimeout(() => {
            this.isLoading = false;
          }, 1400);
        }else {
          this._toast.error(x.message);
          this._router.navigate(['/home']);
        }
      }, (error: HttpErrorResponse) => {
        this._toast.error(error.error.message);
        this._router.navigate(['/home']);
      }
     );
    }
  }
}
