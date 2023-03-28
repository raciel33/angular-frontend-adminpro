import { Component, OnInit } from '@angular/core';
import { HospitalServiceService } from '../../services/hospital-service.service';
import { Hospital } from '../../models/hospital.model';

@Component({
  selector: 'app-ver-hospitales-user',
  templateUrl: './ver-hospitales-user.component.html',
  styleUrls: ['./ver-hospitales-user.component.css']
})
export class VerHospitalesUserComponent implements OnInit {

  public hospitales:Hospital [] = [];


  constructor(public hospitalesServices: HospitalServiceService ) { }

  ngOnInit(): void {

    this.hospitalesServices.cargarHospitales().subscribe( resp =>{
          this.hospitales = resp;
    })
  }

}
