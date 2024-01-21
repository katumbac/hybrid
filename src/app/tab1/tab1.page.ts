import { Component } from '@angular/core';
//Importación del método http
import { HttpClientModule } from '@angular/common/http';
// Importe el módulo con la directiva @ngFor
import { CommonModule } from '@angular/common'
//Importación de la interfaz
import { Repuestosec } from '../interfaces/repuestosec';
//Importación del servicio
import { RepuestosserviceService } from '../services/repuestosservice.service';
//Importación de los constructores del formulario
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import {
  IonHeader, IonContent, IonButtons, IonMenuButton, IonIcon, IonGrid, IonRow, IonCol, IonImg, IonSearchbar, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent,
  IonInput, IonButton,
  IonLabel, IonList, IonItem
} from '@ionic/angular/standalone';

import { ExploreContainerComponent } from '../explore-container/explore-container.component';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [HttpClientModule, ReactiveFormsModule, CommonModule, ExploreContainerComponent, IonButtons, IonMenuButton, IonSearchbar, IonContent,

    CommonModule,
    IonLabel, IonList, IonItem,
    IonInput, IonButton, IonHeader,
    IonGrid, IonCol, IonRow, IonImg,
    IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent,],
  providers: [RepuestosserviceService],
})
export class Tab1Page {
  tiposDisponibles: string[] = ['Todo', 'PC', 'Laptop', 'Auto'];
  mostrarCard =false;
  btnSeleccionado: string = 'Todo';

  //Atributo con el tipo de dato de la interfaz
  public data: Repuestosec[] = [];
  public filteredData: Repuestosec[] = [];

  checkoutForm = this.formBuilder.group({
    title: '',
    price: '',
    use: '',
    type: '',
    img: '',
    description: '',
    place: '',
    direction: '',
    phone: '',
  });
  

  constructor(
    private dataProvider: RepuestosserviceService,
    private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.dataProvider.getResponse().subscribe((response) => {
      if (response != null) {
        this.data = Object.values(response) as Repuestosec[];
        this.filteredData = this.data;
      }
    })
  }

  btnSeleccion(opcion: string) {
    this.btnSeleccionado = opcion;
    this.applyFilter(this.btnSeleccionado);
  }


  applyFilter(opcion : string){
    if(opcion == 'Todo'){
      this.loadData();
    }else{
      this.filteredData = this.data.filter(item => item.type === opcion);
    }
  }

  mostCard() {
    this.mostrarCard = !this.mostrarCard;
  }

  onSubmit(): void {
    const formData = this.checkoutForm.value;
    const maxProductId = this.data.reduce((max, product) => (product.product_id > max ? product.product_id : max), 0);
    const nextProductId = maxProductId + 1;

    const newProduct: Repuestosec = {
      product_id: nextProductId,
      title: formData.title,
      price: formData.price,
      type: formData.type,
      use: formData.use,
      img: '',
      description: '',
      place: '',
      direction: '',
      phone: '',
    }
    // Proceso para enviar los datos
    this.dataProvider.postResponse(newProduct).subscribe((response) => {
      this.checkoutForm.reset();
      this.loadData()
    })
  }


}
