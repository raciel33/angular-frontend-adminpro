import { RegisterForm } from './../interfaces/register-form-interface';
import { Injectable, ElementRef, ViewChild, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { LoginForm } from '../interfaces/login-form-interfaces';
import { tap, map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';

//declare const gapi: any;
declare const google: any;

//viene de ../../environments/environment.prod
const base_url = environment.base_url;




@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  /**nota: cuando defimos   public usuario: Usuario lo que hacemos es crear una constante
   * de tipo Usuario si queremos una instancia de tipo Usuario que acceda a todos sus propiedades y metodos
   * hay que utilizar el new
   */

  public auth2:any;
  public usuario: Usuario;

  //--------------------------------------------------------------
//Para extraer el token
get token():string{
  return localStorage.getItem( 'token') || '';
}

//para extraer el uid del usuario
get uid():string{
  return this.usuario.uid || '';
}
//----------------------------------------------------------
  validarToken(): Observable <boolean>{
       return this.http.get( `${ base_url }/login/renew`,{
         headers: {
           'x-token':this.token //el this.token esta en la funcion get token()
          }
        }).pipe(
          map( (resp:any) => {
            console.log(resp);
//nota: el  resp.usuarioBD viene del backend-server
//nota: a la imagen le ponemos = '' para que mno aparzca el error si viene vacia por undefined
         const {nombre, email, img = '' , role, google ,uid } = resp.usuarioBD;
         this.usuario = new Usuario( nombre, email, '', img, role, google ,uid ) ;
            localStorage.setItem('token' , resp.token);

            return true

          }),
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

actualizarPerfil( data:{ email:string,nombre:string, role:string }){

  /**como el role es required indicamos que la data sera lo que viene como argumento
   * como el role predefinido el usuario
   */
  data = {
    ...data,
    role: this.usuario.role
  }

  //actualizacion: se pasa la url completa con el uid y la data que viene como argumento
  //nota: se especifica el token

  return this.http.put(`${base_url}/usuarios/${ this.uid }`, data ,{
    headers: {
      'x-token':this.token //el this.token esta en la funcion get token()
     }
   })


}

//LOGIN
/**Nota: en el post como primer argumento es la ruta y como segundo los datos
 *
 */
   login( formData:LoginForm ){
    return this.http.post(`${base_url}/login`,formData).pipe(
      tap(( resp: any)=>{
        localStorage.setItem('token', resp.token)
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
