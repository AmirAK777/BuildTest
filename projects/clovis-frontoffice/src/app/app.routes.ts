import { Routes } from '@angular/router';
import { userisAuthenticated } from 'auth-features';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/tabs/tabs.routes').then((m) => m.routes),
    canActivate: [userisAuthenticated],
  },
  {
    path: 'clovis-club',
    loadComponent: () =>
      import(
        './features/clovis-club/components/clovis-club/clovis-club.component'
      ).then((m) => m.ClovisClubComponent),
    canActivate: [userisAuthenticated],
  },
  {
    path: 'settings',
    loadChildren: () =>
      import('./features/settings/settings.routes').then((m) => m.routes),
    canActivate: [userisAuthenticated],
  },
  {
    path: 'recommandation',
    loadChildren: () =>
      import('./features/objectives/objectives.routes').then((m) => m.routes),
    canActivate: [userisAuthenticated],
  },
  {
    path: 'authenticate',
    loadChildren: () =>
      import('auth-features').then((item) => item.authenticationRoutes),
  },
  {
    path: 'expert-booking',
    loadComponent: () =>
      import('./pages/expert-booking/expert-booking.component').then(
        (m) => m.ExpertBookingComponent
      ),
    canActivate: [userisAuthenticated],
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
