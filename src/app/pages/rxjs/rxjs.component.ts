import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Observable, Subscription } from 'rxjs';
import { filter, map, retry, take } from 'rxjs/operators';


@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnDestroy {

  //utilizamos una propiedad para poder destruir el observable
  public intervalSubs: Subscription;

  constructor() {

   /* this.retornaObservable().pipe(
      retry(1)//intentara ejecutar el observable  1 vez en caso de error
    ).
    subscribe(
       valor => console.log ( 'valor ' , valor),//next del obervable
       err => console.warn ( 'error', err ),//error del obervable
       ()=>console.info ( "Obd$ terminado ")//complete del obervable
    );
*/
    this.intervalSubs =  this.retornaIntervalo().subscribe(
      console.log
     )
  }

 //cuando salgo del componente se destruye el observable
 ngOnDestroy(): void {

     this.intervalSubs.unsubscribe()
 }


retornaIntervalo(){

  //NOta:hay que tener en cuenta el orden de los operators

   const interval$ = interval( 100 )

   .pipe( //creacion de un intervalo donde el valor será cada periodo

    take(10), //tomamos los 10 primeros

    map( valor=> { return valor + 1 }), // indicamos que empieze por el 1

    filter( valor =>( valor % 2 === 0) ? true: false ), // filtra los valores que son pares


    );

   return interval$
}




  retornaObservable(): Observable<number>{

    let i = -1;


    const obd$ = new Observable<number>( observe => {


     const intervalo = setInterval (()=>{

        i++;
         observe.next ( i );//lo proximo que emite el observable

         if( i === 4 ){

          clearInterval ( intervalo );

          observe.complete()//completa el obervable y finaliza
         }

         if( i === 2){
          console.log( 'error en i ==2 ')
          observe.error( "llego al valor de 2 "); // emite un error aqui
         }

      },1000)
    });

    return obd$

  }


}
