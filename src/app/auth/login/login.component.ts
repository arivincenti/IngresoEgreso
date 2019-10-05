import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from "src/app/services/auth/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit
{
  constructor(private _autoService: AuthService) { }

  ngOnInit() { }

  login(form: NgForm)
  {
    this._autoService.login(form.value.email, form.value.password);
  }
}
