import { NgModule } from '@angular/core';
import { Routes , RouterModule} from '@angular/router';

//Modulos
import { PagesRoutingModule } from './pages/pages.routing';
import { AuthRoutingModule } from './auth/auth.routing';

import { NopagesfoundComponent } from './nopagesfound/nopagesfound.component';

const routes: Routes = [

  { path: '', redirectTo: '/dashboard' , pathMatch: 'full' },

  //cuando no encuentra la pagina
  { path: '**', component:NopagesfoundComponent }

]


@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    PagesRoutingModule,
    AuthRoutingModule
  ],
  exports:[ RouterModule ]
})
export class AppRoutingModule { }
