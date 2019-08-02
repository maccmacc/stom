import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

import { AuthService } from 'src/app/services/auth.service';

import { User } from './../../models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  private username: string;
  private password: string;
  private name: string;
  private lastname: string;
  private email: string;

  constructor(private router: Router, private authService: AuthService, private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  register(): void {
    const payload = {
      username: this.username,
      password: this.password,
      name: this.name,
      lastname: this.lastname,
      email: this.email
    };

    this.authService.register(new User(payload)).subscribe((data: any) => {
      this.authService.login(payload.username, payload.password).subscribe((dataLogin: any) => {
        this.snackBar.open('Welcome!', 'Close', { duration: 2000 });
        this.router.navigate(['/']);
      });
    }, (err: any) => {
      console.log(err);
      this.snackBar.open('Unauthorized! Try again.', 'Close', { duration: 2000 });
    });
  }

}
