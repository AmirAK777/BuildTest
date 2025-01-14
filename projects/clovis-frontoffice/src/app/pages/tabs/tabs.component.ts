import { Component } from '@angular/core';
import {
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
} from '@ionic/angular/standalone';
import { AngularSvgIconModule } from 'angular-svg-icon';

import { addIcons } from 'ionicons';
import { homeOutline, barChartOutline, podiumOutline, walletOutline } from 'ionicons/icons';

@Component({
  selector: 'clovis-tabs',
  standalone: true,
  imports: [IonTabs, IonTabBar, IonTabButton, IonIcon, AngularSvgIconModule,IonLabel],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.scss',
})
export class TabsComponent {
  selectedTab: string = 'home';
  constructor() {
    addIcons({homeOutline,barChartOutline,podiumOutline,walletOutline});
  }
}