import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingdService {

  //Seleccionamos el elemento del DOM por su id

  private linkTheme = document.querySelector ( '#theme' );

  constructor() {

    //localStorage.getItem('theme') : extrae lo que hay almacenado en el localStorage (account-settings.ts )
    //si no hay nada utiliza la url que pasamos por defecto

    const url = localStorage.getItem('theme') || './assets/css/colors/default-dark.css' ;

    //puro javascript cambiamos del elemento seleccionamos el href por la url con el color que queremos
    this.linkTheme.setAttribute( 'href', url)

  }



  changeTheme( theme:string){

    //la url utilizara el color que le pasemos por parametro
    const url = `./assets/css/colors/${ theme }.css `

    //puro javascript cambiamos del elemento seleccionamos el href por la url con el color que queremos
    this.linkTheme.setAttribute( 'href', url )

    //alamacenamos el color en el localStorage para que siga una vez recargada la pagina ( pages.components.ts)
   localStorage.setItem ( 'theme', url )

   //funcion para poner un check al color elegido
  this.checkCurrentTheme();
   }





//Para poner un check en el color seleccionado
  checkCurrentTheme(){

      //puro javascript: seleccionamos todos los elementos con la clase 'selector'
       const links = document.querySelectorAll('.selector')

       //en cada elemento del link ( los que tienen la clase selector)
         links.forEach ( elem =>{

             //eliminamos la clase working para que no aparezcan duplicados
              elem.classList.remove('working')

              //obtenemos el color que se encuentra en este atributo del DOM de cada elem
               const btnTheme = elem.getAttribute('data-theme')

               //obtenemos la url con el color de cada elem
              const btnThemeUrl = `./assets/css/colors/${ btnTheme }.css `
               //obtenemos el href con el color que tiene la pagina en ese instante
                const currentTheme = this.linkTheme.getAttribute ('href')

               //si el color que tiene la pagina es igual al color del elemento entonces añade la clase working( check )
               if( btnThemeUrl === currentTheme ){
                 elem.classList.add('working')
               }
    })
}
}
