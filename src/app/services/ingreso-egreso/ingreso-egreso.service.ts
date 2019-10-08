import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { IngresoEgresoModel } from "src/app/models/ingreso-egreso.model";
import { AuthService } from "../auth/auth.service";
import { AppState } from "src/app/app.reducer";
import { Store } from "@ngrx/store";
import { filter, map } from "rxjs/operators";
import { SetItemsAction, UnsetItemsAction } from "src/app/ingreso-egreso/ingreso-egreso.actions";
import { Subscription } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class IngresoEgresoService {
  ingresoEgresoListernerSubscription: Subscription = new Subscription();
  ingresiEgresoItems: Subscription = new Subscription();

  constructor(
    private afDb: AngularFirestore,
    private _authService: AuthService,
    private store: Store<AppState>
  ) {}

  initIngresoEgresoListener() {
    this.ingresoEgresoListernerSubscription = this.store
      .select("auth")
      .pipe(filter(auth => auth.user !== null))
      .subscribe(auth => {
        this.ingresoEgresoItems(auth.user.uid);
      });
  }

  private ingresoEgresoItems(uid: string) {
    this.ingresiEgresoItems = this.afDb
      .collection(`${uid}/ingreso-egreso/items`)
      .snapshotChanges()
      .pipe(
        map(docData => {
          return docData.map(doc => {
            return {
              uid: doc.payload.doc.id,
              ...doc.payload.doc.data()
            };
          });
        })
      )
      .subscribe((collection: any) => {
        this.store.dispatch(new SetItemsAction(collection));
      });
  }

  crearIngresoEgreso(ingresoEgreso: IngresoEgresoModel) {
    const user = this._authService.getUsuario();

    return this.afDb
      .doc(`${user.uid}/ingreso-egreso`)
      .collection("items")
      .add({ ...ingresoEgreso });
  }

  borrarIngresoEgreso( uid :string){
    const user = this._authService.getUsuario();
    this.afDb.doc(`${user.uid}/ingreso-egreso/items/${uid}`).delete();
  }

  cancelarSubscripciones() {
    this.store.dispatch( new UnsetItemsAction());
    this.ingresoEgresoListernerSubscription.unsubscribe();
    this.ingresiEgresoItems.unsubscribe();
  }
}
