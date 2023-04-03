import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {


  constructor( private httpClient: HttpClient) { }

  async actualizarFoto(
    archivo:File,
    tipo: 'usuarios'|'medicos'|'hospitales',
    id:string
  )
  {

    try {

      const url = `${ base_url }/uploads/${ tipo }/${ id }`;

      const formData = new FormData()//propio de javascript(mirar el body en postman)
      formData.append('imagen', archivo)//se añaden las propiedades qe van en el body de la peticion

      //fetch propio de javascript
      const resp = await fetch( url,{
        method: 'PUT',
        headers:{
          'x-token':localStorage.getItem('token')||''
        },
        body: formData
      })

      const data = await resp.json();//captamos la respuesta del backend

      console.log('data'+ data);

      //si la data es ok
       if (data.ok) {
        return data.nombreArchivo;//esto viene del backend
       } else {
        console.log(data.msg);
        return false;
       }


    } catch (error) {
      console.log( error)
      return false;
    }
  }

  async subirInforme(
    archivo:File,
    tipo: 'usuarios'|'medicos'|'hospitales',
    id:string
  )
  {

    try {

      const url = `${ base_url }/informes/${ tipo }/${ id }`;

      const formData = new FormData()//propio de javascript(mirar el body en postman)
      formData.append('informe', archivo)//se añaden las propiedades qe van en el body de la peticion

      //fetch propio de javascript
      const resp = await fetch( url,{
        method: 'POST',
        headers:{
          'x-token':localStorage.getItem('token')||''
        },
        body: formData
      })

      const data = await resp.json();//captamos la respuesta del backend

      console.log('data'+ data);

      //si la data es ok
       if (data.ok) {
        return data.nombreArchivo;//esto viene del backend
       } else {
        console.log(data.msg);
        return false;
       }


    } catch (error) {
      console.log( error)
      return false;
    }
  }
//para descargar informes

  public downloadFile(
    tipo: 'usuarios'|'medicos'|'hospitales',
    id:string
  ){
    const url = `${ base_url }/informes/${ tipo }/${ id }`;
    return this.httpClient.get( url, {observe:'response',responseType:'blob'})
  }

}
