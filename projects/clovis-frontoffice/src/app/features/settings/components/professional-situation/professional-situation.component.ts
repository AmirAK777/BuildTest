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
import { ProfessionalSituation } from 'models-lib';

@Component({
  selector: 'clovis-professional-situation',
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
  templateUrl: './professional-situation.component.html',
  styleUrl: './professional-situation.component.scss',
})
export class ProfessionalSituationComponent implements OnInit {
  private readonly userApplication = inject(UserApplication);

  item$$: any;

  ngOnInit(): void {
    const customer = this.userApplication.customer();

    if (customer && customer.professionalSituation) {
      const professionalSituation = customer.professionalSituation;

      this.professionalSituation.patchValue({
        professionnalStatus: professionalSituation.professionnalStatus,
        job: professionalSituation.job,
        socioProfessionalCategory:
          professionalSituation.socioProfessionalCategory,
        industrySector: professionalSituation.industrySector,
        isPolitical: professionalSituation.isPolitical,
        anyRelativeIsPolitical: professionalSituation.anyRelativeIsPolitical,
      });
    }
  }

  professionalSituation = inject(FormBuilder).group({
    professionnalStatus: new FormControl<string | null>(''),
    job: new FormControl<string | null>(''),
    socioProfessionalCategory: new FormControl<string | null>(''),
    industrySector: new FormControl<string | null>(''),
    isPolitical: new FormControl<boolean | null>(false),
    anyRelativeIsPolitical: new FormControl<boolean | null>(false),
  });

  submitToSave(): void {
    this.userApplication.updateProfessionalSituation(
      this.professionalSituation.value as ProfessionalSituation
    );
  }

  get isValid(): boolean {
    return this.professionalSituation.valid;
  }
}
