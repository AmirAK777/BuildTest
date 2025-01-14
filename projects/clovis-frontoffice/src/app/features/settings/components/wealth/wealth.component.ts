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
  selector: 'clovis-wealth',
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
  templateUrl: './wealth.component.html',
  styleUrl: './wealth.component.scss',
})
export class WealthComponent implements OnInit {
  private readonly userApplication = inject(UserApplication);

  item$$: any;

  ngOnInit(): void {
    const user = this.userApplication.customer();

    if (user) {
      this.wealth.patchValue({
        financialassets: user.firstName,
        realestateassets: user.lastName,
      });
    }
  }

  wealth = inject(FormBuilder).group({
    financialassets: new FormControl('', [Validators.required]),
    realestateassets: new FormControl('', [Validators.required]),
    otherassets: new FormControl('', [Validators.required]),
  });

  submitToSave(): void {
    if (this.wealth.value.realestateassets && this.wealth.value.financialassets)
      console.log(this.wealth.value);
  }

  get isValid(): boolean {
    return this.wealth.valid;
  }
}
