import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { UserApplication } from '../../load-user/services/user.application';

export const isUserSubscribed: CanActivateFn = (
  route,
  state,
  userApplication = inject(UserApplication),
  router = inject(Router),
) => {

  if (!userApplication.isHaveOffer()) {
    router.navigate(['clovis-club']);
  }
  return userApplication.isHaveOffer();

};
