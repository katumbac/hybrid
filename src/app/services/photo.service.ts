import { Injectable } from '@angular/core';
//Importe los módulos con la funcionalidad nativa
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';

//Importe la interfaz
import { UserPhoto } from '../interfaces/user-photo';

@Injectable({
  providedIn: 'root'
})

export class PhotoService {

   //Atributo para almacenar las fotos
   public photos: UserPhoto[] = [];

   constructor() { }
 
   public async addNewToGallery() {
 
     // Tome una foto
     const capturedPhoto = await Camera.getPhoto({
       resultType: CameraResultType.Uri,
       source: CameraSource.Camera,
       quality: 100
     });
 
     // Agregue el archivo al inicio del arreglo
     this.photos.unshift({
       filepath: "soon...",
       webviewPath: capturedPhoto.webPath!
     });
   }
}
