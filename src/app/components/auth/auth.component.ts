import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { MatSnackBar } from '@angular/material';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  private username: string
  private password: string
  constructor(private _router: Router,
    private _authService: AuthService,
    private _snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  login(): void {
    this._authService.login(this.username, this.password)
        .subscribe((data: any) => {
          this._snackBar.open('Welcome!', 'Close', { duration: 2000 })
          this._router.navigate(['/'])
        }, (err: any) => {
          this._snackBar.open('Unauthorized! Try again.', 'Close', { duration: 2000 })
        })
  }

}
