import { Component, OnInit, OnDestroy } from '@angular/core';
import { IngresoEgresoService } from '../services/ingreso-egreso/ingreso-egreso.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  constructor(private _ingresoEgresoService: IngresoEgresoService) { }

  ngOnInit() {
    this._ingresoEgresoService.initIngresoEgresoListener();
  }

  ngOnDestroy() {
    this._ingresoEgresoService.cancelarSubscripciones();
  }

}
