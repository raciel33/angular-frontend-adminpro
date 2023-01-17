import { Component } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';

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

  constructor( private usuarioService: UsuarioService) {

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

  ngOnInit(): void {

  }

}
