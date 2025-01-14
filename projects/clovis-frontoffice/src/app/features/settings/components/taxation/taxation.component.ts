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
  IonLabel,
} from '@ionic/angular/standalone';
import { UserApplication } from '../../../load-user/services/user.application';
import { TaxationSituation } from 'models-lib';

@Component({
  selector: 'clovis-taxation',
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
    IonLabel,
  ],
  templateUrl: './taxation.component.html',
  styleUrl: './taxation.component.scss',
})
export class TaxationComponent implements OnInit {
  private readonly userApplication = inject(UserApplication);

  item$$: any;

  ngOnInit(): void {
    const customer = this.userApplication.customer();

    if (customer?.taxationSituation) {
      const taxationSituation = customer.taxationSituation;
  
      this.taxation.patchValue({
        nationality: taxationSituation.nationality,
        principalTaxResidence: taxationSituation.principalTaxResidence,
        taxResidenceInAnotherCountry: taxationSituation.taxResidenceInAnotherCountry,
        isHouseholdSubjectToIncomeTax: taxationSituation.isHouseholdSubjectToIncomeTax,
        haveAmericainNationality: taxationSituation.haveAmericainNationality,
        haveNoEuropeenTaxResidence: taxationSituation.haveNoEuropeenTaxResidence,
      });
    }
  }

  taxation = inject(FormBuilder).group({
    nationality: new FormControl<string | null>(null),
    principalTaxResidence: new FormControl<string | null>(null),
    taxResidenceInAnotherCountry: new FormControl<boolean | null>(null),
    isHouseholdSubjectToIncomeTax: new FormControl<boolean | null>(null),
    haveAmericainNationality: new FormControl<boolean | null>(null),
    haveNoEuropeenTaxResidence: new FormControl<boolean | null>(null),
  });

  submitToSave(): void {
    console.log(this.taxation.value);
    this.userApplication.updateTaxationSituation(this.taxation.value as TaxationSituation);
  }

  get isValid(): boolean {
    return this.taxation.valid;
  }
}
