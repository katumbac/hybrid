import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { IonApp, IonRouterOutlet, IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonTabButton, IonLabel, IonButtons, IonMenuButton, IonIcon, IonList, IonItem, IonMenuToggle} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { triangle, ellipse, square, peopleCircle, personCircleOutline, home, cartOutline, exitOutline } from 'ionicons/icons';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonApp, IonRouterOutlet, IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonTabButton, IonLabel, IonButtons, IonMenuButton, IonIcon, IonList, IonItem,IonMenuToggle,RouterModule],
})

export class AppComponent {
  constructor() {
    addIcons({ triangle, ellipse, square, peopleCircle, personCircleOutline, home, cartOutline, exitOutline});
  }
}
