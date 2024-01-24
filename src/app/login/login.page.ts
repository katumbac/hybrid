import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FormGroup, FormControl, FormBuilder,ReactiveFormsModule,Validators} from '@angular/forms';
import { Users } from '../interfaces/users';
import { RepuestosserviceService } from '../services/repuestosservice.service';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'; //Importación del método http

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [HttpClientModule,ReactiveFormsModule,IonicModule, CommonModule, FormsModule, RouterModule],
  providers: [RepuestosserviceService],
})
export class LoginPage {

  public data: Users[] = [];
  public filteredDatau: Users[] = [];
  checkoutForm: FormGroup; 

  message: string | null = null;

  constructor(private activatedRoute: ActivatedRoute,
    private dataProvider: RepuestosserviceService,
    private formBuilder: FormBuilder,
    private router: Router,) {
    this.checkoutForm = this.formBuilder.group({
      correo: ['', Validators.required],
      contrasenia: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.loadData();
    console.log("hola",this.filteredDatau);
  }

  loadData() {
    this.dataProvider.getResponse_u().subscribe((response) => {
      if (response != null) {
        this.data = Object.values(response) as Users[];
        this.filteredDatau = this.data;
      }
    });
  }
  login() {
    const correoControl = this.checkoutForm.get('correo');
    const contraseniaControl = this.checkoutForm.get('contrasenia');
    if (correoControl && contraseniaControl) {
      const correo = correoControl.value;
      const contrasenia = contraseniaControl.value;
      const userFound = this.filteredDatau.find(
        user => user.correo === correo && user.contrasenia === contrasenia);
        console.log('filer',this.filteredDatau);
        console.log('user',userFound);
      if (userFound) {
        // Iniciar sesión exitosa
        console.log('Inicio de sesión exitoso');
        this.router.navigate(['/tabs/tab1']);
      } else {
        // Credenciales incorrectas
        console.log('Credenciales incorrectas. Por favor, verifica tu correo y contraseña.');
        this.message = '*Credenciales incorrectas, Por favor, verifica tu correo y contraseña.*';

      }
    } else {
      // Manejo de caso donde uno o ambos controles son nulos
      this.message = '*Credenciales incorrectas.Por favor, verifica tu correo y contraseña.*';
      console.error('Error: Uno o ambos controles son nulos.');
    }
    console.log("hola",this.filteredDatau);
  }

}
