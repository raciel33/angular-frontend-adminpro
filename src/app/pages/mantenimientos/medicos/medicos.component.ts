import { MedicosService } from './../../../services/medicos.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Medico } from '../../../models/medicos.model';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { delay } from 'rxjs/operators';
import { BusquedasService } from '../../../services/busquedas.service';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { Hospital } from '../../../models/hospital.model';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit ,OnDestroy{

  public medicos: Medico [] = [];
  public medicosTemp : Medico [] = []
  public cargando: boolean = true;    //para el logo de cargar
  private imgSubs: Subscription;


  constructor( private medicosService: MedicosService,
                    private modalImagenService: ModalImagenService,
                    private busquedaService: BusquedasService) { }


  ngOnDestroy(){
         this.imgSubs.unsubscribe()
                    }

  ngOnInit(): void {

    this.cargarMedicos();

    //para que se refresque actualice la imagen automaticamente
   this.imgSubs = this.imgSubs = this.modalImagenService.nuevaImagen.
    pipe(
      delay(100)//retardamos un poco pa que de tiempo la carga
    )
    .subscribe(img=> this.cargarMedicos())
  }


  cargarMedicos(){
    this.cargando = true;

    this.medicosService.cargarMedicos().subscribe( (resp: any)=>{
      this.cargando = false;

      this.medicos = resp;//almacenamos en el nuestro array la respuesta que viene del backend

      console.log(this.medicos);
    })
  }



  abrirModal(medico : Medico){

    this.modalImagenService.abrirModal('medicos', medico._id, medico.img)

  }


 buscar ( termino: string ){
    if( termino.length === 0){
      this.cargarMedicos();
      return this.medicos = this.medicosTemp

    }

    this.busquedaService.buscar('medicos', termino ).subscribe(
    resp=>{
        this.medicos = resp
    }
      )
  }

 eliminarMedico( medico:Medico){

  //dialogo predefinido en swetAlert2 y adaptado a la aplicacion
    Swal.fire({
       title: '¿Borrar Medico?',
       text: `Esta a punto de eliminar a ${ medico.nombre}`,
       icon: 'question',
       showCancelButton: true,
       confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, borrar'
     }).then((result) => {
      if (result.isConfirmed) {
        this.medicosService.eliminarMedico(medico._id).subscribe(
          resp=>{
           this.cargarMedicos();
           Swal.fire('Borrado', medico.nombre,'success')
       }
    )
      Swal.fire(
        'Borrado!',
        `${ medico.nombre } fue eliminado correctamente`,
        'success'
      )
    }
  })
  }
}
