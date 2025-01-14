import { inject, Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

export type WithToken = {
  access_token: string | null;
  refresh_token: string | null;
};

@Injectable({
  providedIn: 'root',
})
export class LocalStorageAuthenticationInfrastructure {
  private _storageInitialised = false;

  private _storage = inject(Storage);

  async startSession(user: WithToken) {
    if (!this._storageInitialised) await this._storage.create();
    if (user.access_token && user.refresh_token) {
      this._storage?.set('access_token', user.access_token);
      this._storage?.set('refresh_token', user.refresh_token);
    }
  }

  async getSession(): Promise<WithToken> {
    if (!this._storageInitialised) await this._storage.create();
    return {
      access_token: await this._storage?.get('access_token'),
      refresh_token: await this._storage?.get('refresh_token'),
    };
  }

  async get(key: string): Promise<string> {
    if (!this._storageInitialised) await this._storage.create();

    const value: string = await this._storage.get(key);
    return value;
  }

  async set(key: string, value: any): Promise<void> {
    if (!this._storageInitialised) await this._storage.create();

    return this._storage.set(key, value);
  }

  async remove(key: string): Promise<void> {
    if (!this._storageInitialised) await this._storage.create();

    return this._storage.remove(key);
  }

  async endSession(): Promise<void> {
    await this._storage.clear();
  }
}
