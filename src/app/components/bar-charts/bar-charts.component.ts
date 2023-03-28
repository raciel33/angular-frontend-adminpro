import { Component, Input } from '@angular/core';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label, Color } from 'ng2-charts';
import { HospitalServiceService } from '../../services/hospital-service.service';
import { Hospital } from '../../models/hospital.model';

@Component({
  selector: 'app-bar-charts',
  templateUrl: './bar-charts.component.html',
  styleUrls: ['./bar-charts.component.css']
})
export class BarChartsComponent  {



  //para el barchart
  @Input() title: string = "sin titulo" ;


  @Input('dataBar') barChartData: MultiDataSet = [
    [350, 450, 100,25],
  ];

  @Input('labelsBar') bartChartLabels: Label[] = ['label1', 'label2', 'label3', 'label4'];


  public barChartType: ChartType = 'bar';


  public color: Color[] = [
    { backgroundColor:[ '#6857E6', '#009fee', '#f02059']}
  ]


}
