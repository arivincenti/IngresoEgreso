import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/models/user.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { IngresoEgresoService } from 'src/app/services/ingreso-egreso/ingreso-egreso.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnDestroy
{
  usuario: string = '';
  subscription:Subscription = new Subscription();
  
  constructor(
    private _ingresoEgresoService: IngresoEgresoService,
    private _authService: AuthService,
    private store:Store<AppState>
  ) { }

  ngOnInit()
  {
    this.subscription = this.store.select('auth')
    .pipe( filter( auth => auth.user != null))
    .subscribe( auth => {
    this.usuario = auth.user.nombre;
    });
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  logout()
  {
    this._ingresoEgresoService.cancelarSubscripciones();
    this._authService.logout();
  }

}
