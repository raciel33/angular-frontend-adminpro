import { Component, OnInit } from '@angular/core';
import { ModalImagenService } from '../../services/modal-imagen.service';
import { FileUploadService } from '../../services/file-upload.service';
import Swal from 'sweetalert2';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styles: [
  ]
})
export class ModalImagenComponent implements OnInit {

  public imagenSubir:File;
  public imagenTemp:any;


  constructor(public modalImagenService:ModalImagenService,
               public fileUploadService:FileUploadService,
               public usuarioService:UsuarioService) { }

  ngOnInit(): void {
  }

  cerrarModal(){
    this.imagenTemp = null;
    this.modalImagenService.cerrarModal();
  }

  ///esta funcion nos sirve para cargar la imagen previa antes de hacer el cambio y mostrarla en pantalla
  cambiarImagen(file:File){

    this.imagenSubir = file;//variable de tipo file

    if ( !file)//si no hay imagen no la cargues
    {
      return this.imagenTemp = null;
    }

    const reader = new FileReader();//funcion propia de javascrit
    reader.readAsDataURL( file );
    reader.onloadend=()=>{
      this.imagenTemp = reader.result
    }
  }

  subirImagen(){

    const id = this.modalImagenService.id;
    const tipo = this.modalImagenService.tipo;

    //le pasamos a la funcion actualizarFoto del servicio los argumentos que nesecita
    this.fileUploadService.actualizarFoto( this.imagenSubir, tipo , id).

    //si se va actualizar la imagen del usuario que esta activo en ese momento actualizala en todos lados automaticamente
    then( img => {
       if (id === this.usuarioService.uid) {
        console.log("este es la imagen" + img);

        this.usuarioService.usuario.img = img

       }
      console.log(id);
      console.log(this.usuarioService.uid);

        //muestra un modal
        Swal.fire('Guardado' , 'Imagen actualizada', 'success')//viene del sweetalert2
        //emitimos la imagen en este observable para que se actualice automaticamente
        this.modalImagenService.nuevaImagen.emit( img );

        this.cerrarModal();
     }).catch(err=>{

      Swal.fire('Error' , err.error.msg, 'error')//viene del sweetalert2

     })

  }








}
