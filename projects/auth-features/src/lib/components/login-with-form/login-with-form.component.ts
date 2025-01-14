import { Component, inject } from '@angular/core';
import { AuthenticationApplication } from '../../services/authentication.application';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import {
  IonButton,
  IonInput,
  IonItem,
  IonList,
  IonText,
} from '@ionic/angular/standalone';

@Component({
  selector: 'clovis-login-with-form',
  standalone: true,
  imports: [
    IonText,
    ReactiveFormsModule,
    RouterLink,
    IonList,
    IonItem,
    IonInput,
    IonButton,
  ],
  templateUrl: './login-with-form.component.html',
  styleUrl: './login-with-form.component.scss',
})
export class LoginWithFormComponent {
  private readonly application = inject(AuthenticationApplication);

  loginForm = inject(FormBuilder).group({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  save(): void {
    if (this.loginForm.value.email && this.loginForm.value.password)
      this.application.login(
        this.loginForm.value.email,
        this.loginForm.value.password
      );
  }

  get email(): FormControl {
    return this.loginForm.controls.email;
  }
  get password(): FormControl {
    return this.loginForm.controls.password;
  }

  get isValid(): boolean {
    return this.loginForm.valid;
  }
}
