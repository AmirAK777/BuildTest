import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonRow,
  IonText,
  IonThumbnail,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { CardButtonComponent } from '../../../../shared/ui/components/card-button/card-button.component';
import { LoadingPageComponent } from '../../../../shared/ui/components/loading-page/loading-page.component';

@Component({
  selector: 'clovis-referral',
  standalone: true,
  imports: [
    IonGrid,
    IonButton,
    IonCol,
    IonText,
    IonContent,
    IonRow,
    IonTitle,
    IonToolbar,
    IonHeader,
    LoadingPageComponent,
    IonThumbnail,
    CardButtonComponent,
    RouterLink,
  ],
  templateUrl: './referral.component.html',
  styleUrl: './referral.component.scss',
})
export class ReferralComponent {}
