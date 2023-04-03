import { MedicosService } from './../../../services/medicos.service';
import { Hospital } from './../../../models/hospital.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HospitalServiceService } from '../../../services/hospital-service.service';
import { Medico } from '../../../models/medicos.model';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { CitasService } from '../../../services/citas.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [
  ]
})
export class MedicoComponent implements OnInit,OnDestroy {

  public medicoForm: FormGroup;
  public hospitales : Hospital [] = [];//aqui se van almacenar los hospitales de cargarHospitales()
  public hospitalSeleccionado : Hospital;
  public medicoSeleccionado: Medico;
 // public especialidad:[]= [];

  constructor( private fb: FormBuilder,
    private hospitalService:HospitalServiceService,
    private medicoService: MedicosService,
    public citasService: CitasService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private modalImagenService:ModalImagenService) { }
    private imgSubs: Subscription;

   ngOnDestroy(){
      this.imgSubs.unsubscribe()
                 }



  ngOnInit(): void {
    //captamos el parametro del medico por id
      this.activateRoute.params.subscribe( ({ id }) =>{

          this.cargarMedico(id);

       //para que se refresque actualice la imagen automaticamente cuando la cambiamos
          this.imgSubs = this.imgSubs = this.modalImagenService.nuevaImagen.
                   pipe(
                     delay(100)//retardamos un poco pa que de tiempo la carga
                   )
                   .subscribe(img=> this.cargarMedico(id))

      })

   //------------------------------------------
    this.medicoForm = this.fb.group({
      nombre: ['', Validators.required ],
      especialidad:['',Validators.required],
      hospital: ['', Validators.required ],
    });
    //---------------------------
    this.cargarHospitales();

    //-----------------------------------------------
    /*como es un formulario reactivo podemos crear un observable que detecte los cambios en este campo
    **NOTA :
    [value]="hospital._id" determinado en el select del html como valor del campo por tanto:
    ____this.medicoForm.get( 'hospital' ).valueChanges.subscribe( hospital_id) devuelve el id del hospital que esta en el select
    ____ this.hospitales.find( h => h._id === hospital_id) devuelve el resultado del hospital al hacer match los dos id
    */
    this.medicoForm.get( 'hospital' ).valueChanges.subscribe( hospital_id => {

       this.hospitalSeleccionado = this.hospitales.find( h => h._id === hospital_id);
       //console.log(this.hospitalSeleccionado);

    })


    //----------HASTA AQUI EL ngOINIT-----------------------------------------

  }

  //-FUNCION QUE DEVUELVE UN MEDICO ESPECIFICO------------------------------------------
  cargarMedico( id: string){

    //si se va crear un medico nuevo va directo a la pantalla de crearlo sin tener en cuenta ningun id
    if( id==='nuevo'){
      return
    }

    this.medicoService.cargarMedicoPorID( id ).
    //le damos un pequeño retraso para que le de tiempo de cargar toda la informacion correctamente
       pipe(
         delay(100)
    ).subscribe( medico=>{

      //si el id del medico no existe redirige a la pantalla de los medicos
      if(!medico){
        return this.router.navigateByUrl(`dashboard/medicos`)

      }
       //desestrucuramos de la respuesta el nombre del medico y el _id del hospital
      const { nombre, especialidad, hospital:{ _id} } = medico;

      // console.log(nombre,_id);

       this.medicoSeleccionado = medico;

       /*le asignamos al formulario de medico los valores desestruturados para que carge
       automaticamente estos valores al editar un medico
        */
       this.medicoForm.setValue({ nombre, especialidad, hospital: _id})
    })

  }

  //funcion que muestra los hospitales
  cargarHospitales(){
    this.hospitalService.cargarHospitales().subscribe( (hospitales: Hospital []) =>{
     this.hospitales = hospitales;
    })
  }


  abrirModal(medico:Medico){

    this.modalImagenService.abrirModal('medicos', medico._id, medico.img)

  }

  guardarMedico(){

    const { nombre } = this.medicoForm.value;

    if ( this.medicoSeleccionado ) {
      //si existe el medico seleccionado hay que actualizar

      //desestructuramos el formulario y el id del medico seleccionado
      const data = {
        ...this.medicoForm.value,
        _id: this.medicoSeleccionado._id

      }
      this.medicoService.actualizarMedico( data ).subscribe(resp=>{
        Swal.fire(' Actualizado ', `${ nombre } actualizado correctamente`, 'success');

      })

    } else {
      //si no existe el medico seleccionado hay que crearlo

      this.medicoService.crearMedico( this.medicoForm.value ).subscribe( (resp: any)=>{
         Swal.fire(' Creado ', `${ nombre } creado correctamente`, 'success');
         this.router.navigateByUrl(`dashboard/medico/${resp.medico._id}`)
       })
    }


  }


}
