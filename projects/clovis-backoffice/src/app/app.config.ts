import {
  ApplicationConfig,
  importProvidersFrom,
  provideExperimentalZonelessChangeDetection,
} from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';

import {
  PreloadAllModules,
  provideRouter,
  withPreloading,
} from '@angular/router';
import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import {
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import {
  jwtInterceptor,
  refreshInterceptor,
} from 'auth-features';
import { IonicStorageModule } from '@ionic/storage-angular';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideExperimentalZonelessChangeDetection(),
    provideStore(),
    provideHttpClient(withInterceptors([jwtInterceptor, refreshInterceptor])),
    importProvidersFrom(IonicStorageModule.forRoot({})), provideAnimationsAsync(),
  ],
};
