import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
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
} from '@ionic/angular/standalone';
import { UserApplication } from '../../../load-user/services/user.application';
import { Address, ContactDetails } from 'models-lib';

@Component({
  selector: 'clovis-contact-details',
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
  ],
  templateUrl: './contact-details.component.html',
  styleUrl: './contact-details.component.scss',
})
export class ContactDetailsComponent implements OnInit {
  private readonly userApplication = inject(UserApplication);
  private formBuilder = inject(FormBuilder);

  item$$: any;

  ngOnInit(): void {
    const customer = this.userApplication.customer();

    if (customer?.contactDetails && customer.address) {
      const contactDetails = customer.contactDetails;
      const address = customer.address;

      this.contactForm.patchValue({
        personalContact: {
          email: contactDetails.email,
          phoneNumber: contactDetails.phoneNumber,
        },
        address: {
          street: address.street,
          zipCode: address.zipCode,
          city: address.city,
          country: address.country,
        },
      });
    }
  }

  contactForm = this.formBuilder.group({
    personalContact: this.formBuilder.group({
      email: new FormControl<string | null>(null, [
        Validators.required,
        Validators.email,
      ]),
      phoneNumber: new FormControl<string | null>(null, [
        Validators.required,
        Validators.pattern(/^\d{10,15}$/),
      ]),
    }),
    // isPhoneConfirmed: new FormControl<boolean>(false), // Valeur par défaut : false
    address: this.formBuilder.group({
      street: new FormControl<string | null>(null, [Validators.required]),
      zipCode: new FormControl<string | null>(null, [
        Validators.required,
        Validators.pattern(/^\d{5}$/),
      ]),
      city: new FormControl<string | null>(null, [Validators.required]),
      country: new FormControl<string | null>(null, [Validators.required]),
    }),
  });

  submitToSave(): void {
    console.log(this.contactForm.get('address')?.value);
    this.userApplication.updateContactDetails(
      this.contactForm.get('personalContact')?.value as ContactDetails
    );
    this.userApplication.updateAddress(
      this.contactForm.get('address')?.value as Address
    );
  }

  get isValid(): boolean {
    return this.contactForm.valid;
  }
}
