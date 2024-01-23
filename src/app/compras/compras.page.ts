import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; //Importación del método http

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { addIcons } from 'ionicons';
import { checkmarkOutline, closeOutline } from 'ionicons/icons';
import { ActivatedRoute } from '@angular/router';
import { Repuestosec } from '../interfaces/repuestosec';
import { RepuestosserviceService } from '../services/repuestosservice.service';
@Component({
  selector: 'app-compras',
  templateUrl: './compras.page.html',
  styleUrls: ['./compras.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HttpClientModule],
  providers: [RepuestosserviceService]
})
export class ComprasPage implements OnInit {

  public data: Repuestosec[] = [];
  public filteredData: Repuestosec[] = [];
  public carrito: Repuestosec[] = [];

  constructor(private activatedRoute: ActivatedRoute,
    private dataProvider: RepuestosserviceService) {
    addIcons({ checkmarkOutline, closeOutline });
  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.dataProvider.getResponse().subscribe((response) => {
      if (response != null) {
        this.data = Object.values(response) as Repuestosec[];
        this.filteredData = this.data;

        //this.mostrarDetalle();
        this.tenerId();

      }
    });
  }

  tenerId() {
    this.activatedRoute.queryParams.subscribe(params => {
      const product_id = params['product_id'];
      if (product_id) {
        // Utiliza el product_id para cargar los detalles del producto desde tu servicio
        this.getDetalleId(product_id);
      } else {
        console.log('No se proporcionó el product_id ');
      }
    });
  }

  getDetalleId(product_id: any) {
    const foundProduct = this.filteredData.find(item => item.product_id === product_id);
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

      const founpD = this.carrito.find(item => item.product_id === product_id);
      if (founpD) {
        console.log('El producto ya está en el carrito');
      } else {
        this.carrito.push(productDetails);
        console.log('El producto agregado al carrito');
      }

    }
  }

  eliminarProducto(product_id: any){
    const index = this.carrito.findIndex((item) => item.product_id === product_id);
    if (index !== -1) {
      this.carrito.splice(index, 1);
    }
    console.log('Producto eliminado del carrito');
  }

}
