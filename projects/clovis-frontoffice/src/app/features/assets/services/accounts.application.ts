import { inject, Injectable, Signal } from '@angular/core';
import { AccountsStore } from '../store';
import { Accounts } from '../models/account';

@Injectable({
  providedIn: 'root',
})
export class AccountsApplication {
  private readonly _store = inject(AccountsStore);

  getAccounts() {
    this._store.getAccounts();
  }

  get accounts(): Signal<Accounts | null | undefined> {
    return this._store.accounts;
  }
}
