import * as i0 from '@angular/core';
import { inject, Component } from '@angular/core';
import * as i1 from '@angular/forms';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { IonToolbar, IonItem, IonInput, IonButton, IonRow, IonText, IonHeader, IonContent, IonThumbnail, IonTitle, IonLabel } from '@ionic/angular/standalone';
import { AuthenticationStore } from './auth-features.mjs';

function matchValidator(controlName, matchingControlName) {
    return (formGroup) => {
        const control = formGroup.get(controlName);
        const matchingControl = formGroup.get(matchingControlName);
        if (!control || !matchingControl) {
            return null;
        }
        if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
            return null;
        }
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        }
        else {
            matchingControl.setErrors(null);
        }
        return null;
    };
}

class ForgotPasswordComponent {
    constructor() {
        this.store = inject(AuthenticationStore);
        this.formBuilder = inject(FormBuilder);
        this.steps = this.store.steps;
        this.emailForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
        });
        this.codeForm = this.formBuilder.group({
            code: ['', [Validators.required, Validators.minLength(6)]],
        });
        this.updatePasswordForm = this.formBuilder.group({
            newPassword: ['', [Validators.required, Validators.minLength(8)]],
            confirmPassword: ['', [Validators.required]],
        }, {
            validators: [matchValidator('newPassword', 'confirmPassword')],
        });
    }
    sendVerificationCode() {
        if (this.emailForm.value.email)
            this.store.sendResetCode(this.emailForm.value.email);
    }
    verifyCode() {
        if (this.codeForm.value.code)
            this.store.verifyResetCode(this.codeForm.value.code);
    }
    updatePassword() {
        if (this.updatePasswordForm.valid &&
            this.updatePasswordForm.value.confirmPassword &&
            !this.updatePasswordForm.hasError('mismatch'))
            this.store.updatePassword(this.updatePasswordForm.value.confirmPassword);
    }
    redirectToLogin() { }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.13", ngImport: i0, type: ForgotPasswordComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.13", type: ForgotPasswordComponent, isStandalone: true, selector: "clovis-forgot-password", ngImport: i0, template: "<ion-header collapse=\"fade\">\r\n  <ion-toolbar>\r\n    <ion-row\r\n      class=\"ion-justify-content-center ion-align-items-center ion-text-center\"\r\n    >\r\n      <ion-thumbnail>\r\n        <img\r\n          alt=\"Enveloppe\"\r\n          src=\"https://res.cloudinary.com/dyewhr2lj/image/upload/v1668516112/Logo_Clovis_fxqyoh.png\"\r\n        />\r\n      </ion-thumbnail>\r\n      <p>clovis</p>\r\n    </ion-row>\r\n  </ion-toolbar>\r\n</ion-header>\r\n\r\n<ion-content class=\"ion-padding\">\r\n  @switch (steps()) { @case (1) {\r\n  <ion-text class=\"ion-text-center ion-margin\">\r\n    <h3>R\u00E9initialisation de votre mot de passe</h3>\r\n    <p>Nous vous enverrons un code de v\u00E9rification \u00E0 votre adresse email</p>\r\n  </ion-text>\r\n  <form [formGroup]=\"emailForm\" (ngSubmit)=\"sendVerificationCode()\">\r\n    <ion-item>\r\n      <ion-input\r\n        fill=\"solid\"\r\n        label=\"Email\"\r\n        labelPlacement=\"floating\"\r\n        formControlName=\"email\"\r\n        type=\"text\"\r\n      ></ion-input>\r\n    </ion-item>\r\n\r\n    <ion-button\r\n      class=\"clovis\"\r\n      [disabled]=\"emailForm.invalid\"\r\n      expand=\"block\"\r\n      type=\"submit\"\r\n      >Envoyer le code de v\u00E9rification</ion-button\r\n    >\r\n  </form>\r\n  } @case (2) {\r\n  <ion-text class=\"ion-text-center ion-margin\">\r\n    <h3>Saisissez le code \u00E0 6 chiffres que vous avec re\u00E7u par email</h3>\r\n  </ion-text>\r\n\r\n  <form [formGroup]=\"codeForm\" (ngSubmit)=\"verifyCode()\">\r\n    <ion-item>\r\n      <ion-input\r\n        fill=\"solid\"\r\n        label=\"Code de s\u00E9curit\u00E9\"\r\n        labelPlacement=\"floating\"\r\n        formControlName=\"code\"\r\n        type=\"password\"\r\n      ></ion-input>\r\n    </ion-item>\r\n\r\n    <ion-button\r\n      class=\"clovis\"\r\n      expand=\"block\"\r\n      type=\"submit\"\r\n      [disabled]=\"codeForm.invalid\"\r\n      >Valider</ion-button\r\n    >\r\n  </form>\r\n  } @case (3) {\r\n  <ion-text class=\"ion-text-center ion-margin\">\r\n    <h3>Parfait ! Saisissez votre nouveau mot de passe</h3>\r\n  </ion-text>\r\n\r\n  <form [formGroup]=\"updatePasswordForm\" (ngSubmit)=\"updatePassword()\">\r\n    <ion-item>\r\n      <ion-input\r\n        fill=\"solid\"\r\n        label=\"Nouveau mot de passe\"\r\n        labelPlacement=\"floating\"\r\n        formControlName=\"newPassword\"\r\n        type=\"password\"\r\n      ></ion-input>\r\n    </ion-item>\r\n    <ion-item>\r\n      <ion-input\r\n        fill=\"solid\"\r\n        label=\"Confirmer le mot de passe\"\r\n        labelPlacement=\"floating\"\r\n        formControlName=\"confirmPassword\"\r\n        type=\"password\"\r\n      ></ion-input>\r\n    </ion-item>\r\n\r\n    <ion-button\r\n      class=\"clovis\"\r\n      expand=\"block\"\r\n      type=\"submit\"\r\n      [disabled]=\"updatePasswordForm.invalid\"\r\n      >Valider</ion-button\r\n    >\r\n  </form>\r\n  } }\r\n</ion-content>\r\n", styles: ["ion-header ion-thumbnail{--size: 32px}ion-header p{font-family:SofiaPro,sans-serif;font-weight:600;font-size:1.1em}ion-text{font-family:SofiaPro,sans-serif}ion-text h3{font-weight:600}ion-text p{font-weight:300}ion-button{margin-top:50px}ion-input{font-family:SofiaPro,sans-serif;font-weight:500;--color: #54565c}\n"], dependencies: [{ kind: "component", type: IonToolbar, selector: "ion-toolbar", inputs: ["color", "mode"] }, { kind: "component", type: IonItem, selector: "ion-item", inputs: ["button", "color", "detail", "detailIcon", "disabled", "download", "href", "lines", "mode", "rel", "routerAnimation", "routerDirection", "target", "type"] }, { kind: "component", type: IonInput, selector: "ion-input", inputs: ["accept", "autocapitalize", "autocomplete", "autocorrect", "autofocus", "clearInput", "clearOnEdit", "color", "counter", "counterFormatter", "debounce", "disabled", "enterkeyhint", "errorText", "fill", "helperText", "inputmode", "label", "labelPlacement", "max", "maxlength", "min", "minlength", "mode", "multiple", "name", "pattern", "placeholder", "readonly", "required", "shape", "size", "spellcheck", "step", "type", "value"] }, { kind: "component", type: IonButton, selector: "ion-button", inputs: ["buttonType", "color", "disabled", "download", "expand", "fill", "form", "href", "mode", "rel", "routerAnimation", "routerDirection", "shape", "size", "strong", "target", "type"] }, { kind: "component", type: IonRow, selector: "ion-row" }, { kind: "component", type: IonText, selector: "ion-text", inputs: ["color", "mode"] }, { kind: "component", type: IonHeader, selector: "ion-header", inputs: ["collapse", "mode", "translucent"] }, { kind: "component", type: IonContent, selector: "ion-content", inputs: ["color", "fixedSlotPlacement", "forceOverscroll", "fullscreen", "scrollEvents", "scrollX", "scrollY"] }, { kind: "component", type: IonThumbnail, selector: "ion-thumbnail" }, { kind: "ngmodule", type: ReactiveFormsModule }, { kind: "directive", type: i1.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { kind: "directive", type: i1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i1.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i1.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i1.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.13", ngImport: i0, type: ForgotPasswordComponent, decorators: [{
            type: Component,
            args: [{ selector: 'clovis-forgot-password', standalone: true, imports: [
                        IonTitle,
                        IonToolbar,
                        IonLabel,
                        IonItem,
                        IonInput,
                        IonButton,
                        IonRow,
                        IonText,
                        IonHeader,
                        IonContent,
                        IonThumbnail,
                        ReactiveFormsModule,
                    ], template: "<ion-header collapse=\"fade\">\r\n  <ion-toolbar>\r\n    <ion-row\r\n      class=\"ion-justify-content-center ion-align-items-center ion-text-center\"\r\n    >\r\n      <ion-thumbnail>\r\n        <img\r\n          alt=\"Enveloppe\"\r\n          src=\"https://res.cloudinary.com/dyewhr2lj/image/upload/v1668516112/Logo_Clovis_fxqyoh.png\"\r\n        />\r\n      </ion-thumbnail>\r\n      <p>clovis</p>\r\n    </ion-row>\r\n  </ion-toolbar>\r\n</ion-header>\r\n\r\n<ion-content class=\"ion-padding\">\r\n  @switch (steps()) { @case (1) {\r\n  <ion-text class=\"ion-text-center ion-margin\">\r\n    <h3>R\u00E9initialisation de votre mot de passe</h3>\r\n    <p>Nous vous enverrons un code de v\u00E9rification \u00E0 votre adresse email</p>\r\n  </ion-text>\r\n  <form [formGroup]=\"emailForm\" (ngSubmit)=\"sendVerificationCode()\">\r\n    <ion-item>\r\n      <ion-input\r\n        fill=\"solid\"\r\n        label=\"Email\"\r\n        labelPlacement=\"floating\"\r\n        formControlName=\"email\"\r\n        type=\"text\"\r\n      ></ion-input>\r\n    </ion-item>\r\n\r\n    <ion-button\r\n      class=\"clovis\"\r\n      [disabled]=\"emailForm.invalid\"\r\n      expand=\"block\"\r\n      type=\"submit\"\r\n      >Envoyer le code de v\u00E9rification</ion-button\r\n    >\r\n  </form>\r\n  } @case (2) {\r\n  <ion-text class=\"ion-text-center ion-margin\">\r\n    <h3>Saisissez le code \u00E0 6 chiffres que vous avec re\u00E7u par email</h3>\r\n  </ion-text>\r\n\r\n  <form [formGroup]=\"codeForm\" (ngSubmit)=\"verifyCode()\">\r\n    <ion-item>\r\n      <ion-input\r\n        fill=\"solid\"\r\n        label=\"Code de s\u00E9curit\u00E9\"\r\n        labelPlacement=\"floating\"\r\n        formControlName=\"code\"\r\n        type=\"password\"\r\n      ></ion-input>\r\n    </ion-item>\r\n\r\n    <ion-button\r\n      class=\"clovis\"\r\n      expand=\"block\"\r\n      type=\"submit\"\r\n      [disabled]=\"codeForm.invalid\"\r\n      >Valider</ion-button\r\n    >\r\n  </form>\r\n  } @case (3) {\r\n  <ion-text class=\"ion-text-center ion-margin\">\r\n    <h3>Parfait ! Saisissez votre nouveau mot de passe</h3>\r\n  </ion-text>\r\n\r\n  <form [formGroup]=\"updatePasswordForm\" (ngSubmit)=\"updatePassword()\">\r\n    <ion-item>\r\n      <ion-input\r\n        fill=\"solid\"\r\n        label=\"Nouveau mot de passe\"\r\n        labelPlacement=\"floating\"\r\n        formControlName=\"newPassword\"\r\n        type=\"password\"\r\n      ></ion-input>\r\n    </ion-item>\r\n    <ion-item>\r\n      <ion-input\r\n        fill=\"solid\"\r\n        label=\"Confirmer le mot de passe\"\r\n        labelPlacement=\"floating\"\r\n        formControlName=\"confirmPassword\"\r\n        type=\"password\"\r\n      ></ion-input>\r\n    </ion-item>\r\n\r\n    <ion-button\r\n      class=\"clovis\"\r\n      expand=\"block\"\r\n      type=\"submit\"\r\n      [disabled]=\"updatePasswordForm.invalid\"\r\n      >Valider</ion-button\r\n    >\r\n  </form>\r\n  } }\r\n</ion-content>\r\n", styles: ["ion-header ion-thumbnail{--size: 32px}ion-header p{font-family:SofiaPro,sans-serif;font-weight:600;font-size:1.1em}ion-text{font-family:SofiaPro,sans-serif}ion-text h3{font-weight:600}ion-text p{font-weight:300}ion-button{margin-top:50px}ion-input{font-family:SofiaPro,sans-serif;font-weight:500;--color: #54565c}\n"] }]
        }] });

export { ForgotPasswordComponent };
//# sourceMappingURL=auth-features-forgot-password.component-CX_ZMDrt.mjs.map
