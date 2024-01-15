import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
<<<<<<< HEAD
import { IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent} from '@ionic/angular/standalone';
=======
>>>>>>> b9ed1b09bcae42a17d83bf8484e86a2d2b0b1495

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: true,
<<<<<<< HEAD
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent,  IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent],
=======
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent],
>>>>>>> b9ed1b09bcae42a17d83bf8484e86a2d2b0b1495
})
export class Tab3Page {
  constructor() {}
}
