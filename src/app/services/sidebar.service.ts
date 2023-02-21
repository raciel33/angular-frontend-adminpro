import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  /**NOTA: el tratamiento del menu esta en el backend y se graba desde ahi en el localStorage con el objetivo
   * de mostrar opciones del menu en dependencia del role del usuario
   */

  public menu = [];

  cargarMenu(){
    //el menu se carga de la informacion que hay en el localStorage y como viene string se parsea para meterlo en el array
    console.log('esto viene con error  '+  this.menu);

    this.menu = JSON.parse(localStorage.getItem('menu'));
     console.log('esto viene con error  '+  this.menu);
  }

 /* menu:any [] = [
    {
      titulo: 'Dashboard',
      icono: 'mdi mdi-gauge',
      submenu : [
        { titulo: 'Main', url: '/'},
        { titulo: 'ProgressBar', url: 'progress'},
        { titulo: 'Graficas', url: 'grafica1'},
        { titulo: 'Promesas', url: 'promesas'},
        { titulo: 'Rxjs', url: 'rxjs'},


      ]

    },
    {
      titulo: 'Mantenimientos',
      icono: 'mdi mdi-folder-lock-open',
      submenu : [
        { titulo: 'Usuarios', url: 'usuarios'},
        { titulo: 'Hospitales', url: 'hospitales'},
        { titulo: 'Medicos', url: 'medicos'}


      ]

    }
  ]

  constructor() { }*/
}
