import {
  ApplicationConfig,
  importProvidersFrom,
  provideExperimentalZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAngularSvgIcon } from 'angular-svg-icon';
import { IonicStorageModule } from '@ionic/storage-angular';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideIonicAngular } from '@ionic/angular/standalone';
import { jwtInterceptor, refreshInterceptor } from 'auth-features';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideExperimentalZonelessChangeDetection(),
    provideStore(),
    provideAngularSvgIcon(),
    importProvidersFrom(IonicStorageModule.forRoot({})),
    provideHttpClient(withInterceptors([jwtInterceptor, refreshInterceptor])),
    provideIonicAngular({
      mode: 'ios',
      useSetInputAPI: true,
    }),
  ],
};
