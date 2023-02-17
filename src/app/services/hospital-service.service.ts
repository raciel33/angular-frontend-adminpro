import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Hospital } from '../models/hospital.model';

const base_url = environment.base_url

@Injectable({
  providedIn: 'root'
})
export class HospitalServiceService {

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

  constructor(  private http:HttpClient) { }

  cargarHospitales(){

    const url = `${ base_url }/hospitales`;//ruta definida en el backend(postman)

    //retornamos la ruta y los headers(token)
    return this.http.get( url , this.headers).pipe(
      //{ok: boolean, hospitales: Hospital[]}  esto es lo que viene en la respuesta del backend
      map( (resp: {ok: boolean, hospitales: Hospital[]} )=> resp.hospitales )
    );

  }

  crearHospitales( nombre: string){

    const url = `${ base_url }/hospitales`;//ruta definida en el backend(postman)

    //retornamos la ruta , la data y los headers(token)
    return this.http.post( url , { nombre }, this.headers)


  }

  actualizarHospitales( _id:string, nombre: string){

    const url = `${ base_url }/hospitales/${_id}`;//ruta definida en el backend(postman)

    //retornamos la ruta , la data y los headers(token)
    return this.http.put( url , { nombre }, this.headers)


  }

  eliminarHospitales( _id:string ){

    const url = `${ base_url }/hospitales/${_id}`;//ruta definida en el backend(postman)

    //retornamos la ruta  y los headers(token)
    return this.http.delete( url , this.headers)


  }


}

