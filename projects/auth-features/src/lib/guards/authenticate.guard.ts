import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationApplication } from '../services/authentication.application';
import { inject } from '@angular/core';

export const userisAuthenticated: CanActivateFn = (
  route,
  state,
  application = inject(AuthenticationApplication),
  router = inject(Router),
) => {

  if (!application.isAuthenticated()) {
    router.navigate(['authenticate/login']);
  }
  return application.isAuthenticated();

};
