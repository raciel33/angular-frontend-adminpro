import { Component } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';
import { Router } from '@angular/router';

declare const google: any;


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})

export class HeaderComponent  {

   public usuario : Usuario; //variable del tipo del modelo

    button: any;

  constructor( private usuarioService: UsuarioService,
                  private router:Router) {

        this.usuario = usuarioService.usuario;


   }

  //funcion para salir
  logout(){
      this.button = document.getElementById('signout_button');
      this.button.onclick = () => {
      google.accounts.id.disableAutoSelect();
    }
     this.usuarioService.logout();
  }

 //funcion para busqueda global en todas las collections
 buscar (termino: string){

  //si no escribe nada en el input de busqueda salir al dashboard
  if( termino.length === 0 ){
   return;
  }
    //console.log(termino);
    this.router.navigateByUrl(`/dashboard/buscar/${ termino }`);
 }

}
