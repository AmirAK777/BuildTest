import { effect, inject, Injectable, Signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationToken } from '../models/authentication-user';
import { AuthenticationStore } from '../store';

@Injectable({ providedIn: 'root' })
export class AuthenticationApplication {
  private readonly store = inject(AuthenticationStore);
  private readonly router = inject(Router);



  login(login: string, password: string) {
    this.store.logIn({ login, password });
  }

  logout(): void {
    this.store.logout();
  }

  get isLoading(): Signal<boolean> {
    return this.store.isLoading;
  }

  get isAuthenticated(): Signal<boolean> {
    return this.store.isLogged;
  }

  get token(): Signal<AuthenticationToken | null | undefined> {
    return this.store.token;
  }
}
