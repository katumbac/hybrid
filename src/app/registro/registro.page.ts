import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { ActivatedRoute, Router } from '@angular/router';
import { RepuestosserviceService } from '../services/repuestosservice.service';
import { Users } from '../interfaces/users';
import { FormGroup, FormControl, FormBuilder,ReactiveFormsModule,Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; //Importación del método http
import { Repuestosec } from '../interfaces/repuestosec'; //Importación de la interfaz
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { addIcons } from 'ionicons';
import { searchOutline,camera} from 'ionicons/icons';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
  standalone: true,
  imports: [HttpClientModule,ReactiveFormsModule,IonicModule, CommonModule, FormsModule, RouterModule],
  providers: [RepuestosserviceService],
})
export class RegistroPage {

  public data: Users[] = [];
  public filteredDatau: Users[] = [];
  checkoutForm: FormGroup;  

  message: string | null = null;

  constructor(private activatedRoute: ActivatedRoute,
    private dataProvider: RepuestosserviceService,private formBuilder: FormBuilder) {
    this.checkoutForm = this.formBuilder.group({
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      phone: ['', Validators.required],
      correo: ['', Validators.required],
      contrasenia: ['', Validators.required],
      direccion: ['', Validators.required],
    });
  }
  ngOnInit() {
    this.loadData;
  }

  loadData() {
    this.dataProvider.getResponse_u().subscribe((response) => {
      if (response != null) {
        this.data = Object.values(response) as Users[];
        this.filteredDatau = this.data;
      }
    });
  }

  onSubmit(): void {
    const formData = this.checkoutForm.value;
  
    // Validate required fields
    if (!formData.nombres || !formData.apellidos || !formData.phone || !formData.correo || !formData.contrasenia || !formData.direccion) {
      console.error('Please fill in all required fields.');
      this.message = '*Complete los campos correctemente, no deje vacío*';
      return;
    }
  
    const newUser: Users = {
      nombres: formData.nombres,
      apellidos: formData.apellidos,
      phone: formData.phone,
      correo: formData.correo,
      contrasenia: formData.contrasenia,
      direccion: formData.direccion,
    };
  
    // Proceso para enviar los datos
    this.dataProvider.postResponse_u(newUser).subscribe(
      (response) => {
        this.message = '*Cuenta creada correctamente*';
  
        this.checkoutForm.reset();
        this.loadData();
      },
      (error) => {
        console.error('Error creating account:', error);
      }
    );
  }

  
}
