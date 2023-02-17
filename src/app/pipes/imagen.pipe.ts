import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment';

const base_url = environment.base_url

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: 'usuarios' | 'medicos' | 'hospitales'): string {

          //si no existe la imagen
          if( !img ) {
            return `${ base_url }/uploads/${tipo}/not-image`;
         }
 //si viene de google el path viene con https
         else if(img.includes('https')){
              return img;
         }
//si viene de validacion por email
         else if (img ) {
             return `${ base_url }/uploads/${tipo}/${ img }`;
           } else {
             return `${ base_url }/uploads/${tipo}/not-image`;
           }  }

}
