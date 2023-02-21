import { environment } from './../../environments/environment';

const   base_url = environment.base_url;


export class Usuario{

      constructor(
       public nombre :string,
       public email:string,
       public password?:string,
       public img?:string,
       public role?:'ADMIN_ROLE' | 'USER_ROLE',//tipos de role
       public google?:boolean,
       public uid?:string,
      ){

      }

      //si la imagen existe muestrala y sino muestra la imagen por defecto
    get imagenUrl(){

      //si no existe la imagen
      if( !this.img){
        return `${ base_url }/uploads/usuarios/not-image`;
      }
       //si viene de google el path viene con https
     else if(this.img.includes('https')){
        return this.img;
      }
      //si viene de validacion por email
     else if (this.img ) {
          return `${ base_url }/uploads/usuarios/${ this.img }`;
        } else {
          return `${ base_url }/uploads/usuarios/not-image`;
        }

      }
}
