import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Browser } from '@capacitor/browser';
import {
  IonBackButton,
  IonButton,
  IonCheckbox,
  IonCol,
  IonContent,
  IonFooter,
  IonGrid,
  IonHeader,
  IonLabel,
  IonModal,
  IonRow,
  IonSegment,
  IonSegmentButton,
  IonThumbnail,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { OffersApplication } from 'offer-payments';
import { Observable } from 'rxjs';
import { CardClovisPlusComponent } from '../../../../shared/ui/components/card-clovis-plus/card-clovis-plus.component';
import { ModalClovisPlusComponent } from '../../../../shared/ui/components/modal-clovis-plus/modal-clovis-plus.component';
import { UserApplication } from '../../../load-user/services/user.application';
import { Modal } from '../../models';
import { ClovisClubInfrastructure } from '../../services/clovis-club.infrastructure';

@Component({
  selector: 'clovis-clovis-club',
  standalone: true,
  imports: [
    IonGrid,
    IonLabel,
    IonThumbnail,
    ReactiveFormsModule,
    ModalClovisPlusComponent,
    IonModal,
    CardClovisPlusComponent,
    IonCol,
    IonRow,
    IonCheckbox,
    IonSegmentButton,
    IonSegment,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonBackButton,
    IonFooter,
  ],
  templateUrl: './clovis-club.component.html',
  styleUrl: './clovis-club.component.scss',
})
export class ClovisClubComponent {
  infra = inject(ClovisClubInfrastructure);
  private readonly _userApp = inject(UserApplication);
  private readonly _payApp = inject(OffersApplication);

  offers$$ = this._payApp.offers;

  modals$: Observable<Modal[]> = this.infra.getAll();

  modals$$ = toSignal(this.modals$);

  segmentFilter = new FormControl('Prenium', { nonNullable: true });

  choiceSuscription(offerName: string): void {
    if (this.offers$$()) {
      const offers = this.offers$$();
      if (offers) {
        const premierFruit = offers.find(offer => offer.name === offerName);
        this.openCapacitorSite(premierFruit?.paymentLink as string);
      }
    }
  }

  openCapacitorSite = async (link: string) => {
    const customer$$ = this._userApp.customer();
    const email = customer$$?.contactDetails?.email;
    if (email) {
      const url = `${link}?prefilled_email=${encodeURIComponent(email)}`;
      await Browser.open({
        url,
      });
    }
  };
}
