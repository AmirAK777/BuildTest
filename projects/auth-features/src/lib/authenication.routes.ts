import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';

export const authenticationRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'forgot-password',
    loadComponent: () =>
      import('../lib/pages/forgot-password/forgot-password.component').then(
        (m) => m.ForgotPasswordComponent
      ),
  },
  { path: '**', redirectTo: '/login' },
];
