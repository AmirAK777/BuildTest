import { inject, Injectable, Signal } from '@angular/core';

import { UserStore } from '../store';
import { Admin, Customer, Sdr, User } from 'models-lib';

@Injectable({ providedIn: 'root' })
export class UserApplication {
  private readonly store = inject(UserStore);

  get isLoading(): Signal<boolean> {
    return this.store.isLoading;
  }

  get isAdmin(): Signal<boolean> {
    return this.store.isAdmin;
  }

  get admin(): Signal<Admin | null | undefined> {
    return this.store.admin;
  }

  getUserByRoles(role: string): void {
    switch (role) {
      case 'default-roles-clovis':
        console.log('get role admin');
        this.store.getCurrentAdmin();
        break;
      case 'application_customer':
        console.log('get role consultant');

        this.store.getCurrentConsultant();
        break;
      case 'offline_access':
        console.log('get role marketing');
        break;
      case 'uma_authorization':
        console.log('get role sdr');
        break;
      default:
        console.error('Rôle non reconnu');
        break;
    }
  }
}
