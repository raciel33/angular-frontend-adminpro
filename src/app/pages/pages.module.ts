//Modulos
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
 import { FormsModule } from '@angular/forms';



import { ComponentsModule } from '../components/components.module';
import { SharedModule } from '../shared/shared.module';

//Componentes
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AccountSettingComponent } from './account-setting/account-setting.component';




@NgModule({
  declarations: [
    ProgressComponent,
    Grafica1Component,
    PagesComponent,
    DashboardComponent,
    AccountSettingComponent,

  ],
  imports: [
    CommonModule,
    SharedModule,
    AppRoutingModule,
    FormsModule,
    ComponentsModule,
  ],
  exports:[
    ProgressComponent,
    Grafica1Component,
    PagesComponent,
    DashboardComponent,
    AccountSettingComponent
  ]
})
export class PagesModule { }
