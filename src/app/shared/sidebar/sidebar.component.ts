import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit
{

  constructor(
    private _authService: AuthService
  ) { }

  ngOnInit()
  {
  }

  logout()
  {
    this._authService.logout();
  }

}
