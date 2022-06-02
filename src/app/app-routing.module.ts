import { NgModule } from '@angular/core';
import { Routes , RouterModule} from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ProgressComponent } from './pages/progress/progress.component';
import { Grafica1Component } from './pages/grafica1/grafica1.component';
import { NopagesfoundComponent } from './pages/nopagesfound/nopagesfound.component';
import { PagesComponent } from './pages/pages.component';

const routes: Routes = [
  { path: '',
  component: PagesComponent,

  //estas rutas comparten el mismo template
  children :[
    { path: 'dashboard',component: DashboardComponent },
    { path: 'progress',component: ProgressComponent },
    { path: 'grafica1',component: Grafica1Component },
    { path: '', redirectTo: '/dashboard' , pathMatch: 'full' },

  ]
},
// estas rutas tienen distinto template de las anteriores
  { path: 'login',component: LoginComponent },
  { path: 'register',component: RegisterComponent },

  //cuando no encuentra la pagina
  { path: '**', component:NopagesfoundComponent }

]


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports:[ RouterModule ]
})
export class AppRoutingModule { }
