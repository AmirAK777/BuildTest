import { inject, Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import * as i0 from "@angular/core";
export class LocalStorageAuthenticationInfrastructure {
    constructor() {
        this._storageInitialised = false;
        this._storage = inject(Storage);
    }
    async startSession(user) {
        if (!this._storageInitialised)
            await this._storage.create();
        if (user.access_token && user.refresh_token) {
            this._storage?.set('access_token', user.access_token);
            this._storage?.set('refresh_token', user.refresh_token);
        }
    }
    async getSession() {
        if (!this._storageInitialised)
            await this._storage.create();
        return {
            access_token: await this._storage?.get('access_token'),
            refresh_token: await this._storage?.get('refresh_token'),
        };
    }
    async get(key) {
        if (!this._storageInitialised)
            await this._storage.create();
        const value = await this._storage.get(key);
        return value;
    }
    async set(key, value) {
        if (!this._storageInitialised)
            await this._storage.create();
        return this._storage.set(key, value);
    }
    async remove(key) {
        if (!this._storageInitialised)
            await this._storage.create();
        return this._storage.remove(key);
    }
    async endSession() {
        await this._storage.clear();
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.13", ngImport: i0, type: LocalStorageAuthenticationInfrastructure, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.13", ngImport: i0, type: LocalStorageAuthenticationInfrastructure, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.13", ngImport: i0, type: LocalStorageAuthenticationInfrastructure, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYWxzdG9yYWdlLmF1dGhlbnRpY2F0aW9uLmluZnJhc3RydWN0dXJlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvYXV0aC1mZWF0dXJlcy9zcmMvbGliL3NlcnZpY2VzL2xvY2Fsc3RvcmFnZS5hdXRoZW50aWNhdGlvbi5pbmZyYXN0cnVjdHVyZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuRCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7O0FBVWpELE1BQU0sT0FBTyx3Q0FBd0M7SUFIckQ7UUFJVSx3QkFBbUIsR0FBRyxLQUFLLENBQUM7UUFFNUIsYUFBUSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztLQXdDcEM7SUF0Q0MsS0FBSyxDQUFDLFlBQVksQ0FBQyxJQUFlO1FBQ2hDLElBQUksQ0FBQyxJQUFJLENBQUMsbUJBQW1CO1lBQUUsTUFBTSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQzVELElBQUksSUFBSSxDQUFDLFlBQVksSUFBSSxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7WUFDNUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUN0RCxJQUFJLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxlQUFlLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQzFELENBQUM7SUFDSCxDQUFDO0lBRUQsS0FBSyxDQUFDLFVBQVU7UUFDZCxJQUFJLENBQUMsSUFBSSxDQUFDLG1CQUFtQjtZQUFFLE1BQU0sSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUM1RCxPQUFPO1lBQ0wsWUFBWSxFQUFFLE1BQU0sSUFBSSxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsY0FBYyxDQUFDO1lBQ3RELGFBQWEsRUFBRSxNQUFNLElBQUksQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLGVBQWUsQ0FBQztTQUN6RCxDQUFDO0lBQ0osQ0FBQztJQUVELEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBVztRQUNuQixJQUFJLENBQUMsSUFBSSxDQUFDLG1CQUFtQjtZQUFFLE1BQU0sSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUU1RCxNQUFNLEtBQUssR0FBVyxNQUFNLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ25ELE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQztJQUVELEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBVyxFQUFFLEtBQVU7UUFDL0IsSUFBSSxDQUFDLElBQUksQ0FBQyxtQkFBbUI7WUFBRSxNQUFNLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUM7UUFFNUQsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUVELEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBVztRQUN0QixJQUFJLENBQUMsSUFBSSxDQUFDLG1CQUFtQjtZQUFFLE1BQU0sSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUU1RCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFFRCxLQUFLLENBQUMsVUFBVTtRQUNkLE1BQU0sSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUM5QixDQUFDOytHQTFDVSx3Q0FBd0M7bUhBQXhDLHdDQUF3QyxjQUZ2QyxNQUFNOzs0RkFFUCx3Q0FBd0M7a0JBSHBELFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaW5qZWN0LCBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFN0b3JhZ2UgfSBmcm9tICdAaW9uaWMvc3RvcmFnZS1hbmd1bGFyJztcclxuXHJcbmV4cG9ydCB0eXBlIFdpdGhUb2tlbiA9IHtcclxuICBhY2Nlc3NfdG9rZW46IHN0cmluZyB8IG51bGw7XHJcbiAgcmVmcmVzaF90b2tlbjogc3RyaW5nIHwgbnVsbDtcclxufTtcclxuXHJcbkBJbmplY3RhYmxlKHtcclxuICBwcm92aWRlZEluOiAncm9vdCcsXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBMb2NhbFN0b3JhZ2VBdXRoZW50aWNhdGlvbkluZnJhc3RydWN0dXJlIHtcclxuICBwcml2YXRlIF9zdG9yYWdlSW5pdGlhbGlzZWQgPSBmYWxzZTtcclxuXHJcbiAgcHJpdmF0ZSBfc3RvcmFnZSA9IGluamVjdChTdG9yYWdlKTtcclxuXHJcbiAgYXN5bmMgc3RhcnRTZXNzaW9uKHVzZXI6IFdpdGhUb2tlbikge1xyXG4gICAgaWYgKCF0aGlzLl9zdG9yYWdlSW5pdGlhbGlzZWQpIGF3YWl0IHRoaXMuX3N0b3JhZ2UuY3JlYXRlKCk7XHJcbiAgICBpZiAodXNlci5hY2Nlc3NfdG9rZW4gJiYgdXNlci5yZWZyZXNoX3Rva2VuKSB7XHJcbiAgICAgIHRoaXMuX3N0b3JhZ2U/LnNldCgnYWNjZXNzX3Rva2VuJywgdXNlci5hY2Nlc3NfdG9rZW4pO1xyXG4gICAgICB0aGlzLl9zdG9yYWdlPy5zZXQoJ3JlZnJlc2hfdG9rZW4nLCB1c2VyLnJlZnJlc2hfdG9rZW4pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgYXN5bmMgZ2V0U2Vzc2lvbigpOiBQcm9taXNlPFdpdGhUb2tlbj4ge1xyXG4gICAgaWYgKCF0aGlzLl9zdG9yYWdlSW5pdGlhbGlzZWQpIGF3YWl0IHRoaXMuX3N0b3JhZ2UuY3JlYXRlKCk7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBhY2Nlc3NfdG9rZW46IGF3YWl0IHRoaXMuX3N0b3JhZ2U/LmdldCgnYWNjZXNzX3Rva2VuJyksXHJcbiAgICAgIHJlZnJlc2hfdG9rZW46IGF3YWl0IHRoaXMuX3N0b3JhZ2U/LmdldCgncmVmcmVzaF90b2tlbicpLFxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIGFzeW5jIGdldChrZXk6IHN0cmluZyk6IFByb21pc2U8c3RyaW5nPiB7XHJcbiAgICBpZiAoIXRoaXMuX3N0b3JhZ2VJbml0aWFsaXNlZCkgYXdhaXQgdGhpcy5fc3RvcmFnZS5jcmVhdGUoKTtcclxuXHJcbiAgICBjb25zdCB2YWx1ZTogc3RyaW5nID0gYXdhaXQgdGhpcy5fc3RvcmFnZS5nZXQoa2V5KTtcclxuICAgIHJldHVybiB2YWx1ZTtcclxuICB9XHJcblxyXG4gIGFzeW5jIHNldChrZXk6IHN0cmluZywgdmFsdWU6IGFueSk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgaWYgKCF0aGlzLl9zdG9yYWdlSW5pdGlhbGlzZWQpIGF3YWl0IHRoaXMuX3N0b3JhZ2UuY3JlYXRlKCk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuX3N0b3JhZ2Uuc2V0KGtleSwgdmFsdWUpO1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgcmVtb3ZlKGtleTogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICBpZiAoIXRoaXMuX3N0b3JhZ2VJbml0aWFsaXNlZCkgYXdhaXQgdGhpcy5fc3RvcmFnZS5jcmVhdGUoKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcy5fc3RvcmFnZS5yZW1vdmUoa2V5KTtcclxuICB9XHJcblxyXG4gIGFzeW5jIGVuZFNlc3Npb24oKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICBhd2FpdCB0aGlzLl9zdG9yYWdlLmNsZWFyKCk7XHJcbiAgfVxyXG59XHJcbiJdfQ==