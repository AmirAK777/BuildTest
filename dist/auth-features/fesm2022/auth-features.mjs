import * as i0 from '@angular/core';
import { inject, Injectable, computed, effect, Component, output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { signalStore, withState, withComputed, withMethods, patchState, withHooks, getState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { shareReplay, from, switchMap, BehaviorSubject, of, pipe, tap, concatMap, map, catchError, throwError } from 'rxjs';
import { tapResponse } from '@ngrx/operators';
import { Storage } from '@ionic/storage-angular';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { ToastController, NavController, IonList, IonItem, IonInput, IonButton, IonText, IonHeader, IonToolbar, IonRow, IonContent, IonThumbnail, IonBackButton } from '@ionic/angular/standalone';
import { delay } from 'rxjs/operators';
import { addIcons } from 'ionicons';
import { checkmarkCircleOutline, alertCircleOutline } from 'ionicons/icons';
import * as i1 from '@angular/forms';
import { FormBuilder, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { jwtDecode } from 'jwt-decode';

class LocalStorageAuthenticationInfrastructure {
    constructor() {
        this._storageInitialised = false;
        this._storage = inject(Storage);
    }
    async startSession(user) {
        if (!this._storageInitialised)
            await this._storage.create();
        if (user.access_token && user.refresh_token) {
            this._storage?.set('access_token', user.access_token);
            this._storage?.set('refresh_token', user.refresh_token);
        }
    }
    async getSession() {
        if (!this._storageInitialised)
            await this._storage.create();
        return {
            access_token: await this._storage?.get('access_token'),
            refresh_token: await this._storage?.get('refresh_token'),
        };
    }
    async get(key) {
        if (!this._storageInitialised)
            await this._storage.create();
        const value = await this._storage.get(key);
        return value;
    }
    async set(key, value) {
        if (!this._storageInitialised)
            await this._storage.create();
        return this._storage.set(key, value);
    }
    async remove(key) {
        if (!this._storageInitialised)
            await this._storage.create();
        return this._storage.remove(key);
    }
    async endSession() {
        await this._storage.clear();
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.13", ngImport: i0, type: LocalStorageAuthenticationInfrastructure, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.13", ngImport: i0, type: LocalStorageAuthenticationInfrastructure, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.13", ngImport: i0, type: LocalStorageAuthenticationInfrastructure, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });

class AuthenticationInfrastructure {
    constructor() {
        this.apiKeyCloakUrl = 'http://192.168.1.38:8080';
        this._httpClient = inject(HttpClient);
        this.storage = inject(Storage);
    }
    login(email, password) {
        const body = new HttpParams()
            .set('grant_type', 'password')
            .set('client_id', 'clovis-public-client')
            .set('scope', 'email openid')
            .set('username', email)
            .set('password', password);
        const headers = new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded',
        });
        return this._httpClient
            .post(`${this.apiKeyCloakUrl}/realms/clovis/protocol/openid-connect/token/`, body.toString(), { headers })
            .pipe(shareReplay(1));
    }
    refreshToken() {
        return from(this.storage.get('refresh_token')).pipe(switchMap(storedRefreshToken => {
            const body = new HttpParams()
                .set('grant_type', 'refresh_token')
                .set('client_id', 'clovis-public-client')
                .set('refresh_token', storedRefreshToken);
            const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
            return this._httpClient
                .post(`${this.apiKeyCloakUrl}/realms/clovis/protocol/openid-connect/token/`, body, { headers })
                .pipe(shareReplay(1));
        }));
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.13", ngImport: i0, type: AuthenticationInfrastructure, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.13", ngImport: i0, type: AuthenticationInfrastructure, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.13", ngImport: i0, type: AuthenticationInfrastructure, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });

// password-reset.service.ts
class PasswordResetService {
    constructor() {
        this.resetCodeSubject = new BehaviorSubject(null);
        this.resetCode$ = this.resetCodeSubject.asObservable();
    }
    // Méthode pour simuler l'envoi d'un email avec le code de réinitialisation
    sendResetCode(email) {
        const generatedCode = this.generateResetCode();
        console.log(`Sending reset code ${generatedCode} to ${email}`); // Simule l'envoi de l'email
        this.resetCodeSubject.next(generatedCode);
        // Retourne un Observable avec un délai simulé pour l'envoi de l'email
        return of(`Reset code sent to ${email}: ${generatedCode}`).pipe(delay(1000)); // Simule un délai d'1 seconde
    }
    // Générer un code de réinitialisation aléatoire (simple exemple)
    generateResetCode() {
        return Math.floor(100000 + Math.random() * 900000).toString();
    }
    // Vérifier si le code entré est correct
    verifyResetCode(codeEntered) {
        const validCode = this.resetCodeSubject.value;
        if (validCode && codeEntered === validCode) {
            console.log('Reset code is valid');
            return of('Reset code is valid').pipe(delay(500)); // Retourne un Observable avec un message
        }
        else {
            console.log('Invalid reset code');
            return of('Invalid reset code. Please try again.').pipe(delay(500)); // Retourne un message d'erreur
        }
    }
    // Mettre à jour le mot de passe si le code est valide
    updatePassword(newPassword) {
        const validCode = this.resetCodeSubject.value;
        if (validCode) {
            console.log(`Password updated to: ${newPassword}`);
            this.resetCodeSubject.next(null); // Reset le code après utilisation
            return of('Password updated successfully').pipe(delay(500)); // Retourne un message de succès
        }
        else {
            console.log('No valid reset code found');
            return of('Failed to update password. Invalid reset code.').pipe(delay(500)); // Message d'erreur
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.13", ngImport: i0, type: PasswordResetService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.13", ngImport: i0, type: PasswordResetService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.13", ngImport: i0, type: PasswordResetService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });

class ToasterService {
    constructor() {
        this._toastController = inject(ToastController);
        addIcons({ checkmarkCircleOutline, alertCircleOutline });
    }
    async presentToastWithOptions(message, icon, color) {
        const toast = await this._toastController.create({
            message: message,
            duration: 2500,
            position: 'bottom',
            icon: icon,
            color: color,
        });
        await toast.present();
    }
    success(message) {
        this.presentToastWithOptions(message, checkmarkCircleOutline, 'primary');
    }
    warning(message) {
        this.presentToastWithOptions(message, alertCircleOutline, 'warning');
    }
    error(message) {
        this.presentToastWithOptions(message, alertCircleOutline, 'danger');
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.13", ngImport: i0, type: ToasterService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.13", ngImport: i0, type: ToasterService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.13", ngImport: i0, type: ToasterService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: () => [] });

const initialValue = {
    token: null,
    isLoading: false,
    isAuthenticated: false,
    steps: 1,
};
const AuthenticationStore = signalStore({ providedIn: 'root' }, withState(initialValue), withComputed((store) => ({
    isLogged: computed(() => store.isAuthenticated()),
    isNotLogged: computed(() => !store.token() || !store.isAuthenticated()),
})), withMethods((store, infra = inject(AuthenticationInfrastructure), forgotPassService = inject(PasswordResetService), localInfra = inject(LocalStorageAuthenticationInfrastructure), navController = inject(NavController), toasterService = inject(ToasterService)) => ({
    localLogin(token) {
        if (token.access_token && token.refresh_token) {
            patchState(store, {
                isAuthenticated: true,
                token: {
                    access_token: token.access_token,
                    expires_in: 0,
                    refresh_expires_in: 0,
                    refresh_token: token.refresh_token,
                },
            });
        }
    },
    logIn: rxMethod(pipe(tap(() => patchState(store, { isLoading: true })), concatMap((input) => {
        return infra.login(input.login, input.password).pipe(map((tokenResponse) => {
            return {
                access_token: tokenResponse.access_token,
                expires_in: tokenResponse.expires_in,
                refresh_expires_in: tokenResponse.refresh_expires_in,
                refresh_token: tokenResponse.refresh_token,
            };
        }), tap((token) => localInfra.startSession({
            access_token: token.access_token,
            refresh_token: token.refresh_token,
        })), tapResponse({
            next: (token) => {
                patchState(store, {
                    isLoading: false,
                    isAuthenticated: true,
                    token,
                });
                toasterService.success('Bienvenue sur votre espace personnel.');
            },
            error: () => {
                patchState(store, { isLoading: false });
                toasterService.error("Échec de l'authentification. Veuillez vérifier vos identifiants.");
            },
        }));
    }))),
    sendResetCode: rxMethod(pipe(tap(() => patchState(store, { isLoading: true })), concatMap((input) => {
        return forgotPassService.sendResetCode(input).pipe(tapResponse({
            next: (message) => {
                patchState(store, {
                    isLoading: false,
                    steps: 2,
                });
            },
            error: () => {
                patchState(store, { isLoading: false, steps: 2 });
            },
        }));
    }))),
    verifyResetCode: rxMethod(pipe(tap(() => patchState(store, { isLoading: true })), concatMap((input) => {
        return forgotPassService.verifyResetCode(input).pipe(tapResponse({
            next: (message) => {
                patchState(store, {
                    isLoading: false,
                    steps: 3,
                });
            },
            error: () => {
                patchState(store, { isLoading: false });
            },
        }));
    }))),
    updatePassword: rxMethod(pipe(tap(() => patchState(store, { isLoading: true })), concatMap((input) => {
        return forgotPassService.updatePassword(input).pipe(tapResponse({
            next: (message) => {
                patchState(store, {
                    isLoading: false,
                    steps: 3,
                });
            },
            error: () => {
                patchState(store, { isLoading: false });
            },
        }));
    }))),
    logout: async () => {
        patchState(store, {
            token: null,
            isLoading: false,
            isAuthenticated: false,
        });
        localInfra.endSession().then(() => {
            navController.navigateRoot('authenticate/login', {
                animated: false,
            });
        });
    },
})), withHooks({
    onInit(store, localInfra = inject(LocalStorageAuthenticationInfrastructure)) {
        effect(() => {
            const state = getState(store);
            console.info('counter state: ', state);
        });
        localInfra.getSession().then((token) => {
            if (token) {
                store.localLogin(token);
            }
        });
    },
}));

class AuthenticationApplication {
    constructor() {
        this.store = inject(AuthenticationStore);
        this.router = inject(Router);
    }
    login(login, password) {
        this.store.logIn({ login, password });
    }
    logout() {
        this.store.logout();
    }
    get isLoading() {
        return this.store.isLoading;
    }
    get isAuthenticated() {
        return this.store.isLogged;
    }
    get token() {
        return this.store.token;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.13", ngImport: i0, type: AuthenticationApplication, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.13", ngImport: i0, type: AuthenticationApplication, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.13", ngImport: i0, type: AuthenticationApplication, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });

const userisAuthenticated = (route, state, application = inject(AuthenticationApplication), router = inject(Router)) => {
    if (!application.isAuthenticated()) {
        router.navigate(['authenticate/login']);
    }
    return application.isAuthenticated();
};

class LoginWithFormComponent {
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

class LoginComponent {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.13", ngImport: i0, type: LoginComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.2.13", type: LoginComponent, isStandalone: true, selector: "clovis-login", ngImport: i0, template: "<ion-header collapse=\"fade\">\r\n  <ion-toolbar>\r\n    <ion-row\r\n      class=\"ion-justify-content-center ion-align-items-center ion-text-center\"\r\n    >\r\n      <ion-thumbnail>\r\n        <img\r\n          alt=\"Enveloppe\"\r\n          src=\"https://res.cloudinary.com/dyewhr2lj/image/upload/v1668516112/Logo_Clovis_fxqyoh.png\"\r\n        />\r\n      </ion-thumbnail>\r\n      <p>clovis</p>\r\n    </ion-row>\r\n  </ion-toolbar>\r\n</ion-header>\r\n\r\n<ion-content class=\"ion-padding\">\r\n  <ion-text class=\"ion-text-center ion-margin\">\r\n    <h3>Bienvenue chez Clovis !</h3>\r\n    <p>Saisissez vos identifiants pour acc\u00E9der \u00E0 votre espace</p>\r\n  </ion-text>\r\n\r\n  <clovis-login-with-form></clovis-login-with-form>\r\n</ion-content>\r\n", styles: ["ion-header ion-thumbnail{--size: 32px}ion-header p{font-family:SofiaPro,sans-serif;font-weight:600;font-size:1.1em}ion-text{font-family:SofiaPro,sans-serif}ion-text h3{font-weight:600}ion-text p{font-weight:300}\n"], dependencies: [{ kind: "component", type: IonHeader, selector: "ion-header", inputs: ["collapse", "mode", "translucent"] }, { kind: "component", type: IonToolbar, selector: "ion-toolbar", inputs: ["color", "mode"] }, { kind: "component", type: IonRow, selector: "ion-row" }, { kind: "component", type: IonText, selector: "ion-text", inputs: ["color", "mode"] }, { kind: "component", type: IonContent, selector: "ion-content", inputs: ["color", "fixedSlotPlacement", "forceOverscroll", "fullscreen", "scrollEvents", "scrollX", "scrollY"] }, { kind: "component", type: LoginWithFormComponent, selector: "clovis-login-with-form" }, { kind: "component", type: IonThumbnail, selector: "ion-thumbnail" }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.13", ngImport: i0, type: LoginComponent, decorators: [{
            type: Component,
            args: [{ selector: 'clovis-login', standalone: true, imports: [
                        IonHeader,
                        IonBackButton,
                        IonToolbar,
                        IonRow,
                        IonText,
                        IonContent,
                        LoginWithFormComponent,
                        IonThumbnail
                    ], template: "<ion-header collapse=\"fade\">\r\n  <ion-toolbar>\r\n    <ion-row\r\n      class=\"ion-justify-content-center ion-align-items-center ion-text-center\"\r\n    >\r\n      <ion-thumbnail>\r\n        <img\r\n          alt=\"Enveloppe\"\r\n          src=\"https://res.cloudinary.com/dyewhr2lj/image/upload/v1668516112/Logo_Clovis_fxqyoh.png\"\r\n        />\r\n      </ion-thumbnail>\r\n      <p>clovis</p>\r\n    </ion-row>\r\n  </ion-toolbar>\r\n</ion-header>\r\n\r\n<ion-content class=\"ion-padding\">\r\n  <ion-text class=\"ion-text-center ion-margin\">\r\n    <h3>Bienvenue chez Clovis !</h3>\r\n    <p>Saisissez vos identifiants pour acc\u00E9der \u00E0 votre espace</p>\r\n  </ion-text>\r\n\r\n  <clovis-login-with-form></clovis-login-with-form>\r\n</ion-content>\r\n", styles: ["ion-header ion-thumbnail{--size: 32px}ion-header p{font-family:SofiaPro,sans-serif;font-weight:600;font-size:1.1em}ion-text{font-family:SofiaPro,sans-serif}ion-text h3{font-weight:600}ion-text p{font-weight:300}\n"] }]
        }] });

const authenticationRoutes = [
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'forgot-password',
        loadComponent: () => import('./auth-features-forgot-password.component-CX_ZMDrt.mjs').then((m) => m.ForgotPasswordComponent),
    },
    { path: '**', redirectTo: '/login' },
];

function jwtInterceptor(request, next) {
    const storage = inject(Storage);
    return from(storage.get('access_token')).pipe(switchMap((token) => {
        const newRequest = request.clone({
            setHeaders: {
                Authorization: 'Bearer ' + token,
            },
        });
        return next(newRequest);
    }));
}
const refreshInterceptor = (req, next) => {
    const authInfra = inject(AuthenticationInfrastructure);
    const localStorage = inject(LocalStorageAuthenticationInfrastructure);
    const authApp = inject(AuthenticationApplication);
    return next(req).pipe(catchError((error) => {
        if (error.status === 401 || error.status === 0) {
            return authInfra.refreshToken().pipe(switchMap((tokenResponse) => {
                localStorage.startSession({
                    access_token: tokenResponse.access_token,
                    refresh_token: tokenResponse.refresh_token,
                });
                const newAuthReq = req.clone({
                    headers: req.headers.set('Authorization', `Bearer ${tokenResponse.access_token}`),
                });
                console.error('Error refreshing token update');
                return next(newAuthReq);
            }), catchError((refreshError) => {
                console.error('Un erreur est survenu', refreshError);
                authApp.logout();
                return throwError(() => new Error('Token refresh failed!'));
            }));
        }
        else {
            return throwError(() => error);
        }
    }));
};

class InscriptionFormComponent {
    constructor() {
        this.registerForm = inject(FormBuilder).group({
            firstName: [null, [Validators.required]],
            lastName: [null, [Validators.required]],
            email: ['', [Validators.required]],
            phoneNumber: ['', [Validators.required]],
            zipCode: ['', [Validators.required]],
            rgpdChecked: [false, Validators.requiredTrue]
        });
        this.requestToSave = output();
    }
    saveToParent() {
        const customer = this.registerForm.value;
        this.requestToSave.emit(customer);
        console.info(customer);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.13", ngImport: i0, type: InscriptionFormComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.2.13", type: InscriptionFormComponent, isStandalone: true, selector: "clovis-inscription-form", outputs: { requestToSave: "requestToSave" }, ngImport: i0, template: "<div class=\"form-container\">\r\n    <form class=\"form-register\" [formGroup]=\"registerForm\" (ngSubmit)=\"saveToParent()\">\r\n        <div class=\"form-item\">\r\n            <input type=\"text\" id=\"firstName\" name=\"firstName\" formControlName=\"firstName\" required>\r\n            <label for=\"firstName\">Username</label>\r\n        </div>\r\n        <div class=\"form-item\">\r\n            <input name=\"lastName\" id=\"lastName\" formControlName=\"lastName\" required>\r\n            <label for=\"lastName\">Last Name</label>\r\n        </div>\r\n        <div class=\"form-item\">\r\n            <input name=\"email\" id=\"email\" formControlName=\"email\" required>\r\n            <label for=\"email\">Email</label>\r\n        </div>\r\n        <div class=\"form-item\">\r\n            <input name=\"phoneNumber\" id=\"phoneNumber\" formControlName=\"phoneNumber\" required>\r\n            <label for=\"phoneNumber\">Phone Number</label>\r\n        </div>\r\n        <div class=\"form-item\">\r\n            <input name=\"zipCode\" id=\"zipCode\" formControlName=\"zipCode\" required>\r\n            <label for=\"zipCode\">Zip Code</label>\r\n        </div>\r\n        <div class=\"form-check\">\r\n            <input class=\"checkbox\" type=\"checkbox\" formControlName=\"rgpdChecked\">\r\n            <label for=\"acceptTerms\" class=\"form-check-label\">J\u2019accepte que CARE SAS collecte mes donn\u00E9es personnelles\r\n                aux fins\r\n                de pouvoir me contacter (par email et t\u00E9l\u00E9phone) pour m\u2019aider \u00E0\r\n                optimiser ma situation fiscale et financi\u00E8re.</label>\r\n        </div>\r\n        <div class=\"images-trust\">\r\n            <img src=\"https://res.cloudinary.com/dyewhr2lj/image/upload/v1615905954/Signature%20Email/trust_credential_bldu39.png\"\r\n                alt=\"TRUST\">\r\n        </div>\r\n        <div class=\"images-rgpd\">\r\n            <img src=\"https://res.cloudinary.com/dyewhr2lj/image/upload/v1720877304/Ic%C3%B4nes%20et%20illustrations/icons%20survey/CNIL.jpg\"\r\n                alt=\"CNIL\">\r\n            <img src=\"https://res.cloudinary.com/dyewhr2lj/image/upload/v1720877304/Ic%C3%B4nes%20et%20illustrations/icons%20survey/RGPD.png\"\r\n                alt=\"RGPD\">\r\n        </div>\r\n        <div class=\"terms\">\r\n            <p>Nous respectons la confidentialit\u00E9 et la s\u00E9curit\u00E9 de vos donn\u00E9es</p>\r\n            <p>En cliquant sur \u00AB\u00A0Acc\u00E9der \u00E0 mon r\u00E9sultat\u00A0\u00BB, je reconnais avoir pris connaissance et accept\u00E9 les\r\n                conditions g\u00E9n\u00E9rales.\r\n                Les donn\u00E9es personnelles communiqu\u00E9es sont uniquement utilis\u00E9es pour permettre l\u2019utilisation des\r\n                services Clovis.\r\n                Pour plus d\u2019informations, consultez notre charte de confidentialit\u00E9.</p>\r\n        </div>\r\n        <div class=\"button\">\r\n            <button class=\"clovis-big-blue-button\" type=\"submit\" [disabled]=\"!registerForm.valid\">Submit</button>\r\n        </div>\r\n    </form>\r\n\r\n</div>", styles: [".form-container{display:flex;flex-direction:column;justify-content:center}.form-register{display:flex;flex-direction:column;justify-content:center;align-items:center;margin:1em}.form-item{position:relative;margin-bottom:.8em}.form-item input{display:block;width:25em;height:2.5em;background:transparent;border:solid .1em #ccc;transition:all .3s ease;padding:0 1em}.form-item input:focus{border-color:#4b61fc}.form-item label{position:absolute;cursor:text;z-index:2;top:.8em;left:.8em;font-size:.75em;font-weight:700;background:#fff;padding:0 .6em;color:#999;transition:all .3s ease}.form-item input:focus+label,.form-item input:valid+label{font-size:.7em;top:-.3em}.form-check{display:flex;flex-direction:row;align-items:center;text-align:center;font-size:12px;font-weight:500;line-height:1.22;color:#182a4e}.checkbox{width:1.5em;height:1.5em;display:flex;align-items:center}.images-rgpd{display:flex;margin:.5em;flex-wrap:wrap;justify-content:center}.images-rgpd img{border:solid 2px #f8f8f8;border-radius:50%;box-shadow:0 0 5px .5px #00000052;width:16%;margin:.2em}.images-rgpd p{width:50%}.images-trust{display:flex;flex-direction:column;justify-content:center;align-items:center;margin:.5em}.images-trust img{width:50%}.terms{display:flex;flex-direction:column;text-align:center;width:50%}.terms p{font-size:6px;color:#ababab}.button{width:80%}\n"], dependencies: [{ kind: "ngmodule", type: ReactiveFormsModule }, { kind: "directive", type: i1.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { kind: "directive", type: i1.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i1.CheckboxControlValueAccessor, selector: "input[type=checkbox][formControlName],input[type=checkbox][formControl],input[type=checkbox][ngModel]" }, { kind: "directive", type: i1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i1.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i1.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { kind: "directive", type: i1.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i1.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.13", ngImport: i0, type: InscriptionFormComponent, decorators: [{
            type: Component,
            args: [{ selector: 'clovis-inscription-form', standalone: true, imports: [ReactiveFormsModule], template: "<div class=\"form-container\">\r\n    <form class=\"form-register\" [formGroup]=\"registerForm\" (ngSubmit)=\"saveToParent()\">\r\n        <div class=\"form-item\">\r\n            <input type=\"text\" id=\"firstName\" name=\"firstName\" formControlName=\"firstName\" required>\r\n            <label for=\"firstName\">Username</label>\r\n        </div>\r\n        <div class=\"form-item\">\r\n            <input name=\"lastName\" id=\"lastName\" formControlName=\"lastName\" required>\r\n            <label for=\"lastName\">Last Name</label>\r\n        </div>\r\n        <div class=\"form-item\">\r\n            <input name=\"email\" id=\"email\" formControlName=\"email\" required>\r\n            <label for=\"email\">Email</label>\r\n        </div>\r\n        <div class=\"form-item\">\r\n            <input name=\"phoneNumber\" id=\"phoneNumber\" formControlName=\"phoneNumber\" required>\r\n            <label for=\"phoneNumber\">Phone Number</label>\r\n        </div>\r\n        <div class=\"form-item\">\r\n            <input name=\"zipCode\" id=\"zipCode\" formControlName=\"zipCode\" required>\r\n            <label for=\"zipCode\">Zip Code</label>\r\n        </div>\r\n        <div class=\"form-check\">\r\n            <input class=\"checkbox\" type=\"checkbox\" formControlName=\"rgpdChecked\">\r\n            <label for=\"acceptTerms\" class=\"form-check-label\">J\u2019accepte que CARE SAS collecte mes donn\u00E9es personnelles\r\n                aux fins\r\n                de pouvoir me contacter (par email et t\u00E9l\u00E9phone) pour m\u2019aider \u00E0\r\n                optimiser ma situation fiscale et financi\u00E8re.</label>\r\n        </div>\r\n        <div class=\"images-trust\">\r\n            <img src=\"https://res.cloudinary.com/dyewhr2lj/image/upload/v1615905954/Signature%20Email/trust_credential_bldu39.png\"\r\n                alt=\"TRUST\">\r\n        </div>\r\n        <div class=\"images-rgpd\">\r\n            <img src=\"https://res.cloudinary.com/dyewhr2lj/image/upload/v1720877304/Ic%C3%B4nes%20et%20illustrations/icons%20survey/CNIL.jpg\"\r\n                alt=\"CNIL\">\r\n            <img src=\"https://res.cloudinary.com/dyewhr2lj/image/upload/v1720877304/Ic%C3%B4nes%20et%20illustrations/icons%20survey/RGPD.png\"\r\n                alt=\"RGPD\">\r\n        </div>\r\n        <div class=\"terms\">\r\n            <p>Nous respectons la confidentialit\u00E9 et la s\u00E9curit\u00E9 de vos donn\u00E9es</p>\r\n            <p>En cliquant sur \u00AB\u00A0Acc\u00E9der \u00E0 mon r\u00E9sultat\u00A0\u00BB, je reconnais avoir pris connaissance et accept\u00E9 les\r\n                conditions g\u00E9n\u00E9rales.\r\n                Les donn\u00E9es personnelles communiqu\u00E9es sont uniquement utilis\u00E9es pour permettre l\u2019utilisation des\r\n                services Clovis.\r\n                Pour plus d\u2019informations, consultez notre charte de confidentialit\u00E9.</p>\r\n        </div>\r\n        <div class=\"button\">\r\n            <button class=\"clovis-big-blue-button\" type=\"submit\" [disabled]=\"!registerForm.valid\">Submit</button>\r\n        </div>\r\n    </form>\r\n\r\n</div>", styles: [".form-container{display:flex;flex-direction:column;justify-content:center}.form-register{display:flex;flex-direction:column;justify-content:center;align-items:center;margin:1em}.form-item{position:relative;margin-bottom:.8em}.form-item input{display:block;width:25em;height:2.5em;background:transparent;border:solid .1em #ccc;transition:all .3s ease;padding:0 1em}.form-item input:focus{border-color:#4b61fc}.form-item label{position:absolute;cursor:text;z-index:2;top:.8em;left:.8em;font-size:.75em;font-weight:700;background:#fff;padding:0 .6em;color:#999;transition:all .3s ease}.form-item input:focus+label,.form-item input:valid+label{font-size:.7em;top:-.3em}.form-check{display:flex;flex-direction:row;align-items:center;text-align:center;font-size:12px;font-weight:500;line-height:1.22;color:#182a4e}.checkbox{width:1.5em;height:1.5em;display:flex;align-items:center}.images-rgpd{display:flex;margin:.5em;flex-wrap:wrap;justify-content:center}.images-rgpd img{border:solid 2px #f8f8f8;border-radius:50%;box-shadow:0 0 5px .5px #00000052;width:16%;margin:.2em}.images-rgpd p{width:50%}.images-trust{display:flex;flex-direction:column;justify-content:center;align-items:center;margin:.5em}.images-trust img{width:50%}.terms{display:flex;flex-direction:column;text-align:center;width:50%}.terms p{font-size:6px;color:#ababab}.button{width:80%}\n"] }]
        }] });

class JwtDecoderService {
    constructor() {
        this.storage = inject(LocalStorageAuthenticationInfrastructure);
    }
    async decodeToken() {
        const token = await this.storage.get('access_token');
        const decodedToken = jwtDecode(token);
        const roles = decodedToken.realm_access?.roles || null;
        return roles;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.13", ngImport: i0, type: JwtDecoderService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.13", ngImport: i0, type: JwtDecoderService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.13", ngImport: i0, type: JwtDecoderService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });

/*
 * Public API Surface of auth-features
 */

/**
 * Generated bundle index. Do not edit.
 */

export { AuthenticationApplication, AuthenticationStore, InscriptionFormComponent, JwtDecoderService, authenticationRoutes, jwtInterceptor, refreshInterceptor, userisAuthenticated };
//# sourceMappingURL=auth-features.mjs.map
