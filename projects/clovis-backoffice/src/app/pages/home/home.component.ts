import { Component, inject, OnInit } from '@angular/core';
import { UserApplication } from '../../shared/features/getUserData/services/user.application';
import { JwtDecoderService } from 'auth-features';

@Component({
  selector: 'clovis-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  userApp = inject(UserApplication);
  tokenDecoder = inject(JwtDecoderService);

  async ngOnInit(): Promise<void> {
    console.log('oninit trigger home');
    const roles = await this.tokenDecoder.decodeToken();
    if (roles && roles.length > 0) {
      this.userApp.getUserByRoles(roles[0]);
    }
  }
  // customer$$ = this.userApp.admin;
}
