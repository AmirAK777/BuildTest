import { Component, effect, inject, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthenticationStore } from 'auth-features';
import { UserStore } from './shared/features/getUserData/store';
import { SideMenuComponent } from './shared/features/nav-bar/components/main-menu/side-menu.component';
import { CrmComponent } from './shared/ui/components/crm/crm.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SideMenuComponent, CrmComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'clovis-backoffice';

  private readonly authStore = inject(AuthenticationStore);

  private readonly router = inject(Router);

  isLogged = this.authStore.isLogged;

  loginReddirect = effect(() => {
    if (this.authStore.isLogged()) {
      this.router.navigate(['home']);
    }
  });
}
