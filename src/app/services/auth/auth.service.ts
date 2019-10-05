import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";
import * as firebase from "firebase";
import { map } from "rxjs/operators";
import Swal from "sweetalert2";
import { UserModel } from "src/app/models/user.model";
import { AngularFirestore } from "@angular/fire/firestore";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/app.reducer";
import {
  ActivarLoadingAction,
  DesactivarLoadingAction
} from "src/app/shared/ui.actions";
import { SetUserAction } from "src/app/auth/auth.actions";
import { Subscription } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private subscription: Subscription = new Subscription();

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private angularfdb: AngularFirestore,
    private store: Store<AppState>
  ) {}

  initAuthListener() {
    this.afAuth.authState.subscribe((fbUser: firebase.User) => {
      if (fbUser) {
        this.subscription = this.angularfdb
          .doc(`${fbUser.uid}/usuario`)
          .valueChanges()
          .subscribe((user: any) => {
            const newUser = new UserModel(user);
            this.store.dispatch(new SetUserAction(newUser));
          });
      } else {
        this.subscription.unsubscribe();
      }
    });
  }

  isAuth() {
    return this.afAuth.authState.pipe(
      map(fbUser => {
        if (fbUser == null) {
          this.router.navigate(["/login"]);
        }
        return fbUser != null;
      })
    );
  }

  crearUsuario(nombre: string, email: string, password: string) {
    this.store.dispatch(new ActivarLoadingAction());

    this.afAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(resp => {
        const user: UserModel = {
          uid: resp.user.uid,
          nombre: nombre,
          email: resp.user.email
        };

        this.angularfdb
          .doc(`${user.uid}/usuario`)
          .set(user)
          .then(resp => {
            this.router.navigate(["/"]);
            this.store.dispatch(new DesactivarLoadingAction());
          })
          .catch(error => {
            this.store.dispatch(new DesactivarLoadingAction());
            console.error(error);
          });
      })
      .catch(error => {
        console.error(error);

        Swal.fire({
          title: "Error al registrar el usuario!",
          text: error.message,
          type: "error"
        });
      });
  }

  login(email: string, password: string) {
    this.store.dispatch(new ActivarLoadingAction());

    this.afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(resp => {
        this.store.dispatch(new DesactivarLoadingAction());

        this.router.navigate(["/"]);
      })
      .catch(error => {
        this.store.dispatch(new DesactivarLoadingAction());
        console.error(error);
        Swal.fire({
          title: "Error en el login!",
          text: error.message,
          type: "error"
        });
      });
  }

  logout() {
    this.afAuth.auth.signOut().then(resp => {
      this.router.navigate(["/login"]);
    });
  }
}
