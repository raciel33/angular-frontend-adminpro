import { Component, OnInit } from '@angular/core';
import { Citas } from '../../models/citas.model';
import { CitasService } from '../../services/citas.service';
import { ActivatedRoute } from '@angular/router';
import { HospitalServiceService } from '../../services/hospital-service.service';
import { Hospital } from '../../models/hospital.model';

@Component({
  selector: 'app-citas-hospital',
  templateUrl: './citas-hospital.component.html',
  styleUrls: ['./citas-hospital.component.css']
})
export class CitasHospitalComponent implements OnInit {

  public citas:Citas[] = [];
  public id;
  public hospital : string;

  constructor( public citasServices: CitasService , private activateRoute:ActivatedRoute,
    private hospitalService:HospitalServiceService) { }

  ngOnInit(): void {

  this.cargarHospital();
    this.cargarCitas();
   //captamos el parametro de la url y se lo mandamos a la funcion
    this.activateRoute.params.subscribe(({ id })=>{
          this.id = id;
          })

  }


  cargarCitas(){

    this.citasServices.cargaCitas().subscribe(({citas}) => {

      this.citas = citas;

    }
    )

  }
cargarHospital(){

  this.hospitalService.cargarHospitales().subscribe( (hospitales: Hospital []) =>{

    for (let i = 0; i < hospitales.length; i++) {
         if( this.id === hospitales[i]._id){
          this.hospital = hospitales[i].nombre

         }
    }
  })
}

}
