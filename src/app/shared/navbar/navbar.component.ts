import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { UserModel } from 'src/app/models/user.model';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { IngresoEgresoService } from 'src/app/services/ingreso-egreso/ingreso-egreso.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

  usuario: string = '';
  subscription:Subscription = new Subscription();

  constructor(
    private _ingresoEgresoService: IngresoEgresoService,
    private store:Store<AppState>
    ) { }

  ngOnInit() {
    this.subscription = this.store.select('auth')
    .pipe( filter( auth => auth.user != null))
    .subscribe( auth => {
    this.usuario = auth.user.nombre;
    });
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
