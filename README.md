# estudiantes-frontend

Frontend de la aplicación Estudiantes App, desarrollado en Angular 18 y Angular Material. Se conecta a la API `Estudiantes-API` para gestionar un listado de estudiantes con operaciones CRUD.

## 🚀 Tecnologías utilizadas

- Angular 18
- Angular Material
- TypeScript
- HTML / CSS

## 🎯 Objetivo

Diseñar una interfaz moderna y funcional que consuma el backend de ASP.NET Core y permita interactuar con la lista de estudiantes.

## 🧩 Funcionalidades

- Listar estudiantes
- Ver detalles de un estudiante
- Agregar estudiante
- Editar estudiante existente
- Eliminar estudiante
- Validación de formularios con Reactive Forms
- Componente Spinner para carga
- Toasts para mensajes de éxito o error (ngx-toastr)

## 📁 Estructura principal

- `/pages`: componentes por ruta (`home`, `detalle`, `upsert`)
- `/components`: componentes reutilizables (`spinner`, `header`)
- `/services`: conexión HTTP con el backend (`EstudiantesService`)
