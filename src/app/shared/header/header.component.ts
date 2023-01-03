import { Component } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';

declare const google: any;


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})

export class HeaderComponent  {
    button: any;

  constructor( private usuarioService: UsuarioService) { }

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
