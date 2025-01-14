import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonText,
  IonRow,
  IonThumbnail,
  IonButton,
  IonInput,
  IonItem,
  IonLabel,
  IonToolbar,
  IonTitle,
} from '@ionic/angular/standalone';
import { matchValidator } from '../../validators/matching.validator';
import { AuthenticationStore } from '../../store';

@Component({
  selector: 'clovis-forgot-password',
  standalone: true,
  imports: [
    IonTitle,
    IonToolbar,
    IonLabel,
    IonItem,
    IonInput,
    IonButton,
    IonRow,
    IonText,
    IonHeader,
    IonContent,
    IonThumbnail,
    ReactiveFormsModule,
  ],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss',
})
export class ForgotPasswordComponent {
  private readonly store = inject(AuthenticationStore);
  private formBuilder = inject(FormBuilder);
  steps = this.store.steps;

  emailForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
  });
  codeForm = this.formBuilder.group({
    code: ['', [Validators.required, Validators.minLength(6)]],
  });
  updatePasswordForm = this.formBuilder.group(
    {
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]],
    },
    {
      validators: [matchValidator('newPassword', 'confirmPassword')],
    }
  );

  sendVerificationCode(): void {
    if (this.emailForm.value.email)
      this.store.sendResetCode(this.emailForm.value.email);
  }

  verifyCode(): void {
    if (this.codeForm.value.code)
      this.store.verifyResetCode(this.codeForm.value.code);
  }

  updatePassword(): void {
    if (
      this.updatePasswordForm.valid &&
      this.updatePasswordForm.value.confirmPassword &&
      !this.updatePasswordForm.hasError('mismatch')
    )
      this.store.updatePassword(this.updatePasswordForm.value.confirmPassword);
  }
  redirectToLogin() {}
}
