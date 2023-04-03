import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';
import { FileUploadService } from '../../services/file-upload.service';

@Component({
  selector: 'app-informes',
  templateUrl: './informes.component.html',
  styleUrls: ['./informes.component.css']
})
export class InformesComponent implements OnInit {

  public usuario:Usuario

  constructor( private _usuariosServices: UsuarioService, private _fileUploadServices: FileUploadService) {
    this.usuario = _usuariosServices.usuario;

  }


  public descarga( idInforme:string ){


     this._fileUploadServices.downloadFile( 'usuarios', idInforme ).subscribe(response =>{

      let fileName = response.headers.get('content-diposition')
      ?.split(';')[1].split('=')[1];

      let blob:Blob = response.body as Blob;
      let a = document.createElement('a');
      a.download = fileName;
      a.href = window.URL.createObjectURL(blob);
      a.click()
     })
  }

  ngOnInit(): void {


  }

}
