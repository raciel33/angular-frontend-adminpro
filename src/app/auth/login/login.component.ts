import { UsuarioService } from './../../services/usuario.service';
import { Component, AfterViewInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';

declare const google :any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css'
  ]
})
export class LoginComponent implements AfterViewInit {

  @ViewChild( 'googleBtn') googleBtn: ElementRef;//Hace referncia al boton de google

 //para ver si el formulario ha sido submit

     public formSubmitted = false;

     //definimos los campos del formulario y establecemos las validaciones
     public loginForm = this.fb.group({

      /* va predefinido en el campo email lo que tenemos en el campo email del localStorage
      o de lo contrario un string vacio: localStorage.getItem('email') || ''*/

       email: [localStorage.getItem('email') || '',[Validators.required, Validators.email]],
       password: ['', Validators.required],
       remember:[false]

     })

  constructor( private router: Router,private fb:FormBuilder,
               private usuarioService:UsuarioService, private ngZone:NgZone)
               { }


 //AUTENTICACION CON GOOGLE
 //------------------------------------------------------------------------
 ngAfterViewInit():void{
   this.googleInit();
               }

  googleInit(){
    //Esto viene de google
    google.accounts.id.initialize({
      //aqui va el cliente_id que tenemos en los env.
      client_id: "1043557574365-qa8ia97sb1q75vn4eur405137gn2geft.apps.googleusercontent.com",
      callback: (response) => this.handleCredentialResponse(response)
  });

  google.accounts.id.renderButton(
      this.googleBtn.nativeElement, {
          theme: "outline",
          size: "large"
        }
  )
      }
      //nos subscribimos al servivio para la autenticacion
      handleCredentialResponse( response :any){
           console.log("Encoded JWT ID token: " + response.credential);
          this.usuarioService.loginGoogle ( response.credential ).subscribe( resp=>{
            //console.log( {login: resp })
            this.ngZone.run(()=>{
              this.router.navigateByUrl('/');
            })
          })
  }


   //------------------------------------------------------------------------
//login normal con usuario y contraseña

  login(){

   this.usuarioService.login(this.loginForm.value).subscribe(resp=>{
    /**si al hacer el login el remember es true guarda el
     * email en el localStorage
     * */
      if ( this.loginForm.get( 'remember' ).value ) {
        localStorage.setItem( 'email' , this.loginForm.get('email').value );
      } else {
        //en caso contrario borra la propiedad email almacenada en el localStorage
        localStorage.removeItem('email');
      }
         // Navegar al Dashboard
         this.router.navigateByUrl('/');

    //si hay algun error
  },(err)=>{
    Swal.fire('Error',err.error.msg, 'error');

  });

  }
}
