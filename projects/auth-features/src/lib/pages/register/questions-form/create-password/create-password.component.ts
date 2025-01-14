import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ValidatorService } from '../../../../services/validator.service';

@Component({
  selector: 'clovis-create-password',
  standalone: true,
  imports: [ReactiveFormsModule,],
  templateUrl: './create-password.component.html',
  styleUrl: './create-password.component.css'
})
export class CreatePasswordComponent {

  private readonly validatorService = inject(ValidatorService);

  createPassword = inject(FormBuilder).group({
    password: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(8)]]
  }, { validators: this.validatorService.passwordMatcher });




  saveToParent(): void {
  }
}


