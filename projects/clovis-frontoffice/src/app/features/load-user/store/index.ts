import { computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { tapResponse } from '@ngrx/operators';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import {
  Address,
  ContactDetails,
  Customer,
  FamilySituation,
  FinancialSituation,
  Identity,
  Objectifs,
  ProfessionalSituation,
  TaxationSituation,
  WidgetBankLinks,
  WidgetParamsCall,
} from 'models-lib';
import { concatMap, pipe, tap } from 'rxjs';
import { UserInfrastructure } from '../services/user.infrastructure';
import { ToasterComponent } from '../../../shared/components/toaster/toaster.component';

export interface CustomerState {
  customer: Customer;
  widgetBankLinks: WidgetBankLinks | undefined;
  isLoading: boolean;
}

const initialValue: CustomerState = {
  customer: {
    id: '',
    roles: [],
    firstName: '',
    lastName: '',
    email: '',
    address: {
      street: null,
      zipCode: null,
      city: null,
      country: null,
    },
    contactDetails: {
      email: null,
      phoneNumber: null,
    },
    familySituation: {
      children: null,
      dependents: null,
      maritalSituation: 'Singled',
      legalProtection: null,
    },
    financialSituation: {
      salaryIncome: null,
      passiveIncome: null,
      charges: null,
      monthlySaving: null,
      saving: null,
      rent: null,
      taxPerYear: null,
      withHoldingTax: null,
      disposableIncome: null,
      borrowingCapacity: null,
    },
    identity: {
      title: null,
      firstName: 'null',
      lastName: 'null',
      birthDate: null,
      birthCountry: null,
      birthCity: null,
      birthRegion: null,
    },
    objectifs: {
      reduceTax: null,
      prepareRetirement: null,
      generatePassiveIncome: null,
      realEstate: null,
      optimizeDeclaration: null,
    },
    taxationSituation: {
      nationality: null,
      principalTaxResidence: null,
      taxResidenceInAnotherCountry: null,
      isHouseholdSubjectToIncomeTax: null,
      haveAmericainNationality: null,
      haveNoEuropeenTaxResidence: null,
    },
    professionalSituation: {
      professionnalStatus: null,
      job: null,
      socioProfessionalCategory: null,
      industrySector: null,
      isPolitical: null,
      anyRelativeIsPolitical: null,
    },
    bank: {
      linxoId: null,
    },
    offers: null,
  },
  widgetBankLinks: {
    session_id: null,
    _links: {
      add_connection: null,
      manage_connections: '',
    },
  },
  isLoading: false,
};

export const CustomerStore = signalStore(
  { providedIn: 'root' },
  withState(initialValue),
  withComputed((store) => ({
    isLoggedIn: computed(() => store.customer() != null),
    isLinxoId: computed(() => store.customer().bank != null),
    isWidget: computed(
      () => store.widgetBankLinks()?._links?.add_connection != null
    ),
    isHaveOffers: computed(() => store.customer()?.offers?.length !== 0),
  })),
  withMethods(
    (
      store,
      infra = inject(UserInfrastructure),
      router = inject(Router),
      toastService = inject(ToasterComponent)
    ) => ({
      getCurrentCustomer: rxMethod<void>(
        pipe(
          tap(() => patchState(store, { isLoading: true })),
          concatMap((input) => {
            return infra.loadCurrentCustomer().pipe(
              tapResponse({
                next: (customer) => {
                  console.log('customer', customer);
                  patchState(store, {
                    isLoading: false,
                    customer: customer,
                  });
                },
                error: () => {
                  patchState(store, { isLoading: false });
                },
              })
            );
          })
        )
      ),
      updateCurrentCustomer: rxMethod<Customer>(
        pipe(
          tap(() => patchState(store, { isLoading: true })),
          concatMap((customer) => {
            return infra.updateCurrentCustomer(customer).pipe(
              tapResponse({
                next: (reponse) => {
                  patchState(store, {
                    isLoading: false,
                    customer: customer,
                  });
                },
                error: () => {
                  patchState(store, { isLoading: false });
                },
              })
            );
          })
        )
      ),
      createBankUser: rxMethod<void>(
        pipe(
          tap(() => patchState(store, { isLoading: true })),
          concatMap(() => {
            return infra.createBankUser().pipe(
              tapResponse({
                next: () => {
                  console.log('create back User');
                  patchState(store, {
                    isLoading: false,
                  });
                  toastService.success('Succes');
                },
                error: () => {
                  console.log('create back fail');

                  patchState(store, { isLoading: false });
                  toastService.error('Erreur de création');
                },
              })
            );
          })
        )
      ),
      getBankWidget: rxMethod<WidgetParamsCall>(
        pipe(
          tap(() => patchState(store, { isLoading: true })),
          concatMap((input) => {
            return infra
              .getBankWidget(input.withCallbackUri, input.withCallbackUri)
              .pipe(
                tapResponse({
                  next: (response) => {
                    console.log('create widget User');
                    patchState(store, {
                      widgetBankLinks: response,
                      isLoading: false,
                    });
                    toastService.loading('Merci de patienter pendant le chargement du formulaire.');
                  },
                  error: () => {
                    patchState(store, { isLoading: false });
                    toastService.error('Erreur de création');
                  },
                })
              );
          })
        )
      ),
      updateAdress: rxMethod<Address>(
        pipe(
          tap(() => patchState(store, { isLoading: true })),
          concatMap((address) => {
            return infra.updateAddress(address).pipe(
              tapResponse({
                next: (response) => {
                  patchState(store, (state) => ({
                    customer: {
                      ...state.customer,
                      address: address,
                    },
                    isLoading: false,
                  }));
                  toastService.success('Mise à jour reussi');
                },
                error: () => {
                  patchState(store, { isLoading: false });
                  toastService.error(
                    "Une erreur s'est produite lors de la mise à jour."
                  );
                },
              })
            );
          })
        )
      ),
      updateContactDetails: rxMethod<ContactDetails>(
        pipe(
          tap(() => patchState(store, { isLoading: true })),
          concatMap((contactDetails) => {
            return infra.updateContactDetails(contactDetails).pipe(
              tapResponse({
                next: (response) => {
                  patchState(store, (state) => ({
                    customer: {
                      ...state.customer,
                      contactDetails: contactDetails,
                    },
                    isLoading: false,
                  }));
                  toastService.success('Mise à jour reussi');
                },
                error: () => {
                  patchState(store, { isLoading: false });
                  toastService.error(
                    "Une erreur s'est produite lors de la mise à jour."
                  );
                },
              })
            );
          })
        )
      ),
      updateFamilySituation: rxMethod<FamilySituation>(
        pipe(
          tap(() => patchState(store, { isLoading: true })),
          concatMap((familySituation) => {
            return infra.updateFamilySituation(familySituation).pipe(
              tapResponse({
                next: (response) => {
                  patchState(store, (state) => ({
                    customer: {
                      ...state.customer,
                      familySituation: familySituation,
                    },
                    isLoading: false,
                  }));
                  toastService.success('Mise à jour reussi');
                },
                error: () => {
                  patchState(store, { isLoading: false });
                  toastService.error(
                    "Une erreur s'est produite lors de la mise à jour."
                  );
                },
              })
            );
          })
        )
      ),
      updateFinancialSituation: rxMethod<FinancialSituation>(
        pipe(
          tap(() => patchState(store, { isLoading: true })),
          concatMap((financialSituation) => {
            return infra.updateFinancialSituation(financialSituation).pipe(
              tapResponse({
                next: (response) => {
                  patchState(store, (state) => ({
                    customer: {
                      ...state.customer,
                      financialSituation: financialSituation,
                    },
                    isLoading: false,
                  }));
                  toastService.success('Mise à jour reussi');
                },
                error: () => {
                  patchState(store, { isLoading: false });
                  toastService.error(
                    "Une erreur s'est produite lors de la mise à jour."
                  );
                },
              })
            );
          })
        )
      ),
      updateIdentity: rxMethod<Identity>(
        pipe(
          tap(() => patchState(store, { isLoading: true })),
          concatMap((identity) => {
            return infra.updateIdentity(identity).pipe(
              tapResponse({
                next: (response) => {
                  patchState(store, (state) => ({
                    customer: {
                      ...state.customer,
                      identity: identity,
                    },
                    isLoading: false,
                  }));
                  toastService.success('Mise à jour reussi');
                },
                error: () => {
                  patchState(store, { isLoading: false });
                  toastService.error(
                    "Une erreur s'est produite lors de la mise à jour."
                  );
                },
              })
            );
          })
        )
      ),
      updateObjectifs: rxMethod<Objectifs>(
        pipe(
          tap(() => patchState(store, { isLoading: true })),
          concatMap((objectifs) => {
            return infra.updateObjectifs(objectifs).pipe(
              tapResponse({
                next: (response) => {
                  patchState(store, (state) => ({
                    customer: { ...state.customer, objectifs: objectifs },
                    isLoading: false,
                  }));
                  toastService.success('Mise à jour reussi');
                },
                error: () => {
                  patchState(store, { isLoading: false });
                  toastService.error(
                    "Une erreur s'est produite lors de la mise à jour."
                  );
                },
              })
            );
          })
        )
      ),
      updateTaxationSituation: rxMethod<TaxationSituation>(
        pipe(
          tap(() => patchState(store, { isLoading: true })),
          concatMap((taxationSituation) => {
            return infra.updateTaxationSituation(taxationSituation).pipe(
              tapResponse({
                next: (response) => {
                  patchState(store, (state) => ({
                    customer: {
                      ...state.customer,
                      taxationSituation: taxationSituation,
                    },
                    isLoading: false,
                  }));
                  toastService.success('Mise à jour reussi');
                },
                error: () => {
                  patchState(store, { isLoading: false });
                  toastService.error(
                    "Une erreur s'est produite lors de la mise à jour."
                  );
                },
              })
            );
          })
        )
      ),
      updateProfessionalSituation: rxMethod<ProfessionalSituation>(
        pipe(
          tap(() => patchState(store, { isLoading: true })),
          concatMap((professionalSituation) => {
            return infra
              .updateProfessionalSituation(professionalSituation)
              .pipe(
                tapResponse({
                  next: (response) => {
                    patchState(store, (state) => ({
                      customer: {
                        ...state.customer,
                        professionalSituation: professionalSituation,
                      },
                      isLoading: false,
                    }));
                    toastService.success('Mise à jour reussi');
                  },
                  error: () => {
                    patchState(store, { isLoading: false });
                    toastService.error(
                      "Une erreur s'est produite lors de la mise à jour."
                    );
                  },
                })
              );
          })
        )
      ),
    })
  )
);
