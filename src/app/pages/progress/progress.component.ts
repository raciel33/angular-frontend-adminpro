import { Component } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: [ './progress.component.css',
  ]
})
export class ProgressComponent  {


 progreso1: number = 5;
 progreso2: number = 5;
 progreso3: number = 5;


 //para concatenar el valor del progreso a % y utilizarlo en el html para establecer un ancho
 get getProgreso1(){
  return `${ this.progreso1}%`
}
//para concatenar el valor del progreso a % y utilizarlo en el html para establecer un ancho
get getProgreso2(){
  return `${ this.progreso2}%`
}
get getProgreso3(){
  return `${ this.progreso3}%`
}

valorar(){
  Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: 'Gracias por tu valoración',
    showConfirmButton: false,
    timer: 1500
  })
}
}
