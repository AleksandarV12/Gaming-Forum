import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  credentials = { email: '', password: '' };
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.errorMessage = '';

    if (!this.credentials.email || !this.credentials.password) {
      this.errorMessage = 'Both fields are required.';
      return;
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(this.credentials.email)) {
      this.errorMessage = 'Please provide a valid email address.';
      return;
    }

    this.authService.login(this.credentials).subscribe({
      next: (response) => {
        console.log('Login successful', response);
        localStorage.setItem('token', response.token);
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.error('Login failed', err);

        if (err.error.message === 'Incorrect password') {
          this.errorMessage = 'The password you entered is incorrect.';
        } else if (err.error.message === 'Invalid email') {
          this.errorMessage = 'The email address you entered does not exist.';
        } else {
          this.errorMessage =
            err.error.message || 'Login failed. Please try again.';
        }
      },
    });
  }
}
