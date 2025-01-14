import { Component } from '@angular/core';

import { IonTitle, IonHeader, IonToolbar, IonContent, IonBackButton, IonCard,IonCardContent } from '@ionic/angular/standalone';

@Component({
  selector: 'clovis-legal-notices',
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonBackButton,IonCard,IonCardContent],
  templateUrl: './legal-notices.component.html',
  styleUrl: './legal-notices.component.scss'
})
export class LegalNoticesComponent {


}
