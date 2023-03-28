import { Component, OnInit } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { Hospital } from '../../models/hospital.model';
import { HospitalServiceService } from '../../services/hospital-service.service';



@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})

export class Grafica1Component implements OnInit{

  public hospitales: Hospital[] = []
  public num: number;

  constructor( public hospitalService: HospitalServiceService){
  }

  ngOnInit(): void {

    this.hospitalService.cargarHospitales().subscribe( resp=> {
      this.hospitales = resp;
    })

    this.num = Math.random()

  }



  //para la grafica de dona
 public anyos: string []= ['2019', '2020', '2021','2022'];

  public labels1: string []= ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  public labels2: string []= ['compras', 'In-Store Sales', 'Mail-Order Sales'];

  public data1  = [
    [800, 450, 100],

  ];
  public data2  = [
    [900, 10, 200],

  ];
  public dataDonacion  = [
    [3000, 3500, 4200,3900],

  ];
  public plazasHospitalarias  = [
    [25000, 32000, 40000,90000],

  ];
//grafica de barra
 public dataTransplantes= [100, 120, 80,150]
;




}
