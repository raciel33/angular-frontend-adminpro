import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { AdminGuard } from '../guards/admin.guard';


//componentes
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccountSettingComponent } from './account-setting/account-setting.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';

import { PerfilComponent } from './perfil/perfil.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { MedicoComponent } from './mantenimientos/medicos/medico.component';
import { BusquedasComponent } from './busquedas/busquedas.component';


import { Routes, RouterModule } from '@angular/router';

const childRoutes: Routes =[

   //data: { titulo: 'Dashboard'} : especificamos parametros de ruta
  //estas rutas comparten el mismo template

    { path: 'account-settings',component: AccountSettingComponent, data: { titulo: 'Account-settings'}},
    { path: 'dashboard',component: DashboardComponent , data: { titulo: 'Dashboard'}},
    { path: 'buscar/:termino',component: BusquedasComponent, data: { titulo: 'Busquedas'}},
    { path: 'progress',component: ProgressComponent ,data: { titulo: 'ProgressBar'}},
    { path: 'grafica1',component: Grafica1Component ,data: { titulo: 'Grafica1'}},
    { path: 'promesas',component: PromesasComponent, data: { titulo: 'Promesas'}},
    { path: 'rxjs',component: RxjsComponent ,data: { titulo: 'Rxjs'}},
    { path: 'perfil',component: PerfilComponent ,data: { titulo: 'Perfil de usuario'}},


       //Mantenimientos
       { path: 'hospitales',component: HospitalesComponent ,data: { titulo: ' Mantenimiento Hopitales'}},
       { path: 'medicos',component: MedicosComponent ,data: { titulo: 'Mantenimiento de Medicos '}},
       { path: 'medico/:id',component: MedicoComponent ,data: { titulo: 'Mantenimiento de Medicos '}},

       //Rutas de admin protegida en AdminGuard  para que el usuario que no sea administrador no acceda a traves de la url directamente al usuarioComponent
       { path: 'usuarios',canActivate:[ AdminGuard ], component: UsuariosComponent ,data: { titulo: 'Mantenimiento de Usuarios '}},
]


@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule]
})
export class ChildRoutesModule { }
