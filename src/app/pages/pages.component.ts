import { Component, OnInit } from '@angular/core';
import { SettingdService } from '../services/settingd.service';
declare function customInitFunction();


@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {


  constructor( private SettingdService: SettingdService) { }

  ngOnInit(): void {
       customInitFunction();

}
}
