import { Routes } from '@angular/router';
import { TabsComponent } from './tabs.component';
import { isUserSubscribed } from '../../features/clovis-club/guard/subscribed.guard';

export const routes: Routes = [
  {
    path: '',
    component: TabsComponent,
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('../../features/home/components/home/home.component').then(
            (m) => m.HomeComponent,
          ),
      },
      {
        path: 'objectifs',
        loadComponent: () =>
          import(
            '../../features/objectives/components/objectives/components/objectives.component'
          ).then((m) => m.ObjectivesComponent),
      },
      {
        path: 'analyse',
        loadComponent: () =>
          import('../../features/analyse/analyse.component').then(
            (m) => m.AnalyseComponent,
          ),
      },
      {
        path: 'patrimoine',
        loadComponent: () =>
          import(
            '../../features/assets/components/assets/assets.component'
          ).then((m) => m.AssetsComponent),
        canActivate: [isUserSubscribed],
      },

      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full',
      },
    ],
  },
];
