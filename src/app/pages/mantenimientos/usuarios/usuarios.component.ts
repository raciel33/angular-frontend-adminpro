import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../models/usuario.model';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit {

  public totalUsuarios:number = 0;
  public usuarios:Usuario [] = [];

  constructor(private usuariosService:UsuarioService) { }

  ngOnInit(): void {
    //desestructuramos la respuesta
    this.usuariosService.cargarUsuarios(0).subscribe(({total,usuarios})=>{
          this.totalUsuarios = total;
          this.usuarios = usuarios
    })
  }

}
