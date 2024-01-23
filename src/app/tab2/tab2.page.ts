import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; //Importación del método http
import { CommonModule } from '@angular/common' // Importe el módulo con la directiva @ngFor
import { IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol, IonButton, IonImg, IonButtons, IonMenuButton, IonIcon, IonSegment, IonSegmentButton, IonLabel, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle,IonCardContent } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { addIcons } from 'ionicons';
import { cartOutline, arrowBack } from 'ionicons/icons';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { Repuestosec } from '../interfaces/repuestosec';
import { RepuestosserviceService } from '../services/repuestosservice.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [HttpClientModule, CommonModule,IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent, IonGrid, IonRow, IonCol, IonButton, IonImg, IonButtons, IonMenuButton, IonIcon, IonSegment, IonSegmentButton, IonLabel, RouterModule,IonCard,IonCardHeader, IonCardTitle, IonCardSubtitle,IonCardContent],
  providers: [RepuestosserviceService],
})
export class Tab2Page {

  public data: Repuestosec[] = [];
  public filteredData: Repuestosec[] = [];
  public productDetails: Repuestosec | undefined;

  constructor(
    private activatedRoute: ActivatedRoute, private router: Router,
    private dataProvider: RepuestosserviceService) {
    addIcons({ cartOutline, arrowBack });

  }

  ngOnInit() {
    this.loadData();
  }

  mostrarDetalle() {
    this.activatedRoute.paramMap.subscribe(product => {
      const p_id = product.get('product_id');
      console.log(p_id);

      const foundProduct = this.filteredData.find(item => item.product_id === p_id);
      if (foundProduct) {
        const productDetails = {
          product_id: foundProduct.product_id,
          title: foundProduct.title,
          price: foundProduct.price,
          use: foundProduct.use,
          type: foundProduct.type,
          img: foundProduct.img,
          description: foundProduct.description,
          place: foundProduct.place,
          direction: foundProduct.direction,
          phone: foundProduct.phone
        };
        console.log('Product Details:', productDetails);
        this.productDetails = productDetails;
      } else {
        console.log('Producto no encontrado');
      }
    });
  }

  loadData() {
    this.dataProvider.getResponse().subscribe((response) => {
      if (response != null) {
        this.data = Object.values(response) as Repuestosec[];
        this.filteredData = this.data;

        this.mostrarDetalle();
        
      }
    });
  }

  adquirirProducto() {
    if (this.productDetails && this.productDetails.product_id) {
      this.router.navigate(['/tabs/compras'], { queryParams: { product_id: this.productDetails.product_id } });
    }
  }

}
