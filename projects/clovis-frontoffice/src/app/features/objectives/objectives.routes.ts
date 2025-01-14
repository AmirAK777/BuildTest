import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'reduce-tax',
    pathMatch: 'full',
  },
  {
    path: 'reduce-tax',
    loadComponent: () =>
      import('./components/reduce-tax/reduce-tax.component').then(
        (m) => m.ReduceTaxComponent
      ),
  },
  {
    path: 'grow-savings',
    loadComponent: () =>
      import('./components/grow-savings/grow-savings.component').then(
        (m) => m.GrowSavingsComponent
      ),
  },
  {
    path: 'generate-passive-income',
    loadComponent: () =>
      import(
        './components/generate-passive-income/generate-passive-income.component'
      ).then((m) => m.GeneratePassiveIncomeComponent),
  },
  {
    path: 'prepare-retirement',
    loadComponent: () =>
      import(
        './components/prepare-retirement/prepare-retirement.component'
      ).then((m) => m.PrepareRetirementComponent),
  },
  {
    path: 'optimize-declarations',
    loadComponent: () =>
      import(
        './components/optimize-declarations/optimize-declarations.component'
      ).then((m) => m.OptimizeDeclarationsComponent),
  },
  {
    path: 'referral',
    loadComponent: () =>
      import(
        './components/referral/referral.component'
      ).then((m) => m.ReferralComponent),
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
