import { Component, ElementRef, ViewChild} from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; //Importación del método http
import { CommonModule } from '@angular/common' // Importe el módulo con la directiva @ngFor
import { Repuestosec } from '../interfaces/repuestosec'; //Importación de la interfaz
import { RepuestosserviceService } from '../services/repuestosservice.service'; //Importación del servicio
import { FormBuilder, ReactiveFormsModule, FormControl } from '@angular/forms'; //Importación de los constructores del formulario
import { IonHeader, IonContent, IonButtons, IonMenuButton, IonFabButton, IonFab,IonIcon, IonGrid, IonRow, IonCol, IonImg, IonSearchbar, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonInput, IonButton, IonLabel, IonList, IonItem } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { addIcons } from 'ionicons';
import { searchOutline,camera} from 'ionicons/icons';
import { Router, RouterModule } from '@angular/router';
import { PhotoService } from '../services/photo.service';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [HttpClientModule, ReactiveFormsModule, CommonModule, ExploreContainerComponent, IonButtons, IonMenuButton, IonSearchbar, IonContent,
 IonIcon, IonLabel, IonList, IonItem, IonFabButton,IonFab,IonInput, IonButton, IonHeader, IonGrid, IonCol, IonRow, IonImg, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent,RouterModule],
  providers: [RepuestosserviceService],
})
export class Tab1Page {

  tiposDisponibles: string[] = ['Todo', 'PC', 'Laptop', 'Auto'];
  mostrarCard = false;
  btnSeleccionado: string = 'Todo';
  public data: Repuestosec[] = [];
  public datap: Repuestosec[] = [];
  public filteredData: Repuestosec[] = [];
  public filteredDatap: any[] = [];
  filtersearch: string = '';

  firstPhotoWebviewPath: string | null = null;
  currentPhoto: any; 
  photoWebviewPaths: string[] = [];

  checkoutForm = this.formBuilder.group({
    title: '',
    price: '',
    use: '',
    type: '',
    img: new FormControl(''),
    description: '',
    place: '',
    direction: '',
    phone: '',
  });

  constructor(
    private dataProvider: RepuestosserviceService,
    private formBuilder: FormBuilder,
    public photoService: PhotoService) {
  }

  //async
  async ngOnInit() {
    this.loadData();
    addIcons({ searchOutline,camera});
    await this.photoService.loadSaved();
    this.firstPhotoWebviewPath = this.photoService.getFirstPhotoWebviewPath();
  }

  loadData() {
    this.dataProvider.getResponse().subscribe((response) => {
      if (response != null) {
        this.data = Object.values(response) as Repuestosec[];
        this.filteredData = this.data;
      }
    })

    this.dataProvider.getResponse_p().subscribe((response) => {
      if (response != null) {
        this.data = Object.values(response) as Repuestosec[];
        this.filteredDatap = this.data;
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
      this.filteredDatap = this.datap.filter(item => this.buscarEnDato(item));

    } else {
      this.filteredData = this.data.filter(item => item.type === this.btnSeleccionado && this.buscarEnDato(item));
      this.filteredDatap = this.datap.filter(item => item.type === this.btnSeleccionado && this.buscarEnDato(item));      
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
    const imgFilePath = this.photoService.getFirstPhotoFilePath();
    const imgwebviewPath = this.photoService.getFirstPhotoWebviewPath();
    const maxProductId = this.data.reduce((max, product) => {
      const productId = Number(product.product_id);
      return productId > max ? productId : max;
    }, 0);
    
    const nextProductId = maxProductId + 1;
    console.log(nextProductId);

    const newProduct: Repuestosec = {
      product_id: nextProductId,
      title: formData.title,
      price: formData.price,
      type: formData.type,
      use: formData.use,
      img: imgwebviewPath,
      description: formData.description,
      place: formData.place,
      direction: formData.direction,
      phone: formData.phone,
    }
    // Proceso para enviar los datos
    this.dataProvider.postResponse_p(newProduct).subscribe((response) => {
      this.checkoutForm.reset();
      this.loadData()
    })
  }

  addPhotoToGallery() {
    this.photoService.addNewToGallery();
  }

  deletePhoto() {
    this.photoService.deleteFirstPhoto();
  }

  deleteAllPhoto(){
    this.photoService.deleteAllPhotos();
  }
 
  async loadPhotos() {
    await this.photoService.loadSaved();
    
    // Recorre los datos filtrados y encuentra las rutas de las fotos
    for (const dataItem of this.filteredData) {
      const matchingPhoto = this.photoService.photos.find(
        (photo) => photo.filepath.includes(dataItem.img)
      );
  
      if (matchingPhoto && matchingPhoto.webviewPath) {
        // Verifica que matchingPhoto y matchingPhoto.webviewPath no sean undefined
        this.photoWebviewPaths.push(matchingPhoto.webviewPath);
      }
    }
  }

  getPhotoPath(imgName: string): string | null {
    const matchingPhoto = this.photoService.photos.find(
      (photo) => photo.webviewPath === imgName
    );
  
    if (matchingPhoto && matchingPhoto.webviewPath) {
      console.log('Imagen encontrada:', matchingPhoto.webviewPath);
      return matchingPhoto.webviewPath;
    } else {
      console.log('Imagen no encontrada para:', imgName);
      return null;
    }
  }
  
}
