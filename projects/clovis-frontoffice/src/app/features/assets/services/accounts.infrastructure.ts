import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Accounts } from '../models/account';
import { delay, Observable, of } from 'rxjs';

const fakeService = {
  getAccounts(): Observable<Accounts> {
    const result: Accounts = [
      {
        connection_id: '12345abcde',
        name: 'Compte Principal',
        balance: 1523.75,
        currency: 'EUR',
        type: 'checking',
        status: 'active',
        creation_date: 1609459200,
        creationDateUtc: '2021-01-01T00:00:00.000Z',
        id: 'acc001',
        account_number: 'FR7612345678901234567890123',
        iban: 'FR7612345678901234567890123',
        balance_date: 1673260800,
        balanceDateUtc: '2025-01-09T13:47:19.879Z',
        loan: {
          type: 'personal',
          loan_type: 'car',
          frequency: 'monthly',
          initial_balance: 10000,
          start_date: 1609459200,
          startDateUtc: '2021-01-01T00:00:00.000Z',
          end_date: 1630992000,
          endDateUtc: '2021-09-07T00:00:00.000Z',
          interest: 5,
          debited_account_id: 'acc001',
          next_payment: {
            amount: 200,
            due_date: 1675180800,
            dueDateUtc: '2025-01-31T00:00:00.000Z',
          },
        },
        savings: {
          type: 'retirement',
          savings_type: 'pension',
          end_date: 1752470400,
          endDateUtc: '2025-01-09T13:47:19.879Z',
          effect_date: 1609459200,
          effectDateUtc: '2021-01-01T00:00:00.000Z',
          yield_rate: 2.5,
          earned_ytd: 1500,
          invested_net: 10000,
          invested_raw: 12000,
          disinvested_raw: 2000,
          pivot_account_id: 'acc001',
          capital_gain: {
            percent: 5,
            amount: 500,
          },
        },
        credit_card: {
          payable_account_id: 'acc001',
          next_payment: {
            amount: 350.45,
            due_date: 1675766400,
            dueDateUtc: '2025-02-05T00:00:00.000Z',
          },
        },
        owner: {
          name: 'Jean Dupont',
          address: '10 rue de la République, Paris, France',
          phone_number: '+33 1 23 45 67 89',
          identification_number: 'ID123456789',
          registration_date: 1609459200,
          registrationDateUtc: '2021-01-01T00:00:00.000Z',
          birth_date: 836112000,
          birthDateUtc: '1996-12-01T00:00:00.000Z',
          birth_place: 'Paris, France',
          status: 'active',
        },
        usage: 'personal',
        last_channel_definition_id: 'channel123',
      },
      {
        connection_id: '98765xyz',
        name: 'Compte Épargne',
        balance: 5000.0,
        currency: 'USD',
        type: 'savings',
        status: 'active',
        creation_date: 1622505600,
        creationDateUtc: '2021-06-01T00:00:00.000Z',
        id: 'acc002',
        account_number: 'US12345678901234567890',
        iban: 'US12345678901234567890',
        balance_date: 1673260800,
        balanceDateUtc: '2025-01-09T13:47:19.879Z',
        loan: null,
        savings: {
          type: 'general',
          savings_type: 'education',
          end_date: 1704057600,
          endDateUtc: '2025-01-09T13:47:19.879Z',
          effect_date: 1622505600,
          effectDateUtc: '2021-06-01T00:00:00.000Z',
          yield_rate: 1.8,
          earned_ytd: 300,
          invested_net: 4500,
          invested_raw: 5000,
          disinvested_raw: 0,
          pivot_account_id: 'acc002',
          capital_gain: {
            percent: 2.4,
            amount: 120,
          },
        },
        credit_card: null,
        owner: {
          name: 'Alice Smith',
          address: '123 Maple Street, New York, USA',
          phone_number: '+1 212-555-7890',
          identification_number: 'ID987654321',
          registration_date: 1622505600,
          registrationDateUtc: '2021-06-01T00:00:00.000Z',
          birth_date: 702758400,
          birthDateUtc: '1989-03-12T00:00:00.000Z',
          birth_place: 'New York, USA',
          status: 'active',
        },
        usage: 'savings',
        last_channel_definition_id: 'channel456',
      },
    ];

    return of(result).pipe(delay(500));
  },
};

@Injectable({
  providedIn: 'root',
  // useValue: fakeService,
})
export class AccountsInfrastructure {
  private readonly apiClovisUrl = 'https://localhost:5001';

  private readonly _httpClient = inject(HttpClient);

  getAccounts(): Observable<Accounts> {
    return this._httpClient.get<Accounts>(`${this.apiClovisUrl}/customer/accounts`);
  }
  // getAccounts(): Observable<Accounts> {
  //   throw new Error('Not implemented');
  // }
}
