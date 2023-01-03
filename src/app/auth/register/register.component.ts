import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2'


import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['.//register.component.css'
  ]
})
export class RegisterComponent implements OnInit {

  //para ver si el formulario ha sido submit
  public formSubmitted = false;

  //definimos los campos del formulario y establecemos las validaciones
  public registerForm = this.fb.group({
    nombre: ['',[ Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    password2: ['', Validators.required],
    terminos: [false, Validators.required],
  },{
    validators: this.passwordIguales( 'password', 'password2')
  })

  constructor( private fb: FormBuilder, private UsuarioService:UsuarioService,
    private router:Router)
   { }
//------------------------------------------------------------------------------
  crearUsuario(){

    this.formSubmitted = true;
    console.log( this.registerForm.value);

     //si el formulario es invalido
    if( this.registerForm.invalid){
      return;
    }
    //si el formulario es valido nos subscibimos al servicio para crear el usuario
    this.UsuarioService.crearUsuario( this.registerForm.value ).subscribe( resp =>{
      console.log('usuario creado');
      console.log( resp );
      //cuando creeemos el usuario navegar al dashboard
      this.router.navigateByUrl( '/')

    },(err) =>{

    //uso del swetAlert2 para mostrar el error en un modal

    Swal.fire( 'Error',  err.error.msg, 'error')

  })
  }

  campoNoValido( campo: string ): boolean{
    /**si el campo no cumple las validaciones definidas en registerForm y se envia
     * el formulario muestra el texto con el error en el html
     */
   if ( this.registerForm.get(campo).invalid && this.formSubmitted){
    return true;
   }else{
    return false;
   }
  }
  //-------------------------------------------------------------------------------
  //verificacion de contraseñas
  contrasenyasNoValidas(){

    //extraemos los valores de las contraseñas
    const pass1 = this.registerForm.get('password').value;
    const pass2 = this.registerForm.get('password2').value;

    //si las contraseñas son distintas y el formulario enviado mostrara el error
    if ((pass1 !== pass2) && this.formSubmitted) {
        return true;
    } else {
      return false;
    }

  }
//--------------------------------------------------------------------------------
 //video 165 de udemy angular avanzado explica esto
passwordIguales(pass1Name, pass2Name){

        return( formGroup: FormGroup )=>{
          const pass1Control =  formGroup.get( pass1Name );
          const pass2Control =  formGroup.get( pass2Name );

          if ( pass1Control.value === pass2Control.value ) {
            pass2Control.setErrors( null)
          }else{
            pass2Control.setErrors({noEsIgual: true})
          }

        }
  }
//-----------------------------------------------------------------------
  //validacion del check
  aceptaTermino(){
    return !this.registerForm.get('terminos').value && this.formSubmitted;
  }

  ngOnInit(): void {
  }

}
