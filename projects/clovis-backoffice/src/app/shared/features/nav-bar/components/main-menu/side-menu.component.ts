import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthenticationApplication, JwtDecoderService } from 'auth-features';
import { UserApplication } from '../../../getUserData/services/user.application';
import { UserInfrastructure } from '../../../getUserData/services/user.infrastructure';
import { MenuItems } from '../../models/menu';

@Component({
  selector: 'clovis-side-menu',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.scss',
})
export class SideMenuComponent {
  private readonly application = inject(AuthenticationApplication);
  private readonly userApplication = inject(UserApplication);
  private readonly tokenDecoder = inject(JwtDecoderService);
  private readonly userInfra = inject(UserInfrastructure);

  roles: string[] | null = [];

  menu: MenuItems = [
    {
      text: 'Accueil',
      icon: 'https://res.cloudinary.com/dyewhr2lj/image/upload/v1721984897/navigation%20bar%20icones/home-page-black.svg',
      url: '/home',
      order: 1,
    },
    {
      text: 'Tableau de bord',
      icon: 'https://res.cloudinary.com/dyewhr2lj/image/upload/v1721984897/navigation%20bar%20icones/home-page-black.svg',
      url: '/consultant/dashboard',
      order: 2,
    },
    {
      text: 'Rendez-vous de demain',
      icon: 'https://res.cloudinary.com/dyewhr2lj/image/upload/v1721984897/navigation%20bar%20icones/home-page-black.svg',
      url: '/admin/marketing',
      order: 3,
    },
    {
      text: 'Formations',
      icon: 'https://res.cloudinary.com/dyewhr2lj/image/upload/v1721984897/navigation%20bar%20icones/home-page-black.svg',
      url: '/admin/consultants',
      order: 4,
    },
    {
      text: 'Paramètres',
      icon: 'https://res.cloudinary.com/dyewhr2lj/image/upload/v1721984897/navigation%20bar%20icones/home-page-black.svg',
      url: '/admin/sdr',
      order: 5,
    },
  ];

  isAuthenticated = this.application.isAuthenticated;

  // async ngOnInit(): Promise<void> {
  //   this.tokenDecoder.decodeToken().then((reponse) => {
  //     this.roles = reponse;
  //   });
  // }

  onRoleSelected(role: string): void {
    this.userApplication.getUserByRoles(role);
  }

  handleDefaultRole(): void {
    console.log('Handling default roles logic');
    // Logique spécifique au rôle default-roles-clovis
  }

  handleCustomerRole(): void {
    console.log('Handling customer logic');
    // Logique spécifique au rôle application_customer
  }

  handleOfflineAccessRole(): void {
    console.log('Handling offline access logic');
    // Logique spécifique au rôle offline_access
  }

  handleUmaAuthorizationRole(): void {
    console.log('Handling UMA authorization logic');
    // Logique spécifique au rôle uma_authorization
  }
  logout(): void {
    this.application.logout();
  }

  load(): void {}
}
