import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import * as fromIngresoEgreso from '../ingreso-egreso.reducer';
import { Subscription } from "rxjs";
import { IngresoEgresoModel } from "src/app/models/ingreso-egreso.model";
import { Label } from "ng2-charts";
import { ChartType } from "chart.js";

@Component({
  selector: "app-estadistica",
  templateUrl: "./estadistica.component.html",
  styleUrls: ["./estadistica.component.css"]
})
export class EstadisticaComponent implements OnInit {
  public doughnutChartLabels: Label[] = [
    "Egresos",
    "Ingresos"
  ];
  public doughnutChartData: number[] = [];
  public doughnutChartType: ChartType = "doughnut";

  ingresos: number;
  egresos: number;
  cuantosEgresos: number;
  cuantosIngresos: number;
  subscription: Subscription = new Subscription();

  constructor(private store: Store<fromIngresoEgreso.AppState>) {}

  ngOnInit() {
    this.subscription = this.store
      .select("ingresoEgreso")
      .subscribe(ingresoEgreso => {
        this.contarIngresoEgreso(ingresoEgreso.items);
      });
  }

  contarIngresoEgreso(items: IngresoEgresoModel[]) {
    this.ingresos = 0;
    this.egresos = 0;

    this.cuantosEgresos = 0;
    this.cuantosIngresos = 0;

    items.forEach(item => {
      if (item.tipo === "ingreso") {
        this.cuantosIngresos++;
        this.ingresos += item.monto;
      } else {
        this.cuantosEgresos++;
        this.egresos += item.monto;
      }
    });
    this.doughnutChartData = [this.egresos, this.ingresos];
  }
}
