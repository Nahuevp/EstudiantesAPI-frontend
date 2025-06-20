import { Component, inject, input, output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { Estudiante } from '../../interfaces';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { EstudiantesServices } from '../../services/estudiantes.services';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog';
import { filter, switchMap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-estudiante-card',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatProgressBarModule,
    MatDividerModule,
    MatDialogModule,
    MatIconModule,
    RouterModule
],
  templateUrl: './estudiante-card.html',
  styleUrl: './estudiante-card.css'
})
export class EstudianteCard {

  estudiante = input<Estudiante>();

//Inyectar servicios

  private _dialog = inject(MatDialog);

  private _toast = inject(ToastrService);

  private _estudiantesService = inject(EstudiantesServices);

  //*Propiedad para comprobar cuando se elimina
  //*Output as signal
  wasRemove = output<boolean>();

  //* Método para eliminar registro
onDelete() {
  if (!this.estudiante()?.id) {
    this._toast.error('Error al tratar de eliminar', 'Error');
  } else {
    //* Llamar el componente con el diálogo de confirmación
    const dialogRef = this._dialog.open(ConfirmDialogComponent, {
      data: true,
      enterAnimationDuration: '650ms',
      exitAnimationDuration: '450ms'
    });
    dialogRef.afterClosed()
    .pipe(
      //*Proceder a eliminar si se confirma
    filter((x)=>x),
    switchMap(()=> 
      this._estudiantesService.deleteEstudiante(this.estudiante()!.id)
    )
  )
  .subscribe(
    (resp) => {
    if(resp.isSuccess){
      this._toast.success(resp.message,'Realizado')
      this.wasRemove.emit(true);//*emitir valor
    }
  },
  (isError: HttpErrorResponse)=> {
    if (isError){
      this._toast.error(isError.error.message, isError.statusText);
    }
  }
  );
  }
}

}