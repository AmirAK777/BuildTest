import { Component, inject, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Customer } from 'models-lib';

@Component({
  selector: 'clovis-inscription-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './inscription-form.component.html',
  styleUrl: './inscription-form.component.css'
})
export class InscriptionFormComponent {


  registerForm = inject(FormBuilder).group({
    firstName: [null, [Validators.required]],
    lastName: [null, [Validators.required]],
    email: ['', [Validators.required]],
    phoneNumber: ['', [Validators.required]],
    zipCode: ['', [Validators.required]],
    rgpdChecked: [false, Validators.requiredTrue]
  });

  requestToSave = output<Customer>();


  saveToParent(): void {
    const customer: Customer = this.registerForm.value as unknown as Customer;
    this.requestToSave.emit(customer);
    console.info(customer)
  }
}
