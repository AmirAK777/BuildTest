import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  LOCALE_ID,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonNote,
  IonRefresher,
  IonRefresherContent,
  IonRouterOutlet,
  IonRow,
  IonSegment,
  IonSegmentButton,
  IonSegmentContent,
  IonSegmentView,
  IonText,
  IonThumbnail,
  IonTitle,
  ModalController,
  RefresherCustomEvent,
} from '@ionic/angular/standalone';

import { CommonModule, registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { ReactiveFormsModule } from '@angular/forms';
import { CardButtonComponent } from '../../../../shared/ui/components/card-button/card-button.component';
import { ClovisHeaderComponent } from '../../../../shared/ui/components/clovis-header/clovis-header.component';
import { UserApplication } from '../../../load-user/services/user.application';
import { DynamicFormComponent } from '../../../missing-settings/components/dynamic-form/dynamic-form.component';
registerLocaleData(localeFr, 'fr');

@Component({
  selector: 'clovis-home',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [{ provide: LOCALE_ID, useValue: 'fr' }],

  imports: [
    ReactiveFormsModule,
    RouterLink,
    IonCol,
    IonIcon,
    IonLabel,
    IonThumbnail,
    IonCardTitle,
    IonRow,
    IonGrid,
    IonHeader,
    IonTitle,
    IonContent,
    IonSegment,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonSegmentButton,
    IonCardSubtitle,
    IonItem,
    IonList,
    IonNote,
    CardButtonComponent,
    IonText,
    IonMenu,
    IonButton,
    CommonModule,
    ClovisHeaderComponent,
    IonSegmentView,
    IonSegmentContent,
    IonRefresher,
    IonRefresherContent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  private readonly routerOutlet = inject(IonRouterOutlet);
  private readonly modalController = inject(ModalController);
  private readonly userApp = inject(UserApplication);

  constructor() {
    this.userApp.getCurrentCustomer();
  }

  
  async openModal(id: string, name: string) {
    const modal = await this.modalController.create({
      component: DynamicFormComponent,
      presentingElement: this.routerOutlet.nativeEl,
      componentProps: {
        group: id,
        name,
      },
    });
    await modal.present();
  }

  customer$$ = this.userApp.customer;

  handleRefresh(event: RefresherCustomEvent) {
    this.userApp.getCurrentCustomer();

    const checkLoading = setInterval(() => {
      if (!this.userApp.isLoading()) {
        event.target.complete();
        clearInterval(checkLoading);
      }
    }, 100);
  }
}
