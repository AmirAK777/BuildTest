import { inject, Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { checkmarkCircleOutline, alertCircleOutline} from 'ionicons/icons';

@Injectable({
  providedIn: 'root',
})
export class ToasterService {
  private _toastController = inject(ToastController);
  constructor() {
    addIcons({ checkmarkCircleOutline, alertCircleOutline });
  }

  async presentToastWithOptions(message: string, icon: string, color: string) {
    const toast = await this._toastController.create({
      message: message,
      duration: 2500,
      position: 'bottom',
      icon: icon,
      color: color,
    });

    await toast.present();
  }

  success(message: string) {
    this.presentToastWithOptions(message, checkmarkCircleOutline, 'primary');
  }

  warning(message: string) {
    this.presentToastWithOptions(message, alertCircleOutline, 'warning');
  }

  error(message: string) {
    this.presentToastWithOptions(message, alertCircleOutline, 'danger');
  }
}


