import { inject, Injectable } from '@angular/core';
import { LocalStorageAuthenticationInfrastructure } from './localstorage.authentication.infrastructure';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class JwtDecoderService {
  storage = inject(LocalStorageAuthenticationInfrastructure);

  async decodeToken(): Promise<string[] | null> {
    const token = await this.storage.get('access_token');
    const decodedToken: any = jwtDecode(token);
    const roles = decodedToken.realm_access?.roles || null;
    return roles;
  }
}
