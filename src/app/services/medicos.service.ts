import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Medico } from '../models/medicos.model';

const base_url = environment.base_url

@Injectable({
  providedIn: 'root'
})
export class MedicosService {


    //Para extraer el token
get token():string{
  return localStorage.getItem( 'token') || '';
}


  //para extraer los headers(token)
get headers(){
  return {
    headers: {
      'x-token':this.token //el this.token esta en la funcion get token()
     }
   }
}

  constructor( private http:HttpClient) { }

  cargarMedicos(){

    const url = `${ base_url}/medicos`//ruta definida en el backend(postman)

    //retornamos la ruta y los headers(token)
    return this.http.get( url ,this.headers)
    .pipe(
      //para crear una instancia del modelo de usuario que acceda a sus propiedades y sus metodos
      map((resp: {ok: boolean, medicos: Medico[]} )=> resp.medicos)
    )
      }

 cargarMedicoPorID( id ){

  const url = `${ base_url }/medicos/${ id }`;//ruta definida en el backend(postman)

   //retornamos la ruta , la data y los headers(token)
   return this.http.get( url , this.headers).pipe(
    //para crear una instancia del modelo de usuario que acceda a sus propiedades y sus metodos
    map((resp: {ok: boolean, medico: Medico} )=> resp.medico)
  )

 }

 crearMedico( medico: { nombre:string, hospital:string } ){

        const url = `${ base_url }/medicos`;//ruta definida en el backend(postman)

        //retornamos la ruta , la data y los headers(token)
        return this.http.post( url ,  medico , this.headers)


      }


actualizarMedico( medico: Medico){

        const url = `${ base_url }/medicos/${ medico._id }`;//ruta definida en el backend(postman)

        //retornamos la ruta , la data y los headers(token)
        return this.http.put( url ,  medico , this.headers)


      }

eliminarMedico( _id:string ){

        const url = `${ base_url }/medicos/${_id}`;//ruta definida en el backend(postman)

        //retornamos la ruta  y los headers(token)
        return this.http.delete( url , this.headers)


      }

  }



