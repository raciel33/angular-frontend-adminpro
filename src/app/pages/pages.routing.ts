import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

//componentes
import { PagesComponent } from './pages.component';

import { AdminGuard } from '../guards/admin.guard';
import { AuthGuard } from '../guards/auth.guard';


const routes: Routes = [
  { path: 'dashboard',
  component: PagesComponent,
  canActivate: [ AuthGuard ],//para proteger las rutas
  canLoad: [AuthGuard],
  loadChildren: ()=> import('./child-routes.module').then( m => m.ChildRoutesModule )//carga de forma perezosa
},


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {}
