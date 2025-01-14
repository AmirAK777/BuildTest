import { Routes } from '@angular/router';
import { userisAuthenticated } from 'auth-features';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./pages/home/home.component').then((item) => item.HomeComponent),
    canActivate: [userisAuthenticated],
  },
  {
    path: 'consultant',
    loadChildren: () =>
      import('./consultant/consultant.routes').then((m) => m.consultantRoutes),
    canActivate: [userisAuthenticated],
  },
  {
    path: 'authenticate',
    loadChildren: () =>
      import('auth-features').then((item) => item.authenticationRoutes),
  },
  {
    path: '**',
    redirectTo: 'authenticate/login',
    pathMatch: 'full',
  },
];
