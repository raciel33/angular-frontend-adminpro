import { environment } from './../../environments/environment';

const   base_url = environment.base_url;


export class Usuario{

      constructor(
       public nombre :string,
       public email:string,
       public password?:string,
       public img?:string,
       public role?:string,
       public google?:boolean,
       public uid?:string,
      ){

      }

      //si la imagen existe muestrala y sino muestra la imagen por defecto
    get imagenUrl(){
       //si viene de google el path viene con https
     if(this.img.includes('https')){
        return this.img;
      }
     if (this.img ) {
          return `${ base_url }/uploads/usuarios/${ this.img }`;
        } else {
          return `${ base_url }/uploads/usuarios/not-image`;
        }

      }
}
