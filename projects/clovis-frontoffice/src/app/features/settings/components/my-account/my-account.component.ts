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
} from '@ionic/angular/standalone';
import { UserApplication } from '../../../load-user/services/user.application';

@Component({
  selector: 'clovis-my-account',
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
  templateUrl: './my-account.component.html',
  styleUrl: './my-account.component.scss',
})
export class MyAccountComponent implements OnInit {
  private readonly userApplication = inject(UserApplication);

  item$$: any;

  ngOnInit(): void {
    const customer = this.userApplication.customer();

    if (customer) {
      this.myAccount.patchValue({
        firstname: customer.firstName,
        lastname: customer.lastName,
      });
    }
  }

  myAccount = inject(FormBuilder).group({
    firstname: new FormControl('', [Validators.required, Validators.email]),
    lastname: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    pin: new FormControl('', Validators.required),
  });

  // readonly setUserDataToForm = effect(() => {
  //   const userLoaded = this.userApplication.user;
  //   if (userLoaded()) {
  //     this.myAccount.patchValue(this.userApplication.user());
  //   }
  // });

  submitToSave(): void {
    if (this.myAccount.value.firstname && this.myAccount.value.password)
      console.log(this.myAccount.value);
  }

  get isValid(): boolean {
    return this.myAccount.valid;
  }
}
