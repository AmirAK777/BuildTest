import {
  Component,
  effect,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { Router } from '@angular/router';
import { IonAlert, IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { AuthenticationStore } from 'auth-features';
import { ConnectivityService } from './features/connectivity/services/connectivity.service';
import { App, URLOpenListenerEvent } from '@capacitor/app';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [IonAlert, IonApp, IonRouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'clovis-frontoffice';
  isOnline: WritableSignal<boolean> = signal(true);

  private readonly authStore = inject(AuthenticationStore);
  private readonly router = inject(Router);
  private readonly connectivity = inject(ConnectivityService);

  ngOnInit(): void {
    this.isOnline = this.connectivity.getNetworkStatus();
  }

  loginReddirect = effect(() => {
    if (this.authStore.isLogged()) {
      this.router.navigate(['home']);
    }
  });

  initializeApp() {
    App.addListener('appUrlOpen', (event: URLOpenListenerEvent) => {
        // Example url: https://beerswift.app/tabs/tab2
        // slug = /tabs/tab2
        const slug = event.url.split('.app').pop();
        if (slug) {
          this.router.navigateByUrl(slug);
        }
        // If no match, do nothing - let regular routing
        // logic take over
      });
    };
  }

