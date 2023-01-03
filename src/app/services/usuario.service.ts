import { RegisterForm } from './../interfaces/register-form-interface';
import { Injectable, ElementRef, ViewChild, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { LoginForm } from '../interfaces/login-form-interfaces';
import { tap, map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

//declare const gapi: any;
declare const google: any;

//viene de ../../environments/environment.prod
const base_url = environment.base_url;




@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  public auth2:any;

  //--------------------------------------------------------------

  validarToken(): Observable <boolean>{
    const token = localStorage.getItem( 'token') || '';
       return this.http.get( `${ base_url }/login/renew`,{
         headers: {
           'x-token':token
          }
        }).pipe(
          tap( (resp:any) => {
            localStorage.setItem('token' , resp.token)

          }),
          map( resp=> true ),
          //ver video de angular avanzado( proteger rutas de mi aplicacion )
          catchError( error => of(false))
        );
     }

  constructor( private http:HttpClient, private router: Router,private ngZone: NgZone) {
    //this.googleInit();
  }

/**NOTA: con el pipe tap desencadenamos un efecto secundario para
 *  guardar el token en localStorage
 * */


//--------------------------------------------------
  //RegisterForm es una interface
  crearUsuario( formData: RegisterForm ){

   /**Nota:
    * primer argumento de la peticion http ${base_url}/usuario es la url
    * y el segundo argumento es lo que queremos mandar
    *  */
   return this.http.post(`${base_url}/usuarios`, formData ).pipe(
            tap(( resp: any)=>{
                localStorage.setItem('token' , resp.token)
            })
         );
  }

//----------------------------------------------------
//LOGIN
/**Nota: en el post como primer argumento es la ruta y como segundo los datos
 *
 */
   login( formData: LoginForm ){
    return this.http.post(`${base_url}/login`, formData ).pipe(
      tap(( resp: any)=>{
        localStorage.setItem('token' , resp.token)
      })
    );
   }

//---------------------------------------------------------
//LOGIN GOOGLE
//LOGIN CON GOOGLE
loginGoogle( token: string ){
      return this.http.post( `${base_url}/login/google` , {token} ).pipe(
                tap(( resp: any)=>{
                    localStorage.setItem('token' , resp.token)
                })
          );
   }

//---------------------------------------------------

//LOGOUT
logout(){
  //elimina el token del usuario que esta conectado
  localStorage.removeItem('token');
  //para limpiar el recuadro de google y navegar al login
  google.accounts.id.revoke('reyesblanco1988@gmail.com',()=>{
    this.ngZone.run(()=>{
      this.router.navigateByUrl('/login');
    })

  })




}

}
