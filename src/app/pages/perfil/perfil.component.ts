import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';
import { FileUploadService } from '../../services/file-upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit {

  public perfilForm: FormGroup;
  public usuario: Usuario;//viene del modelo de usuario
  public imagenSubir:File;
  public imagenTemp:any;

  constructor( private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private fileUploadService: FileUploadService
    ) {

      this.usuario = usuarioService.usuario;

     }

  ngOnInit(): void {

    this.perfilForm = this.fb.group({
        nombre:[ this.usuario.nombre , Validators.required],
        email:[this.usuario.email , [ Validators.required, Validators.email ]]
    })
  }

  actualizarPerfil(){

    //se manda el valor de los campos del form como argumento
    this.usuarioService.actualizarPerfil( this.perfilForm.value).subscribe(resp=>{

      const { nombre, email } = this.perfilForm.value; //se destructura los campos del formulario

      //se le asigna la destructuracion para que aparezca la actualizacion en todas partes automaticamente
       this.usuario.nombre = nombre;
       this.usuario.email = email;

      //muestra un modal
       Swal.fire('Guardado' , 'Cambios guardados', 'success')//viene del sweetalert2

    },(err)=>{

      Swal.fire('Error' , err.error.msg, 'error')//viene del sweetalert2

    })

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
    //le pasamos a la funcion actualizarFoto del servicio los argumentos que nesecita
    this.fileUploadService.actualizarFoto(this.imagenSubir,'usuarios',this.usuario.uid).
    then( img => {
      this.usuario.img = img
        //muestra un modal
        Swal.fire('Guardado' , 'Imagen actualizada', 'success')//viene del sweetalert2
     }).catch(err=>{

      Swal.fire('Error' , err.error.msg, 'error')//viene del sweetalert2

     })

  }
}
