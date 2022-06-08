import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label, Color } from 'ng2-charts';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: [
  ]
})

  //NOTA:
//para las graficas de ng2-charts utilizarlas mejor de este enlace https://github.com/valor-software/ng2-charts

export class DonaComponent {
 // Doughnut

  @Input() title: string = "sin titulo" ;

 @Input('data') doughnutChartData: MultiDataSet = [
  [350, 450, 100],

];
 @Input( 'labels') doughnutChartLabels: Label[] = ['label1', 'label2', 'label3'];

public doughnutChartType: ChartType = 'doughnut';

public color: Color[] = [
  { backgroundColor:[ '#6857E6', '#009fee', '#f02059']}
]

}
