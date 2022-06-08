import { Component } from '@angular/core';



@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})

export class Grafica1Component{

  public labels1: string []= ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  public labels2: string []= ['compras', 'In-Store Sales', 'Mail-Order Sales'];

  public data1  = [
    [800, 450, 100],

  ];
  public data2  = [
    [900, 10, 200],

  ];
}
