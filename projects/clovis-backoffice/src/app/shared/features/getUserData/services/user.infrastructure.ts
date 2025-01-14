import { Injectable, inject } from '@angular/core';
import { delay, Observable, of, shareReplay, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Admin, Consulant, Marketing, Sdr, User } from 'models-lib';

const fakeService: UserInfrastructure = {
  loadCurrentAdmin(fake: string): Observable<Admin> {
    const result: Admin = {
      id: 'admin-12345',
      roles: ['default-roles-clovis', 'application_customer', 'offline_access'],
      firstName: 'Amir',
      lastName: 'Doe',
      email: 'amir.doe@example.com',
      age: 30,
    };

    return of(result);
  },

  loadCurrentConsultant(fake: string): Observable<Consulant> {
    const result: Consulant = {
      id: 'marketing-98765',
      roles: ['application_customer'],
      firstName: 'Layla',
      lastName: 'Smith',
      email: 'layla.smith@example.com',
      taille: 5,
    };
    return of(result);
  },
};

@Injectable({
  providedIn: 'root',
  useValue: fakeService,
})
export class UserInfrastructure {
  loadCurrentAdmin(fake: string): Observable<Admin> {
    throw new Error('Not implemented');
  }
  loadCurrentConsultant(fake: string): Observable<Consulant> {
    throw new Error('Not implemented');
  }
  // private readonly httpClient = inject(HttpClient);

  // private customer$: Observable<User> | null | undefined;

  // loadCurrentAdmin(id: string): Observable<Admin> {
  //   const headers = new HttpHeaders().set(
  //     'Content-Type',
  //     'application/x-www-form-urlencoded'
  //   );

  //   return this.httpClient
  //     .get<Admin>(`http://localhost:5000/customer/self`, { headers })
  //     .pipe(
  //       tap((response) => {
  //         console.log("Réponse de l'API pour l'admin:", response);
  //       })
  //     );
  // }

  // loadCurrentMarketing(id: string): Observable<Sdr> {
  //   const headers = new HttpHeaders().set(
  //     'Content-Type',
  //     'application/x-www-form-urlencoded'
  //   );

  //   // return this.httpClient.get<Sdr>(`http://localhost:5000/marketing/${id}`, {
  //   //   headers,
  //   // });
  //   return this.httpClient.get<Sdr>(`http://localhost:5000/customer/self`, {
  //     headers,
  //   });
  // }

  // updateCurrentCustomer(customer: User): Observable<User> {
  //   return (this.customer$ = this.httpClient.put<User>(
  //     'https://localhost:5000/customer',
  //     customer
  //   ));
  // }
}
