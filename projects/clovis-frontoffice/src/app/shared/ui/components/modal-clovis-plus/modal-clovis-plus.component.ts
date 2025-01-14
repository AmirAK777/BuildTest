import { Component, input } from '@angular/core';
import {
  IonButton,
  IonChip,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonLabel,
  IonModal,
  IonRow,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { Modal } from '../../../../features/clovis-club/models';

@Component({
  selector: 'clovis-modal-clovis-plus',
  standalone: true,
  imports: [
    IonToolbar,
    IonModal,
    IonButton,
    IonContent,
    IonHeader,
    IonTitle,
    IonLabel,
    IonRow,
    IonGrid,
    IonCol,
    IonChip,
  ],
  templateUrl: './modal-clovis-plus.component.html',
  styleUrl: './modal-clovis-plus.component.scss',
})
export class ModalClovisPlusComponent {
  items = input.required<Modal[]>();
}
