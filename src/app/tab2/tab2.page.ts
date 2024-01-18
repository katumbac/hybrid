import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol, IonButton, IonImg, IonButtons, IonMenuButton, IonIcon, IonSegment, IonSegmentButton, IonLabel} from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { addIcons } from 'ionicons';
import { cartOutline, arrowBack} from 'ionicons/icons';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent, IonGrid, IonRow, IonCol, IonButton, IonImg, IonButtons, IonMenuButton, IonIcon, IonSegment, IonSegmentButton, IonLabel]
})
export class Tab2Page {

  constructor() {
    addIcons({cartOutline,arrowBack});
  }

}
