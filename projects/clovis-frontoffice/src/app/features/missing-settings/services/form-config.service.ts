import { Injectable } from '@angular/core';
import { FormConfig } from '../models/formFields';

@Injectable({
  providedIn: 'root',
})
export class FormConfigService {
  fetchFormConfig(id: string): FormConfig {
    const formConfigs: Record<string, FormConfig> = {
      disposableIncome: {
        fields: [
          { label: 'Revenus annuels bruts', type: 'number', required: true },
          {
            label: 'Revenus variables annuels',
            type: 'number',
            required: true,
          },
          {
            label: 'Revenus auto-entrepreneur',
            type: 'number',
            required: true,
          },
          { label: 'Revenus fonciers', type: 'number', required: true },
          { label: 'Revenus locatifs', type: 'number', required: true },
          { label: 'Revenus BNC / BIC', type: 'number', required: true },
          { label: 'Loyer', type: 'number', required: true },
          { label: 'Crédits', type: 'number', required: true },
          { label: 'Reste à vivre', type: 'number', required: true },
          { label: 'Épargne actuelle', type: 'number', required: true },
        ],
      },
      availableSavings: {
        fields: [
          { label: 'Patrimoine financier', type: 'number', required: true },
          { label: 'Epargne actuelle', type: 'number', required: true },
        ],
      },
      borrowingCapacity: {
        fields: [
          { label: 'Revenus annuels bruts', type: 'number', required: true },
          {
            label: 'Revenus variables annuels',
            type: 'number',
            required: true,
          },
          {
            label: 'Revenus auto-entrepreneur',
            type: 'number',
            required: true,
          },
          { label: 'Revenus fonciers', type: 'number', required: true },
          { label: 'Revenus locatifs', type: 'number', required: true },
          { label: 'Revenus BNC / BIC', type: 'number', required: true },
          { label: 'Loyer', type: 'number', required: true },
          { label: 'Crédits', type: 'number', required: true },
          { label: 'Capacité d’emprunt', type: 'number', required: true },
          { label: 'Taux d’endettement', type: 'number', required: true },
        ],
      },
      taxSituation: {
        fields: [
          { label: 'Revenus annuels bruts', type: 'number', required: true },
          {
            label: 'Revenus variables annuels',
            type: 'number',
            required: true,
          },
          {
            label: 'Revenus auto-entrepreneur',
            type: 'number',
            required: true,
          },
          { label: 'Revenus fonciers', type: 'number', required: true },
          { label: 'Revenus locatifs', type: 'number', required: true },
          { label: 'Revenus BNC / BIC', type: 'number', required: true },
          { label: 'Loyer', type: 'number', required: true },
          { label: 'Sitation professionnelle', type: 'text', required: true },
          { label: 'Sitation familliale', type: 'text', required: true },
          { label: "Nombre d'enfants", type: 'number', required: true },
          {
            label: 'Personnes à charge (y compris enfant)',
            type: 'number',
            required: true,
          },
        ],
      },
    };

    return formConfigs[id] || { fields: [] };
  }
}
