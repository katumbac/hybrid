import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet, IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonTabButton, IonLabel, IonButtons, IonMenuButton, IonIcon, IonList, IonItem, IonMenuToggle} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { triangle, ellipse, square, peopleCircle, personCircleOutline, home, cartOutline } from 'ionicons/icons';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet, IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonTabButton, IonLabel, IonButtons, IonMenuButton, IonIcon, IonList, IonItem,IonMenuToggle],
})

export class AppComponent {
  constructor() {
    addIcons({ triangle, ellipse, square, peopleCircle, personCircleOutline, home, cartOutline});
  }
}
