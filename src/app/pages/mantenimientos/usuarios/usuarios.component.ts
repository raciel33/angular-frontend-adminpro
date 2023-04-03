import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../models/usuario.model';
import { BusquedasService } from '../../../services/busquedas.service';
import Swal from 'sweetalert2';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { delay } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { ModalInformeService } from '../../../services/modal-informe.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit,OnDestroy {


  public totalUsuarios:number = 0;
  public usuarios:Usuario [] = [];
  public usuariosTemp:Usuario [] = [];

  public desde:number = 0;//para la paginacion
  public cargando: boolean = true;

  public imgSubs:Subscription;
  public informeSubs:Subscription;

  constructor(private usuariosService:UsuarioService,
   private busquedaService:BusquedasService,
   private modalImagenService: ModalImagenService,
   public modalInformeServices: ModalInformeService

   ) { }


  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();

}


  ngOnInit(): void {

    this.cargarUsuarios();

    //para que se refresque actualice la imagen automaticamente
    this.imgSubs = this.imgSubs =  this.modalImagenService.nuevaImagen.
    pipe(
      delay(100)//retardamos un poco pa que de tiempo la carga
    )
    .subscribe(img=> this.cargarUsuarios());


//-------------------------------------------------------------------------
    //para que se refresque actualice la imagen automaticamente
    this.informeSubs = this.informeSubs =  this.modalInformeServices.nuevoInforme.
    pipe(
      delay(100)//retardamos un poco pa que de tiempo la carga
    )
    .subscribe(img=> this.cargarUsuarios())
  }




  cambiarPagina( valor:number){

     this.desde += valor;

     if ( this.desde < 0){
          this.desde = 0;

     }else if( this.desde >= this.totalUsuarios ){
           this.desde -= valor
     }

     this.cargarUsuarios();
  }

  cargarUsuarios(){
    //para el icono del loading
         this.cargando = true;
       //desestructuramos la respuesta
       this.usuariosService.cargarUsuarios( this.desde ).subscribe
       (({total,usuarios})=>{
         this.totalUsuarios = total;
         this.usuarios = usuarios;
         this.usuariosTemp = usuarios;
         this.cargando = false;
            console.log( this.usuarios);
       })
  }

  buscar ( termino: string ){
    if( termino.length === 0){
      return this.usuarios = this.usuariosTemp

    }
    this.busquedaService.buscar('usuarios', termino ).subscribe(
    (resp : Usuario[])=>
        this.usuarios = resp
      )



  }

  eliminarUsuario( usuario:Usuario ){
    //para no poder borrarse a si mismo
    if ( usuario.uid === this.usuariosService.uid ) {
      return Swal.fire( 'Error','No puede borrarse a si mismo ','error')
    }

//dialogo predefinido en swetAlert2 y adaptado a la aplicacion
    Swal.fire({
      title: '¿Borrar Usuario?',
      text: `Esta a punto de eliminar a ${ usuario.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuariosService.eliminarUsuario( usuario ).subscribe(resp=>{
          this.cargarUsuarios();//para que se recargue la pagina y desaparezca el eliminado
          Swal.fire(
            'Borrado!',
            `${ usuario.nombre } fue eliminado correctamente`,
            'success'
          )
        });
      }
    })  }

  cambiarRole(usuario:Usuario){
       this.usuariosService.guardarUsuario( usuario ).subscribe(resp=>{

       })
    }

//MODAL PARA CAMBIAR IMAGEN--------------------------------------------
  abrirModal(usuario:Usuario){

    this.modalImagenService.abrirModal('usuarios',usuario.uid,usuario.img);

    }

abrirModalInforme( usuario: Usuario){


  this.modalInformeServices.abrirModalInforme('usuarios',usuario.uid,usuario.img);

}


}
