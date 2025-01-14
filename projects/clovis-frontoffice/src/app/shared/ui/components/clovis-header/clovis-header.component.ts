import { Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  IonAvatar,
  IonButton,
  IonButtons,
  IonIcon,
  IonLabel,
  IonText,
  IonThumbnail,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { UserApplication } from '../../../../features/load-user/services/user.application';

@Component({
  selector: 'clovis-header',
  standalone: true,
  imports: [
    RouterLink,
    IonToolbar,
    IonButtons,
    IonButton,
    IonIcon,
    IonThumbnail,
    IonText,
    IonLabel,
    IonTitle,
    IonAvatar,
  ],
  templateUrl: './clovis-header.component.html',
  styleUrl: './clovis-header.component.scss',
})
export class ClovisHeaderComponent {
  private readonly _userApplication = inject(UserApplication);

  customer$$ = this._userApplication.customer;

  getInitials(firstName: string, lastName: string): string {
    return this._userApplication.getInitials(firstName, lastName);
  }
  title = input.required();
  route = input.required();
}
