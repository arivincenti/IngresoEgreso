import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from "src/app/services/auth/auth.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit
{
  constructor(private _authService: AuthService) { }

  ngOnInit() { }

  crearUsuario(form: NgForm)
  {
    console.log(form.value);
    this._authService.crearUsuario(
      form.value.nombre,
      form.value.email,
      form.value.password
    );
  }
}
