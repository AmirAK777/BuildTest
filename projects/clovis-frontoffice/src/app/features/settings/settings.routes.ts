import { Routes } from '@angular/router';
import { SettingsComponent } from './components/settings/settings.component';

export const routes: Routes = [
    {
        path: 'account',
        loadComponent: () => import('./components/my-account/my-account.component').then(m => m.MyAccountComponent)
    },
    {
        path: 'identity',
        loadComponent: () => import('./components/identity/identity.component').then(m => m.IdentityComponent)
    },
    {
        path: 'taxation',
        loadComponent: () => import('./components/taxation/taxation.component').then(m => m.TaxationComponent)
    },
    {
        path: 'family-situation',
        loadComponent: () => import('./components/family-status/family-status.component').then(m => m.FamilyStatusComponent)
    },
    {
        path: 'professional-situation',
        loadComponent: () => import('./components/professional-situation/professional-situation.component').then(m => m.ProfessionalSituationComponent)
    },
    {
        path: 'contact-details',
        loadComponent: () => import('./components/contact-details/contact-details.component').then(m => m.ContactDetailsComponent)
    },
    {
        path: 'income',
        loadComponent: () => import('./components/income/income.component').then(m => m.IncomeComponent)
    },
    {
        path: 'abilities',
        loadComponent: () => import('./components/abilities/abilities.component').then(m => m.AbilitiesComponent)
    },
    {
        path: 'wealth',
        loadComponent: () => import('./components/wealth/wealth.component').then(m => m.WealthComponent)
    },
    {
        path: 'expenses',
        loadComponent: () => import('./components/expenses/expenses.component').then(m => m.ExpensesComponent)
    },
    {
        path: 'legal-notices',
        loadComponent: () => import('./components/legal-notices/legal-notices.component').then(m => m.LegalNoticesComponent)
    },
    {
        path: 'cgu',
        loadComponent: () => import('./components/cgu/terms-and-conditions.component').then(m => m.TermsAndConditionsComponent)
    },
    {
        path: 'confidentiality',
        loadComponent: () => import('./components/confidentiality/confidentiality.component').then(m => m.ConfidentialityComponent)
    },
    {
        path: '',
        component: SettingsComponent,
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
    },

]; 