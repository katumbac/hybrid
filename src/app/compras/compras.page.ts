import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { addIcons } from 'ionicons';
import { addCircle, checkmark, checkmarkOutline, closeOutline } from 'ionicons/icons';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.page.html',
  styleUrls: ['./compras.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ComprasPage implements OnInit {

  constructor() {
    addIcons({checkmarkOutline, closeOutline});
  }

  ngOnInit() {
  }

}
