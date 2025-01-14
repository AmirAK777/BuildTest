import { inject, Injectable, Signal } from '@angular/core';

import { CustomerStore } from '../store';
import {
  Address,
  ContactDetails,
  Customer,
  FamilySituation,
  Identity,
  ProfessionalSituation,
  TaxationSituation,
  WidgetBankLinks,
} from 'models-lib';

@Injectable({ providedIn: 'root' })
export class UserApplication {
  private readonly _store = inject(CustomerStore);

  getCurrentCustomer() {
    this._store.getCurrentCustomer();
  }

  createBankUser() {
    this._store.createBankUser();
  }

  getBankWidget(withCallbackUri : boolean, withRedrectUrl : boolean) {
    this._store.getBankWidget({ withCallbackUri, withRedrectUrl });
  }

  updateCurrentCustomer(customer: Customer)   {
    this._store.updateCurrentCustomer(customer);
  }

  updateIdentity(identity: Identity) {
    this._store.updateIdentity(identity);
  }

  updateTaxationSituation(taxationSituation: TaxationSituation) {
    this._store.updateTaxationSituation(taxationSituation);
  }

  updateFamilySituation(familySituation: FamilySituation) {
    this._store.updateFamilySituation(familySituation);
  }

  updateProfessionalSituation(professionalSituation: ProfessionalSituation) {
    this._store.updateProfessionalSituation(professionalSituation);
  }

  updateContactDetails(contactDetails: ContactDetails) {
    this._store.updateContactDetails(contactDetails);
  }

  updateAddress(address: Address) {
    this._store.updateAdress(address);
  }

  getInitials(firstName: string | null, lastName: string | null): string {
    if (!firstName || !lastName) {
      return '';
    }
    return firstName.charAt(0).toUpperCase() + lastName.charAt(0).toUpperCase();
  }

  get isLoading(): Signal<boolean> {
    return this._store.isLoading;
  }

  get isLoggedIn(): Signal<boolean> {
    return this._store.isLoggedIn;
  }

  get isLinxoId(): Signal<boolean | null> {
    return this._store.isLinxoId;
  }

  get isWidget(): Signal<boolean | null> {
    return this._store.isWidget;
  }

  get isHaveOffer(): Signal<boolean> {
    return this._store.isHaveOffers;
  }

  get customer(): Signal<Customer | null> {
    return this._store.customer;
  }
  get widgetBankLinks(): Signal<WidgetBankLinks | undefined> {
    return this._store.widgetBankLinks;
  }
}
