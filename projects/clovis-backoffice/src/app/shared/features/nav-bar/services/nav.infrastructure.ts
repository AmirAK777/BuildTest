import { Injectable, inject } from '@angular/core';
import { delay, Observable, of, shareReplay, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Admin, Consulant, Marketing, Sdr, User } from 'models-lib';
import { MenuItems } from '../models/menu';

const fakeService: NavInfrastructure = {
  getAdminMenu(): Observable<MenuItems> {
    const menu: MenuItems = [
      {
        text: 'Accueil',
        icon: 'CONSULTANT_BOARD',
        url: '/admin/dashboard',
        order: 1,
      },
      {
        text: 'Tableau de bord',
        icon: 'CONSULTANT_BOARD',
        url: '/admin/opportunities',
        order: 2,
      },
      {
        text: 'Rendez-vous de demain',
        icon: 'CONSULTANT_BOARD',
        url: '/admin/marketing',
        order: 3,
      },
      {
        text: 'Formations',
        icon: 'CONSULTANT_BOARD',
        url: '/admin/consultants',
        order: 4,
      },
      {
        text: 'Paramètres',
        icon: 'CONSULTANT_BOARD',
        url: '/admin/sdr',
        order: 5,
      },
    ];

    return of(menu);
  },

  getConsultantMenu(): Observable<MenuItems> {
    const menu: MenuItems = [
      {
        text: 'CONSULTANT_BOARD',
        icon: 'CONSULTANT_BOARD',
        url: '/consultant/dashboard',
        order: 1,
      },
      {
        text: 'OPPORTUNITIES',
        icon: 'CONSULTANT_BOARD',
        url: '/consultant/opportunities',
        order: 2,
      },
      {
        text: 'MENU_LEADS_TO_CALLBACK',
        icon: 'CONSULTANT_BOARD',
        url: '/consultant/appointments-to-callback',
        order: 3,
      },
      {
        text: 'MENU_FORMATION',
        icon: 'CONSULTANT_BOARD',
        url: '/consultant/formation',
        order: 10,
      },
    ];
    return of(menu);
  },
};

@Injectable({
  providedIn: 'root',
  useValue: fakeService,
})
export class NavInfrastructure {
  getAdminMenu(): Observable<MenuItems> {
    throw new Error('Not implemented');
  }
  getConsultantMenu(): Observable<MenuItems> {
    throw new Error('Not implemented');
  }
}
