import { Injectable, EventEmitter } from '@angular/core';
import { Citas } from '../models/citas.model';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Usuario } from '../models/usuario.model';
import { CargaCita } from '../interfaces/carga-citas.interfaces';

const base_url = environment.base_url

@Injectable({
  providedIn: 'root'
})
export class CitasService {

  public citas:Citas;

  private _ocultarModal: boolean = true;//para ocultar y mostrar el modal

  public especialidad = [
    'Traumatología',
    'Pediatría',
    'Enfermería',
    'Ortopedia',
    'Cirujía',
    'Psiquiatría',
    'Otorrino',
    'Donacion sangre',
    'Cardiología',
    'Neumología',
    'Neurología',
    'Rehabilitación'
  ];

  public horaCita = ['9:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00'];

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
  constructor(private http:HttpClient) { }

  cargaCitas(){

    const url = `${ base_url }/citas `;//ruta definida en el backend(postman)

    return this.http.get<CargaCita>( url ,this.headers).pipe(
      map( resp =>{
        const citas = resp.citas.map(
           cita => new Citas( cita._id, cita.especialidad, cita.fecha,cita.hora, cita.usuario, cita.hospital)
        )
        return {
           citas
        }
      })
    )
  }

 crearCita( cita: { especialidad:string, hospital:string } ){

    const url = `${ base_url }/citas`;//ruta definida en el backend(postman)

    //retornamos la ruta , la data y los headers(token)
    return this.http.post( url ,  cita , this.headers)


  }


  eliminarCita( _id:string ){

    const url = `${ base_url }/citas/${_id}`;//ruta definida en el backend(postman)

    //retornamos la ruta  y los headers(token)
    return this.http.delete( url , this.headers)


  }

  get ocultarModal(){
    return this._ocultarModal;
  }

  abrirModalCita(){
    this._ocultarModal = false;

  }
  cerrarModal(){
    this._ocultarModal = true
 }



}


