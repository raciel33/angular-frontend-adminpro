import { InicioComponent } from './inicio/inicio.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from '../guards/admin.guard';


//componentes
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccountSettingComponent } from './account-setting/account-setting.component';
//import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PerfilComponent } from './perfil/perfil.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { MedicoComponent } from './mantenimientos/medicos/medico.component';
import { BusquedasComponent } from './busquedas/busquedas.component';
import { CitasComponent } from './citas/citas.component';
import { InformesComponent } from './informes/informes.component';
import { VerHospitalesUserComponent } from './ver-hospitales-user/ver-hospitales-user.component';
import { AgendaActividadesComponent } from './agenda-actividades/agenda-actividades.component';
import { DonarSangreComponent } from './donar-sangre/donar-sangre.component';
import { CitasHospitalComponent } from './citas-hospital/citas-hospital.component';

const childRoutes: Routes =[

   //data: { titulo: 'Dashboard'} : especificamos parametros de ruta
  //estas rutas comparten el mismo template

    { path: 'dashboard',component: DashboardComponent , data: { titulo: 'dashboard'}},
    { path: 'account-settings',component: AccountSettingComponent, data: { titulo: 'Account-settings'}},
    { path: 'citas',component: CitasComponent ,data: { titulo: 'Citas del usuario'}},
    { path: 'buscar/:termino',component: BusquedasComponent, data: { titulo: 'Busquedas'}},
    { path: 'progress',component: ProgressComponent },
    { path: 'grafica1',component: Grafica1Component ,data: { titulo: 'Estadísticas '}},
    { path: 'informes',component: InformesComponent ,data: { titulo: 'Informes Medicos'}},
    { path: 'inicio',component: InicioComponent, data: { titulo: 'Inicio'}},
    { path: 'rxjs',component: RxjsComponent},
    { path: 'perfil',component: PerfilComponent ,data: { titulo: 'Perfil de usuario'}},
    { path: 'userHospital',component: VerHospitalesUserComponent },
    { path: 'agenda',component: AgendaActividadesComponent ,data: { titulo: 'Agenda de actividades'}},
    { path: 'donar',component: DonarSangreComponent ,data: { titulo: 'Donación de sangre'}},
    { path: 'citasHospital/:id',component: CitasHospitalComponent ,data: { titulo: 'Citas en el hospital'}},


       //Mantenimientos
       { path: 'usuarios',component: UsuariosComponent ,data: { titulo: ' Mantenimiento Usuarios'}},
       { path: 'hospitales',component: HospitalesComponent ,data: { titulo: ' Mantenimiento Hopitales'}},
       { path: 'medicos',component: MedicosComponent ,data: { titulo: 'Mantenimiento de Medicos '}},
       { path: 'medico/:id',component: MedicoComponent ,data: { titulo: 'Mantenimiento de Medicos '}},

       //Rutas de admin protegida en AdminGuard  para que el usuario que no sea administrador no acceda a traves de la url directamente al usuarioComponent(lo he quitado temporalmente)
      // { path: 'usuarios',canActivate:[ AdminGuard ], component: UsuariosComponent ,data: { titulo: 'Mantenimiento de Usuarios '}},
]


@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule]
})
export class ChildRoutesModule { }
