import { Component, OnInit } from '@angular/core';
import { CitasService } from '../../services/citas.service';

@Component({
  selector: 'app-modal-citas',
  templateUrl: './modal-citas.component.html',
  styleUrls: ['./modal-citas.component.css']
})
export class ModalCitasComponent implements OnInit {

  constructor( public citasService: CitasService) { }

  ngOnInit(): void {
  }

}
