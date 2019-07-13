import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { MatSnackBar } from '@angular/material';

import { AuthService } from 'src/app/services/auth.service';

import { User } from './../../models/user'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  private username: string
  private password: string
  private name: string
  private lastname: string
  private email: string

  constructor(private _router: Router,
    private _authService: AuthService,
    private _snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  register(): void {
    const payload = {
      username: this.username,
      password: this.password,
      name: this.name,
      lastname: this.lastname,
      email: this.email
    }

    this._authService.register(new User(payload))
        .subscribe((data: any) => {
          this._authService.login(payload.username, payload.password)
          .subscribe((data: any) => {
            this._snackBar.open('Welcome!', 'Close', { duration: 2000 })
            this._router.navigate(['/'])
          })
        }, (err: any) => {
          this._snackBar.open('Unauthorized! Try again.', 'Close', { duration: 2000 })
        })
  }

}
