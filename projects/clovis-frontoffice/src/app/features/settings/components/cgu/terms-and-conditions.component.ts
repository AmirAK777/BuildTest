import { Component } from '@angular/core';

import { IonTitle, IonHeader, IonToolbar, IonContent, IonBackButton, IonCard,IonCardContent,  } from '@ionic/angular/standalone';

@Component({
  selector: 'clovis-terms-and-conditions.',
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonBackButton,IonCard,IonCardContent],
  templateUrl: './terms-and-conditions.component.html',
  styleUrl: './terms-and-conditions.component.scss'
})
export class TermsAndConditionsComponent  {


}
