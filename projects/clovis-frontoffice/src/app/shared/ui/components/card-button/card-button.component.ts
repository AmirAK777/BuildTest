import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonChip,
  IonContent,
  IonItem,
  IonLabel,
  IonList,
  IonText,
  IonRow,
  IonThumbnail,
} from '@ionic/angular/standalone';

@Component({
  selector: 'clovis-card-button',
  standalone: true,
  imports: [
    IonRow,
    IonText,
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
    IonThumbnail,
    RouterLink
  ],
  templateUrl: './card-button.component.html',
  styleUrl: './card-button.component.scss',
})
export class CardButtonComponent {
  title = input.required();
  colorChip = input.required();
  textChip = input.required();
  content = input.required();
  rating = input<boolean>();
  route = input<string>();

}
