import { Component} from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; //Importación del método http
import { CommonModule } from '@angular/common' // Importe el módulo con la directiva @ngFor
import { Repuestosec } from '../interfaces/repuestosec'; //Importación de la interfaz
import { RepuestosserviceService } from '../services/repuestosservice.service'; //Importación del servicio
import { FormBuilder, ReactiveFormsModule } from '@angular/forms'; //Importación de los constructores del formulario
import { IonHeader, IonContent, IonButtons, IonMenuButton, IonIcon, IonGrid, IonRow, IonCol, IonImg, IonSearchbar, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonInput, IonButton, IonLabel, IonList, IonItem } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { addIcons } from 'ionicons';
import { searchOutline } from 'ionicons/icons';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [HttpClientModule, ReactiveFormsModule, CommonModule, ExploreContainerComponent, IonButtons, IonMenuButton, IonSearchbar, IonContent,
 IonIcon, IonLabel, IonList, IonItem, IonInput, IonButton, IonHeader, IonGrid, IonCol, IonRow, IonImg, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent,RouterModule],
  providers: [RepuestosserviceService],
})
export class Tab1Page {


  tiposDisponibles: string[] = ['Todo', 'PC', 'Laptop', 'Auto'];
  mostrarCard = false;
  btnSeleccionado: string = 'Todo';
  public data: Repuestosec[] = [];
  public filteredData: Repuestosec[] = [];
  filtersearch: string = '';

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
    addIcons({ searchOutline });
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
    this.applyFilter();
  }


  applyFilter() {
    if (this.btnSeleccionado == 'Todo') {
      //this.loadData();
      this.filteredData = this.data.filter(item => this.buscarEnDato(item));

    } else {
      this.filteredData = this.data.filter(item => item.type === this.btnSeleccionado && this.buscarEnDato(item));   
    }

  }

  buscarEnDato(dato: Repuestosec): boolean {
    const inputBusqueda = this.filtersearch.toLowerCase();

    return (
      dato.title.toLowerCase().includes(inputBusqueda) ||
      dato.type.toLowerCase().includes(inputBusqueda)
    );
  }

  onSearchInput(event: any) {
    this.filtersearch = event.target.value;
    this.applyFilter();
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
