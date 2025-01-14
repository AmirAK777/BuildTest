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
  selector: 'clovis-optimize-declarations',
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
  templateUrl: './optimize-declarations.component.html',
  styleUrl: './optimize-declarations.component.scss',
})
export class OptimizeDeclarationsComponent {
  checkedSituation = signal(true);

  checkedEvent(book: boolean) {
    this.checkedSituation.set(book);
  }
}
