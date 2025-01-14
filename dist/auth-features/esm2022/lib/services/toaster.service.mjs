import { inject, Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { checkmarkCircleOutline, alertCircleOutline } from 'ionicons/icons';
import * as i0 from "@angular/core";
export class ToasterService {
    constructor() {
        this._toastController = inject(ToastController);
        addIcons({ checkmarkCircleOutline, alertCircleOutline });
    }
    async presentToastWithOptions(message, icon, color) {
        const toast = await this._toastController.create({
            message: message,
            duration: 2500,
            position: 'bottom',
            icon: icon,
            color: color,
        });
        await toast.present();
    }
    success(message) {
        this.presentToastWithOptions(message, checkmarkCircleOutline, 'primary');
    }
    warning(message) {
        this.presentToastWithOptions(message, alertCircleOutline, 'warning');
    }
    error(message) {
        this.presentToastWithOptions(message, alertCircleOutline, 'danger');
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.13", ngImport: i0, type: ToasterService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.13", ngImport: i0, type: ToasterService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.13", ngImport: i0, type: ToasterService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: () => [] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9hc3Rlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvYXV0aC1mZWF0dXJlcy9zcmMvbGliL3NlcnZpY2VzL3RvYXN0ZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDNUQsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUNwQyxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsa0JBQWtCLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQzs7QUFLM0UsTUFBTSxPQUFPLGNBQWM7SUFFekI7UUFEUSxxQkFBZ0IsR0FBRyxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUM7UUFFakQsUUFBUSxDQUFDLEVBQUUsc0JBQXNCLEVBQUUsa0JBQWtCLEVBQUUsQ0FBQyxDQUFDO0lBQzNELENBQUM7SUFFRCxLQUFLLENBQUMsdUJBQXVCLENBQUMsT0FBZSxFQUFFLElBQVksRUFBRSxLQUFhO1FBQ3hFLE1BQU0sS0FBSyxHQUFHLE1BQU0sSUFBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQztZQUMvQyxPQUFPLEVBQUUsT0FBTztZQUNoQixRQUFRLEVBQUUsSUFBSTtZQUNkLFFBQVEsRUFBRSxRQUFRO1lBQ2xCLElBQUksRUFBRSxJQUFJO1lBQ1YsS0FBSyxFQUFFLEtBQUs7U0FDYixDQUFDLENBQUM7UUFFSCxNQUFNLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUN4QixDQUFDO0lBRUQsT0FBTyxDQUFDLE9BQWU7UUFDckIsSUFBSSxDQUFDLHVCQUF1QixDQUFDLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxTQUFTLENBQUMsQ0FBQztJQUMzRSxDQUFDO0lBRUQsT0FBTyxDQUFDLE9BQWU7UUFDckIsSUFBSSxDQUFDLHVCQUF1QixDQUFDLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxTQUFTLENBQUMsQ0FBQztJQUN2RSxDQUFDO0lBRUQsS0FBSyxDQUFDLE9BQWU7UUFDbkIsSUFBSSxDQUFDLHVCQUF1QixDQUFDLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxRQUFRLENBQUMsQ0FBQztJQUN0RSxDQUFDOytHQTVCVSxjQUFjO21IQUFkLGNBQWMsY0FGYixNQUFNOzs0RkFFUCxjQUFjO2tCQUgxQixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGluamVjdCwgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBUb2FzdENvbnRyb2xsZXIgfSBmcm9tICdAaW9uaWMvYW5ndWxhci9zdGFuZGFsb25lJztcclxuaW1wb3J0IHsgYWRkSWNvbnMgfSBmcm9tICdpb25pY29ucyc7XHJcbmltcG9ydCB7IGNoZWNrbWFya0NpcmNsZU91dGxpbmUsIGFsZXJ0Q2lyY2xlT3V0bGluZX0gZnJvbSAnaW9uaWNvbnMvaWNvbnMnO1xyXG5cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290JyxcclxufSlcclxuZXhwb3J0IGNsYXNzIFRvYXN0ZXJTZXJ2aWNlIHtcclxuICBwcml2YXRlIF90b2FzdENvbnRyb2xsZXIgPSBpbmplY3QoVG9hc3RDb250cm9sbGVyKTtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIGFkZEljb25zKHsgY2hlY2ttYXJrQ2lyY2xlT3V0bGluZSwgYWxlcnRDaXJjbGVPdXRsaW5lIH0pO1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgcHJlc2VudFRvYXN0V2l0aE9wdGlvbnMobWVzc2FnZTogc3RyaW5nLCBpY29uOiBzdHJpbmcsIGNvbG9yOiBzdHJpbmcpIHtcclxuICAgIGNvbnN0IHRvYXN0ID0gYXdhaXQgdGhpcy5fdG9hc3RDb250cm9sbGVyLmNyZWF0ZSh7XHJcbiAgICAgIG1lc3NhZ2U6IG1lc3NhZ2UsXHJcbiAgICAgIGR1cmF0aW9uOiAyNTAwLFxyXG4gICAgICBwb3NpdGlvbjogJ2JvdHRvbScsXHJcbiAgICAgIGljb246IGljb24sXHJcbiAgICAgIGNvbG9yOiBjb2xvcixcclxuICAgIH0pO1xyXG5cclxuICAgIGF3YWl0IHRvYXN0LnByZXNlbnQoKTtcclxuICB9XHJcblxyXG4gIHN1Y2Nlc3MobWVzc2FnZTogc3RyaW5nKSB7XHJcbiAgICB0aGlzLnByZXNlbnRUb2FzdFdpdGhPcHRpb25zKG1lc3NhZ2UsIGNoZWNrbWFya0NpcmNsZU91dGxpbmUsICdwcmltYXJ5Jyk7XHJcbiAgfVxyXG5cclxuICB3YXJuaW5nKG1lc3NhZ2U6IHN0cmluZykge1xyXG4gICAgdGhpcy5wcmVzZW50VG9hc3RXaXRoT3B0aW9ucyhtZXNzYWdlLCBhbGVydENpcmNsZU91dGxpbmUsICd3YXJuaW5nJyk7XHJcbiAgfVxyXG5cclxuICBlcnJvcihtZXNzYWdlOiBzdHJpbmcpIHtcclxuICAgIHRoaXMucHJlc2VudFRvYXN0V2l0aE9wdGlvbnMobWVzc2FnZSwgYWxlcnRDaXJjbGVPdXRsaW5lLCAnZGFuZ2VyJyk7XHJcbiAgfVxyXG59XHJcblxyXG5cclxuIl19