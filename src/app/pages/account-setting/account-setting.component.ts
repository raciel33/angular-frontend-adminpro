import { Component, OnInit } from '@angular/core';
import { SettingdService } from '../../services/settingd.service';

@Component({
  selector: 'app-account-setting',
  templateUrl: './account-setting.component.html',
  styles: [
  ]
})
export class AccountSettingComponent implements OnInit {

  //Seleccionamos el elemento del DOM por su id

  public linkTheme = document.querySelector( '#theme' );


  public links: NodeListOf<Element> ;


  constructor( private settingService:SettingdService) {
   }

  ngOnInit(): void {

    this.settingService.checkCurrentTheme()
  }


  changeTheme( theme:string){

    this.settingService.changeTheme( theme)


  }




}
