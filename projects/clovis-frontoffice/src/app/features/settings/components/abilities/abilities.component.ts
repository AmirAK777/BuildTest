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
  selector: 'clovis-abilities',
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
  templateUrl: './abilities.component.html',
  styleUrl: './abilities.component.scss',
})
export class AbilitiesComponent implements OnInit {
  private readonly userApplication = inject(UserApplication);

  item$$: any;

  ngOnInit(): void {
    const customer = this.userApplication.customer();

    if (customer) {
      this.abilities.patchValue({
        remainingincome: customer.firstName,
        currentsavings: customer.lastName,
      });
    }
  }

  abilities = inject(FormBuilder).group({
    remainingincome: new FormControl('', [Validators.required]),
    currentsavings: new FormControl('', [Validators.required]),
    borrowingcapacity: new FormControl('', [Validators.required]),
    debttoincomeratio: new FormControl('', [Validators.required]),
  });

  // readonly setUserDataToForm = effect(() => {
  //   const userLoaded = this.userApplication.user;
  //   if (userLoaded()) {
  //     this.myAccount.patchValue(this.userApplication.user());
  //   }
  // });

  submitToSave(): void {
    if (
      this.abilities.value.currentsavings &&
      this.abilities.value.debttoincomeratio
    )
      console.log(this.abilities.value);
  }

  get isValid(): boolean {
    return this.abilities.valid;
  }
}
