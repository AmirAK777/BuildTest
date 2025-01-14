import { Component, OnInit, output, signal } from '@angular/core';
import {
  IonContent,
  IonHeader,
  IonText,
  IonCol,
  IonRow,
  IonProgressBar,
  IonItem,
  IonCheckbox,
  IonLabel,
  IonList,
} from '@ionic/angular/standalone';

@Component({
  selector: 'clovis-loading-page',
  standalone: true,
  imports: [
    IonList,
    IonLabel,
    IonCheckbox,
    IonItem,
    IonProgressBar,
    IonRow,
    IonCol,
    IonText,
    IonHeader,
    IonContent,
  ],
  templateUrl: './loading-page.component.html',
  styleUrl: './loading-page.component.scss',
})
export class LoadingPageComponent implements OnInit {
  intervalTime = 40;
  situation = signal(0);
  capacity = signal(0);
  taxation = signal(0);
  recommendations = signal(0);

  checkedSituation = signal(false);
  checkedCapacity = signal(false);
  checkedTaxation = signal(false);
  checkedRecommendations = signal(false);
  endLoading = output<boolean>();

  ngOnInit() {
    this.startSituationIncrement();
  }

  startSituationIncrement() {
    const interval = setInterval(() => {
      this.situation.set(this.situation() + 0.1);
      if (this.situation() >= 1) {
        clearInterval(interval);
        this.checkedSituation.set(true);
        this.startCapacityIncrement();
      }
    }, this.intervalTime);
  }

  startCapacityIncrement() {
    const interval = setInterval(() => {
      this.capacity.set(this.capacity() + 0.1);
      if (this.capacity() >= 1) {
        clearInterval(interval);
        this.checkedCapacity.set(true);
        this.startTaxationIncrement();
      }
    }, this.intervalTime);
  }

  startTaxationIncrement() {
    const interval = setInterval(() => {
      this.taxation.set(this.taxation() + 0.1);
      if (this.taxation() >= 1) {
        clearInterval(interval);
        this.checkedTaxation.set(true);
        this.startRecommendationsIncrement();
      }
    }, this.intervalTime);
  }

  startRecommendationsIncrement() {
    const interval = setInterval(() => {
      this.recommendations.set(this.recommendations() + 0.1);
      if (this.recommendations() >= 1) {
        clearInterval(interval);
        this.checkedRecommendations.set(true);
        this.endLoading.emit(false);
      }
    }, this.intervalTime);
  }
}
