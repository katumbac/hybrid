import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
//Importación del HttpClient
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RepuestosserviceService {

  //Atributo URL
  private URL: string = 'https://repuestosec-44818-default-rtdb.firebaseio.com/collection.json';

  //Inyección de dependencia del HttpClient
  constructor(private http: HttpClient) { }

  //Método con la petición HTTP
  getResponse() {
    return this.http.get(this.URL);
  }

  //Método con la petición HTTP
  postResponse(data: any) {
    return this.http.post(this.URL, data);
  }

  

}
