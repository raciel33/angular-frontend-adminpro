import { Hospital } from './../../../models/hospital.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { HospitalServiceService } from '../../../services/hospital-service.service';
import Swal from 'sweetalert2';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { delay } from 'rxjs/operators';
import { BusquedasService } from '../../../services/busquedas.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit,OnDestroy {

  public hospitales: Hospital [] = [];
  public cargando: boolean = true;    //para el logo de cargar
  hospitalesTemp :Hospital []= [];
  private imgSubs:Subscription;


  constructor( private hospitalService:HospitalServiceService,
    private modalImagenService: ModalImagenService,
    private busquedaService:BusquedasService
    ) { }

  ngOnDestroy(){
      this.imgSubs.unsubscribe()
                 }

  ngOnInit(): void {

    this.cargarHospitales();
    //para que se refresque actualice la imagen automaticamente
    this.imgSubs = this.imgSubs = this.modalImagenService.nuevaImagen.
    pipe(
      delay(100)//retardamos un poco pa que de tiempo la carga
    )
    .subscribe(img=> this.cargarHospitales())
  }

  cargarHospitales(){
    this.cargando = true;

    this.hospitalService.cargarHospitales().subscribe( resp=>{

      this.cargando = false;

      this.hospitales = resp;//almacenamos en el nuestro array la respuesta que viene del backend

    })
  }

  guardarCambios( hospital: Hospital ){

    this.hospitalService.actualizarHospitales( hospital._id, hospital.nombre ).subscribe(
      resp=>{
        Swal.fire('Actualizado', hospital.nombre,'success')
      }
    )

  }


eliminarHospital( hospital:Hospital ){

//dialogo predefinido en swetAlert2 y adaptado a la aplicacion
    Swal.fire({
      title: '¿Borrar Hospital?',
      text: `Esta a punto de eliminar a ${ hospital.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.hospitalService.eliminarHospitales( hospital._id).subscribe(
          resp=>{
            this.cargarHospitales();
            Swal.fire('Borrado', hospital.nombre,'success')
          }
        )
          Swal.fire(
            'Borrado!',
            `${ hospital.nombre } fue eliminado correctamente`,
            'success'
          )
        }
      })
    }


async abrirSwetAlert(){

         const { value = '' } = await Swal.fire<string>({
           title: 'Crear Hospital',
           text: 'Ingrese el nombre del nuevo hospital',
           input: 'text',
           inputPlaceholder: 'Nombre del hospital',
          showCancelButton:true,
         });

         if( value.trim().length > 0 ){
            this.hospitalService.crearHospitales( value ).
            subscribe( (resp: any )=>{
               this.hospitales.push ( resp.hospital )//viene del backend
            })
         }

  }

  abrirModal( hospital:Hospital){
    this.modalImagenService.abrirModal('hospitales',hospital._id, hospital.img);

  }

  buscar ( termino: string ){
    if( termino.length === 0){
      this.cargarHospitales();
      return this.hospitales = this.hospitalesTemp

    }
    this.busquedaService.buscar('hospitales', termino ).subscribe(
    resp=>
        this.hospitales = resp
      )



  }
}
