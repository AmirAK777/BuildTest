import { Component, signal } from '@angular/core';
import { LoadingPageComponent } from '../../../../shared/ui/components/loading-page/loading-page.component';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonThumbnail,
  IonRow,
  IonContent,
  IonText,
  IonCol,
  IonButton,
  IonGrid,
} from '@ionic/angular/standalone';
import { CardButtonComponent } from '../../../../shared/ui/components/card-button/card-button.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'clovis-grow-savings',
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
    RouterLink
  ],
  templateUrl: './grow-savings.component.html',
  styleUrl: './grow-savings.component.scss',
})
export class GrowSavingsComponent {
  checkedSituation = signal(true);

  checkedEvent(book: boolean) {
    this.checkedSituation.set(book);
  }
}
