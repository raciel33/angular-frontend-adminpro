import { Component,Input,Output,EventEmitter,OnInit} from '@angular/core';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [
  ]
})
export class IncrementadorComponent implements OnInit {

 @Input() progreso: number = 45 ;
 @Input() btnClass: string = 'btn-primary' ;

 @Output() valorSalida: EventEmitter<number> = new EventEmitter();




  cambiarValor( valor:number){

    if ( this.progreso >= 100 && this.progreso >= 0){
      this.valorSalida.emit ( 100 );
      return this.progreso = 100;
    }

    if ( this.progreso <= 0 && this.progreso < 0){
      this.valorSalida.emit ( 0 );
      return this.progreso = 0
    }


    this.progreso = this.progreso + valor;
    this.valorSalida.emit ( this.progreso );

  }

  //controlamos que el valor que escribimos este entre 0 y 100
  onChange(valor:number){

    if( valor >= 100){
      this.progreso = 100;
    }else if( valor <= 0 ){
      this.progreso = 0;
    }else{
      this.progreso = valor
    }

    this.valorSalida.emit ( this.progreso )
  }

  ngOnInit(): void {
      this.btnClass = `btn  ${ this.btnClass }`
  }

}
