import { Component, input } from '@angular/core';
import {
  IonChip,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
  IonContent,
  IonItem,
  IonLabel,
  IonList,
  IonButton,
  IonRow,
  IonCol,
  IonText, IonIcon, IonImg } from '@ionic/angular/standalone';
import {  Modal } from '../../../../features/clovis-club/models';

@Component({
  selector: 'clovis-card-clovis-plus',
  standalone: true,
  imports: [IonImg, IonIcon, 
    IonText,
    IonCol,
    IonChip,
    IonCard,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonCardContent,
    IonContent,
    IonItem,
    IonLabel,
    IonList,
    IonButton,
    IonRow,
  ],
  templateUrl: './card-clovis-plus.component.html',
  styleUrl: './card-clovis-plus.component.scss',
})
export class CardClovisPlusComponent {
  items = input.required<Modal[]>();
  subtitle = input.required<string>();
  currentOffer = input<string>();
  offer = input.required<string>();

}
