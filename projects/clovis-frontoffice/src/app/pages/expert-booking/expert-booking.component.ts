import { Component, ViewChild } from '@angular/core';
import { IonButton, IonCheckbox, IonCol, IonContent, IonGrid, IonHeader, IonItem, IonList, IonRow, IonText, IonThumbnail, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'clovis-expert-booking',
  standalone: true,
  imports: [IonContent, IonHeader, IonToolbar, IonThumbnail, IonText, IonRow, IonCol, IonGrid, IonButton, IonCheckbox, IonList, IonItem],
  templateUrl: './expert-booking.component.html',
  styleUrl: './expert-booking.component.scss'
})
export class ExpertBookingComponent {

  @ViewChild(IonContent) content!: IonContent;

  scrollToTop() {
    // Passing a duration to the method makes it so the scroll slowly
    // goes to the top instead of instantly
    this.content.scrollToTop(500);
  }

}
