import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncrementadorComponent } from './incrementador/incrementador.component';
import { FormsModule } from '@angular/forms';
import { DonaComponent } from './dona/dona.component';
import { ChartsModule } from 'ng2-charts';
import { ModalImagenComponent } from './modal-imagen/modal-imagen.component';
import { BarChartsComponent } from './bar-charts/bar-charts.component';
import { ModalInformeComponent } from './modal-informe/modal-informe.component';




@NgModule({
  declarations: [
    IncrementadorComponent,
    DonaComponent,
    ModalImagenComponent,
    BarChartsComponent,
    ModalInformeComponent,


  ],
  imports: [
    CommonModule,
    FormsModule,
    ChartsModule
  ],
  exports:[
    IncrementadorComponent,
    DonaComponent,
    ModalImagenComponent,
    BarChartsComponent,
    ModalInformeComponent
  ]
})
export class ComponentsModule { }
