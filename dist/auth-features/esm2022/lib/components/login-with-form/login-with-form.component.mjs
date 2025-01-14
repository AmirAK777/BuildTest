import { Component, inject } from '@angular/core';
import { AuthenticationApplication } from '../../services/authentication.application';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators, } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { IonButton, IonInput, IonItem, IonList, IonText, } from '@ionic/angular/standalone';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
export class LoginWithFormComponent {
    constructor() {
        this.application = inject(AuthenticationApplication);
        this.loginForm = inject(FormBuilder).group({
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', Validators.required),
        });
    }
    save() {
        if (this.loginForm.value.email && this.loginForm.value.password)
            this.application.login(this.loginForm.value.email, this.loginForm.value.password);
    }
    get email() {
        return this.loginForm.controls.email;
    }
    get password() {
        return this.loginForm.controls.password;
    }
    get isValid() {
        return this.loginForm.valid;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.13", ngImport: i0, type: LoginWithFormComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.2.13", type: LoginWithFormComponent, isStandalone: true, selector: "clovis-login-with-form", ngImport: i0, template: "<form [formGroup]=\"loginForm\" (submit)=\"save()\">\r\n  <ion-list>\r\n    <ion-item>\r\n      <ion-input\r\n        fill=\"solid\"\r\n        label=\"Email\"\r\n        [formControl]=\"email\"\r\n        labelPlacement=\"floating\"\r\n      ></ion-input>\r\n    </ion-item>\r\n    <ion-item>\r\n      <ion-input\r\n        fill=\"solid\"\r\n        label=\"Mot de passe\"\r\n        [formControl]=\"password\"\r\n        labelPlacement=\"floating\"\r\n        type=\"password\"\r\n      ></ion-input>\r\n    </ion-item>\r\n    <div class=\"ion-text-center ion-margin-top\">\r\n      <a routerLink=\"/authenticate/forgot-password\">mot de passe oubli\u00E9</a>\r\n    </div>\r\n  </ion-list>\r\n\r\n  <ion-button class=\"clovis\" type=\"submit\" [disabled]=\"!isValid\" expand=\"block\"\r\n    >Valider</ion-button\r\n  >\r\n</form>\r\n", styles: ["ion-list{margin-bottom:12vh}ion-list ion-item ion-input{font-family:SofiaPro,sans-serif;font-weight:500;--color: #54565c}ion-list a{font-family:SofiaPro,sans-serif;font-weight:500;text-decoration:none}\n"], dependencies: [{ kind: "ngmodule", type: ReactiveFormsModule }, { kind: "directive", type: i1.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { kind: "directive", type: i1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i1.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i1.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { kind: "directive", type: i1.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "info", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "component", type: IonList, selector: "ion-list", inputs: ["inset", "lines", "mode"] }, { kind: "component", type: IonItem, selector: "ion-item", inputs: ["button", "color", "detail", "detailIcon", "disabled", "download", "href", "lines", "mode", "rel", "routerAnimation", "routerDirection", "target", "type"] }, { kind: "component", type: IonInput, selector: "ion-input", inputs: ["accept", "autocapitalize", "autocomplete", "autocorrect", "autofocus", "clearInput", "clearOnEdit", "color", "counter", "counterFormatter", "debounce", "disabled", "enterkeyhint", "errorText", "fill", "helperText", "inputmode", "label", "labelPlacement", "max", "maxlength", "min", "minlength", "mode", "multiple", "name", "pattern", "placeholder", "readonly", "required", "shape", "size", "spellcheck", "step", "type", "value"] }, { kind: "component", type: IonButton, selector: "ion-button", inputs: ["buttonType", "color", "disabled", "download", "expand", "fill", "form", "href", "mode", "rel", "routerAnimation", "routerDirection", "shape", "size", "strong", "target", "type"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.13", ngImport: i0, type: LoginWithFormComponent, decorators: [{
            type: Component,
            args: [{ selector: 'clovis-login-with-form', standalone: true, imports: [
                        IonText,
                        ReactiveFormsModule,
                        RouterLink,
                        IonList,
                        IonItem,
                        IonInput,
                        IonButton,
                    ], template: "<form [formGroup]=\"loginForm\" (submit)=\"save()\">\r\n  <ion-list>\r\n    <ion-item>\r\n      <ion-input\r\n        fill=\"solid\"\r\n        label=\"Email\"\r\n        [formControl]=\"email\"\r\n        labelPlacement=\"floating\"\r\n      ></ion-input>\r\n    </ion-item>\r\n    <ion-item>\r\n      <ion-input\r\n        fill=\"solid\"\r\n        label=\"Mot de passe\"\r\n        [formControl]=\"password\"\r\n        labelPlacement=\"floating\"\r\n        type=\"password\"\r\n      ></ion-input>\r\n    </ion-item>\r\n    <div class=\"ion-text-center ion-margin-top\">\r\n      <a routerLink=\"/authenticate/forgot-password\">mot de passe oubli\u00E9</a>\r\n    </div>\r\n  </ion-list>\r\n\r\n  <ion-button class=\"clovis\" type=\"submit\" [disabled]=\"!isValid\" expand=\"block\"\r\n    >Valider</ion-button\r\n  >\r\n</form>\r\n", styles: ["ion-list{margin-bottom:12vh}ion-list ion-item ion-input{font-family:SofiaPro,sans-serif;font-weight:500;--color: #54565c}ion-list a{font-family:SofiaPro,sans-serif;font-weight:500;text-decoration:none}\n"] }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4td2l0aC1mb3JtLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2F1dGgtZmVhdHVyZXMvc3JjL2xpYi9jb21wb25lbnRzL2xvZ2luLXdpdGgtZm9ybS9sb2dpbi13aXRoLWZvcm0uY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvYXV0aC1mZWF0dXJlcy9zcmMvbGliL2NvbXBvbmVudHMvbG9naW4td2l0aC1mb3JtL2xvZ2luLXdpdGgtZm9ybS5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNsRCxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUN0RixPQUFPLEVBQ0wsV0FBVyxFQUNYLFdBQVcsRUFDWCxtQkFBbUIsRUFDbkIsVUFBVSxHQUNYLE1BQU0sZ0JBQWdCLENBQUM7QUFDeEIsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFDTCxTQUFTLEVBQ1QsUUFBUSxFQUNSLE9BQU8sRUFDUCxPQUFPLEVBQ1AsT0FBTyxHQUNSLE1BQU0sMkJBQTJCLENBQUM7OztBQWlCbkMsTUFBTSxPQUFPLHNCQUFzQjtJQWZuQztRQWdCbUIsZ0JBQVcsR0FBRyxNQUFNLENBQUMseUJBQXlCLENBQUMsQ0FBQztRQUVqRSxjQUFTLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDLEtBQUssQ0FBQztZQUNwQyxLQUFLLEVBQUUsSUFBSSxXQUFXLENBQUMsRUFBRSxFQUFFLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDbkUsUUFBUSxFQUFFLElBQUksV0FBVyxDQUFDLEVBQUUsRUFBRSxVQUFVLENBQUMsUUFBUSxDQUFDO1NBQ25ELENBQUMsQ0FBQztLQW9CSjtJQWxCQyxJQUFJO1FBQ0YsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsUUFBUTtZQUM3RCxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FDcEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUMxQixJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQzlCLENBQUM7SUFDTixDQUFDO0lBRUQsSUFBSSxLQUFLO1FBQ1AsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUM7SUFDdkMsQ0FBQztJQUNELElBQUksUUFBUTtRQUNWLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDO0lBQzFDLENBQUM7SUFFRCxJQUFJLE9BQU87UUFDVCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDO0lBQzlCLENBQUM7K0dBekJVLHNCQUFzQjttR0FBdEIsc0JBQXNCLGtGQ2hDbkMsdTBCQTRCQSxvUUROSSxtQkFBbUIsZ3RCQUNuQixVQUFVLG9PQUNWLE9BQU8seUZBQ1AsT0FBTywwTkFDUCxRQUFRLDhlQUNSLFNBQVM7OzRGQUtBLHNCQUFzQjtrQkFmbEMsU0FBUzsrQkFDRSx3QkFBd0IsY0FDdEIsSUFBSSxXQUNQO3dCQUNQLE9BQU87d0JBQ1AsbUJBQW1CO3dCQUNuQixVQUFVO3dCQUNWLE9BQU87d0JBQ1AsT0FBTzt3QkFDUCxRQUFRO3dCQUNSLFNBQVM7cUJBQ1YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIGluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBBdXRoZW50aWNhdGlvbkFwcGxpY2F0aW9uIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvYXV0aGVudGljYXRpb24uYXBwbGljYXRpb24nO1xyXG5pbXBvcnQge1xyXG4gIEZvcm1CdWlsZGVyLFxyXG4gIEZvcm1Db250cm9sLFxyXG4gIFJlYWN0aXZlRm9ybXNNb2R1bGUsXHJcbiAgVmFsaWRhdG9ycyxcclxufSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IFJvdXRlckxpbmsgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQge1xyXG4gIElvbkJ1dHRvbixcclxuICBJb25JbnB1dCxcclxuICBJb25JdGVtLFxyXG4gIElvbkxpc3QsXHJcbiAgSW9uVGV4dCxcclxufSBmcm9tICdAaW9uaWMvYW5ndWxhci9zdGFuZGFsb25lJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnY2xvdmlzLWxvZ2luLXdpdGgtZm9ybScsXHJcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcclxuICBpbXBvcnRzOiBbXHJcbiAgICBJb25UZXh0LFxyXG4gICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcclxuICAgIFJvdXRlckxpbmssXHJcbiAgICBJb25MaXN0LFxyXG4gICAgSW9uSXRlbSxcclxuICAgIElvbklucHV0LFxyXG4gICAgSW9uQnV0dG9uLFxyXG4gIF0sXHJcbiAgdGVtcGxhdGVVcmw6ICcuL2xvZ2luLXdpdGgtZm9ybS5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmw6ICcuL2xvZ2luLXdpdGgtZm9ybS5jb21wb25lbnQuc2NzcycsXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBMb2dpbldpdGhGb3JtQ29tcG9uZW50IHtcclxuICBwcml2YXRlIHJlYWRvbmx5IGFwcGxpY2F0aW9uID0gaW5qZWN0KEF1dGhlbnRpY2F0aW9uQXBwbGljYXRpb24pO1xyXG5cclxuICBsb2dpbkZvcm0gPSBpbmplY3QoRm9ybUJ1aWxkZXIpLmdyb3VwKHtcclxuICAgIGVtYWlsOiBuZXcgRm9ybUNvbnRyb2woJycsIFtWYWxpZGF0b3JzLnJlcXVpcmVkLCBWYWxpZGF0b3JzLmVtYWlsXSksXHJcbiAgICBwYXNzd29yZDogbmV3IEZvcm1Db250cm9sKCcnLCBWYWxpZGF0b3JzLnJlcXVpcmVkKSxcclxuICB9KTtcclxuXHJcbiAgc2F2ZSgpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLmxvZ2luRm9ybS52YWx1ZS5lbWFpbCAmJiB0aGlzLmxvZ2luRm9ybS52YWx1ZS5wYXNzd29yZClcclxuICAgICAgdGhpcy5hcHBsaWNhdGlvbi5sb2dpbihcclxuICAgICAgICB0aGlzLmxvZ2luRm9ybS52YWx1ZS5lbWFpbCxcclxuICAgICAgICB0aGlzLmxvZ2luRm9ybS52YWx1ZS5wYXNzd29yZFxyXG4gICAgICApO1xyXG4gIH1cclxuXHJcbiAgZ2V0IGVtYWlsKCk6IEZvcm1Db250cm9sIHtcclxuICAgIHJldHVybiB0aGlzLmxvZ2luRm9ybS5jb250cm9scy5lbWFpbDtcclxuICB9XHJcbiAgZ2V0IHBhc3N3b3JkKCk6IEZvcm1Db250cm9sIHtcclxuICAgIHJldHVybiB0aGlzLmxvZ2luRm9ybS5jb250cm9scy5wYXNzd29yZDtcclxuICB9XHJcblxyXG4gIGdldCBpc1ZhbGlkKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMubG9naW5Gb3JtLnZhbGlkO1xyXG4gIH1cclxufVxyXG4iLCI8Zm9ybSBbZm9ybUdyb3VwXT1cImxvZ2luRm9ybVwiIChzdWJtaXQpPVwic2F2ZSgpXCI+XHJcbiAgPGlvbi1saXN0PlxyXG4gICAgPGlvbi1pdGVtPlxyXG4gICAgICA8aW9uLWlucHV0XHJcbiAgICAgICAgZmlsbD1cInNvbGlkXCJcclxuICAgICAgICBsYWJlbD1cIkVtYWlsXCJcclxuICAgICAgICBbZm9ybUNvbnRyb2xdPVwiZW1haWxcIlxyXG4gICAgICAgIGxhYmVsUGxhY2VtZW50PVwiZmxvYXRpbmdcIlxyXG4gICAgICA+PC9pb24taW5wdXQ+XHJcbiAgICA8L2lvbi1pdGVtPlxyXG4gICAgPGlvbi1pdGVtPlxyXG4gICAgICA8aW9uLWlucHV0XHJcbiAgICAgICAgZmlsbD1cInNvbGlkXCJcclxuICAgICAgICBsYWJlbD1cIk1vdCBkZSBwYXNzZVwiXHJcbiAgICAgICAgW2Zvcm1Db250cm9sXT1cInBhc3N3b3JkXCJcclxuICAgICAgICBsYWJlbFBsYWNlbWVudD1cImZsb2F0aW5nXCJcclxuICAgICAgICB0eXBlPVwicGFzc3dvcmRcIlxyXG4gICAgICA+PC9pb24taW5wdXQ+XHJcbiAgICA8L2lvbi1pdGVtPlxyXG4gICAgPGRpdiBjbGFzcz1cImlvbi10ZXh0LWNlbnRlciBpb24tbWFyZ2luLXRvcFwiPlxyXG4gICAgICA8YSByb3V0ZXJMaW5rPVwiL2F1dGhlbnRpY2F0ZS9mb3Jnb3QtcGFzc3dvcmRcIj5tb3QgZGUgcGFzc2Ugb3VibGnDqTwvYT5cclxuICAgIDwvZGl2PlxyXG4gIDwvaW9uLWxpc3Q+XHJcblxyXG4gIDxpb24tYnV0dG9uIGNsYXNzPVwiY2xvdmlzXCIgdHlwZT1cInN1Ym1pdFwiIFtkaXNhYmxlZF09XCIhaXNWYWxpZFwiIGV4cGFuZD1cImJsb2NrXCJcclxuICAgID5WYWxpZGVyPC9pb24tYnV0dG9uXHJcbiAgPlxyXG48L2Zvcm0+XHJcbiJdfQ==