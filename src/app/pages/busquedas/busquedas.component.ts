import { BusquedasService } from './../../services/busquedas.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Usuario } from '../../models/usuario.model';
import { Medico } from '../../models/medicos.model';
import { Hospital } from '../../models/hospital.model';

@Component({
  selector: 'app-busquedas',
  templateUrl: './busquedas.component.html',
  styles: [
  ]
})
export class BusquedasComponent implements OnInit {

  public usuarios: Usuario[]=[];
  public medicos: Medico[]=[];
  public hospitales: Hospital[]=[];


  constructor( private activateRoute:ActivatedRoute,
                  private busqudasService: BusquedasService) { }

  ngOnInit(): void {
    //captamos el parametro de la url y se lo mandamos a la funcion
    this.activateRoute.params.subscribe(({ termino })=>{
      this.busquedaGlobal( termino )
          })
  }


   busquedaGlobal( termino: string){

       this.busqudasService.busquedaGloblal( termino ).subscribe( (resp:any)=>{
           this.usuarios = resp.usuarios;
           this.medicos = resp.medicos;
           this.hospitales = resp.hospitales
      })
   }



}
