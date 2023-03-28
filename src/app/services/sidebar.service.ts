import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  /**NOTA: el tratamiento del menu esta en el backend y se graba desde ahi en el localStorage con el objetivo
   * de mostrar opciones del menu en dependencia del role del usuario
   */

  public menu = [] ;

  cargarMenu(){

    //el menu se carga de la informacion que hay en el localStorage y como viene string se parsea para meterlo en el array

   // this.menu = JSON.parse(localStorage.getItem('menu')) || []; esto lo tengo que arreglar para porque se queda almacenado en el localStorage y no me permite cambios en el backend
   this.menu = [
     {
       titulo: 'Dashboard',
       icono: 'mdi mdi-gauge',
       submenu : [
         { titulo: 'Inicio', url: 'inicio'},
         { titulo: 'Donación', url: 'progress'},
         { titulo: 'Estadisticas', url: 'grafica1'},

       ]

     },
     {
       titulo: 'Zona restringida',
       icono: 'mdi mdi-folder-lock-open',
       submenu : [
         { titulo: 'Usuarios', url: 'usuarios'},
         { titulo: 'Hospitales', url: 'hospitales'},
         { titulo: 'Medicos', url: 'medicos'}


       ]

     }
   ]
  }


  constructor() { }
}
