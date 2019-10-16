import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { IngresoEgresoModel } from "../models/ingreso-egreso.model";
import { IngresoEgresoService } from "../services/ingreso-egreso/ingreso-egreso.service";
import Swal from "sweetalert2";
import { Store } from '@ngrx/store';
import * as fromIngresoEgreso from './ingreso-egreso.reducer';
import { Subscription } from 'rxjs';
import { ActivarLoadingAction, DesactivarLoadingAction } from '../shared/ui.actions';

@Component({
  selector: "app-ingreso-egreso",
  templateUrl: "./ingreso-egreso.component.html",
  styleUrls: ["./ingreso-egreso.component.css"]
})
export class IngresoEgresoComponent implements OnInit {
  form: FormGroup;
  tipo: string = "ingreso";
  cargando: boolean = false;
  subscription: Subscription = new Subscription();

  constructor(
    private _IngresoEgresoService: IngresoEgresoService,
    private store: Store<fromIngresoEgreso.AppState>
    ) {}

  ngOnInit() {
    this.form = new FormGroup({
      descripcion: new FormControl("", Validators.required),
      monto: new FormControl("", [Validators.required, Validators.min(0)])
    });

    this.subscription = this.store.select('ui').subscribe( ui => {
      this.cargando = ui.isLoading;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  crearIngresoEgreso() {
    
    const ingresoEgreso = new IngresoEgresoModel({
      ...this.form.value,
      tipo: this.tipo
    });

    this.store.dispatch(new ActivarLoadingAction());

    this._IngresoEgresoService
      .crearIngresoEgreso(ingresoEgreso)
      .then(resp => {
        Swal.fire({
          type: "success",
          title: "Genial!",
          text: "Los datos se guardaron con éxito"
        });
        this.form.reset({
          descripcion: "",
          monto: 0
        });

        this.store.dispatch(new DesactivarLoadingAction());
      })
      .catch(error => {
        this.store.dispatch(new DesactivarLoadingAction());
        Swal.fire({
          type: "error",
          title: "Hubo un error!",
          text: error.message
        });
      });
  }
}
