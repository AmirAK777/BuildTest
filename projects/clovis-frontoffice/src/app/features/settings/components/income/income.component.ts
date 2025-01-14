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
  selector: 'clovis-income',
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
  templateUrl: './income.component.html',
  styleUrl: './income.component.scss',
})
export class IncomeComponent implements OnInit {
  private readonly userApplication = inject(UserApplication);

  item$$: any;

  ngOnInit(): void {
    const customer = this.userApplication.customer();

    if (customer) {
      this.income.patchValue({
        grossannualincome: customer.firstName,
        variableannualincome: customer.lastName,
      });
    }
  }

  income = inject(FormBuilder).group({
    grossannualincome: new FormControl('', [Validators.required]),
    variableannualincome: new FormControl('', [Validators.required]),
    selfemployedincome: new FormControl('', [Validators.required]),
    propertyincome: new FormControl('', [Validators.required]),
    rentalincome: new FormControl('', [Validators.required]),
    bnc_bicincome: new FormControl('', [Validators.required]),
    sourceofyourincome: new FormControl('', [Validators.required]),
  });

  // readonly setUserDataToForm = effect(() => {
  //   const userLoaded = this.userApplication.user;
  //   if (userLoaded()) {
  //     this.myAccount.patchValue(this.userApplication.user());
  //   }
  // });

  submitToSave(): void {
    if (
      this.income.value.variableannualincome &&
      this.income.value.rentalincome
    )
      console.log(this.income.value);
  }

  get isValid(): boolean {
    return this.income.valid;
  }
}
