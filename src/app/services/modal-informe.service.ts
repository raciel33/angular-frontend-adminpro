import { Injectable, EventEmitter } from '@angular/core';
import { environment } from '../../environments/environment';


const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class ModalInformeService {


 private _ocultarModal: boolean = true;
  public  tipo: 'usuarios'| 'medicos' |'hospitales';
  public id: string;
  public informe: string;

  public nuevoInforme : EventEmitter <string> = new EventEmitter<string>();//observable para que se actualice la imagen automaticamente

  get ocultarModal(){
    return this._ocultarModal;
  }


  abrirModalInforme(

    tipo: 'usuarios'| 'medicos' |'hospitales',
    id: string,
    informe: string = ''
   ){

     this._ocultarModal = false;
     this.tipo = tipo;
     this.id = id;
    // this.img = img;
         this.informe = `${ base_url }/uploads/${ tipo }/${ informe }`


  }


   cerrarModal(){
     this._ocultarModal = true
  }
  constructor() { }
}
