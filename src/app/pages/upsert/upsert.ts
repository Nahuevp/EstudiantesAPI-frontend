import { Component, inject, OnInit } from '@angular/core';
import { Spinner } from '../../components/spinner/spinner';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { isJsxElement } from 'typescript';
import { EstudiantesServices } from '../../services/estudiantes.services';
import { ToastrService } from 'ngx-toastr';
import { CrearActualizar, Estudiante } from '../../interfaces';
import { HttpErrorResponse } from '@angular/common/http';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-upsert',
  imports: [
    Spinner,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    RouterModule,
    MatButtonModule,
    NgIf
  ],
  templateUrl: './upsert.html',
  styleUrl: './upsert.css'
})
export class Upsert implements OnInit {
//*Crear y actualizar
private _activeRoute = inject(ActivatedRoute);
private _route = inject(Router);
private _estudiantesService = inject(EstudiantesServices);
private _toast = inject(ToastrService);
private _fb = inject(FormBuilder);

//*Variables
private crearEstudiante?: CrearActualizar;
private estudiante?: Estudiante;
titulo = "Crear nuevo estudiante";
isLoading = false;
mensaje = 'Consultando los datos del estudiante';
public formEstudiante: FormGroup;

constructor() {
  this.formEstudiante = this._fb.group({
    nombre: ['', [Validators.required, Validators.minLength(5)]],
    documento: ['', [Validators.required, Validators.minLength(5)]],
    edad: ['', [Validators.required, Validators.minLength(2)]],
    genero: ['', [Validators.required, Validators.minLength(5)]],
    telefono: ['', [Validators.required, Validators.minLength(5)]],
    correo: ['', [Validators.required, Validators.minLength(5)]],
    curso: ['', [Validators.required, Validators.minLength(5)]],
  });
}
ngOnInit() {
  const id = this._activeRoute.snapshot.paramMap.get('id');
  this.isLoading = true;

  if (id) {
    this._estudiantesService.getEstudiante(id).subscribe({
      next: (resp) => {
        if (resp.isSuccess) {
          this.estudiante = resp.result;
          this.titulo = "Editar datos del estudiante";
          this.formEstudiante.patchValue(this.estudiante);
        }
        // Siempre se desactiva el loading, incluso si no fue exitoso
        this.isLoading = false;
      },
      error: (err) => {
        console.error("Error al obtener el estudiante", err);
        this.isLoading = false;
      }
    });
  } else {
    // Si no hay ID, también desactivás el loading
    this.isLoading = false;
  }
}


onSubmit() {
  //*Si el formulario es valido se procede a enviar los datos
  //*Se evalua si estudiante.id existe, si existe se actualiza, si no se crea uno
  if (this.formEstudiante.valid) {
    this.estudiante?.id ? this.editarEstudiante() : this.nuevoEstudiante();
  } else {
    this._toast.warning("El formulario no es correcto", 'Comprueba');
    this.formEstudiante.reset();
  }
}


//*Metodos para crear y editar

private nuevoEstudiante() {
  this.crearEstudiante = this.formEstudiante.value;
  if (this.crearEstudiante) {
    this._estudiantesService.postEstudiante(this.crearEstudiante).subscribe(
      (resp) => {
      if (resp.isSuccess) {
        this._toast.success(resp.message, "Realizado");
        this.formEstudiante.reset();
        this._route.navigate(['/home']);
      }
    }, (isError: HttpErrorResponse) => {
      this._toast.error(isError.error.message, isError.statusText);
      this.formEstudiante.reset();
      this._route.navigate(['/home']);
    }
   );
  }
}

private editarEstudiante() {
  this.crearEstudiante = this.formEstudiante.value;
  if (this.crearEstudiante) {
    this._estudiantesService.putEstudiante(this.estudiante!.id, this.crearEstudiante).subscribe(
      (resp) => {
      if (resp.isSuccess) {
        this._toast.success(resp.message, "Realizado");
        this.formEstudiante.reset();
        console.log('Redirigiendo al home después de editar')
        this._route.navigate(['/home']);
      }
    }, (isError: HttpErrorResponse) => {
      this._toast.error(isError.error.message, isError.statusText);
      this.formEstudiante.reset();
      this._route.navigate(['/home']);
    }
   );
  }
}

}

