import { Routes } from '@angular/router';
import { Listado } from './pages/listado/listado';
import { Detalle } from './pages/detalle/detalle';
import { Home } from './pages/home/home';
import { Upsert } from './pages/upsert/upsert';

//*Configurar rutas
export const routes: Routes = [
  {
    path: '',
    component: Home,
    children: [
      {
        path: 'home',
        component: Listado,
      },
      {
        path: 'nuevo',
        component: Upsert,
      },
      {
        path: 'detalle/:id',
        component: Detalle,
      },
      {
        path: 'editar/:id',
        component: Upsert,
      },
      {
        path: '**',
        redirectTo: 'home',
        pathMatch: 'full'
      },
    ],
  },
];
