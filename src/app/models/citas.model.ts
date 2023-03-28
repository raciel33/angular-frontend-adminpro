import { environment } from './../../environments/environment';
import { Usuario } from './usuario.model';
import { Hospital } from './hospital.model';

const   base_url = environment.base_url;

/*interface _citasUser{
   _id: string,
   nombre: string;

}*/

export class Citas{

      constructor(
       public _id: string,
       public especialidad :string,
       public fecha: Date,
       public hora:string,
       public usuario:Usuario,
       public hospital?:Hospital,

      ){

      }}
