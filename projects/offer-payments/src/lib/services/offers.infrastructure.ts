import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Offers } from '../models/offers';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OffersInfrastructure {
  private readonly apiClovisUrl = 'https://localhost:5001';

  private readonly _httpClient = inject(HttpClient);

  getOffers(): Observable<Offers> {
    return this._httpClient.get<Offers>(`${this.apiClovisUrl}/offers`);
  }
}
