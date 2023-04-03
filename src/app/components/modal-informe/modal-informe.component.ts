import { Component, OnInit } from '@angular/core';
import { ModalImagenService } from '../../services/modal-imagen.service';
import { FileUploadService } from '../../services/file-upload.service';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2';
import { ModalInformeService } from '../../services/modal-informe.service';

@Component({
  selector: 'app-modal-informe',
  templateUrl: './modal-informe.component.html',
  styleUrls: ['./modal-informe.component.css']
})
export class ModalInformeComponent implements OnInit {


  public informeSubir:File;
  public informeTemp:any;

constructor(public modalInformeService: ModalInformeService,
               public fileUploadService:FileUploadService,
               public usuarioService:UsuarioService,
               ) { }

  ngOnInit(): void {
  }



   ///esta funcion nos sirve para cargar la imagen previa antes de hacer el cambio y mostrarla en pantalla
   informe(file:File){
    console.log( file );
    this.informeSubir = file;//variable de tipo file

    if ( !file)//si no hay imagen no la cargues
    {
      return this.informeTemp = null;
    }

    const reader = new FileReader();//funcion propia de javascrit
    reader.readAsDataURL( file );
    reader.onloadend=()=>{
      this.informeTemp = reader.result
    }
  }



  subirInforme(){
    const id = this.modalInformeService.id;
    const tipo = this.modalInformeService.tipo;

    //le pasamos a la funcion actualizarFoto del servicio los argumentos que nesecita
    this.fileUploadService.subirInforme(this.informeSubir, tipo , id).

    //si se va actualizar la imagen del usuario que esta activo en ese momento actualizala en todos lados automaticamente
    then( informe => {
       if (id === this.usuarioService.uid) {
        this.usuarioService.usuario.informe = informe

       }
      console.log(id);
      console.log(this.usuarioService.uid);
      console.log(this.usuarioService.usuario.informe);


        //muestra un modal
        Swal.fire('Guardado' , 'Informe subido', 'success')//viene del sweetalert2
        //emitimos la imagen en este observable para que se actualice automaticamente
        this.modalInformeService.nuevoInforme.emit( informe );

        this.cerrarModal();
     }).catch(err=>{

      Swal.fire('Error' , err.error.msg, 'error')//viene del sweetalert2

     })

  }



  cerrarModal(){
    this.informeTemp = null;
    this.modalInformeService.cerrarModal();
  }
}
