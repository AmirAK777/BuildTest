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
  IonNote,
} from '@ionic/angular/standalone';
import { UserApplication } from '../../../load-user/services/user.application';
import { FamilySituation } from 'models-lib';

@Component({
  selector: 'clovis-family-status',
  standalone: true,
  imports: [
    IonNote,
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
  templateUrl: './family-status.component.html',
  styleUrl: './family-status.component.scss',
})
export class FamilyStatusComponent implements OnInit {
  private readonly userApplication = inject(UserApplication);

  item$$: any;

  ngOnInit(): void {
    const customer = this.userApplication.customer();

    if (customer && customer.familySituation) {
      const familySituation = customer.familySituation;

      this.familyStatus.patchValue({
        maritalSituation: familySituation.maritalSituation,
        children: familySituation.children,
        dependents: familySituation.dependents,
        legalProtection: familySituation.legalProtection,
      });
    }
  }

  familyStatus = inject(FormBuilder).group({
    children: new FormControl<number | null>(0),
    dependents: new FormControl<number | null>(0),
    maritalSituation: new FormControl<string | number>(0, [
      Validators.required,
    ]),
    legalProtection: new FormControl<string | null>(null),
  });

  submitToSave(): void {
    console.log(this.familyStatus.value);
    this.userApplication.updateFamilySituation(
      this.familyStatus.value as FamilySituation
    );
  }

  get isValid(): boolean {
    return this.familyStatus.valid;
  }
}
