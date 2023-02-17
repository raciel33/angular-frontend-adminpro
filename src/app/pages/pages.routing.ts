import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

//componentes
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccountSettingComponent } from './account-setting/account-setting.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';

import { AuthGuard } from '../guards/auth.guard';
import { PerfilComponent } from './perfil/perfil.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { MedicoComponent } from './mantenimientos/medicos/medico.component';


const routes: Routes = [
  { path: 'dashboard',
  component: PagesComponent,
  canActivate: [ AuthGuard ],//para proteger las rutas

  //estas rutas comparten el mismo template
  children :[

    //data: { titulo: 'Dashboard'} : especificamos parametros de ruta

    { path: 'dashboard',component: DashboardComponent , data: { titulo: 'Dashboard'}},
    { path: 'progress',component: ProgressComponent ,data: { titulo: 'ProgressBar'}},
    { path: 'grafica1',component: Grafica1Component ,data: { titulo: 'Grafica1'}},
    { path: 'account-settings',component: AccountSettingComponent, data: { titulo: 'Account-settings'}},
    { path: 'promesas',component: PromesasComponent, data: { titulo: 'Promesas'}},
    { path: 'rxjs',component: RxjsComponent ,data: { titulo: 'Rxjs'}},
    { path: 'perfil',component: PerfilComponent ,data: { titulo: 'Perfil de usuario'}},


//Mantenimientos
{ path: 'usuarios',component: UsuariosComponent ,data: { titulo: 'Mantenimiento de Usuarios '}},
{ path: 'hospitales',component: HospitalesComponent ,data: { titulo: ' Mantenimiento Hopitales'}},
{ path: 'medicos',component: MedicosComponent ,data: { titulo: 'Mantenimiento de Medicos '}},
{ path: 'medico/:id',component: MedicoComponent ,data: { titulo: 'Mantenimiento de Medicos '}},





  ]
},


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {}
