import { Injectable, inject } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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
} from 'models-lib';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserInfrastructure {
  private readonly httpClient = inject(HttpClient);

  private baseUrl = environment.apiURL + 'customer';

  private customer$: Observable<Customer> | null | undefined;

  private widgets$: Observable<WidgetBankLinks> | null | undefined;

  loadCurrentCustomer(): Observable<Customer> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    console.log('methode LoadCurrentcustomer est declenché');
    this.customer$ = this.httpClient
      .get<Customer>('http://192.168.1.38:5000/customer', { headers })
      .pipe(shareReplay(1));

    return this.customer$;
  }

  updateCurrentCustomer(customer: Customer): Observable<any> {
    return (this.customer$ = this.httpClient.put<Customer>(
      `${this.baseUrl}/`,
      customer
    ));
  }

  createBankUser(): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/bank/user`, {});
  }

  getBankWidget(
    withCallbackUri = false,
    withRedrectUrl = false,
    withCancelUrl = false,
    withCountries = true,
    withLocale = true,
  ): Observable<WidgetBankLinks> {
    if (!this.widgets$) {
      const requestBody = {
        withCallbackUri,
        withRedrectUrl,
        withCancelUrl,
        withCountries,
        withLocale,
      };
      this.widgets$ = this.httpClient.post<WidgetBankLinks>(
        `${this.baseUrl}/bank/widget/widget_session`,
        requestBody,
      );
    }
    return this.widgets$;
  }
  
  updateAddress(address: Address): Observable<any> {
    return this.httpClient.put<Address>(`${this.baseUrl}/address`, address);
  }

  updateContactDetails(contactDetails: ContactDetails): Observable<any> {
    return this.httpClient.put<ContactDetails>(
      `${this.baseUrl}/contact-details`,
      contactDetails
    );
  }

  updateFamilySituation(familySituation: FamilySituation): Observable<any> {
    return this.httpClient.put<FamilySituation>(
      `${this.baseUrl}/family-situation`,
      familySituation
    );
  }

  updateFinancialSituation(
    financialSituation: FinancialSituation
  ): Observable<any> {
    return this.httpClient.put<FinancialSituation>(
      `${this.baseUrl}/financial-situation`,
      financialSituation
    );
  }

  updateIdentity(identity: Identity): Observable<any> {
    return this.httpClient.put<Identity>(`${this.baseUrl}/identity`, identity);
  }

  updateObjectifs(objectifs: Objectifs): Observable<any> {
    return this.httpClient.put<Objectifs>(
      `${this.baseUrl}/objectifs`,
      objectifs
    );
  }

  updateTaxationSituation(
    taxationSituation: TaxationSituation
  ): Observable<any> {
    return this.httpClient.put<TaxationSituation>(
      `${this.baseUrl}/taxation-situation`,
      taxationSituation
    );
  }
  updateProfessionalSituation(
    professionalSituation: ProfessionalSituation
  ): Observable<any> {
    return this.httpClient.put<ProfessionalSituation>(
      `${this.baseUrl}/profesional-situation`,
      professionalSituation
    );
  }
}
