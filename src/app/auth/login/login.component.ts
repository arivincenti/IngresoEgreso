import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from "src/app/services/auth/auth.service";
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Subscription } from 'rxjs';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit
{

  cargando: boolean;
  subscription:Subscription;

  constructor(
    private _autoService: AuthService,
    private store: Store<AppState>
  ) { }

  ngOnInit()
  {
    this.subscription = this.store.select('ui').subscribe(ui =>
    {
      this.cargando = ui.isLoading;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  login(form: NgForm)
  {
    this._autoService.login(form.value.email, form.value.password);
  }
}
