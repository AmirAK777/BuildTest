import { Routes } from '@angular/router';

export const consultantRoutes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./pages/dashbord/dashbord.component').then(
        (m) => m.DashbordComponent
      ),
  },
];
