import { Component } from '@angular/core';
import { LoginWithFormComponent } from '../../components/login-with-form/login-with-form.component';
import {
  IonContent,
  IonText,
  IonRow,
  IonToolbar,
  IonBackButton,
  IonHeader,
  IonThumbnail,
} from '@ionic/angular/standalone';

@Component({
  selector: 'clovis-login',
  standalone: true,
  imports: [
    IonHeader,
    IonBackButton,
    IonToolbar,
    IonRow,
    IonText,
    IonContent,
    LoginWithFormComponent,
    IonThumbnail
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {}
