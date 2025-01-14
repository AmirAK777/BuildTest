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
  IonText,
} from '@ionic/angular/standalone';
import { UserApplication } from '../../../load-user/services/user.application';
import { Identity } from 'models-lib';

@Component({
  selector: 'clovis-identity',
  standalone: true,
  imports: [
    IonText,
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
  templateUrl: './identity.component.html',
  styleUrl: './identity.component.scss',
})
export class IdentityComponent implements OnInit {
  private readonly userApplication = inject(UserApplication);

  item$$: any;

  ngOnInit(): void {
    const customer = this.userApplication.customer();

    if (customer && customer.identity) {
      const identity = customer.identity;
      this.identity.patchValue({
        title: identity.title,
        firstName: identity.firstName,
        lastName: identity.lastName,
        birthDate: identity.birthDate ? identity.birthDate.split('T')[0] : null,
        birthCountry: identity.birthCountry,
        birthCity: identity.birthCity,
        birthRegion: identity.birthRegion,
      });
    }
  }

  identity = inject(FormBuilder).group({
    title: new FormControl<string | null>(null),
    firstName: new FormControl<string>('', [Validators.required]),
    lastName: new FormControl<string>('', [Validators.required]),
    birthDate: new FormControl<string | null>(null),
    birthCountry: new FormControl<string | null>(null),
    birthCity: new FormControl<string | null>(null),
    birthRegion: new FormControl<string | null>(null),
  });

  submitToSave(): void {
    if (this.identity.value.title) console.log(this.identity.value);
    this.userApplication.updateIdentity(this.identity.value as Identity);
  }

  get controls() {
    return this.identity.controls;
  }

  get isValid(): boolean {
    return this.identity.valid;
  }
}
