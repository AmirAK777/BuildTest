import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  IonAvatar,
  IonBackButton,
  IonCard,
  IonCardContent,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonNote,
  IonText,
  IonThumbnail,
  IonTitle,
  IonToolbar,
  IonButton,
  IonCardSubtitle,
  IonCardHeader,
  IonCardTitle,
  IonRow,
  IonBadge,
} from '@ionic/angular/standalone';
import { AuthenticationApplication } from 'auth-features';
import { addIcons } from 'ionicons';
import { chevronForward, listCircle } from 'ionicons/icons';
import { UserApplication } from '../../../load-user/services/user.application';
@Component({
  selector: 'clovis-settings',
  standalone: true,
  imports: [
    IonBadge,
    IonRow,
    IonCardTitle,
    IonCardHeader,
    IonCardSubtitle,
    IonButton,
    RouterLink,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonBackButton,
    IonList,
    IonItem,
    IonNote,
    IonLabel,
    IonContent,
    IonIcon,
    IonText,
    IonCard,
    IonCardContent,
    IonThumbnail,
    IonAvatar,
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class SettingsComponent {
  constructor() {
    /**
     * Any icons you want to use in your application
     * can be registered in app.component.ts and then
     * referenced by name anywhere in your application.
     */
    addIcons({ chevronForward, listCircle });
  }
  private readonly _userApplication = inject(UserApplication);
  private readonly _authApplication = inject(AuthenticationApplication);

  customer$$ = this._userApplication.customer;

  getInitials(firstName: string | null, lastName: string | null): string {
    return this._userApplication.getInitials(firstName, lastName);
  }

  logout() {
    this._authApplication.logout();
  }
}
