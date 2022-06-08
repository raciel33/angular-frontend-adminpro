import { Component } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: [ './progress.component.css',
  ]
})
export class ProgressComponent  {


 progreso1: number = 25;
 progreso2: number = 45;

 //para concatenar el valor del progreso a % y utilizarlo en el html para establecer un ancho
 get getProgreso1(){
  return `${ this.progreso1}%`
}
//para concatenar el valor del progreso a % y utilizarlo en el html para establecer un ancho
get getProgreso2(){
  return `${ this.progreso2}%`
}


}
