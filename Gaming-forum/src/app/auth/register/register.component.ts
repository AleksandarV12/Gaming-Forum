import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  userData = { username: '', email: '', password: '' };
  errorMessage: string = ''; // Variable for error messages

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    this.errorMessage = ''; // Reset the error message

    if (
      !this.userData.username ||
      !this.userData.email ||
      !this.userData.password
    ) {
      this.errorMessage = 'All fields must be filled.';
      return;
    }

    if (this.userData.username.length < 3) {
      this.errorMessage = 'Username must be at least 3 characters long.';
      return;
    }

    const usernamePattern = /^[a-zA-Z0-9_]+$/;
    if (!usernamePattern.test(this.userData.username)) {
      this.errorMessage =
        'Username can only contain letters, numbers, and underscores.';
      return;
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(this.userData.email)) {
      this.errorMessage =
        'Please provide a valid email address (e.g., example@gmail.com).';
      return;
    }

    if (this.userData.password.length < 6) {
      this.errorMessage = 'Password must be at least 6 characters long.';
      return;
    }

    this.authService.register(this.userData).subscribe({
      next: (response) => {
        console.log('Registration successful', response);
        localStorage.setItem('token', response.token);
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.error('Registration failed', err);

        if (err.error.message.includes('Email')) {
          this.errorMessage = 'This email is already registered.';
        } else if (err.error.message.includes('Username')) {
          this.errorMessage = 'This username is already taken.';
        } else if (err.error.message.includes('password is already in use')) {
          this.errorMessage =
            'This password is already in use. Please choose another one.';
        } else {
          this.errorMessage =
            err.error.message || 'Registration failed. Please try again.';
        }
      },
    });
  }
}
