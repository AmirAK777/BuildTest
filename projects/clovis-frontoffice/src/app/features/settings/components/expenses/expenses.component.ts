import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import {
  IonTitle,
  IonHeader,
  IonToolbar,
  IonContent,
  IonBackButton,
  IonInput,
  IonList,
  IonItem,
  IonButton,
  IonSelect,
  IonSelectOption,
} from '@ionic/angular/standalone';
import { UserApplication } from '../../../load-user/services/user.application';

@Component({
  selector: 'clovis-expenses',
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonBackButton,
    IonInput,
    IonList,
    IonItem,
    IonButton,
    ReactiveFormsModule,
    IonSelect,
    IonSelectOption,
  ],
  templateUrl: './expenses.component.html',
  styleUrl: './expenses.component.scss',
})
export class ExpensesComponent implements OnInit {
  private readonly userApplication = inject(UserApplication);

  item$$: any;

  ngOnInit(): void {
    const customer = this.userApplication.customer();

    if (customer) {
      this.expenses.patchValue({
        rent: customer.firstName,
        loans: customer.lastName,
      });
    }
  }

  expenses = inject(FormBuilder).group({
    rent: new FormControl('', [Validators.required]),
    loans: new FormControl('', [Validators.required]),
    currentexpenses: new FormControl('', [Validators.required]),
    otherexpenses: new FormControl('', [Validators.required]),
  });

  // readonly setUserDataToForm = effect(() => {
  //   const userLoaded = this.userApplication.user;
  //   if (userLoaded()) {
  //     this.myAccount.patchValue(this.userApplication.user());
  //   }
  // });

  submitToSave(): void {
    if (this.expenses.value.loans && this.expenses.value.rent)
      console.log(this.expenses.value);
  }

  get isValid(): boolean {
    return this.expenses.valid;
  }
}
