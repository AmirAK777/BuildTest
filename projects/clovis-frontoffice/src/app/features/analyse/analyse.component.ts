import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  IonButton,
  IonButtons,
  IonCheckbox,
  IonCol,
  IonContent,
  IonFooter,
  IonGrid,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonRow,
  IonThumbnail,
  IonToolbar
} from '@ionic/angular/standalone';
import { ClovisHeaderComponent } from '../../shared/ui/components/clovis-header/clovis-header.component';

@Component({
  selector: 'clovis-analyse',
  standalone: true,
  imports: [
    IonButtons,
    RouterLink,
    IonIcon,
    IonContent,
    IonToolbar,
    IonFooter,
    IonButton,
    IonGrid,
    IonRow,
    IonCol,
    IonThumbnail,
    IonCheckbox,
    IonList,
    IonItem,
    IonListHeader,
    IonLabel,
    IonHeader,
    ClovisHeaderComponent
  ],
  templateUrl: './analyse.component.html',
  styleUrl: './analyse.component.scss',
})
export class AnalyseComponent {}
