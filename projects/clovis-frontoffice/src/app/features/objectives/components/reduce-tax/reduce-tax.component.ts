import { Component, signal } from '@angular/core';
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
  selector: 'clovis-reduce-tax',
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
  templateUrl: './reduce-tax.component.html',
  styleUrl: './reduce-tax.component.scss',
})
export class ReduceTaxComponent {

  
  checkedSituation = signal(true);

  checkedEvent(book: boolean) {
    this.checkedSituation.set(book);
  }


}
