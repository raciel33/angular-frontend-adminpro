import { PipesModule } from './../pipes/pipes.module';
//Modulos
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
 import { FormsModule, ReactiveFormsModule } from '@angular/forms';
 import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


//angular material
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatMenuModule} from '@angular/material/menu';

import { ComponentsModule } from '../components/components.module';
import { SharedModule } from '../shared/shared.module';

//Componentes
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AccountSettingComponent } from './account-setting/account-setting.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PerfilComponent } from './perfil/perfil.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { MedicoComponent } from './mantenimientos/medicos/medico.component';
import { BusquedasComponent } from './busquedas/busquedas.component';
import { CitasComponent } from './citas/citas.component';
import { MatCardModule } from '@angular/material/card';
import { InformesComponent } from './informes/informes.component';
import { InicioComponent } from './inicio/inicio.component';
import { VerHospitalesUserComponent } from './ver-hospitales-user/ver-hospitales-user.component';
import { AgendaActividadesComponent } from './agenda-actividades/agenda-actividades.component';
import { DonarSangreComponent } from './donar-sangre/donar-sangre.component';
import { CitasHospitalComponent } from './citas-hospital/citas-hospital.component';


const materialModules = [
  MatButtonModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
  MatDialogModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatSnackBarModule,
  MatMenuModule,
  MatFormFieldModule,MatCardModule


];

@NgModule({
  declarations: [
    ProgressComponent,
    Grafica1Component,
    PagesComponent,
    DashboardComponent,
    AccountSettingComponent,
    PerfilComponent,
    UsuariosComponent,
    HospitalesComponent,
    MedicosComponent,
    MedicoComponent,
    BusquedasComponent,
    CitasComponent,
    InformesComponent,
    InicioComponent,
    RxjsComponent,
    VerHospitalesUserComponent,
    AgendaActividadesComponent,
    DonarSangreComponent,
    CitasHospitalComponent

  ],
  imports: [
    CommonModule,
    SharedModule,
    AppRoutingModule,
    FormsModule,
    ComponentsModule,
    ReactiveFormsModule,
    PipesModule,
    materialModules,BrowserAnimationsModule

  ],
  exports:[
    InformesComponent,
    ProgressComponent,
    Grafica1Component,
    PagesComponent,
    DashboardComponent,
    AccountSettingComponent,
    ProgressComponent,
    CitasHospitalComponent,
    RxjsComponent,materialModules,BrowserAnimationsModule
  ]
})
export class PagesModule { }
