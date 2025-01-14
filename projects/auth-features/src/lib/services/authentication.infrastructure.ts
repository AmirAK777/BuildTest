import { Injectable, inject } from '@angular/core';
import { from, Observable, shareReplay, switchMap } from 'rxjs';
import { AuthenticationToken } from '../models/authentication-user';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationInfrastructure {
  private readonly apiKeyCloakUrl = 'http://192.168.1.38:8080';

  private readonly _httpClient = inject(HttpClient);
  private readonly storage = inject(Storage);

  login(email: string, password: string): Observable<AuthenticationToken> {
    const body = new HttpParams()
      .set('grant_type', 'password')
      .set('client_id', 'clovis-public-client')
      .set('scope', 'email openid')
      .set('username', email)
      .set('password', password);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    return this._httpClient
      .post<AuthenticationToken>(
        `${this.apiKeyCloakUrl}/realms/clovis/protocol/openid-connect/token/`,
        body.toString(),
        { headers },
      )
      .pipe(shareReplay(1));
  }

  refreshToken() {
    return from(this.storage.get('refresh_token')).pipe(
      switchMap(storedRefreshToken => {
        const body = new HttpParams()
          .set('grant_type', 'refresh_token')
          .set('client_id', 'clovis-public-client')
          .set('refresh_token', storedRefreshToken);

        const headers = new HttpHeaders().set(
          'Content-Type',
          'application/x-www-form-urlencoded',
        );

        return this._httpClient
          .post<AuthenticationToken>(
            `${this.apiKeyCloakUrl}/realms/clovis/protocol/openid-connect/token/`,
            body,
            { headers },
          )
          .pipe(shareReplay(1));
      }),
    );
  }
}
