import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonContent, IonHeader } from '@ionic/angular/standalone';
import { CardButtonComponent } from '../../../../../shared/ui/components/card-button/card-button.component';
import { ClovisHeaderComponent } from '../../../../../shared/ui/components/clovis-header/clovis-header.component';

@Component({
  selector: 'clovis-objectives',
  standalone: true,
  imports: [
    CardButtonComponent,
    ClovisHeaderComponent,
    IonContent,
    IonHeader,
    RouterLink,
  ],
  templateUrl: './objectives.component.html',
  styleUrl: './objectives.component.scss',
})
export class ObjectivesComponent {}
