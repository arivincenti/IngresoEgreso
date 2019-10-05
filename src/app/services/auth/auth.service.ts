import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { UserModel } from 'src/app/models/user.model';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService
{

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private angularfdb: AngularFirestore
  ) { }

  initAuthListener()
  {
    this.afAuth.authState.subscribe((fbUser: firebase.User) =>
    {
      console.log(fbUser);
    })
  }

  isAuth()
  {
    return this.afAuth.authState.pipe(map(fbUser =>
    {
      if (fbUser == null)
      {
        this.router.navigate(['/login']);
      }
      return fbUser != null;
    }));
  }

  crearUsuario(nombre: string, email: string, password: string)
  {
    this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(resp =>
      {
        const user: UserModel = {
          uid: resp.user.uid,
          nombre: nombre,
          email: resp.user.email
        };

        this.angularfdb.doc(`${user.uid}/usuario`)
          .set(user)
          .then(resp =>
          {
            this.router.navigate(['/']);
          })
          .catch(error =>
          {
            console.log(error);
          });

      })
      .catch(error =>
      {
        console.error(error);

        Swal.fire({
          title: 'Error al registrar el usuario!',
          text: error.message,
          type: 'error',
        });
      });
  }

  login(email: string, password: string)
  {
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then(resp =>
      {
        this.router.navigate(['/']);
      })
      .catch(error =>
      {
        console.error(error);
        Swal.fire({
          title: 'Error en el login!',
          text: error.message,
          type: 'error',
        });
      })
  }

  logout()
  {
    this.afAuth.auth.signOut()
      .then(resp =>
      {
        this.router.navigate(['/login']);
      });
  }

}
