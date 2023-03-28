import { Component, OnInit } from '@angular/core';
import { Citas } from '../../models/citas.model';
import { CitasService } from '../../services/citas.service';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';
import { Hospital } from '../../models/hospital.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HospitalServiceService } from '../../services/hospital-service.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { MatCalendarCellClassFunction } from '@angular/material/datepicker';

@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.css']
})
export class CitasComponent implements OnInit {

  public citas:Citas[] = [];
  public usuario : Usuario; //variable del tipo del modelo
  public hospital_id:string;
  public hospitales : Hospital [] = [];//aqui se van almacenar los hospitales de cargarHospitales()
  public citasForm: FormGroup;
  private citaSubs:Subscription;
  //para ver si el formulario ha sido submit
  public formSubmitted = false;
  public existeCita: boolean;

  selected: Date | null;






  constructor( public citasServices: CitasService,
    private usuarioService: UsuarioService,
    private hospitalService:HospitalServiceService,
    private fb: FormBuilder,
    private router: Router,
    ) {
       this.usuario = usuarioService.usuario;

   }

  ngOnInit(): void {
       this.cargarCitas();
       this.cargarHospitales();

      //para el form del modal de pedirCita
       this.citasForm = this.fb.group({
          especialidad: ['', Validators.required ],
          fecha: ['', Validators.required ],
          hora: ['', Validators.required ],
          hospital: ['', Validators.required ],

     });




  }

  cargarCitas(){

    this.citasServices.cargaCitas().subscribe(({citas}) => {

      this.citas = citas;

    }
    )

  }
//funcion que muestra los hospitales
cargarHospitales(){
  this.hospitalService.cargarHospitales().subscribe( (hospitales: Hospital []) =>{
   this.hospitales = hospitales;
  })
}



  abrirModalCita(){
    this.citasServices.abrirModalCita()
  }

  cerrarModalCita(){
    this.citasServices.cerrarModal()
  }

  campoNoValido( campo: string ): boolean{
    /**si el campo no cumple las validaciones definidas en citasForm y se envia
     * el formulario muestra el texto con el error en el html
         */
       if ( this.citasForm.get(campo).invalid && this.formSubmitted){
        return true;
       }else{
        return false;
       }
  }


  crearCita(){
    this.formSubmitted = true;
      //si el formulario es invalido
      if( this.citasForm.invalid){
        return;
      }

    this.citasServices.crearCita( this.citasForm.value ).subscribe( (resp:any) => {
      Swal.fire(' Creado ', `Cita creada correctamente`, 'success');
      this.cerrarModalCita();
        this.ngOnInit();
    })

  }

borrarCita( id:string ){

//dialogo predefinido en swetAlert2 y adaptado a la aplicacion
     Swal.fire({
       title: '¿Borrar Cita?',
       text: `Esta a punto de eliminar esta cita`,
       icon: 'question',
       showCancelButton: true,
       confirmButtonColor: '#3085d6',
       cancelButtonColor: '#d33',
       confirmButtonText: 'Si, borrar'
     }).then((result) => {
        if (result.isConfirmed) {
          this.citasServices.eliminarCita(id).subscribe(
            resp=>{
              this.cargarCitas();
              Swal.fire('Borrado', 'Cita eliminada','success')
            }
          )
      Swal.fire(
        'Borrado!',
        `La cita fue eliminado correctamente`,
        'success'
      )

    }
  })

  }



}
