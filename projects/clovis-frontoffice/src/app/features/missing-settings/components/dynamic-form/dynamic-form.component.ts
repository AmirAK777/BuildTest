import { CommonModule } from '@angular/common';
import { Component, inject, input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonList,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
  ModalController,
} from '@ionic/angular/standalone';
import { FinancialSituation, Objectifs } from 'models-lib';
import { CustomerStore } from '../../../load-user/store';
import { FormConfig } from '../../models/formFields';
import { FormConfigService } from '../../services/form-config.service';

@Component({
  selector: 'clovis-dynamic-form',
  standalone: true,
  imports: [
    IonSelectOption,
    IonSelect,
    IonItem,
    IonList,
    IonTitle,
    IonContent,
    IonToolbar,
    IonHeader,
    ReactiveFormsModule,
    CommonModule,
    IonInput,
    IonButton,
  ],
  templateUrl: './dynamic-form.component.html',
  styleUrl: './dynamic-form.component.scss',
})
export class DynamicFormComponent implements OnInit {
  private readonly _formConfigService = inject(FormConfigService);
  private readonly _modalController = inject(ModalController);
  private readonly _customerStore = inject(CustomerStore)

  dynamicForm!: FormGroup;
  formConfig: FormConfig | undefined;
  fb = inject(FormBuilder);
  public group = input.required<string>();
  public name = input.required<string>();

  ngOnInit(): void {
    const config = this._formConfigService.fetchFormConfig(this.group());
    this.formConfig = config;
    this.buildForm(config);
  }

  buildForm(fields: FormConfig): void {
    const controls: { [key: string]: any } = {};
    fields.fields.forEach(field => {
      const validators = field.required ? [Validators.required] : [];
      controls[field.label] = ['', validators];
    });
    this.dynamicForm = this.fb.group(controls);
  }

  submitForm() {
    console.log(this.dynamicForm.value);
    const formValues = this.dynamicForm.value;
    const financialSituation: FinancialSituation = this.mapFinancialSituation(formValues);
    // const mapFamilySituation: FamilySituation = this.mapFamilySituation(formValues);
    // this._customerStore.updateFamilySituation(mapFamilySituation)
    console.info("fiancialSituation",financialSituation);
    // console.info("familly",mapFamilySituation);

    this._modalController.dismiss();
  }

  mapFinancialSituation(formValues: any): FinancialSituation {
    return {
      salaryIncome:
        formValues['Revenus annuels bruts'] +
        formValues['Revenus variables annuels'],
      passiveIncome:
        formValues['Revenus fonciers'] + formValues['Revenus locatifs'],
      charges: formValues['Loyer'] + formValues['Crédits'],
      monthlySaving: formValues['Épargne actuelle'],
      saving: formValues['Épargne actuelle'],
      rent: formValues['Loyer'],
      taxPerYear: formValues['Taxe annuelle'], 
      withHoldingTax: formValues['Taxe retenue à la source'],
      disposableIncome: formValues['Reste à vivre'],
      borrowingCapacity: formValues['Capacité d’emprunt'],
    };
  }

  // mapFamilySituation(formValues: any): FamilySituation {
  //   return {
  //     children: formValues["Nombre d'enfants"],
  //     maritalSituation: formValues['Sitation familliale'],
  //   };
  // }

  mapObjectifs(formValues: any): Objectifs {
    return {
      reduceTax: formValues['Réduire les impôts'],
      prepareRetirement: formValues['Préparer la retraite'],
      generatePassiveIncome: formValues['Générer des revenus passifs'],
      realEstate: formValues["Investir dans l'immobilier"],
      optimizeDeclaration: formValues['Optimiser la déclaration'],
    };
  }
}
