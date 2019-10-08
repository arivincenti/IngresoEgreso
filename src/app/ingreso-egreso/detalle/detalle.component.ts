import { Component, OnInit, OnDestroy } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/app.reducer";
import { IngresoEgresoModel } from "src/app/models/ingreso-egreso.model";
import { IngresoEgresoService } from 'src/app/services/ingreso-egreso/ingreso-egreso.service';
import { Subscription } from 'rxjs';

@Component({
  selector: "app-detalle",
  templateUrl: "./detalle.component.html",
  styleUrls: ["./detalle.component.css"]
})
export class DetalleComponent implements OnInit, OnDestroy {
  items: IngresoEgresoModel[] = [];
  subscription: Subscription = new Subscription();

  constructor(
    private store: Store<AppState>,
    private _ingresoEgresoService: IngresoEgresoService
    ) {}

  ngOnInit() {
    this.subscription = this.store.select("ingresoEgreso").subscribe((ingresoEgreso: any) => {
      this.items = ingresoEgreso.items;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  borrarItem(item: IngresoEgresoModel){
    this._ingresoEgresoService.borrarIngresoEgreso(item.uid);
  }
}
