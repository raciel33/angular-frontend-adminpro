import { Component, OnInit } from '@angular/core';
import { SettingdService } from '../services/settingd.service';
import { SidebarService } from '../services/sidebar.service';

/*esta funcion esta <script src="./assets/js/custom.js"></script> en el index
en el custom.js se ha encapsulado toda la logica en la funcion customItemFunction() para
poder ejecutarla cuando se cargue la pagina y asi poder mostrar el componente correctamente
una vez que se hace el login

*/
declare function customInitFunction();


@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {



  constructor( private SettingdService: SettingdService,
              private sideService: SidebarService) { }

  ngOnInit(): void {
       customInitFunction();
       this.sideService.cargarMenu();//iniciamos el menu con lo que viene del SidebarService

}
}
