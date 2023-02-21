import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor( private usuarioService:UsuarioService,
               private router:Router){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean{

      //NOTA: esta restriccion en la ruta se establece en pages.routing aplicandose a UsuariosComponent

      //si el role del usuario es ADMIN_ROLE  dejalo acceder a todas la rutas
      if ( this.usuarioService.role === 'ADMIN_ROLE'){
        return true;

      }else{
        //si no es ADMIN_ROLE mandalo al dashboard
        this.router.navigateByUrl('/dashboard')
         return false;
      }
  }

}
