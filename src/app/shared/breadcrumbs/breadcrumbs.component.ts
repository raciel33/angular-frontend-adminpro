import { filter, map } from 'rxjs/operators';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnDestroy {

  public titulo: string ;
  public tituloSubs$: Subscription ;

  constructor( private router: Router) {
      this.tituloSubs$ = this.getParametroRuta().
                              subscribe ( data =>{ //nos subscribimos a la data que viene del map

                                 console.log ( data )

                                 this.titulo = data.titulo //!!ya tenemos el parametro de la ruta
                                 document.title = `AdminPro - ${data.titulo}`// para el titulo que aparece en la ventana

                                   /**Nota : se puede desestructurar la data asi:
                                 *
                                 *  subscribe ( ({ titulo }) =>{ //
                                      this.titulo = titulo

                                }
                                  */
                              }


        );
   }



   getParametroRuta(){

    // this.router.events : es un observable en el podemos acceder al parametro de la ruta establecido en ( pages.routing.ts)
   return this.router.events.
             pipe(
               filter( event => event instanceof ActivationEnd),// filtramos para coger los ActivationEnd donde esta el parametro que queremos obtener ( pertence al router )
               filter( ( event: ActivationEnd ) => event.snapshot.firstChild === null ), //nos salen dos ActivationEnd ( filtramos para coger el padre)
               map( ( event: ActivationEnd ) => event.snapshot.data ), //tomamos la data
             )

   }

  ngOnDestroy(): void {

    this.tituloSubs$.unsubscribe();

  }

}
