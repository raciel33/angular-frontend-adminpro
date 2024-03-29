import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Usuario } from '../models/usuario.model';
import { Hospital } from '../models/hospital.model';
import { Medico } from '../models/medicos.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class BusquedasService {

  constructor( private http: HttpClient) { }

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

private transformarUsuarios( resultados: any[] ):Usuario[]{

  return resultados.map(

    user=> new Usuario( user.nombre,user.email,'',user.img, user.role,user.google)
    );

}
private transformarHospitales( resultados: any[] ):Hospital[]{

  return resultados

}

private transformarMedicos( resultados: any[] ):Medico[]{

  return resultados

}

busquedaGloblal( termino:string){
  const url = `${ base_url }/todo/${ termino }`//ruta definida en el backend(postman)

    return this.http.get( url, this.headers);

}

//busqueda especifica por medicos, usuarios u hospitales
buscar( tipo: 'usuarios'| 'medicos' | 'hospitales', termino: string){

  const url = `${ base_url }/todo/coleccion/${ tipo }/${ termino }`//ruta definida en el backend(postman)

  //retornamos la ruta y los headers(token)
  return this.http.get<any[]>( url ,this.headers).pipe(
    map((resp: any ) => {

      switch (tipo) {
        case 'usuarios':
          return this.transformarUsuarios(resp.resultado)//resp.resultado viene del backend(ver postman)
          break;
          case 'hospitales':
            return this.transformarHospitales(resp.resultado)//resp.resultado viene del backend(ver postman)
            break;
            case 'medicos':
              return this.transformarMedicos(resp.resultado)//resp.resultado viene del backend(ver postman)
              break;

        default:
          break;
      }
    })
  )
}
}
