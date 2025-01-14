import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { ClovisHeaderComponent } from '../../../../shared/ui/components/clovis-header/clovis-header.component';
import {
  IonButton,
  IonContent,
  IonRow,
  IonSegment,
  IonSegmentButton,
  IonCol,
  Platform,
  IonSegmentView,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonText,
  IonCardSubtitle,
  IonCardContent,
  IonList,
  IonItem,
  IonGrid,
  IonLabel,
  IonSegmentContent,
  IonIcon,
  IonFabButton,
  IonFab,
  IonButtons,
  IonTitle,
  IonToolbar,
  IonHeader,
  IonModal,
  IonSpinner,
} from '@ionic/angular/standalone';
import { UserApplication } from '../../../load-user/services/user.application';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AccountsApplication } from '../../services/accounts.application';
import { addIcons } from 'ionicons';
import { add } from 'ionicons/icons';
import { Accounts } from '../../models/account';

@Component({
  selector: 'clovis-assets',
  standalone: true,
  imports: [
    IonSpinner,
    IonModal,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonFab,
    IonFabButton,
    IonIcon,
    IonLabel,
    IonGrid,
    IonItem,
    IonList,
    IonCardContent,
    IonCardSubtitle,
    IonText,
    IonCardTitle,
    IonCardHeader,
    IonCard,
    IonCol,
    IonSegmentButton,
    IonContent,
    ClovisHeaderComponent,
    IonRow,
    IonSegment,
    IonButton,
    IonSegmentView,
    IonSegmentContent,
  ],
  templateUrl: './assets.component.html',
  styleUrl: './assets.component.scss',
})
export class AssetsComponent implements OnInit {
  private readonly _customerApp = inject(UserApplication);
  private readonly _sanitizer = inject(DomSanitizer);
  private readonly _platform = inject(Platform);
  private readonly _accountApp = inject(AccountsApplication);

  isLinxoId$$ = this._customerApp.isLinxoId;

  isLoading$$ = this._customerApp.isLoading;

  isWidgetLink$$ = this._customerApp.widgetBankLinks;
  isWidget$$ = this._customerApp.isWidget;

  accounts$$ = this._accountApp.accounts;
  showWidget$$ = signal(false);

  sanitizedWidgetLink: SafeResourceUrl | undefined;
  showIframe = false;

  isModalOpen = false;

  setOpen(isOpen: boolean) {
    this.showWidget$$.set(false);
  }

  constructor() {
    addIcons({
      add,
    });
  }

  ngOnInit(): void {
    if (!this.isLinxoId$$()) {
      this._customerApp.createBankUser();
    }
    console.info("accounrt", this.accounts$$())

  }

  // widgetEffect = effect(() => {
  //   if (this.isWidget$$()) {
  //     this.sanitizedWidgetLink = this._sanitizer.bypassSecurityTrustResourceUrl(
  //       this.isWidgetLink$$()?._links?.add_connection as string
  //     );
  //     this.showWidget$$.set(true);
  //   }
  // });

  widgetEffect = effect(
    () => {
      if (this.isWidget$$()) {
        this.sanitizedWidgetLink =
          this._sanitizer.bypassSecurityTrustResourceUrl(
            this.isWidgetLink$$()?._links?.add_connection as string
          );
        // this.showWidget$$.set(true);
      }
    },
    { allowSignalWrites: true }
  );

  calculateTotalBalance(accounts: Accounts | null | undefined): number {
    if (!accounts || accounts.length === 0) {
      return 0;
    }

    return accounts.reduce(
      (total, account) => total + (account.balance || 0),
      0
    );
  }

  showWidget() {
    if (!this.isWidget$$()) {
      this.getWidgetByPlatfrom();
    }

    this.showWidget$$.set(true);
  }

  getWidgetByPlatfrom(): void {
    if (this._platform.is('desktop')) {
      this._customerApp.getBankWidget(true, true);
    } else {
      this._customerApp.getBankWidget(false, false);
    }
  }

  closeWidget() {
    this.showWidget$$.set(false);
  }
}
